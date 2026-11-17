'use strict';

/*
 * Волейбольное табло «Arena» — сервер синхронизации.
 *
 * Без npm-зависимостей: обычный Node.js (>= 18), статика + собственный
 * WebSocket-сервер (RFC 6455) + хранение состояния комнат в data/<room>.json.
 *
 * Запуск:  node server.js
 * Порт:    process.env.PORT || 8787
 */

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 8787;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;
const DEFAULT_DATA_DIR = path.join(ROOT, 'data');
// На хостинге папку данных можно вынести на постоянный диск: DATA_DIR=/var/data
const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : DEFAULT_DATA_DIR;
const WS_GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const MAX_PAYLOAD = 8 * 1024 * 1024;   // максимальный размер WS-сообщения (фон + логотипы)
const MAX_BUFFER = 16 * 1024 * 1024;  // защита от раздувания входного буфера
const HEARTBEAT_MS = 30000;
const SAVE_DEBOUNCE_MS = 300;

function lanAddresses() {
  const found = [];
  try {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const info of nets[name] || []) {
        if (info && info.family === 'IPv4' && !info.internal) found.push(info.address);
      }
    }
  } catch { /* ignore */ }
  return Array.from(new Set(found));
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

/* ------------------------------------------------------------------ */
/* Комнаты                                                             */
/* ------------------------------------------------------------------ */

/** room -> { name, clients:Set, state, loaded, dirty, saveTimer } */
const rooms = new Map();

function sanitizeRoom(value) {
  const room = String(value || '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 40);
  return room || 'main';
}

function roomFile(name) {
  return path.join(DATA_DIR, name + '.json');
}

function isInsidePath(child, parent) {
  const rel = path.relative(parent, child);
  return rel === '' || (rel !== '..' && !rel.startsWith('..' + path.sep) && !path.isAbsolute(rel));
}

function getRoom(name) {
  let entry = rooms.get(name);
  if (!entry) {
    entry = {
      name,
      clients: new Set(),
      state: null,
      loaded: false,
      dirty: false,
      saveTimer: null
    };
    rooms.set(name, entry);
  }
  return entry;
}

function ensureLoaded(entry) {
  if (entry.loaded) return;
  entry.loaded = true;
  try {
    const raw = fs.readFileSync(roomFile(entry.name), 'utf8');
    const parsed = JSON.parse(raw);
    const state = parsed && typeof parsed === 'object' && parsed.state ? parsed.state : parsed;
    if (state && typeof state === 'object' && !Array.isArray(state)) {
      entry.state = state;
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('[arena] failed to read room state', entry.name, err.message);
    }
  }
}

function saveRoom(entry) {
  entry.dirty = true;
  clearTimeout(entry.saveTimer);
  entry.saveTimer = setTimeout(() => flushRoom(entry), SAVE_DEBOUNCE_MS);
  if (entry.saveTimer.unref) entry.saveTimer.unref();
}

function flushRoom(entry) {
  if (!entry.dirty || !entry.state) return;
  entry.dirty = false;
  const file = roomFile(entry.name);
  const tmp = file + '.tmp';
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(tmp, JSON.stringify({ savedAt: Date.now(), state: entry.state }));
    fs.renameSync(tmp, file);
  } catch (err) {
    entry.dirty = true;
    console.error('[arena] failed to save room', entry.name, err.message);
  }
}

function broadcastPresence(entry) {
  const count = entry.clients.size;
  broadcast(entry, { type: 'presence', room: entry.name, count });
}

function broadcast(entry, message, except) {
  const text = JSON.stringify(message);
  for (const client of entry.clients) {
    if (client !== except) client.sendText(text);
  }
}

/* ------------------------------------------------------------------ */
/* WebSocket-клиент                                                    */
/* ------------------------------------------------------------------ */

