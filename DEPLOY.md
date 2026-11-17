# 🌍 Как открыть табло в интернете

> **Уже задеплоено:** [https://arena-volley.onrender.com/](https://arena-volley.onrender.com/)
> (Render Free, Frankfurt, репозиторий
> [github.com/zholomanovaza-boss/boss](https://github.com/zholomanovaza-boss/boss)).
> Синхронизация через `wss://` проверена с двух клиентов, `/health` возвращает `ok: true`.

Табло работает как обычный сайт, но ему нужен **Node.js-хостинг с поддержкой WebSocket**.
Статические хостинги (Netlify, GitHub Pages, обычный Vercel) не подойдут: синхронизация
счёта идёт через WebSocket, а не через HTTP.

В проекте уже подготовлено всё для деплоя:

- `Dockerfile` — для Railway, VPS и любого Docker-хостинга;
- `render.yaml` — готовый Blueprint для Render;
- `railway.json` — настройки запуска для Railway;
- `server.js` читает `PORT`, `HOST` и `DATA_DIR` из переменных окружения.

Ниже — три способа. Для первого запуска проще всего **Railway**: он умеет загружать
папку с компьютера без Git и GitHub.

### Тарифы на ноябрь 2026 (уточняйте перед оплатой)

| Площадка | Бесплатно | Постоянное хранение | Платно |
| --- | --- | --- | --- |
| Railway Trial | $5 разово на 30 дней, без карты; домен `*.railway.app` | volume до 500 МБ | — |
| Railway Free | $0/мес + $1 кредит/мес, 0.5 GB RAM, volume до 500 МБ; **свой домен недоступен** | volume `/data` | — |
| Railway Hobby | — | volume до 5 ГБ | **$5/мес** |
| Render Free web service | $0, 0.1 CPU / 512 MB, `*.onrender.com` | **недоступно** | — |
| Render платный compute | — | диск от $0.25/ГБ/мес | **$7/мес** (0.5 CPU / 512 MB) + диск |

Важные отличия:

- **Railway не уводит сервис в сон**, пока запущен и есть кредит/подписка. Trial-кредит
  $5 заканчивается через 30 дней, дальше — Free ($1/мес) или Hobby ($5/мес).
  Free-кредита может не хватить при круглосуточной работе — следите за Usage.
- **Render Free засыпает через 15 минут без запросов**, просыпается ~1 минуту, и при
  каждом засыпании теряет локальные файлы (состояние комнат). Для разового матча
  обычно хватает, для постоянного табла берите платный compute + диск.
- Для Railway без GitHub-аккаунта Trial может быть «Limited» (ограничения сети),
  но публичный веб-сервис на нём поднимается. Полный доступ даёт привязка GitHub
  или платный тариф.

---

## Вариант 1. Railway (рекомендуется, без GitHub)

Нужен только аккаунт Railway (бесплатный тариф есть) и Node.js на компьютере.
**Railway CLI уже установлен** в этой папке (`railway 5.71.0`), шаг 1 можно пропустить.

### 1. Установите Railway CLI (если ещё не установлен)

```powershell
npm install -g @railway/cli
railway --version
```

### 2. Войдите в аккаунт

```powershell
railway login
```

Откроется браузер — подтвердите вход. Если браузер не открылся, скопируйте ссылку
из консоли вручную.

### 3. Запустите деплой из папки проекта

```powershell
cd "C:\Users\Admin\Documents\Проект по умолчанию"
railway init
railway up
```

`railway init` создаст новый проект (имя можно любое, например `arena-volley`).
`railway up` загрузит текущую папку и соберёт сервис. Первая сборка занимает 1–3 минуты.

### 4. Получите публичный адрес

```powershell
railway domain
```

Или откройте панель Railway → сервис → **Settings → Networking → Generate Domain**.
Получится ссылка вида:

```
https://arena-volley-production.up.railway.app
```

### 5. Включите постоянное хранение (важно)

Без этого файлы комнат (`data/*.json`) живут только до перезапуска контейнера.

В панели Railway откройте сервис:

1. **Variables** → добавьте переменную `DATA_DIR` со значением `/data`;
2. **Volumes** (или **Settings → Volumes**) → **New Volume**;
3. Mount Path: `/data`, размер — 500 МБ (максимум на Trial/Free; на Hobby можно больше);
4. Перезапустите сервис (**Deploy → Restart**).

После этого счёт и настройки комнат переживают перезапуски и обновления.

### 6. Проверьте

```
https://<ваш-домен>/health
```

Должно вернуться `"ok": true`. Откройте табло и пульт, поменяйте счёт на телефоне —
второе устройство должно обновиться за секунду.

---

## Вариант 2. Render (через GitHub)

У вас нет Git на компьютере — это не проблема: файлы можно загрузить на GitHub
через браузер.

### 1. Создайте репозиторий на GitHub

1. Откройте [github.com/new](https://github.com/new).
2. Имя: например `arena-volley`, тип **Private** или Public — не важно.
3. Создайте репозиторий **без** README.

### 2. Загрузите файлы

В пустом репозитории нажмите **uploading an existing file** и перетащите
**содержимое** папки проекта:

```
index.html
index1.html
board.html … board5.html
overlay.html
remote.html
server.js
package.json
Dockerfile
render.yaml
railway.json
README.md
DEPLOY.md
.gitignore
.dockerignore
```

Папку `data/` и файл `CODE.md` загружать не нужно — они исключены через `.gitignore`.
Нажмите **Commit changes**.

### 3. Создайте Web Service в Render

1. [dashboard.render.com](https://dashboard.render.com) → **New → Web Service**.
2. Подключите GitHub и выберите репозиторий `arena-volley`.
3. Настройки:

   | Параметр | Значение |
   | --- | --- |
   | Language / Runtime | Node |
   | Build Command | `npm install --omit=dev` |
   | Start Command | `node server.js` |
   | Plan | Free |
   | Health Check Path | `/health` |

4. **Create Web Service** и дождитесь сборки.
5. Адрес будет вида `https://arena-volley.onrender.com`.

Render также понимает `render.yaml`: можно нажать **New → Blueprint** и выбрать
репозиторий — настройки подставятся автоматически.

### 4. Постоянное хранение на Render

На бесплатном compute-плане диск недоступен: после перезапуска/засыпания сервиса
состояние комнат сбрасывается (настройки в браузере остаются в `localStorage`).
Render Free засыпает после **15 минут** без входящих HTTP-запросов и WebSocket-сообщений;
просыпание занимает около **1 минуты**.

Если нужна гарантия сохранности:

1. Переключите **compute-план сервиса** с Free на платный, например
   **Less than 1 CPU / 512 MB** — $7/мес (workspace Hobby при этом $0).
2. **Settings → Disks → Add Disk**: Mount Path `/var/data`, размер 1 GB
   (диск тарифицируется отдельно, от $0.25/ГБ/мес).
3. **Environment → Add Environment Variable**: `DATA_DIR` = `/var/data`.
4. Перезапустите сервис.

Для разового матча бесплатного тарифа обычно достаточно: достаточно открыть
табло/пульт заранее — активный WebSocket не даёт сервису уснуть.

---

## Вариант 3. Свой VPS или Docker

Подойдёт любой сервер с Docker (Ubuntu, Debian и т.п.). HTTPS и WebSocket
удобнее всего отдать Caddy — он сам получит сертификат.

### 1. Соберите образ

На сервере (или локально, если настроен Docker):

```bash
docker build -t arena-volley .
```

### 2. Запустите контейнер

```bash
docker run -d \
  --name arena \
  --restart unless-stopped \
  -p 127.0.0.1:8080:8080 \
  -v arena-data:/data \
  arena-volley
```

Проверка:

```bash
curl http://127.0.0.1:8080/health
```

Состояние комнат хранится в named volume `arena-data`, поэтому переживает
перезапуск контейнера.

### 3. HTTPS через Caddy

`/etc/caddy/Caddyfile`:

```caddyfile
score.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

```bash
sudo systemctl reload caddy
```

Caddy автоматически выпустит сертификат и проксирует WebSocket (`wss://`).
Клиент табло сам выбирает `wss://`, если страница открыта по HTTPS.

Вместо Caddy можно использовать Nginx:

```nginx
server {
    listen 443 ssl;
    server_name score.example.com;

    # ssl_certificate ...; ssl_certificate_key ...;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 3600s;
    }
}
```

---

## Ссылки после деплоя

Замените `<домен>` на адрес из Render/Railway или ваш домен.

| Что | Ссылка |
| --- | --- |
| Пульт + табло (только для вас) | `https://<домен>/?room=main` |
| Пульт на телефоне | `https://<домен>/remote.html?room=main` |
| Табло для зрителей | `https://<домен>/board.html?room=main` |
| YouTube-сеты | `https://<домен>/board5.html?room=main` |
| Оверлей для OBS | `https://<домен>/overlay.html?room=main` |
| Табло в OBS (прозрачный фон) | `https://<домен>/board5.html?room=main&bg=transparent` |
| Проверка сервера | `https://<домен>/health` |

В OBS добавьте источник **Browser**: ширина `1920`, высота `1080`,
URL — ссылка на табло или оверлей. Для прозрачного фона используйте `bg=transparent`.

---

## Обновление сайта

- **Railway:** снова выполните `railway up` в папке проекта.
- **Render:** загрузите изменённые файлы в GitHub (или сделайте commit/push) —
  Render пересоберёт сервис автоматически.
- **VPS/Docker:** пересоберите образ и перезапустите контейнер.

После обновления откройте страницы с **Ctrl + F5**, чтобы сбросить кэш.

---

## Безопасность

В проекте нет паролей: кто знает адрес комнаты, тот может менять счёт.
Для публичного стрима:

- используйте **неугадываемое имя комнаты**, например `room=match-7f3k9q2p`
  (латиница, цифры, `_`, `-`);
- не публикуйте ссылку на пульт (`/` и `/remote.html`) — зрителям давайте
  `board*.html`, `overlay.html` или `?display=1`;
- при необходимости смените комнату после матча — состояние новой комнаты
  начнётся с чистого листа;
- не выкладывайте папку `data/` в публичный репозиторий.

Если нужен настоящий пароль на пульт, это можно добавить отдельным слоем
(Basic Auth в Caddy/Nginx или PIN в приложении). Для домашнего использования
обычно достаточно секретного имени комнаты.

---

## Если что-то не работает

| Симптом | Что проверить |
| --- | --- |
| `"ok": true`, но счёт не синхронизируется | Оба устройства открывают **один и тот же** `room`; в адресе нет опечатки |
| На табло «офлайн» | Откройте `https://<домен>/health`; проверьте логи сервиса |
| После перезапуска пропал счёт | Не подключён постоянный диск/volume и `DATA_DIR` |
| Render долго не отвечает | Free-тариф заснул; первый запрос будит сервис 30–60 секунд |
| OBS показывает пустой экран | Проверьте URL, включите «Обновить» у Browser Source, разрешите WebSocket |
| Ссылка открывается, но HTTPS не работает | Домен должен быть привязан в панели хостинга; сертификат выпускается автоматически |