class WSClient {
  constructor(socket, request) {
    this.socket = socket;
    this.request = request;
    this.id = crypto.randomBytes(9).toString('base64url');
    this.clientId = this.id;
    this.room = null;
    this.buffer = Buffer.alloc(0);
    this.fragments = [];
    this.fragmentsBytes = 0;
    this.fragmentOpcode = 0;
    this.alive = true;
    this.closed = false;
    this.destroyTimer = null;

    socket.setNoDelay(true);
    socket.setTimeout(0);
    socket.on('data', (chunk) => this.onData(chunk));
    socket.on('error', () => this.destroy());
    socket.on('close', () => this.onClose());
    socket.on('end', () => this.destroy());
  }

  /* ---- приём ---- */

  onData(chunk) {
    if (this.closed) return;
    this.alive = true;
    this.buffer = this.buffer.length ? Buffer.concat([this.buffer, chunk]) : chunk;

    if (this.buffer.length > MAX_BUFFER) {
      this.close(1009, 'message too big');
      return;
    }

    while (!this.closed) {
      const frame = this.readFrame();
      if (!frame) break;
      this.handleFrame(frame);
    }
  }

  readFrame() {
    const buf = this.buffer;
    if (buf.length < 2) return null;

    const first = buf[0];
    const second = buf[1];
    const fin = (first & 0x80) !== 0;
    const rsv = first & 0x70;
    const opcode = first & 0x0f;
    const masked = (second & 0x80) !== 0;
    let length = second & 0x7f;
    let offset = 2;

    if (rsv !== 0) {
      this.close(1002, 'RSV bits are not supported');
      return null;
    }
    if (!masked) {
      this.close(1002, 'client frames must be masked');
      return null;
    }

    if (length === 126) {
      if (buf.length < 4) return null;
      length = buf.readUInt16BE(2);
      offset = 4;
    } else if (length === 127) {
      if (buf.length < 10) return null;
      const high = buf.readUInt32BE(2);
      const low = buf.readUInt32BE(6);
      if (high !== 0 || low > MAX_PAYLOAD) {
        this.close(1009, 'message too big');
        return null;
      }
      length = low;
      offset = 10;
    }

    if (length > MAX_PAYLOAD) {
      this.close(1009, 'message too big');
      return null;
    }

    const needed = offset + 4 + length;
    if (buf.length < needed) return null;

    const mask = buf.subarray(offset, offset + 4);
    const payload = Buffer.allocUnsafe(length);
    const start = offset + 4;
    for (let i = 0; i < length; i += 1) {
      payload[i] = buf[start + i] ^ mask[i & 3];
    }

    this.buffer = buf.subarray(needed);
    return { fin, opcode, payload };
  }

  handleFrame(frame) {
    const { fin, opcode, payload } = frame;

    if (opcode === 0x0) {
      if (!this.fragmentOpcode) {
        this.close(1002, 'unexpected continuation frame');
        return;
      }
      this.fragments.push(payload);
      this.fragmentsBytes += payload.length;
      if (this.fragmentsBytes > MAX_PAYLOAD) {
        this.close(1009, 'message too big');
        return;
      }
      if (fin) {
        const full = Buffer.concat(this.fragments, this.fragmentsBytes);
        const op = this.fragmentOpcode;
        this.fragments = [];
        this.fragmentsBytes = 0;
        this.fragmentOpcode = 0;
        if (op === 0x1) this.onText(full.toString('utf8'));
      }
      return;
    }

    if (opcode === 0x1 || opcode === 0x2) {
      if (this.fragmentOpcode) {
        this.close(1002, 'new data frame during fragmented message');
        return;
      }
      if (!fin) {
        this.fragmentOpcode = opcode;
        this.fragments = [payload];
        this.fragmentsBytes = payload.length;
        return;
      }
      if (opcode === 0x1) this.onText(payload.toString('utf8'));
      return;
    }

    if (opcode === 0x8) {
      let code = 1000;
      let reason = '';
      if (payload.length >= 2) {
        code = payload.readUInt16BE(0);
        reason = payload.subarray(2).toString('utf8').slice(0, 120);
      }
      this.close(code >= 1000 && code < 5000 ? code : 1000, reason);
      return;
    }

    if (opcode === 0x9) {
      this.sendFrame(0xA, payload);
      return;
    }

    if (opcode === 0xA) {
      this.alive = true;
      return;
    }

    this.close(1002, 'unsupported opcode');
  }

  onText(text) {
    if (text.length > MAX_PAYLOAD) return;
    let message;
    try {
      message = JSON.parse(text);
    } catch {
      return;
    }
    if (!message || typeof message !== 'object' || Array.isArray(message)) return;
    handleMessage(this, message);
  }

  /* ---- отправка ---- */

  sendFrame(opcode, payload) {
    if (this.closed || this.socket.destroyed) return;
    const body = Buffer.isBuffer(payload) ? payload : Buffer.from(String(payload), 'utf8');
    const length = body.length;
    let header;

    if (length < 126) {
      header = Buffer.allocUnsafe(2);
      header[0] = 0x80 | opcode;
      header[1] = length;
    } else if (length < 65536) {
      header = Buffer.allocUnsafe(4);
      header[0] = 0x80 | opcode;
      header[1] = 126;
      header.writeUInt16BE(length, 2);
    } else {
      header = Buffer.allocUnsafe(10);
      header[0] = 0x80 | opcode;
      header[1] = 127;
      header.writeUInt32BE(0, 2);
      header.writeUInt32BE(length, 6);
    }

    try {
      this.socket.write(Buffer.concat([header, body]));
    } catch {
      this.destroy();
    }
  }

  sendText(text) {
    this.sendFrame(0x1, text);
  }

  sendJSON(value) {
    this.sendText(JSON.stringify(value));
  }

  ping() {
    this.sendFrame(0x9, Buffer.alloc(0));
  }

  /* ---- закрытие ---- */

  close(code, reason) {
    if (this.closed) return;
    const reasonBuf = Buffer.from(String(reason || '').slice(0, 120), 'utf8');
    const payload = Buffer.allocUnsafe(2 + reasonBuf.length);
    payload.writeUInt16BE(code || 1000, 0);
    reasonBuf.copy(payload, 2);
    this.sendFrame(0x8, payload);
    this.closed = true;
    try {
      this.socket.end();
    } catch {
      /* ignore */
    }
    this.destroyTimer = setTimeout(() => this.destroy(), 1000);
    if (this.destroyTimer.unref) this.destroyTimer.unref();
  }

  destroy() {
    clearTimeout(this.destroyTimer);
    try {
      this.socket.destroy();
    } catch {
      /* ignore */
    }
    this.onClose();
  }

  onClose() {
    if (this.room) {
      const entry = rooms.get(this.room);
      if (entry && entry.clients.delete(this)) {
        broadcastPresence(entry);
      }
      this.room = null;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Протокол сообщений                                                  */
/* ------------------------------------------------------------------ */

function handleMessage(client, message) {
  if (!client.room) return;
  const entry = rooms.get(client.room);
  if (!entry) return;

  switch (message.type) {
    case 'hello': {
      client.clientId = String(message.clientId || '').slice(0, 40) || client.id;
      ensureLoaded(entry);
      client.sendJSON({
        type: 'welcome',
        room: entry.name,
        clientId: client.id,
        peers: entry.clients.size
      });
      broadcastPresence(entry);
      if (entry.state) client.sendJSON({ type: 'state', state: entry.state });
      else client.sendJSON({ type: 'need-state' });
      break;
    }

    case 'state': {
      const next = message.state;
      if (!next || typeof next !== 'object' || Array.isArray(next)) return;
      const rev = Number(next.rev);
      if (!Number.isFinite(rev) || rev < 0) return;

      if (!entry.state) {
        entry.state = next;
        saveRoom(entry);
        broadcast(entry, { type: 'state', state: next }, client);
        return;
      }

      const currentRev = Number(entry.state.rev) || 0;
      if (rev < currentRev) {
        client.sendJSON({ type: 'state', state: entry.state });
        return;
      }
      if (rev === currentRev) {
        if (stableStringify(next) !== stableStringify(entry.state)) {
          client.sendJSON({ type: 'state', state: entry.state });
        }
        return;
      }

      entry.state = next;
      saveRoom(entry);
      broadcast(entry, { type: 'state', state: next }, client);
      break;
    }

    case 'patch': {
      // Лёгкое обновление только счёта/тайм-аутов (мобильный пульт).
      const patch = message.patch;
      const rev = Number(message.rev);
      if (!patch || typeof patch !== 'object' || Array.isArray(patch)) return;
      if (!Number.isFinite(rev) || rev < 0) return;

      ensureLoaded(entry);
      if (!entry.state) {
        client.sendJSON({ type: 'need-state' });
        return;
      }

      const currentRev = Number(entry.state.rev) || 0;
      if (rev <= currentRev) {
        client.sendJSON({ type: 'state', state: entry.state });
        return;
      }

      const next = Object.assign({}, entry.state);
      ['score', 'setsWon', 'sets', 'setNumber', 'serve', 'timeouts', 'matchOver'].forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(patch, key)) next[key] = patch[key];
      });
      next.rev = rev;
      entry.state = next;
      saveRoom(entry);
      broadcast(entry, { type: 'state', state: next }, client);
      client.sendJSON({ type: 'ack', rev });
      break;
    }

    case 'sync':
    case 'request': {
      ensureLoaded(entry);
      if (entry.state) client.sendJSON({ type: 'state', state: entry.state });
      break;
    }

    case 'ping': {
      client.sendJSON({ type: 'pong', t: Date.now() });
      break;
    }

    default:
      break;
  }
}

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  const keys = Object.keys(value).sort();
  return '{' + keys.map((key) => JSON.stringify(key) + ':' + stableStringify(value[key])).join(',') + '}';
}

/* ------------------------------------------------------------------ */
/* HTTP + WebSocket upgrade                                            */
/* ------------------------------------------------------------------ */

function setCommonHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJSON(res, status, value) {
  const body = Buffer.from(JSON.stringify(value, null, 2), 'utf8');
  setCommonHeaders(res);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function sendText(res, status, text) {
  const body = Buffer.from(text, 'utf8');
  setCommonHeaders(res);
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function serveStatic(req, res, pathname) {
  let relative;
  try {
    relative = decodeURIComponent(pathname);
  } catch {
    sendText(res, 400, 'Bad request');
    return;
  }

  relative = relative.replace(/^\/+/, '');
  if (!relative) relative = 'index.html';
  if (relative.endsWith('/')) relative += 'index.html';

  const firstSegment = relative.split('/')[0].toLowerCase();
  if (firstSegment === 'data' || firstSegment === 'node_modules' || firstSegment.startsWith('.')) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  const absolute = path.resolve(ROOT, relative);
  if (absolute !== ROOT && !absolute.startsWith(ROOT + path.sep)) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  // Не отдаём наружу состояние комнат, даже если DATA_DIR вынесен внутрь проекта.
  const blockedDirs = [DEFAULT_DATA_DIR, DATA_DIR, path.join(ROOT, 'node_modules')];
  if (blockedDirs.some((dir) => isInsidePath(absolute, dir))) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  fs.stat(absolute, (statErr, stat) => {
    if (statErr) {
      sendText(res, 404, 'Not found');
      return;
    }

    let file = absolute;
    if (stat.isDirectory()) {
      file = path.join(absolute, 'index.html');
    }

    fs.stat(file, (err, fileStat) => {
      if (err || !fileStat.isFile()) {
        sendText(res, 404, 'Not found');
        return;
      }

      const ext = path.extname(file).toLowerCase();
      const type = MIME[ext] || 'application/octet-stream';
      const headers = {
        'Content-Type': type,
        'Content-Length': fileStat.size,
        'Cache-Control': ext === '.html' || ext === '.htm' ? 'no-store' : 'public, max-age=60'
      };

      setCommonHeaders(res);
      res.writeHead(200, headers);
      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const stream = fs.createReadStream(file);
      stream.on('error', () => {
        if (!res.headersSent) sendText(res, 500, 'Read error');
        else res.destroy();
      });
      stream.pipe(res);
    });
  });
}

const server = http.createServer((req, res) => {
  let url;
  try {
    url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  } catch {
    sendText(res, 400, 'Bad request');
    return;
  }

  if (req.method === 'OPTIONS') {
    setCommonHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendText(res, 405, 'Method not allowed');
    return;
  }

  if (url.pathname === '/health' || url.pathname === '/healthz') {
    sendJSON(res, 200, {
      ok: true,
      uptime: Math.round(process.uptime()),
      rooms: rooms.size,
      clients: Array.from(rooms.values()).reduce((sum, room) => sum + room.clients.size, 0),
      time: Date.now()
    });
    return;
  }

  if (url.pathname === '/rooms') {
    const list = Array.from(rooms.values()).map((room) => ({
      room: room.name,
      clients: room.clients.size,
      hasState: Boolean(room.state)
    }));
    sendJSON(res, 200, { rooms: list });
    return;
  }

  if (url.pathname === '/net') {
    sendJSON(res, 200, { port: PORT, ips: lanAddresses() });
    return;
  }

  if (url.pathname === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  serveStatic(req, res, url.pathname);
});

server.on('upgrade', (req, socket, head) => {
  let url;
  try {
    url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  } catch {
    socket.destroy();
    return;
  }

  if (url.pathname !== '/ws' && url.pathname !== '/ws/') {
    socket.write('HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n');
    socket.destroy();
    return;
  }

  const key = req.headers['sec-websocket-key'];
  const version = req.headers['sec-websocket-version'];
  const upgrade = String(req.headers.upgrade || '').toLowerCase();

  if (upgrade !== 'websocket' || !key || version !== '13') {
    socket.write('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');
    socket.destroy();
    return;
  }

  const accept = crypto
    .createHash('sha1')
    .update(key + WS_GUID)
    .digest('base64');

  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      'Sec-WebSocket-Accept: ' + accept + '\r\n' +
      '\r\n'
  );

  const roomName = sanitizeRoom(url.searchParams.get('room'));
  const entry = getRoom(roomName);
  ensureLoaded(entry);

  const client = new WSClient(socket, req);
  client.room = roomName;
  entry.clients.add(client);

  if (head && head.length) client.onData(head);

  broadcastPresence(entry);

  if (entry.state) client.sendJSON({ type: 'state', state: entry.state });

  const address = socket.remoteAddress || '?';
  console.log('[arena] + ' + roomName + ' (' + entry.clients.size + ') ' + address);
});

/* ------------------------------------------------------------------ */
/* Heartbeat и завершение                                              */
/* ------------------------------------------------------------------ */

const heartbeat = setInterval(() => {
  for (const entry of rooms.values()) {
    for (const client of Array.from(entry.clients)) {
      if (!client.alive) {
        client.destroy();
        continue;
      }
      client.alive = false;
      client.ping();
    }
  }
}, HEARTBEAT_MS);

let shuttingDown = false;
function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log('\n[arena] shutting down (' + signal + ')...');
  clearInterval(heartbeat);
  for (const entry of rooms.values()) {
    clearTimeout(entry.saveTimer);
    flushRoom(entry);
    for (const client of entry.clients) client.close(1001, 'server shutdown');
  }
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1500).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('uncaughtException', (err) => {
  console.error('[arena] uncaughtException:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('[arena] unhandledRejection:', err);
});

server.listen(PORT, HOST, () => {
  const lan = lanAddresses();
  console.log('');
  console.log('  Arena volleyball scoreboard');
  console.log('  ---------------------------------------------');
  console.log('  Local:    http://localhost:' + PORT + '/');
  console.log('  Overlay:  http://localhost:' + PORT + '/overlay.html');
  console.log('  Health:   http://localhost:' + PORT + '/health');
  console.log('  Data:     ' + DATA_DIR);
  console.log('  Port:     ' + PORT + '  (PORT=... node server.js)');
  console.log('');
  if (lan.length) {
    console.log('  Phone remote (same Wi-Fi):');
    for (const ip of lan) {
      console.log('    http://' + ip + ':' + PORT + '/remote.html?room=main');
    }
  } else {
    console.log("  On other devices use this computer's LAN IP address.");
  }
  console.log('  Stop: Ctrl+C');
  console.log('');
});
