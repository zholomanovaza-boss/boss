# Полный код проекта «Arena»

> Сгенерировано автоматически. Файлы лежат в папке проекта.

## index.html

```html
<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Волейбол — Arena</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@400;600;800&family=Oswald:wght@400;600;700&family=Roboto+Condensed:wght@400;700&family=Russo+One&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-family: "Bebas Neue", "Oswald", Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      --bg: #28ff05;
      --title-bg: #1eff65;
      --text: #ffffff;
      --home-bg: #141fff;
      --home-fg: #f9ca24;
      --away-bg: #202132;
      --away-fg: #ffffff;
      --panel: rgba(0, 0, 0, 0.35);
      --panel-current: rgba(0, 0, 0, 0.52);
      --chrome: rgba(0, 0, 0, 0.28);
      --chrome-border: rgba(255, 255, 255, 0.14);
      --radius: 0px;
      --label-shadow: 0 0.1vh 0.5vh rgba(0, 0, 0, 0.4);
      --digit-shadow: 0 0.16vh 1vh rgba(0, 0, 0, 0.6), 0 0 2.2vh rgba(255, 255, 255, 0.14);
      --name-shadow: 0 0.24vh 0.8vh rgba(0, 0, 0, 0.5);
      --inner-shadow: inset 0 0.14vh 0.28vh rgba(0, 0, 0, 0.45), inset 0 -0.08vh 0 rgba(255, 255, 255, 0.08);
      --top-glow: inset 0 0.12vh 0 rgba(255, 255, 255, 0.16);
    }

    body[data-theme="dark"] {
      --bg: radial-gradient(1600px 1000px at 50% 0%, #182036 0%, #060a14 100%);
      --title-bg: #1b2540;
      --text: #ffffff;
      --home-bg: #1d4ed8;
      --home-fg: #ffffff;
      --away-bg: #232a3d;
      --away-fg: #ffffff;
      --panel: rgba(0, 0, 0, 0.42);
      --panel-current: rgba(0, 0, 0, 0.6);
    }

    body[data-theme="blue"] {
      --bg: radial-gradient(1600px 1000px at 50% 0%, #0f2b57 0%, #071224 100%);
      --title-bg: #173d73;
      --text: #ffffff;
      --home-bg: #2563eb;
      --home-fg: #ffffff;
      --away-bg: #0e1b30;
      --away-fg: #7dd3fc;
      --panel: rgba(0, 0, 0, 0.45);
      --panel-current: rgba(0, 0, 0, 0.62);
    }

    body[data-theme="kts"] {
      --bg: radial-gradient(1600px 1000px at 50% 0%, #16315e 0%, #081426 100%);
      --title-bg: #1b3a6b;
      --text: #ffffff;
      --home-bg: #1f4173;
      --home-fg: #ffffff;
      --away-bg: #182f57;
      --away-fg: #cfe3ff;
      --panel: rgba(255, 255, 255, 0.09);
      --panel-current: rgba(255, 255, 255, 0.17);
    }

    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      touch-action: manipulation;
      font-variant-numeric: tabular-nums;
      font-feature-settings: "tnum", "tnum";
      scrollbar-width: none;
    }

    *::-webkit-scrollbar {
      display: none;
    }

    html,
    body {
      height: 100%;
    }

    body {
      margin: 0;
      font-family: var(--font-family);
      color: var(--text);
      background: var(--bg);
      overflow: hidden;
    }

    body.transparent {
      background: transparent !important;
    }

    body.transparent .arena {
      background: transparent;
      box-shadow: none;
    }

    body.transparent .bg-layer,
    body.transparent .bg-shade,
    body.transparent .topbar {
      display: none !important;
    }

    /* ---------- Фон табло ---------- */
    .bg-layer,
    .bg-shade {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .bg-layer {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.04);
    }

    .bg-layer[hidden],
    .bg-shade[hidden] {
      display: none;
    }

    .bg-shade {
      background: #000;
    }

    button {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
    }

    [contenteditable] {
      outline: none;
    }

    .app {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-rows: auto minmax(0, 1fr) auto;
      height: 100dvh;
      gap: clamp(6px, 1vw, 12px);
      padding: clamp(10px, 1.8vw, 22px);
    }

    /* ---------- Шапка ---------- */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: clamp(8px, 1.4vw, 16px);
      min-height: clamp(34px, 4vw, 54px);
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
    }

    .sync-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      border-radius: 999px;
      background: var(--chrome);
      border: 1px solid var(--chrome-border);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-size: clamp(8px, 0.72vw, 11px);
      white-space: nowrap;
    }

    .sync-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #ffb63b;
      box-shadow: 0 0 8px currentColor;
    }

    .sync-pill.online .sync-dot {
      background: #38e07b;
    }

    .sync-pill.offline .sync-dot {
      background: #ff5a6a;
    }

    .icon-btn {
      width: clamp(32px, 3.2vw, 42px);
      height: clamp(32px, 3.2vw, 42px);
      display: grid;
      place-items: center;
      border-radius: 999px;
      border: 1px solid var(--chrome-border);
      background: var(--chrome);
      font-size: clamp(12px, 1.2vw, 16px);
      transition: background 0.15s, opacity 0.15s;
    }

    .icon-btn:hover {
      background: rgba(0, 0, 0, 0.42);
    }

    /* ---------- Арена ---------- */
    main {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 0;
    }

    .arena-frame {
      width: min(96vw, 1780px);
      height: min(80dvh, 880px);
      display: flex;
    }

    body.display .arena-frame {
      height: 100dvh;
      width: 100vw;
    }

    body.display .app {
      grid-template-rows: minmax(0, 1fr);
      gap: 0;
      padding: 0;
    }

    .arena {
      --name-font: clamp(26px, 5.2vw, 92px);
      --score-font: clamp(110px, 18vw, 420px);
      --title-font: clamp(40px, 7.5vw, 180px);
      --set-font: clamp(24px, 3.8vw, 52px);
      --counter-font: clamp(30px, 5vw, 68px);
      --counter-timeout-font: clamp(24px, 3.8vw, 52px);
      --counter-label-font: clamp(9px, 0.95vw, 16px);
      --mid-fit: 1;
      --mid-row-gap: calc(clamp(3px, 0.5vw, 8px) * var(--panel-scale, 1) * var(--mid-fit, 1));
      --mid-row-pad-y: calc(clamp(2px, 0.35vw, 6px) * var(--panel-scale, 1) * var(--mid-fit, 1));
      --mid-row-pad-x: calc(clamp(6px, 0.8vw, 14px) * var(--panel-scale, 1) * var(--mid-fit, 1));
      --mid-row-radius: clamp(5px, 0.7vw, 12px);
      position: relative;
      flex: 1;
      display: grid;
      font-family: var(--font-family);
      --arena-gap: clamp(8px, 1.1vw, 16px);
      grid-template-columns: minmax(0, 1fr) clamp(210px, 24vw, 380px) minmax(0, 1fr);
      /* Свободное место уходит в пустую строку над названием: плашки
         названия и счёта сомкнуты и обжимают свой контент. */
      grid-template-rows: auto minmax(0, 1fr) auto auto;
      grid-template-areas:
        "title title title"
        ". . ."
        "homeIdentity heading awayIdentity"
        "homeScore mid awayScore";
      column-gap: var(--arena-gap);
      row-gap: 0;
      /* Нижняя панель прижимается к самому низу табло. */
      padding: clamp(14px, 2.2vw, 34px) clamp(14px, 2.2vw, 34px) 0;
      border-radius: var(--radius);
      background: transparent;
    }

    .box-title {
      grid-area: title;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      /* Заголовок прижимается к краям плашки: сверху и снизу пустых полей нет. */
      gap: 0;
      padding: 0;
      padding-inline: 0 !important;
      /* Обрезка только по краям плашки: сам текст не обрезает верх букв. */
      overflow: hidden;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.26) 100%);
      background-color: var(--title-bg);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
    }

    .el-title {
      font-size: calc(var(--title-font) * var(--title-scale, 1) * var(--title-fit, 1));
      text-transform: uppercase;
      letter-spacing: var(--title-spacing, 0.1em);
      white-space: nowrap;
      text-align: center;
      text-shadow: var(--label-shadow);
      min-width: 0;
      /* Не обрезаем глифы: плашка обрезает только по своим краям. */
      overflow: visible;
      padding-inline: clamp(8px, 2vw, 24px);
      /* Строчка равна контуру букв, а сдвиг из fitTitleText() центрирует его. */
      line-height: var(--title-line, 1.1);
      transform: translateY(var(--title-dy, 0px));
    }

    .title-track {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-width: 0;
    }

    .title-track .el-title {
      flex: 0 1 auto;
      min-width: 0;
    }

    .title-echo {
      display: none;
    }

    body.title-ticker .box-title {
      overflow: hidden;
    }

    body.title-ticker .title-track {
      width: max-content;
      justify-content: flex-start;
      animation: title-marquee var(--title-marquee-duration, 18s) linear infinite;
      will-change: transform;
    }

    body.title-ticker .title-track .el-title {
      display: block;
      flex: 0 0 auto;
      padding-right: 6vw;
    }

    body.title-ticker .title-track .title-echo {
      display: block;
    }

    @keyframes title-marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }

    .title-logos {
      position: relative;
      display: block;
      width: 100%;
      height: min(var(--title-logo-height, 120px), var(--cell-w, 10vw), 26vh);
      min-width: 0;
      overflow: hidden;
      flex: 0 1 auto;
    }

    .title-logos[hidden] {
      display: none;
    }

    .logo-strip {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 400%;
      display: flex;
      align-items: stretch;
      gap: 0;
      transform: translateX(-25%);
    }

    body.logo-ticker .logo-strip {
      animation: logo-marquee var(--logo-marquee-duration, 45s) linear infinite;
      will-change: transform;
    }

    body.title-above-logos .title-logos {
      order: 2;
    }

    @keyframes logo-marquee {
      from { transform: translateX(-25%); }
      to { transform: translateX(-50%); }
    }

    .logo-strip img {
      height: 100%;
      width: 0;
      min-width: 0;
      flex: 1 1 0;
      object-fit: fill;
      pointer-events: none;
    }

    .logo-strip--blur {
      filter: blur(18px);
    }

    .logo-strip--sharp img {
      -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 17%, #000 83%, transparent 100%);
      mask-image: linear-gradient(90deg, transparent 0%, #000 17%, #000 83%, transparent 100%);
    }

    .el-logo {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: var(--logo-height, 64px);
      max-width: 22%;
      object-fit: contain;
      filter: drop-shadow(0 0.4vh 1.2vh rgba(0, 0, 0, 0.45));
      pointer-events: none;
    }

    .el-logo.pos-left {
      left: clamp(10px, 1.6vw, 24px);
    }

    .el-logo.pos-right {
      right: clamp(10px, 1.6vw, 24px);
    }

    .el-logo[hidden] {
      display: none;
    }

    .box-title.has-logo.pos-left {
      padding-left: calc(var(--logo-height, 64px) + clamp(20px, 3.4vw, 44px));
    }

    .box-title.has-logo.pos-right {
      padding-right: calc(var(--logo-height, 64px) + clamp(20px, 3.4vw, 44px));
    }

    .box-title.has-logo.pos-right .set-meta {
      right: calc(var(--logo-height, 64px) + clamp(20px, 3.4vw, 44px));
    }

    .el-team-logo {
      height: var(--team-logo-height, 64px);
      /* Логотип не должен растягивать плашку с названием: иначе внутри
         остаётся пустое место сверху и снизу от текста. */
      max-height: min(30vh, calc(var(--name-font, 52px) * var(--name-scale, 1) * 0.8));
      max-width: 20%;
      flex: 0 0 auto;
      object-fit: contain;
      filter: drop-shadow(0 0.3vh 0.9vh rgba(0, 0, 0, 0.45));
    }

    .el-team-logo[hidden] {
      display: none;
    }

    .set-meta {
      display: none;
      position: absolute;
      right: clamp(10px, 2vw, 24px);
      top: 50%;
      transform: translateY(-50%);
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: clamp(9px, 1vw, 15px);
      opacity: 0.85;
      white-space: nowrap;
      text-shadow: var(--label-shadow);
    }

    .winner-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 2px 12px;
      background: rgba(0, 0, 0, 0.32);
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: clamp(10px, 1.2vw, 18px);
      white-space: nowrap;
    }

    .winner-badge[hidden] {
      display: none;
    }

    .box-arena-identity {
      display: flex;
      align-items: center;
      min-width: 0;
    }

    .box-arena-identity-home {
      grid-area: homeIdentity;
      justify-content: flex-start;
    }

    .box-arena-identity-away {
      grid-area: awayIdentity;
      justify-content: flex-end;
    }

    .box-arena-name {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(6px, 1vw, 14px);
      width: 100%;
      min-width: 0;
      max-width: 100%;
      padding: calc(clamp(4px, 0.7vw, 9px) * var(--panel-scale, 1)) calc(clamp(10px, 1.6vw, 26px) * var(--panel-scale, 1));
      box-shadow: var(--top-glow), var(--inner-shadow);
    }

    .box-arena-identity-home .box-arena-name {
      background-color: var(--home-bg);
      background-image:
        linear-gradient(rgba(0, 0, 0, var(--home-image-dim, 0)), rgba(0, 0, 0, var(--home-image-dim, 0))),
        var(--home-image, none);
      background-size: auto, cover;
      background-position: center;
      background-repeat: no-repeat;
      color: var(--home-fg);
    }

    .box-arena-identity-away .box-arena-name {
      background-color: var(--away-bg);
      background-image:
        linear-gradient(rgba(0, 0, 0, var(--away-image-dim, 0)), rgba(0, 0, 0, var(--away-image-dim, 0))),
        var(--away-image, none);
      background-size: auto, cover;
      background-position: center;
      background-repeat: no-repeat;
      color: var(--away-fg);
    }

    .el-serve {
      display: block;
      width: clamp(20px, 2.6vw, 38px);
      height: clamp(20px, 2.6vw, 38px);
      flex: 0 0 auto;
      opacity: 0;
      transform: scale(0.7);
      transition: opacity 0.2s, transform 0.2s, filter 0.2s;
      cursor: pointer;
    }

    .el-serve.on {
      opacity: 1;
      transform: scale(1);
      filter: drop-shadow(0 0 6px currentColor);
    }

    .el-serve svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Симметричный отступ справа: имя команды остаётся по центру плашки,
       даже когда иконка подачи слева скрыта. */
    .box-arena-name::after {
      content: '';
      flex: 0 0 auto;
      width: clamp(20px, 2.6vw, 38px);
    }

    .el-arena-name {
      font-weight: 900;
      font-size: calc(var(--name-font) * var(--name-scale, 1) * var(--name-fit, 1));
      line-height: 1;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: var(--name-shadow);
    }

    .box-arena-score {
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: start;
      /* Крупная цифра может выходить за строчку — держим её внутри плашки. */
      overflow: hidden;
      padding: calc(clamp(8px, 1.2vw, 16px) * var(--panel-scale, 1)) calc(clamp(16px, 3.6vw, 52px) * var(--panel-scale, 1));
      box-shadow: var(--top-glow), var(--inner-shadow);
      cursor: pointer;
      user-select: none;
    }

    .box-arena-score-home {
      grid-area: homeScore;
      background-image:
        linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 38%, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0.24) 100%),
        linear-gradient(rgba(0, 0, 0, var(--home-image-dim, 0)), rgba(0, 0, 0, var(--home-image-dim, 0))),
        var(--home-image, none);
      background-size: auto, auto, cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--home-bg);
      color: var(--home-fg);
    }

    .box-arena-score-away {
      grid-area: awayScore;
      background-image:
        linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 38%, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0.24) 100%),
        linear-gradient(rgba(0, 0, 0, var(--away-image-dim, 0)), rgba(0, 0, 0, var(--away-image-dim, 0))),
        var(--away-image, none);
      background-size: auto, auto, cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: var(--away-bg);
      color: var(--away-fg);
    }

    .el-arena-score {
      font-weight: 900;
      font-size: calc(var(--score-font) * var(--score-scale, 1) * var(--score-fit, 1));
      /* Высота строки равна настоящей высоте цифры — плашка не оставляет пустых полей. */
      line-height: var(--score-line, 0.82);
      text-shadow: var(--digit-shadow);
      /* Сдвиг из fitScoreText(): цифра становится по настоящему «чернильному» контуру. */
      transform: translate(var(--fit-dx, 0px), var(--fit-dy, 0px));
    }

    .el-arena-score.bump {
      animation: bump 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2);
    }

    @keyframes bump {
      0% { transform: translate(var(--fit-dx, 0px), var(--fit-dy, 0px)) scale(1); }
      35% { transform: translate(var(--fit-dx, 0px), var(--fit-dy, 0px)) scale(1.09); }
      100% { transform: translate(var(--fit-dx, 0px), var(--fit-dy, 0px)) scale(1); }
    }

    .box-arena-center {
      display: contents;
    }

    /* Вариант второго табло (?stats=block): обе статистики — строками в блоке. */
    body.stats-block .mid-pair {
      flex-direction: row;
      align-items: baseline;
      justify-content: center;
      gap: clamp(5px, 0.65vw, 11px);
    }

    .box-arena-heading {
      grid-area: heading;
      align-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-width: 0;
    }

    .box-arena-heading .mid-pair {
      width: 100%;
    }

    .box-arena-mid {
      grid-area: mid;
      align-self: start;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: var(--mid-row-gap);
      width: 100%;
      min-width: 0;
      max-height: 100%;
      overflow: hidden;
      padding: calc(clamp(4px, 0.55vw, 9px) * var(--panel-scale, 1) * var(--mid-fit, 1)) 0;
      border-radius: clamp(8px, 1.2vw, 16px);
      background: var(--panel);
      box-shadow: var(--top-glow), var(--inner-shadow);
    }

    .mid-stats {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: var(--mid-row-gap);
      width: 100%;
      min-width: 0;
    }

    .mid-pair {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: center;
      gap: clamp(8px, 1vw, 18px);
      width: 100%;
      min-width: 0;
      padding: calc(clamp(6px, 0.9vw, 14px) * var(--panel-scale, 1)) calc(var(--mid-row-pad-x) * var(--panel-scale, 1));
      text-align: center;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.16)), var(--panel);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--mid-row-radius);
      box-shadow: var(--top-glow), var(--inner-shadow), 0 0.25vh 1.2vh rgba(0, 0, 0, 0.3);
    }

    .mid-label {
      display: inline-flex;
      align-items: center;
      gap: 0.55em;
      font-size: calc(clamp(17px, 1.65vw, 30px) * var(--mid-scale, 1) * var(--mid-fit, 1));
      font-weight: 800;
      line-height: 1;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 0.12vh 0.5vh rgba(0, 0, 0, 0.65), 0 0 1.4vh rgba(255, 255, 255, 0.2);
    }

    .mid-label::before,
    .mid-label::after {
      content: "";
      width: 2px;
      height: 0.9em;
      flex: 0 0 auto;
      background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.65), transparent);
    }

    .mid-value {
      display: inline-flex;
      align-items: baseline;
      justify-content: center;
      min-width: 1ch;
      margin-left: 0;
      font-weight: 900;
      font-size: calc(clamp(38px, 3.6vw, 64px) * var(--mid-scale, 1) * var(--mid-fit, 1));
      line-height: 1;
      letter-spacing: -0.02em;
      white-space: nowrap;
      text-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.7), 0 0 2.2vh rgba(255, 255, 255, 0.3);
    }

    .mid-sep {
      opacity: 0.5;
      margin: 0 0.1em;
    }

    .mid-to {
      padding: 0 0.08em;
      cursor: pointer;
    }

    .mid-to:hover {
      background: rgba(0, 0, 0, 0.35);
    }

    .box-arena-mid.hide-timeouts .mid-timeouts {
      display: none;
    }

    .box-arena-mid .box-arena-sets {
      flex: 0 0 auto;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      /* Плотнее между строками — больше места под сами цифры истории партий. */
      gap: calc(var(--mid-row-gap) * 0.65);
      padding: 0;
      overflow: hidden;
    }

    .box-arena-mid .box-arena-set {
      flex: 0 0 auto;
      width: 100%;
      min-width: 0;
      gap: clamp(3px, 0.4vw, 7px);
      /* История партий остаётся компактнее крупного счёта и нижней панели:
         исходный шрифт уменьшен, но он по-прежнему масштабируется setScale. */
      line-height: 1;
      padding: var(--mid-row-pad-y) var(--mid-row-pad-x);
      font-size: calc(clamp(20px, 1.9vw, 32px) * var(--set-scale, 1) * var(--mid-fit, 1));
      border-radius: var(--mid-row-radius);
    }

    .box-arena-mid .box-arena-set.current {
      background: var(--panel);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.32), var(--top-glow), var(--inner-shadow);
    }

    .box-arena-counters {
      display: flex;
      align-items: flex-start;
      gap: clamp(8px, 1.4vw, 18px);
    }

    .box-arena-counters-home {
      justify-content: flex-start;
    }

    .box-arena-counters-away {
      justify-content: flex-end;
    }

    .box-arena-counters.hide-timeouts .counter-timeouts {
      display: none;
    }

    .box-arena-counter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(3px, 0.5vw, 7px);
      min-width: clamp(46px, 6vw, 80px);
    }

    .el-arena-counter-value {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: clamp(34px, 4.4vw, 56px);
      padding: clamp(3px, 0.5vw, 7px) clamp(6px, 0.8vw, 12px);
      background: var(--panel);
      font-weight: 900;
      font-size: var(--counter-font);
      line-height: 0.9;
      box-shadow: var(--top-glow), var(--inner-shadow);
      text-shadow: var(--digit-shadow);
    }

    .counter-timeouts .el-arena-counter-value {
      font-size: var(--counter-timeout-font);
      cursor: pointer;
    }

    .counter-timeouts .el-arena-counter-value:hover {
      background: rgba(0, 0, 0, 0.5);
    }

    .el-arena-counter-label {
      text-align: center;
      text-transform: uppercase;
      font-weight: 600;
      font-size: var(--counter-label-font);
      line-height: 1.02;
      letter-spacing: 0.12em;
      text-shadow: var(--label-shadow);
      white-space: nowrap;
    }

    .box-arena-sets {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      align-items: stretch;
      justify-content: center;
      gap: clamp(6px, 1vw, 14px);
      flex-wrap: nowrap;
      overflow-x: auto;
      padding: clamp(2px, 0.6vw, 6px) 0;
    }

    .box-arena-set {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(6px, 0.9vw, 12px);
      flex: 0 0 auto;
      min-width: clamp(88px, 10.5vw, 158px);
      padding: clamp(5px, 0.8vw, 10px) clamp(14px, 2.4vw, 30px);
      background: var(--panel);
      font-size: calc(var(--set-font) * var(--set-scale, 1));
      font-weight: 600;
      box-shadow: var(--top-glow), var(--inner-shadow);
    }

    .box-arena-set.current {
      background: var(--panel-current);
    }

    .box-arena-set.unplayed {
      opacity: 1;
    }

    .box-arena-set.unplayed .el-arena-set-score,
    .box-arena-set.unplayed .el-arena-set-sep,
    .box-arena-set.unplayed .el-arena-set-empty {
      opacity: 0.4;
    }

    .box-arena-set:not(.current):not(.unplayed) .el-arena-set-score,
    .box-arena-set:not(.current):not(.unplayed) .el-arena-set-sep {
      opacity: 0.72;
    }

    .el-arena-set-score.winner {
      font-weight: 900;
    }

    .el-arena-set-sep {
      opacity: 0.6;
    }

    /* ---------- Нижняя панель управления ---------- */
    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(5px, 0.8vw, 10px);
      flex-wrap: wrap;
      padding-top: 2px;
    }

    body.display .controls,
    body.display .topbar {
      display: none;
    }

    .ctrl {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: clamp(5px, 0.7vw, 9px) clamp(10px, 1.5vw, 18px);
      background: var(--chrome);
      border: 1px solid var(--chrome-border);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-size: clamp(8px, 0.75vw, 12px);
      white-space: nowrap;
      text-shadow: var(--label-shadow);
      transition: background 0.15s, opacity 0.15s;
    }

    .ctrl:hover {
      background: rgba(0, 0, 0, 0.42);
    }

    .ctrl:active {
      transform: translateY(1px);
    }

    .ctrl.accent {
      background: rgba(0, 0, 0, 0.46);
    }

    .ctrl:disabled {
      opacity: 0.35;
      cursor: default;
    }

    .ctrl-sep {
      width: 1px;
      height: 22px;
      background: rgba(255, 255, 255, 0.18);
      margin: 0 2px;
    }

    .toast {
      position: fixed;
      left: 50%;
      bottom: 96px;
      transform: translate(-50%, 14px);
      padding: 10px 18px;
      border-radius: 999px;
      background: rgba(8, 12, 22, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.18);
      font-size: 13px;
      letter-spacing: 0.06em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
      z-index: 100;
    }

    .toast.show {
      opacity: 1;
      transform: translate(-50%, 0);
    }

    /* ---------- Настройки ---------- */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 90;
      display: grid;
      place-items: center;
      padding: 20px;
      background: rgba(4, 7, 15, 0.74);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
    }

    .overlay[hidden] {
      display: none;
    }

    .modal {
      width: min(720px, 100%);
      max-height: 92dvh;
      overflow: auto;
      padding: clamp(18px, 3vw, 32px);
      background: #151b2b;
      border: 1px solid rgba(255, 255, 255, 0.14);
      box-shadow: 0 30px 100px -20px rgba(0, 0, 0, 0.9);
      color: #eef3ff;
      font-family: "Segoe UI", system-ui, sans-serif;
    }

    .modal h2 {
      margin: 0 0 16px;
      font-size: 22px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      text-align: center;
      font-weight: 700;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 14px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .field.full {
      grid-column: 1 / -1;
    }

    .field > label {
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #8ea0c4;
    }

    .field input[type="text"],
    .field input[type="number"],
    .field select {
      width: 100%;
      padding: 9px 11px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #eef3ff;
      font: inherit;
      font-size: 14px;
      outline: none;
    }

    .field input:focus,
    .field select:focus {
      border-color: rgba(255, 255, 255, 0.38);
    }

    .field select option {
      background: #151b2b;
    }

    .font-preview {
      margin-top: 8px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.07);
      font-size: 18px;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #eef3ff;
    }

    .checks {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 20px;
      grid-column: 1 / -1;
      padding: 4px 0;
    }

    .check {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #dfe7fb;
      cursor: pointer;
    }

    .check input {
      width: 16px;
      height: 16px;
      accent-color: #ffb63b;
    }

    .field > label.check {
      flex-direction: row;
      margin-top: 2px;
      font-size: 13px;
      letter-spacing: 0;
      text-transform: none;
      color: #dfe7fb;
    }

    .modal-note {
      grid-column: 1 / -1;
      margin: 4px 0 0;
      font-size: 11px;
      line-height: 1.55;
      color: #8492b4;
      font-family: inherit;
    }

    .modal-note code {
      color: #cfe0ff;
      background: rgba(255, 255, 255, 0.07);
      padding: 1px 5px;
    }

    .modal-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 18px;
    }

    .btn {
      padding: 10px 20px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.06);
      color: #eef3ff;
      font: inherit;
      font-size: 13px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .btn.primary {
      background: #ffb63b;
      border-color: #ffb63b;
      color: #16110a;
      font-weight: 700;
    }

    .btn.small {
      padding: 6px 12px;
      font-size: 11px;
    }

    .btn.small.on {
      background: #ffb63b;
      border-color: #ffb63b;
      color: #16110a;
      font-weight: 700;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
      gap: 8px;
    }

    .color-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 10px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #8ea0c4;
    }

    .color-item input[type="color"] {
      width: 100%;
      height: 34px;
      padding: 2px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.14);
      cursor: pointer;
    }

    .scale-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px 14px;
    }

    .scale-item {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 7px 10px;
      padding: 8px 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .scale-item > span {
      font-size: 10px;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: #8ea0c4;
    }

    .scale-item output {
      font-size: 12px;
      font-weight: 700;
      color: #ffd28a;
      font-variant-numeric: tabular-nums;
    }

    .scale-item input[type="range"] {
      grid-column: 1 / -1;
      width: 100%;
      margin: 0;
      accent-color: #ffb63b;
      cursor: pointer;
    }

    .scale-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 7px;
    }

    .scale-head > label {
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #8ea0c4;
    }

    .logo-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .logo-row input[type="file"] {
      max-width: 100%;
      font-size: 12px;
      color: #c7d2ea;
    }

    .logo-preview {
      width: 72px;
      height: 40px;
      display: grid;
      place-items: center;
      background: rgba(255, 255, 255, 0.06);
      border: 1px dashed rgba(255, 255, 255, 0.18);
    }

    .logo-preview img {
      display: none;
      max-width: 100%;
      max-height: 100%;
    }

    .logo-preview img.on {
      display: block;
    }

    .logo-preview.wide {
      width: 132px;
      height: 74px;
    }

    .team-logo-grid {
      display: grid;
      gap: 10px;
    }

    .team-logo-head {
      margin-bottom: 5px;
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #8ea0c4;
    }

    .title-logo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
    }

    .title-logo-grid .logo-row {
      gap: 6px;
    }

    .title-logo-grid .logo-preview {
      width: 56px;
      height: 32px;
    }

    /* ---------- Варианты табло ---------- */
    body[data-layout="classic"] .box-title,
    body[data-layout="classic"] .box-arena-name,
    body[data-layout="classic"] .box-arena-score,
    body[data-layout="classic"] .box-arena-counter,
    body[data-layout="classic"] .box-arena-set {
      border-radius: clamp(10px, 1.4vw, 20px);
    }

    body[data-layout="classic"] .box-arena-name {
      justify-content: center;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    body[data-layout="classic"] .box-arena-score {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border: 2px solid rgba(255, 255, 255, 0.14);
      border-top: 0;
    }

    body[data-layout="classic"] .box-arena-counter {
      padding: 6px;
      background: rgba(255, 255, 255, 0.07);
    }

    body[data-layout="classic"] .box-arena-set {
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    body[data-layout="broadcast"] .arena {
      grid-template-columns: minmax(0, 0.8fr) minmax(90px, 0.5fr) clamp(190px, 21vw, 330px) minmax(90px, 0.5fr) minmax(0, 0.8fr);
      grid-template-rows: auto minmax(0, 1fr);
      grid-template-areas:
        "title title title title title"
        "homeIdentity homeScore mid awayScore awayIdentity";
      gap: clamp(6px, 0.9vw, 14px);
    }

    body[data-layout="broadcast"] .box-arena-center,
    body[data-layout="scorebug"] .box-arena-center {
      grid-area: mid;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      gap: var(--mid-row-gap);
      min-width: 0;
      min-height: 0;
      width: 100%;
    }

    body[data-layout="broadcast"] .box-arena-identity-home {
      justify-content: flex-end;
    }

    body[data-layout="broadcast"] .box-arena-identity-away {
      justify-content: flex-start;
    }

    body[data-layout="broadcast"] .box-arena-name {
      padding: clamp(4px, 0.6vw, 8px) clamp(8px, 1.5vw, 22px);
    }

    body[data-layout="broadcast"] .el-arena-name {
      font-size: calc(clamp(16px, 1.9vw, 34px) * var(--name-scale, 1) * var(--name-fit, 1));
    }

    body[data-layout="broadcast"] .box-arena-score {
      padding: clamp(6px, 1vw, 12px) clamp(8px, 1.2vw, 18px);
    }

    body[data-layout="broadcast"] .el-arena-score {
      font-size: calc(clamp(64px, 9.5vw, 160px) * var(--score-scale, 1) * var(--score-fit, 1));
    }

    body[data-layout="broadcast"] .box-arena-counters {
      justify-content: center;
    }

    body[data-layout="duel"] .arena {
      grid-template-columns: minmax(0, 1fr) clamp(210px, 24vw, 380px) minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto auto;
      grid-template-areas:
        "title title title"
        ". . ."
        "homeIdentity heading awayIdentity"
        "homeScore mid awayScore";
      column-gap: clamp(10px, 1.6vw, 24px);
    }

    body[data-layout="duel"] .box-arena-identity-home,
    body[data-layout="duel"] .box-arena-identity-away {
      justify-content: center;
    }

    body[data-layout="duel"] .box-arena-name {
      width: 100%;
      justify-content: center;
      border-radius: clamp(14px, 2vw, 28px) clamp(14px, 2vw, 28px) 0 0;
    }

    body[data-layout="duel"] .box-arena-score {
      border-radius: 0 0 clamp(14px, 2vw, 28px) clamp(14px, 2vw, 28px);
    }

    body[data-layout="minimal"] .arena {
      grid-template-areas:
        "title title title"
        ". . ."
        "homeIdentity heading awayIdentity"
        "homeScore mid awayScore";
    }

    body[data-layout="minimal"] .box-title {
      background: transparent;
      box-shadow: none;
    }

    body[data-layout="minimal"] .el-title {
      font-weight: 400;
      letter-spacing: 0.26em;
    }

    body[data-layout="minimal"] .box-arena-name {
      background-color: transparent !important;
      background-image: none !important;
      box-shadow: none;
      border-bottom: 2px solid currentColor;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: clamp(2px, 0.5vw, 6px);
    }

    body[data-layout="minimal"] .box-arena-score {
      background-color: transparent !important;
      background-image: none !important;
      box-shadow: none;
    }

    body[data-layout="minimal"] .box-arena-counter {
      padding: 4px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 10px;
    }

    body[data-layout="minimal"] .el-arena-counter-value {
      background: transparent;
      box-shadow: none;
      min-height: auto;
    }

    body[data-layout="minimal"] .box-arena-mid {
      background: transparent;
      box-shadow: none;
      border: 0;
    }

    body[data-layout="minimal"] .mid-pair {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      box-shadow: none;
    }

    body[data-layout="minimal"] .box-arena-set {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      box-shadow: none;
    }

    body[data-layout="minimal"] .box-arena-set.current {
      border-color: rgba(255, 255, 255, 0.45);
    }

    body[data-layout="minimal"] .box-arena-mid .box-arena-set.current {
      background: transparent;
      box-shadow: none;
      border-color: rgba(255, 255, 255, 0.45);
    }

    body[data-layout="glass"] .arena {
      gap: clamp(6px, 1vw, 12px);
    }

    body[data-layout="glass"] .box-title,
    body[data-layout="glass"] .box-arena-name,
    body[data-layout="glass"] .box-arena-score,
    body[data-layout="glass"] .box-arena-counter,
    body[data-layout="glass"] .box-arena-set {
      border-radius: clamp(14px, 2vw, 28px);
      border: 1px solid rgba(255, 255, 255, 0.24);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 18px 40px -22px rgba(0, 0, 0, 0.9);
      -webkit-backdrop-filter: blur(14px) saturate(1.2);
      backdrop-filter: blur(14px) saturate(1.2);
    }

    body[data-layout="glass"] .box-title {
      background-color: rgba(255, 255, 255, 0.1);
    }

    body[data-layout="glass"] .box-arena-identity-home .box-arena-name {
      background-color: color-mix(in srgb, var(--home-bg) 58%, transparent);
      overflow: hidden;
    }

    body[data-layout="glass"] .box-arena-identity-away .box-arena-name {
      background-color: color-mix(in srgb, var(--away-bg) 58%, transparent);
      overflow: hidden;
    }

    body[data-layout="glass"] .box-arena-score-home {
      background-color: color-mix(in srgb, var(--home-bg) 48%, transparent);
      overflow: hidden;
    }

    body[data-layout="glass"] .box-arena-score-away {
      background-color: color-mix(in srgb, var(--away-bg) 48%, transparent);
      overflow: hidden;
    }

    body[data-layout="glass"] .box-arena-counter {
      padding: clamp(4px, 0.6vw, 8px);
      background-color: rgba(255, 255, 255, 0.08);
    }

    body[data-layout="glass"] .box-arena-counter .el-arena-counter-value {
      background: transparent;
      box-shadow: none;
    }

    body[data-layout="glass"] .box-arena-mid {
      border-radius: clamp(14px, 2vw, 28px);
      border: 0;
      background-color: rgba(255, 255, 255, 0.08);
      box-shadow: none;
      -webkit-backdrop-filter: blur(14px) saturate(1.2);
      backdrop-filter: blur(14px) saturate(1.2);
    }

    body[data-layout="glass"] .box-arena-set {
      background-color: rgba(255, 255, 255, 0.08);
    }

    body[data-layout="glass"] .mid-pair {
      border-radius: clamp(14px, 2vw, 28px);
      border: 1px solid rgba(255, 255, 255, 0.24);
      background-color: rgba(255, 255, 255, 0.08);
    }

    body[data-layout="glass"] .box-arena-set.current {
      background-color: rgba(255, 255, 255, 0.17);
    }

    body[data-layout="glass"] .box-arena-mid .box-arena-set.current {
      background-color: rgba(255, 255, 255, 0.08);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45), var(--top-glow), var(--inner-shadow);
    }

    body[data-layout="scorebug"] .arena {
      grid-template-columns: minmax(0, 0.8fr) minmax(90px, 0.5fr) clamp(180px, 20vw, 310px) minmax(90px, 0.5fr) minmax(0, 0.8fr);
      grid-template-rows: auto auto;
      grid-template-areas:
        "title title title title title"
        "homeIdentity homeScore mid awayScore awayIdentity";
      align-content: center;
      gap: clamp(4px, 0.8vw, 10px);
      padding: clamp(8px, 1.4vw, 18px);
    }

    body[data-layout="scorebug"] .box-title {
      padding: 0;
    }

    body[data-layout="scorebug"] .el-title {
      font-size: calc(clamp(26px, 4.2vw, 64px) * var(--title-scale, 1) * var(--title-fit, 1));
      letter-spacing: 0.22em;
    }

    body[data-layout="scorebug"] .set-meta {
      display: none;
    }

    body[data-layout="scorebug"] .box-arena-identity-home {
      justify-content: flex-end;
    }

    body[data-layout="scorebug"] .box-arena-identity-away {
      justify-content: flex-start;
    }

    body[data-layout="scorebug"] .box-arena-name {
      padding: clamp(3px, 0.5vw, 6px) clamp(8px, 1.4vw, 18px);
    }

    body[data-layout="scorebug"] .el-arena-name {
      font-size: calc(clamp(16px, 2vw, 34px) * var(--name-scale, 1) * var(--name-fit, 1));
    }

    body[data-layout="scorebug"] .box-arena-score {
      padding: clamp(2px, 0.5vw, 6px) clamp(10px, 2vw, 24px);
    }

    body[data-layout="scorebug"] .el-arena-score {
      font-size: calc(clamp(44px, 6vw, 100px) * var(--score-scale, 1) * var(--score-fit, 1));
      line-height: 0.9;
    }

    body[data-layout="scorebug"] .box-arena-counters {
      align-items: center;
    }

    body[data-layout="scorebug"] .box-arena-counters-home {
      justify-content: flex-start;
    }

    body[data-layout="scorebug"] .box-arena-counters-away {
      justify-content: flex-end;
    }

    body[data-layout="scorebug"] .box-arena-sets {
      gap: var(--mid-row-gap, clamp(3px, 0.5vw, 8px));
      padding: 0;
    }

    body[data-layout="scorebug"] .box-arena-set {
      min-width: 0;
      padding: clamp(2px, 0.4vw, 5px) clamp(8px, 1.2vw, 16px);
      font-size: calc(clamp(14px, 1.6vw, 26px) * var(--set-scale, 1));
    }

    body[data-layout="scorebug"] .box-arena-mid .box-arena-set {
      padding: calc(2px * var(--panel-scale, 1) * var(--mid-fit, 1)) calc(4px * var(--panel-scale, 1) * var(--mid-fit, 1));
      gap: 2px;
      font-size: calc(clamp(15px, 1.4vw, 22px) * var(--set-scale, 1) * var(--mid-fit, 1));
    }

    @media (max-width: 1180px) {
      .set-meta {
        display: none;
      }
    }

    @media (max-width: 920px) {
      .arena {
        --name-font: clamp(22px, 9vw, 58px);
        --score-font: clamp(72px, 19vw, 150px);
      }

      .box-arena-score {
        padding-left: clamp(12px, 3vw, 30px);
        padding-right: clamp(12px, 3vw, 30px);
      }

      .topbar {
        grid-template-columns: auto 1fr auto;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .scale-grid {
        grid-template-columns: 1fr;
      }

      .field.full,
      .checks,
      .modal-note {
        grid-column: auto;
      }
    }

    @media (max-height: 700px) {
      .arena {
        padding: clamp(10px, 1.6vw, 20px) clamp(10px, 1.6vw, 20px) 0;
        column-gap: clamp(5px, 0.9vw, 10px);
        row-gap: 0;
      }

      .controls {
        gap: 4px;
      }

      .ctrl {
        padding-top: 4px;
        padding-bottom: 4px;
      }
    }

    /* ---------- Отдельное табло в стиле KeepTheScore (?style=kts) ---------- */
    body.style-kts {
      --bg: #16315e;
      --title-bg: #16315e;
      --text: #ffffff;
      --font-family: "Bebas Neue", "Oswald", Roboto, system-ui, sans-serif;
    }

    body.style-kts .arena {
      --name-font: clamp(30px, 6.4vw, 112px);
      --score-font: clamp(150px, 24vw, 440px);
      --arena-gap: clamp(6px, 1vw, 18px);
      grid-template-columns: minmax(0, 1fr) clamp(44px, 5.2vw, 92px) minmax(0, 1fr);
      grid-template-rows: auto auto minmax(0, 1fr) auto;
      grid-template-areas:
        "title title title"
        "homeIdentity . awayIdentity"
        "homeScore . awayScore"
        "bottom bottom bottom";
      column-gap: var(--arena-gap);
      row-gap: 0;
      padding: clamp(10px, 1.5vw, 26px) clamp(10px, 1.5vw, 26px) 0;
    }

    /* Нижняя полоса: SETS WON / TIME OUTS и партии в один ряд во всю ширину */
    body.style-kts .box-bottom-bar {
      grid-area: bottom;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: clamp(6px, 1vw, 16px);
      min-width: 0;
      /* Подрезаем 2–3 px типографского переполнения цифр у самого края экрана. */
      overflow: hidden;
    }

    body.style-kts .box-title {
      min-height: 0;
      padding: 0;
      background: var(--title-bg);
      border-radius: 0;
      box-shadow: 0 clamp(1px, 0.14vw, 3px) 0 rgba(255, 255, 255, 0.14);
    }

    body.style-kts .el-title {
      font-size: calc(clamp(52px, 11vw, 220px) * var(--title-scale, 1) * var(--title-fit, 1));
      font-weight: 400;
      line-height: var(--title-line, 1.1);
      letter-spacing: 0.03em;
      text-shadow: none;
    }

    body.style-kts .set-meta,
    body.style-kts .winner-badge {
      display: none;
    }

    body.style-kts .box-arena-identity-home {
      justify-content: flex-end;
    }

    body.style-kts .box-arena-identity-away {
      justify-content: flex-start;
    }

    body.style-kts .box-arena-name {
      background: transparent !important;
      background-image: none !important;
      color: var(--text) !important;
      padding: 0;
      border-radius: 0;
      box-shadow: 0 clamp(1px, 0.14vw, 3px) 0 rgba(255, 255, 255, 0.22);
    }

    body.style-kts .el-arena-name {
      text-shadow: none;
    }

    body.style-kts .box-arena-score {
      background-image: none !important;
      align-self: stretch;
      padding: 0 clamp(10px, 2vw, 36px);
      border-radius: 0;
      box-shadow: 0 clamp(1px, 0.14vw, 3px) 0 rgba(255, 255, 255, 0.22);
    }

    body.style-kts .box-arena-score-home {
      background-color: var(--home-bg) !important;
      color: var(--home-fg) !important;
    }

    body.style-kts .box-arena-score-away {
      background-color: var(--away-bg) !important;
      color: var(--away-fg) !important;
    }

    body.style-kts .el-arena-score {
      text-shadow: none;
      line-height: var(--score-line, 1);
    }

    body.style-kts .box-arena-center {
      display: contents;
    }

    body.style-kts .box-arena-heading,
    body.style-kts .box-arena-mid .mid-stats {
      display: none;
    }

    body.style-kts .box-arena-mid {
      display: contents;
    }

    /* Счётчики SETS WON / TIME OUTS используются только в стиле KeepTheScore */
    .box-arena-counters {
      display: none;
    }

    body.style-kts .box-arena-counters {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: flex-start;
      gap: clamp(6px, 0.9vw, 14px);
    }

    body.style-kts .box-arena-counters-away {
      justify-content: flex-end;
      flex-direction: row-reverse;
    }

    body.style-kts .box-arena-counter {
      min-width: clamp(52px, 5.2vw, 88px);
      gap: 0;
    }

    body.style-kts .el-arena-counter-value {
      width: auto;
      min-width: clamp(36px, 4.5vw, 72px);
      min-height: 0;
      padding: 0 clamp(5px, 0.6vw, 12px);
      background: rgba(0, 0, 0, 0.35);
      box-shadow: 0 clamp(1px, 0.2vw, 4px) clamp(2px, 0.4vw, 7px) rgba(0, 0, 0, 0.45);
      font-size: calc(clamp(30px, 5vw, 76px) * var(--mid-scale, 1));
      line-height: 1.1;
      text-shadow: none;
    }

    body.style-kts .counter-timeouts .el-arena-counter-value {
      font-size: calc(clamp(30px, 5vw, 76px) * var(--mid-scale, 1));
    }

    body.style-kts .el-arena-counter-label {
      font-size: calc(clamp(12px, 1.8vw, 28px) * var(--mid-scale, 1));
      line-height: 1;
      letter-spacing: 0.04em;
      text-shadow: none;
    }

    body.style-kts .box-arena-sets {
      flex: 1 1 auto;
      min-width: 0;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      padding: 0;
      gap: clamp(6px, 1vw, 16px);
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      overflow: hidden;
    }

    body.style-kts .box-arena-set {
      flex: 1 1 0;
      min-width: 0;
      min-height: clamp(48px, 7.5vw, 116px);
      padding: 0 clamp(4px, 0.6vw, 12px);
      gap: clamp(2px, 0.4vw, 8px);
      background: rgba(0, 0, 0, 0.35);
      border-radius: 0;
      box-shadow: 0 clamp(1px, 0.2vw, 4px) clamp(2px, 0.4vw, 7px) rgba(0, 0, 0, 0.45);
      font-size: calc(clamp(24px, 4.2vw, 66px) * var(--set-scale, 1));
      font-weight: 600;
    }

    body.style-kts .el-arena-set-score.winner {
      font-weight: 900;
    }

    body.style-kts .box-arena-set.current {
      border: 0;
      background: rgba(0, 0, 0, 0.35);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 clamp(1px, 0.2vw, 4px) clamp(2px, 0.4vw, 7px) rgba(0, 0, 0, 0.45);
    }

    body.style-kts .box-arena-set.unplayed {
      opacity: 0.72;
    }

    /* ---------- Отдельное табло для YouTube (прямой эфир) ---------- */
    body.style-youtube {
      --bg: #0f0f0f;
      --title-bg: #0f0f0f;
      --text: #ffffff;
    }

    .live-badge {
      display: none;
      align-items: center;
      gap: 0.42em;
      padding: 0.16em 0.55em;
      background: #ff0033;
      color: #ffffff;
      font-weight: 700;
      font-size: clamp(10px, 1.45vw, 26px);
      line-height: 1;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .live-badge[hidden] {
      display: none;
    }

    .live-dot {
      width: 0.52em;
      height: 0.52em;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.85);
    }

    body.style-youtube .live-badge {
      display: inline-flex;
      flex: 0 0 auto;
      animation: live-pulse 2.4s ease-in-out infinite;
    }

    @keyframes live-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.72; }
    }

    body.style-youtube .arena {
      --name-font: clamp(28px, 5.8vw, 100px);
      --score-font: clamp(150px, 24vw, 440px);
      --arena-gap: clamp(6px, 1vw, 18px);
      grid-template-columns: minmax(0, 1fr) clamp(44px, 5.2vw, 92px) minmax(0, 1fr);
      grid-template-rows: auto auto minmax(0, 1fr) auto;
      grid-template-areas:
        "title title title"
        "homeIdentity . awayIdentity"
        "homeScore . awayScore"
        "bottom bottom bottom";
      column-gap: var(--arena-gap);
      row-gap: 0;
      padding: clamp(10px, 1.5vw, 26px) clamp(10px, 1.5vw, 26px) 0;
    }

    body.style-youtube .box-bottom-bar {
      grid-area: bottom;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: clamp(6px, 1vw, 16px);
      min-width: 0;
      overflow: hidden;
    }

    body.style-youtube .box-title {
      min-height: 0;
      padding: 0;
      background: var(--title-bg);
      border-radius: 0;
      box-shadow: 0 clamp(2px, 0.3vw, 5px) 0 #ff0033;
    }

    body.style-youtube .el-title {
      font-size: calc(clamp(50px, 10.5vw, 210px) * var(--title-scale, 1) * var(--title-fit, 1));
      font-weight: 700;
      line-height: var(--title-line, 1.1);
      letter-spacing: 0.06em;
      text-shadow: none;
    }

    body.style-youtube .set-meta {
      color: var(--text);
      opacity: 0.65;
      text-shadow: none;
    }

    body.style-youtube .winner-badge {
      display: none;
    }

    body.style-youtube .box-arena-identity-home {
      justify-content: flex-end;
    }

    body.style-youtube .box-arena-identity-away {
      justify-content: flex-start;
    }

    body.style-youtube .box-arena-name {
      background: transparent !important;
      background-image: none !important;
      color: var(--text) !important;
      padding: 0;
      border-radius: 0;
      box-shadow: none;
    }

    body.style-youtube .el-team-logo {
      height: var(--youtube-logo-height, var(--team-logo-height, 64px));
      max-height: 42vh;
      max-width: 50%;
    }

    body.style-youtube .el-arena-name {
      text-shadow: none;
      font-weight: 700;
    }

    body.style-youtube .box-arena-score {
      background-image: none !important;
      align-self: stretch;
      padding: 0 clamp(10px, 2vw, 36px);
      border-radius: clamp(4px, 0.7vw, 12px);
      box-shadow: inset 0 clamp(2px, 0.36vw, 6px) 0 #ff0033;
    }

    body.style-youtube .box-arena-score-home {
      background-color: var(--home-bg) !important;
      color: var(--home-fg) !important;
    }

    body.style-youtube .box-arena-score-away {
      background-color: var(--away-bg) !important;
      color: var(--away-fg) !important;
    }

    body.style-youtube .el-arena-score {
      font-weight: 700;
      line-height: var(--score-line, 1);
      text-shadow: none;
    }

    body.style-youtube .box-arena-center {
      display: contents;
    }

    body.style-youtube .box-arena-heading,
    body.style-youtube .box-arena-mid .mid-stats {
      display: none;
    }

    body.style-youtube .box-arena-mid {
      display: contents;
    }

    body.style-youtube .box-arena-counters {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: flex-start;
      gap: clamp(6px, 0.9vw, 14px);
    }

    body.style-youtube .box-arena-counters-away {
      justify-content: flex-end;
      flex-direction: row-reverse;
    }

    body.style-youtube .box-arena-counter {
      min-width: clamp(52px, 5.2vw, 88px);
      gap: clamp(2px, 0.35vw, 6px);
    }

    body.style-youtube .el-arena-counter-value {
      width: auto;
      min-width: clamp(36px, 4.5vw, 72px);
      min-height: 0;
      padding: 0 clamp(5px, 0.6vw, 12px);
      background: color-mix(in srgb, var(--text) 14%, transparent);
      border-radius: clamp(3px, 0.5vw, 8px);
      box-shadow: none;
      font-size: calc(clamp(30px, 5vw, 76px) * var(--mid-scale, 1));
      line-height: 1.1;
      text-shadow: none;
    }

    body.style-youtube .counter-timeouts .el-arena-counter-value {
      font-size: calc(clamp(30px, 5vw, 76px) * var(--mid-scale, 1));
    }

    body.style-youtube .counter-timeouts .el-arena-counter-value:hover {
      background: color-mix(in srgb, var(--text) 26%, transparent);
    }

    body.style-youtube .el-arena-counter-label {
      font-size: calc(clamp(12px, 1.8vw, 28px) * var(--mid-scale, 1));
      line-height: 1;
      letter-spacing: 0.04em;
      opacity: 0.72;
      text-shadow: none;
    }

    body.style-youtube .box-arena-sets {
      flex: 1 1 auto;
      min-width: 0;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      padding: 0;
      gap: clamp(6px, 1vw, 16px);
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      overflow: hidden;
    }

    body.style-youtube .box-arena-set {
      flex: 1 1 0;
      min-width: 0;
      min-height: clamp(48px, 7.5vw, 116px);
      padding: 0 clamp(4px, 0.6vw, 12px);
      gap: clamp(2px, 0.4vw, 8px);
      background: color-mix(in srgb, var(--text) 14%, transparent);
      border-radius: clamp(3px, 0.5vw, 8px);
      box-shadow: none;
      font-size: calc(clamp(24px, 4.2vw, 66px) * var(--set-scale, 1));
      font-weight: 600;
    }

    body.style-youtube .el-arena-set-score.winner {
      font-weight: 900;
    }

    body.style-youtube .box-arena-set.current {
      border: 0;
      background: color-mix(in srgb, var(--text) 22%, transparent);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.32);
    }

    body.style-youtube .box-arena-set.unplayed {
      opacity: 0.55;
    }

    /* ---------- Пятое табло: YouTube «сеты» (таблица как у KeepTheScore) ---------- */
    body.style-ytsets {
      --bg: #16315e;
      --title-bg: #16315e;
      --text: #ffffff;
      --sets-finish: linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.03) 40%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.22) 100%);
      --sets-bevel: inset 0 clamp(1px, 0.12vw, 3px) 0 rgba(255, 255, 255, 0.22),
        inset 0 calc(clamp(1px, 0.12vw, 3px) * -1.7) 0 rgba(0, 0, 0, 0.35);
    }

    body.style-ytsets .arena {
      --name-font: clamp(30px, 6vw, 118px);
      grid-template-columns: minmax(0, 1fr) calc(var(--set-cols, 5) * clamp(56px, 9.6vw, 188px));
      grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) auto;
      grid-template-areas:
        "home sets"
        "away sets"
        "title title";
      gap: 0;
      padding: 0;
      border-radius: 0;
    }

    /* Команда: светлая панель во всю строку, название слева, сеты справа */
    body.style-ytsets .box-arena-identity {
      align-self: stretch;
      justify-self: stretch;
      padding: 0;
      background-image: var(--sets-finish);
      box-shadow: var(--sets-bevel);
      z-index: 0;
    }

    body.style-ytsets .box-arena-identity-home {
      grid-area: home;
      background-color: var(--home-bg);
      color: var(--home-fg);
    }

    body.style-ytsets .box-arena-identity-away {
      grid-area: away;
      background-color: var(--away-bg);
      color: var(--away-fg);
    }

    body.style-ytsets .box-arena-name {
      background: transparent !important;
      background-image: none !important;
      box-shadow: none;
      color: inherit !important;
      justify-content: flex-start;
      gap: 0;
      padding: 0 clamp(12px, 2vw, 42px);
      padding-right: clamp(58px, 9vw, 190px);
      width: 100%;
    }

    body.style-ytsets .box-arena-name::after,
    body.style-ytsets .el-serve {
      display: none;
    }

    body.style-ytsets .el-team-logo {
      height: var(--youtube-logo-height, calc(var(--team-logo-height, 64px) * 0.8));
      max-height: 42vh;
      max-width: 65%;
      margin-right: clamp(8px, 1vw, 18px);
    }

    body.style-ytsets .el-arena-name {
      font-weight: 400;
      letter-spacing: 0.01em;
      text-shadow: none;
      max-width: 100%;
    }

    /* Счётчики переехали из нижней полосы прямо в строку команды */
    body.style-ytsets .box-bottom-bar {
      display: contents;
    }

    body.style-ytsets .box-arena-counters {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0;
      align-self: stretch;
      justify-self: stretch;
      padding: 0 clamp(12px, 2vw, 42px);
      z-index: 1;
      pointer-events: none;
    }

    body.style-ytsets .box-arena-counters-home {
      grid-area: home;
    }

    body.style-ytsets .box-arena-counters-away {
      grid-area: away;
      flex-direction: row;
      justify-content: flex-end;
    }

    body.style-ytsets .counter-timeouts {
      display: none;
    }

    body.style-ytsets .counter-sets {
      min-width: 0;
      gap: 0;
    }

    body.style-ytsets .counter-sets .el-arena-counter-label {
      display: none;
    }

    body.style-ytsets .el-arena-counter-value {
      width: auto;
      min-width: 0;
      min-height: 0;
      padding: 0;
      background: transparent;
      box-shadow: none;
      font-size: calc(clamp(30px, 6vw, 118px) * var(--mid-scale, 1));
      font-weight: 900;
      line-height: 1;
      text-shadow: none;
    }

    /* Сетка сетов: каждая партия — колонка, счёт команды сверху и снизу */
    body.style-ytsets .box-arena-sets {
      grid-area: sets;
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: stretch;
      gap: 0;
      padding: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      box-shadow: none;
    }

    body.style-ytsets .box-arena-set {
      flex: 1 1 0;
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
      gap: 0;
      padding: 0;
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      font-size: calc(clamp(26px, 5vw, 104px) * var(--set-scale, 1));
      font-weight: 400;
    }

    body.style-ytsets .el-arena-set-score {
      flex: 1 1 0;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 clamp(2px, 0.4vw, 10px);
      background-color: var(--bg);
      background-image: var(--sets-finish);
      color: var(--text);
      box-shadow: var(--sets-bevel);
      line-height: 1;
    }

    body.style-ytsets .el-arena-set-sep {
      display: none;
    }

    body.style-ytsets .box-arena-set:not(.current):not(.unplayed) .el-arena-set-score {
      opacity: 0.72;
    }

    body.style-ytsets .el-arena-set-score.winner {
      font-weight: 900;
    }

    /* Несыгранная партия: два прочерка — сверху и снизу */
    body.style-ytsets .box-arena-set.unplayed .el-arena-set-empty {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      color: transparent;
      opacity: 1;
    }

    body.style-ytsets .box-arena-set.unplayed .el-arena-set-empty::before,
    body.style-ytsets .box-arena-set.unplayed .el-arena-set-empty::after {
      content: "-";
      flex: 1 1 0;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg);
      background-image: var(--sets-finish);
      box-shadow: var(--sets-bevel);
      color: color-mix(in srgb, var(--text) 38%, transparent);
    }

    body.style-ytsets .box-arena-score {
      display: none;
    }

    body.style-ytsets .box-arena-center {
      display: contents;
    }

    body.style-ytsets .box-arena-heading,
    body.style-ytsets .box-arena-mid .mid-stats {
      display: none;
    }

    body.style-ytsets .box-arena-mid {
      display: contents;
    }

    /* Заголовок — нижней полосой во всю ширину */
    body.style-ytsets .box-title {
      grid-area: title;
      min-height: 0;
      padding: 0;
      background: var(--title-bg);
      background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.18) 100%);
      border-radius: 0;
      box-shadow: inset 0 clamp(1px, 0.12vw, 3px) 0 rgba(255, 255, 255, 0.14);
    }

    body.style-ytsets .el-title {
      max-width: 100%;
      min-width: 0;
      overflow: visible;
      font-size: calc(clamp(48px, 10vw, 200px) * var(--title-scale, 1) * var(--title-fit, 1));
      font-weight: 400;
      line-height: var(--title-line, 1.1);
      letter-spacing: 0.04em;
      text-shadow: none;
    }

    body.style-ytsets .set-meta,
    body.style-ytsets .winner-badge {
      display: none;
    }

    body.style-ytsets .live-badge {
      display: inline-flex;
      position: absolute;
      right: clamp(8px, 1.6vw, 26px);
      top: 50%;
      transform: translateY(-50%);
      animation: live-pulse 2.4s ease-in-out infinite;
    }
  </style>
</head>

<body>
  <div class="bg-layer" id="bgLayer" aria-hidden="true" hidden></div>
  <div class="bg-shade" id="bgShade" aria-hidden="true" hidden></div>

  <div class="app">
    <header class="topbar">
      <div class="topbar-left">
        <button class="sync-pill offline" id="syncPill" type="button" title="Статус синхронизации — нажмите, чтобы скопировать ссылки">
          <span class="sync-dot"></span>
          <span id="syncText">офлайн</span>
        </button>
      </div>
      <div class="topbar-right">
        <button class="icon-btn" id="boardBtn" type="button" title="Открыть табло в новой вкладке (B)">📺</button>
        <button class="icon-btn" id="remoteBtn" type="button" title="Пульт для телефона — счёт и тайм-ауты">📱</button>
        <button class="icon-btn" id="soundBtn" type="button" title="Звук">🔊</button>
        <button class="icon-btn" id="settingsBtn" type="button" title="Настройки">⚙</button>
        <button class="icon-btn" id="fsBtn" type="button" title="Полный экран (F)">⛶</button>
      </div>
    </header>

    <main>
      <div class="arena-frame">
        <div class="arena" id="arena">
          <div class="box-title">
            <img class="el-logo" id="logoImg" alt="Логотип" hidden>
            <span class="winner-badge" id="winnerBadge" hidden>🏆 <span id="winnerName"></span></span>
            <span class="live-badge" id="liveBadge" hidden><span class="live-dot"></span>LIVE</span>
            <div class="title-logos" id="titleLogos" hidden></div>
            <div class="title-track" id="titleTrack">
              <div class="el-title" contenteditable spellcheck="false" id="matchTitle">ВОЛЕЙБОЛ</div>
              <div class="el-title title-echo" id="matchTitleEcho" aria-hidden="true">ВОЛЕЙБОЛ</div>
            </div>
            <div class="set-meta" id="setMeta">ПАРТИЯ 1 · ДО 25</div>
          </div>

          <div class="box-arena-identity box-arena-identity-home">
            <div class="box-arena-name">
              <span class="el-serve" id="serveA" data-team="A" title="Подача: нажмите, чтобы переключить">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3c3.4 2.9 5 5.9 5 9s-1.6 6.1-5 9" />
                  <path d="M12 3c-3.4 2.9-5 5.9-5 9s1.6 6.1 5 9" />
                  <path d="M3.4 9.2c4 1.7 7.9 1.7 11.9 0M3.4 14.8c4-1.7 7.9-1.7 11.9 0" />
                </svg>
              </span>
              <img class="el-team-logo" id="teamLogoA" alt="Логотип команды A" hidden>
              <span class="el-arena-name" contenteditable spellcheck="false" data-team="A" id="nameA">КАРА-КУЛЖА</span>
            </div>
          </div>

          <div class="box-arena-identity box-arena-identity-away">
            <div class="box-arena-name">
              <span class="el-serve" id="serveB" data-team="B" title="Подача: нажмите, чтобы переключить">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3c3.4 2.9 5 5.9 5 9s-1.6 6.1-5 9" />
                  <path d="M12 3c-3.4 2.9-5 5.9-5 9s1.6 6.1 5 9" />
                  <path d="M3.4 9.2c4 1.7 7.9 1.7 11.9 0M3.4 14.8c4-1.7 7.9-1.7 11.9 0" />
                </svg>
              </span>
              <img class="el-team-logo" id="teamLogoB" alt="Логотип команды B" hidden>
              <span class="el-arena-name" contenteditable spellcheck="false" data-team="B" id="nameB">НООКАТ</span>
            </div>
          </div>

          <div class="box-arena-center">
            <div class="box-arena-heading">
              <div class="mid-pair mid-sets-won">
                <span class="mid-value mid-value-a" id="midSetsWonA">0</span>
                <span class="mid-label">Sets Won</span>
                <span class="mid-value mid-value-b" id="midSetsWonB">0</span>
              </div>
            </div>

            <div class="box-arena-mid">
              <div class="mid-stats">
                <div class="mid-pair mid-timeouts">
                  <span class="mid-value mid-value-a mid-to" id="midToA" data-team="A" title="Тайм-аут: нажмите, чтобы потратить">2</span>
                  <span class="mid-label">Time Outs</span>
                  <span class="mid-value mid-value-b mid-to" id="midToB" data-team="B" title="Тайм-аут: нажмите, чтобы потратить">2</span>
                </div>
              </div>
              <div class="box-arena-sets" id="midSetsRow"></div>
            </div>
          </div>

          <div class="box-arena-score box-arena-score-home" id="scoreBoxA" data-team="A" title="Клик — +1, Shift+клик — −1">
            <div class="el-arena-score" id="scoreA">0</div>
          </div>
          <div class="box-arena-score box-arena-score-away" id="scoreBoxB" data-team="B" title="Клик — +1, Shift+клик — −1">
            <div class="el-arena-score" id="scoreB">0</div>
          </div>
        </div>
      </div>
    </main>

    <footer class="controls">
      <button class="ctrl" id="minusA" type="button" title="Убрать очко (Z)">−1</button>
      <button class="ctrl accent" id="plusA" type="button" title="Добавить очко (A)">+1</button>
      <button class="ctrl" id="upA" type="button">▲</button>
      <button class="ctrl" id="toAbtn" type="button" title="Тайм-аут">⏱</button>
      <span class="ctrl-sep"></span>
      <button class="ctrl" id="minusB" type="button" title="Убрать очко (M)">−1</button>
      <button class="ctrl accent" id="plusB" type="button" title="Добавить очко (K)">+1</button>
      <button class="ctrl" id="upB" type="button">▲</button>
      <button class="ctrl" id="toBbtn" type="button" title="Тайм-аут">⏱</button>
      <span class="ctrl-sep"></span>
      <button class="ctrl" id="endSet" type="button" title="Завершить текущую партию (S)">Партия</button>
      <button class="ctrl" id="resetSet" type="button" title="Сбросить очки текущей партии (R)">Сброс</button>
      <button class="ctrl" id="undo" type="button" title="Отменить (U)">↶</button>
      <span class="ctrl-sep"></span>
      <button class="ctrl" id="newMatch" type="button" title="Новый матч (N)">Новый матч</button>
    </footer>
  </div>

  <div class="toast" id="toast"></div>

  <div class="overlay" id="settingsOverlay" hidden>
    <form class="modal" id="settingsForm">
      <h2>Настройки</h2>
      <div class="form-grid">
        <div class="field full">
          <label for="fMatch">Заголовок матча</label>
          <input id="fMatch" name="match" type="text" maxlength="40" autocomplete="off">
        </div>
        <div class="field">
          <label for="fRoom">Комната синхронизации</label>
          <input id="fRoom" name="room" type="text" maxlength="40" autocomplete="off" placeholder="main">
        </div>
        <div class="field">
          <label for="fTeamA">Команда A</label>
          <input id="fTeamA" name="teamA" type="text" maxlength="30" autocomplete="off">
        </div>
        <div class="field">
          <label for="fTeamB">Команда B</label>
          <input id="fTeamB" name="teamB" type="text" maxlength="30" autocomplete="off">
        </div>
        <div class="field">
          <label for="fBestOf">Формат матча</label>
          <select id="fBestOf" name="bestOf">
            <option value="1">До 1 победы (1 партия)</option>
            <option value="3">До 2 побед (3 партии)</option>
            <option value="5">До 3 побед (5 партий)</option>
          </select>
        </div>
        <div class="field">
          <label for="fPoints">Партия до</label>
          <select id="fPoints" name="points">
            <option value="11">11 очков</option>
            <option value="15">15 очков</option>
            <option value="21">21 очко</option>
            <option value="25">25 очков</option>
          </select>
        </div>
        <div class="field">
          <label for="fDeciding">Решающая партия до</label>
          <select id="fDeciding" name="deciding">
            <option value="11">11 очков</option>
            <option value="15">15 очков</option>
            <option value="21">21 очко</option>
          </select>
        </div>
        <div class="field">
          <label for="fTheme">Тема</label>
          <select id="fTheme" name="theme">
            <option value="arena">Arena (как на KeepTheScore)</option>
            <option value="kts">KeepTheScore (тёмно-синяя)</option>
            <option value="dark">Тёмная</option>
            <option value="blue">Синяя</option>
          </select>
        </div>
        <div class="field">
          <label for="fFont">Шрифт</label>
          <select id="fFont" name="font">
            <option value="bebas">Bebas Neue / Oswald (Arena)</option>
            <option value="oswald">Oswald</option>
            <option value="anton">Anton / Russo One</option>
            <option value="montserrat">Montserrat</option>
            <option value="roboto">Roboto Condensed</option>
            <option value="system">Системный</option>
          </select>
          <div class="font-preview" id="fontPreview">КОМАНДА · SETS WON 25:23</div>
        </div>
        <div class="field full">
          <label for="fLayout">Вариант табло</label>
          <select id="fLayout" name="layout">
            <option value="arena">Arena — как KeepTheScore (текущий)</option>
            <option value="classic">Классика — карточки с рамками</option>
            <option value="broadcast">Трансляция — команды в одну строку</option>
            <option value="duel">Дуэль — две половины без тире</option>
            <option value="minimal">Минимал — прозрачно, без плашек</option>
            <option value="glass">Стекло — полупрозрачные карточки</option>
            <option value="scorebug">Оверлей — компактная плашка для OBS</option>
            <option value="kts">KeepTheScore — третье табло (тёмно-синее)</option>
            <option value="youtube">YouTube — табло для прямого эфира</option>
            <option value="ytsets">YouTube — сеты (как KeepTheScore)</option>
          </select>
          <label class="check"><input type="checkbox" id="fYoutube" name="youtube"> Табло для YouTube (прямой эфир)</label>
        </div>
        <div class="field full">
          <div class="scale-head">
            <label>Размеры шрифтов и плашек</label>
            <button class="btn small" type="button" id="scaleReset">Сбросить 100%</button>
          </div>
          <div class="scale-grid">
            <label class="scale-item">
              <span>Заголовок матча</span>
              <output data-scale-out="titleScale">100%</output>
              <input type="range" name="titleScale" min="50" max="150" step="5" value="100">
            </label>
            <label class="scale-item">
              <span>Названия команд</span>
              <output data-scale-out="nameScale">100%</output>
              <input type="range" name="nameScale" min="50" max="150" step="5" value="100">
            </label>
            <label class="scale-item">
              <span>Счёт</span>
              <output data-scale-out="scoreScale">100%</output>
              <input type="range" name="scoreScale" min="50" max="500" step="5" value="100">
            </label>
            <label class="scale-item">
              <span>Блок Sets Won / Time Outs</span>
              <output data-scale-out="midScale">100%</output>
              <input type="range" name="midScale" min="50" max="150" step="5" value="100">
            </label>
            <label class="scale-item">
              <span>История партий</span>
              <output data-scale-out="setScale">100%</output>
              <input type="range" name="setScale" min="50" max="150" step="5" value="100">
            </label>
            <label class="scale-item">
              <span>Размер плашек у всех блоков</span>
              <output data-scale-out="panelScale">100%</output>
              <input type="range" name="panelScale" min="70" max="140" step="5" value="100">
            </label>
          </div>
        </div>
        <div class="field full">
          <label>Цвета</label>
          <div class="color-grid">
            <label class="color-item">Фон<input type="color" name="bg"></label>
            <label class="color-item">Плашка<input type="color" name="titleBg"></label>
            <label class="color-item">Текст<input type="color" name="text"></label>
            <label class="color-item">A — фон<input type="color" name="homeBg"></label>
            <label class="color-item">A — текст<input type="color" name="homeFg"></label>
            <label class="color-item">B — фон<input type="color" name="awayBg"></label>
            <label class="color-item">B — текст<input type="color" name="awayFg"></label>
          </div>
        </div>
        <div class="field full">
          <label for="fLogo">Логотип (PNG/SVG/JPG, до 12 МБ — сожмётся автоматически)</label>
          <div class="logo-row">
            <input id="fLogo" name="logo" type="file" accept="image/*">
            <button class="btn small" type="button" id="logoClear">Убрать</button>
            <span class="logo-preview"><img id="logoPreview" alt=""></span>
          </div>
        </div>
        <div class="field">
          <label for="fLogoHeight">Размер логотипа, px</label>
          <input id="fLogoHeight" name="logoHeight" type="number" min="16" max="200" step="1">
        </div>
        <div class="field">
          <label for="fLogoPos">Положение логотипа</label>
          <select id="fLogoPos" name="logoPos">
            <option value="left">Слева</option>
            <option value="right">Справа</option>
          </select>
        </div>
        <div class="field full">
          <label>Логотипы в заголовке (до 10, рядом с текстом заголовка)</label>
          <div class="title-logo-grid" id="titleLogoGrid"></div>
        </div>
        <div class="field">
          <label for="fTitleLogoHeight">Размер логотипов в заголовке, px (до 1000)</label>
          <input id="fTitleLogoHeight" name="titleLogoHeight" type="number" min="16" max="1000" step="1">
        </div>
        <div class="field full">
          <button class="btn small" type="button" id="titleLogosVisibleBtn" aria-pressed="true">Логотипы в шапке: ВКЛ</button>
        </div>
        <div class="field full">
          <button class="btn small" type="button" id="titleLogoTickerBtn" aria-pressed="false">Бегущая строка логотипов: ВЫКЛ</button>
        </div>
        <div class="field full">
          <button class="btn small" type="button" id="titleTickerBtn" aria-pressed="false">Бегущая строка заголовка: ВЫКЛ</button>
        </div>
        <div class="field full">
          <button class="btn small" type="button" id="titlePositionBtn" aria-pressed="false">Название турнира: СНИЗУ</button>
        </div>
        <div class="field full">
          <label>Логотипы команд (PNG/SVG/JPG, до 12 МБ — сожмутся автоматически)</label>
          <div class="team-logo-grid">
            <div>
              <div class="team-logo-head">Команда A</div>
              <div class="logo-row">
                <input id="fTeamLogoA" name="teamLogoA" type="file" accept="image/*">
                <button class="btn small" type="button" id="teamLogoAClear">Убрать</button>
                <span class="logo-preview"><img id="teamLogoAPreview" alt=""></span>
              </div>
            </div>
            <div>
              <div class="team-logo-head">Команда B</div>
              <div class="logo-row">
                <input id="fTeamLogoB" name="teamLogoB" type="file" accept="image/*">
                <button class="btn small" type="button" id="teamLogoBClear">Убрать</button>
                <span class="logo-preview"><img id="teamLogoBPreview" alt=""></span>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="fTeamLogoHeight">Размер логотипов команд, px</label>
          <input id="fTeamLogoHeight" name="teamLogoHeight" type="number" min="16" max="600" step="1">
        </div>
        <div class="field full">
          <label>Логотипы команд только для YouTube (board4 / board5). Если не заданы — используются общие логотипы выше</label>
          <div class="team-logo-grid">
            <div>
              <div class="team-logo-head">Команда A — YouTube</div>
              <div class="logo-row">
                <input id="fYtLogoA" name="youtubeLogoA" type="file" accept="image/*">
                <button class="btn small" type="button" id="ytLogoAClear">Убрать</button>
                <span class="logo-preview"><img id="ytLogoAPreview" alt=""></span>
              </div>
            </div>
            <div>
              <div class="team-logo-head">Команда B — YouTube</div>
              <div class="logo-row">
                <input id="fYtLogoB" name="youtubeLogoB" type="file" accept="image/*">
                <button class="btn small" type="button" id="ytLogoBClear">Убрать</button>
                <span class="logo-preview"><img id="ytLogoBPreview" alt=""></span>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="fYtLogoHeight">Размер логотипов для YouTube, px (до 600)</label>
          <input id="fYtLogoHeight" name="youtubeLogoHeight" type="number" min="16" max="600" step="1">
        </div>
        <div class="field full">
          <label for="fBgImage">Фон табло (PNG / JPG / WEBP, до 12 МБ)</label>
          <div class="logo-row">
            <input id="fBgImage" name="bgImage" type="file" accept="image/*">
            <button class="btn small" type="button" id="bgImageClear">Убрать</button>
            <span class="logo-preview wide"><img id="bgImagePreview" alt=""></span>
          </div>
        </div>
        <div class="field">
          <label for="fBgFit">Как вписать фон</label>
          <select id="fBgFit" name="bgFit">
            <option value="cover">Заполнить (обрезать)</option>
            <option value="contain">Вписать целиком</option>
            <option value="stretch">Растянуть</option>
            <option value="repeat">Мозаика</option>
          </select>
        </div>
        <div class="field">
          <label for="fBgDim">Затемнение фона, %</label>
          <input id="fBgDim" name="bgDim" type="number" min="0" max="90" step="5">
        </div>
        <div class="field">
          <label for="fBgBlur">Размытие фона, px</label>
          <input id="fBgBlur" name="bgBlur" type="number" min="0" max="30" step="1">
        </div>
        <div class="field full">
          <label>Фон команд (PNG / JPG / WEBP, до 12 МБ)</label>
          <div class="team-logo-grid">
            <div>
              <div class="team-logo-head">Команда A</div>
              <div class="logo-row">
                <input id="fHomeImage" name="homeImage" type="file" accept="image/*">
                <button class="btn small" type="button" id="homeImageClear">Убрать</button>
                <span class="logo-preview wide"><img id="homeImagePreview" alt=""></span>
              </div>
            </div>
            <div>
              <div class="team-logo-head">Команда B</div>
              <div class="logo-row">
                <input id="fAwayImage" name="awayImage" type="file" accept="image/*">
                <button class="btn small" type="button" id="awayImageClear">Убрать</button>
                <span class="logo-preview wide"><img id="awayImagePreview" alt=""></span>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="fTeamImageDim">Затемнение фона команд, %</label>
          <input id="fTeamImageDim" name="teamImageDim" type="number" min="0" max="90" step="5">
        </div>
        <div class="checks">
          <label class="check"><input type="checkbox" name="autoClose"> Автоматически закрывать партию</label>
          <label class="check"><input type="checkbox" name="sound"> Звуки</label>
          <label class="check"><input type="checkbox" name="showTimeouts"> Показывать тайм-ауты</label>
        </div>
        <p class="modal-note">
          Отдельная страница табло — <code id="boardLinkText">…</code>.<br>
          Пульт для телефона — <code id="remoteLinkText">…</code>.<br>
          OBS: полное табло — <code id="obsFull">…</code>, компактный оверлей — <code id="obsBug">…</code>.
          Для прозрачного фона добавьте <code>bg=transparent</code>.
        </p>
      </div>
      <div class="modal-actions">
        <button class="btn" type="button" id="settingsCancel">Отмена</button>
        <button class="btn primary" type="submit">Сохранить</button>
      </div>
    </form>
  </div>

  <script>
    (() => {
      'use strict';

      const $ = (sel) => document.querySelector(sel);
      const $$ = (sel) => Array.from(document.querySelectorAll(sel));
      const clone = (v) => JSON.parse(JSON.stringify(v));
      const params = new URLSearchParams(location.search);
      const DISPLAY = params.get('display') === '1';
      const KTS_STYLE = params.get('style') === 'kts';
      const YT_STYLE = params.get('style') === 'youtube';
      const SETS_STYLE = params.get('style') === 'sets';
      const LS_KEY = 'arena-volley-v2';
      const MAX_TIMEOUTS = 2;
      const TITLE_LOGO_COUNT = 10;

      const FONTS = {
        bebas: '"Bebas Neue", "Oswald", Roboto, system-ui, sans-serif',
        oswald: '"Oswald", system-ui, sans-serif',
        anton: '"Anton", "Russo One", system-ui, sans-serif',
        montserrat: '"Montserrat", system-ui, sans-serif',
        roboto: '"Roboto Condensed", system-ui, sans-serif',
        system: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
      };

      const THEMES = {
        arena: { bg: '#28ff05', titleBg: '#1eff65', text: '#ffffff', homeBg: '#141fff', homeFg: '#f9ca24', awayBg: '#202132', awayFg: '#ffffff' },
        kts: { bg: '#16315e', titleBg: '#1b3a6b', text: '#ffffff', homeBg: '#1f4173', homeFg: '#ffffff', awayBg: '#182f57', awayFg: '#cfe3ff' },
        dark: { bg: '#060a14', titleBg: '#1b2540', text: '#ffffff', homeBg: '#1d4ed8', homeFg: '#ffffff', awayBg: '#232a3d', awayFg: '#ffffff' },
        blue: { bg: '#071224', titleBg: '#173d73', text: '#ffffff', homeBg: '#2563eb', homeFg: '#ffffff', awayBg: '#0e1b30', awayFg: '#7dd3fc' }
      };

      const COLOR_KEYS = ['bg', 'titleBg', 'text', 'homeBg', 'homeFg', 'awayBg', 'awayFg'];
      const FONT_KEYS = Object.keys(FONTS);
      // Отдельные цвета и шрифт третьего табло (KeepTheScore): правки не задевают остальные табло.
      const KTS_PALETTE = {
        bg: '#16315e',
        titleBg: '#16315e',
        text: '#ffffff',
        homeBg: '#35445e',
        homeFg: '#ffffff',
        awayBg: '#35445e',
        awayFg: '#ffffff'
      };
      const KTS_FONT = 'bebas';
      // Отдельные цвета и шрифт четвёртого табло (YouTube, прямой эфир).
      const YT_PALETTE = {
        bg: '#0f0f0f',
        titleBg: '#0f0f0f',
        text: '#ffffff',
        homeBg: '#272727',
        homeFg: '#ffffff',
        awayBg: '#272727',
        awayFg: '#ffffff'
      };
      const YT_FONT = 'roboto';
      // Отдельные цвета и шрифт пятого табло (YouTube — таблица сетов, как KeepTheScore).
      const SETS_PALETTE = {
        bg: '#16315e',
        titleBg: '#16315e',
        text: '#ffffff',
        homeBg: '#35445e',
        homeFg: '#ffffff',
        awayBg: '#35445e',
        awayFg: '#ffffff'
      };
      const SETS_FONT = 'bebas';
      const LAYOUT_KEYS = ['arena', 'classic', 'broadcast', 'duel', 'minimal', 'glass', 'scorebug', 'kts', 'youtube', 'ytsets'];
      const SCALE_KEYS = ['titleScale', 'nameScale', 'scoreScale', 'midScale', 'setScale', 'panelScale'];
      const SCALE_VARS = {
        titleScale: '--title-scale',
        nameScale: '--name-scale',
        scoreScale: '--score-scale',
        midScale: '--mid-scale',
        setScale: '--set-scale',
        panelScale: '--panel-scale'
      };
      const SCALE_LIMITS = {
        titleScale: [50, 150],
        nameScale: [50, 150],
        scoreScale: [50, 500],
        midScale: [50, 150],
        setScale: [50, 150],
        panelScale: [70, 140]
      };

      const defaultState = () => ({
        rev: 0,
        names: { A: 'КАРА-КУЛЖА', B: 'НООКАТ' },
        titles: { match: 'ВОЛЕЙБОЛ' },
        score: { A: 0, B: 0 },
        setsWon: { A: 0, B: 0 },
        sets: [],
        setNumber: 1,
        serve: null,
        timeouts: { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS },
        matchOver: false,
        design: {
          font: 'bebas',
          layout: 'arena',
          titleScale: 100,
          nameScale: 100,
          scoreScale: 100,
          midScale: 100,
          setScale: 100,
          panelScale: 100,
          bg: '#28ff05',
          titleBg: '#1eff65',
          text: '#ffffff',
          homeBg: '#141fff',
          homeFg: '#f9ca24',
          awayBg: '#202132',
          awayFg: '#ffffff',
          kts: Object.assign({}, KTS_PALETTE),
          ktsFont: KTS_FONT,
          youtube: Object.assign({}, YT_PALETTE),
          youtubeFont: YT_FONT,
          ytsets: Object.assign({}, SETS_PALETTE),
          ytsetsFont: SETS_FONT,
          logo: '',
          logoHeight: 64,
          logoPos: 'left',
          titleLogos: [],
          titleLogoHeight: 120,
          titleLogoTicker: false,
          titleTicker: false,
          titleLogosVisible: true,
          titlePosition: 'below',
          teamLogoA: '',
          teamLogoB: '',
          teamLogoHeight: 56,
          youtubeLogoA: '',
          youtubeLogoB: '',
          youtubeLogoHeight: 56,
          bgImage: '',
          bgFit: 'cover',
          bgDim: 35,
          bgBlur: 0,
          homeImage: '',
          awayImage: '',
          teamImageDim: 35
        },
        settings: {
          bestOf: 5,
          points: 25,
          deciding: 15,
          autoClose: true,
          sound: true,
          showTimeouts: true,
          theme: 'arena',
          room: 'main',
          transparent: false
        }
      });

      const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
      const safeImage = (value, maxLength) => {
        const str = typeof value === 'string' ? value : '';
        return str.length <= (maxLength || 2000000) ? str : '';
      };

      function normalize(raw) {
        const base = defaultState();
        if (!raw || typeof raw !== 'object') return base;
        const s = Object.assign({}, base, raw);
        s.names = Object.assign({}, base.names, raw.names || {});
        s.titles = Object.assign({}, base.titles, raw.titles || {});
        s.score = Object.assign({}, base.score, raw.score || {});
        s.setsWon = Object.assign({}, base.setsWon, raw.setsWon || {});
        s.timeouts = Object.assign({}, base.timeouts, raw.timeouts || {});
        s.settings = Object.assign({}, base.settings, raw.settings || {});
        s.sets = Array.isArray(raw.sets) ? raw.sets.filter((x) => x && Number.isFinite(Number(x.a)) && Number.isFinite(Number(x.b))).map((x) => ({ a: Number(x.a), b: Number(x.b) })) : [];
        s.settings.bestOf = [1, 3, 5].includes(Number(s.settings.bestOf)) ? Number(s.settings.bestOf) : 5;
        s.settings.points = [11, 15, 21, 25].includes(Number(s.settings.points)) ? Number(s.settings.points) : 25;
        s.settings.deciding = [11, 15, 21].includes(Number(s.settings.deciding)) ? Number(s.settings.deciding) : 15;
        s.settings.room = String(s.settings.room || 'main').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'main';
        s.settings.theme = ['arena', 'kts', 'dark', 'blue'].includes(s.settings.theme) ? s.settings.theme : 'arena';
        s.settings.autoClose = s.settings.autoClose !== false;
        s.settings.sound = s.settings.sound !== false;
        s.settings.showTimeouts = s.settings.showTimeouts !== false;
        s.settings.transparent = Boolean(s.settings.transparent);
        s.design = Object.assign({}, base.design, raw.design || {});
        s.design.font = FONT_KEYS.includes(s.design.font) ? s.design.font : base.design.font;
        s.design.layout = LAYOUT_KEYS.includes(s.design.layout) ? s.design.layout : base.design.layout;
        SCALE_KEYS.forEach((key) => {
          const [min, max] = SCALE_LIMITS[key];
          s.design[key] = clamp(Math.round(Number(s.design[key]) || 100), min, max);
        });
        COLOR_KEYS.forEach((key) => {
          s.design[key] = /^#[0-9a-fA-F]{6}$/.test(String(s.design[key] || '')) ? s.design[key] : base.design[key];
        });
        s.design.kts = Object.assign({}, KTS_PALETTE, (raw.design && raw.design.kts) || {});
        COLOR_KEYS.forEach((key) => {
          s.design.kts[key] = /^#[0-9a-fA-F]{6}$/.test(String(s.design.kts[key] || '')) ? s.design.kts[key] : KTS_PALETTE[key];
        });
        s.design.ktsFont = FONT_KEYS.includes(s.design.ktsFont) ? s.design.ktsFont : KTS_FONT;
        s.design.youtube = Object.assign({}, YT_PALETTE, (raw.design && raw.design.youtube) || {});
        COLOR_KEYS.forEach((key) => {
          s.design.youtube[key] = /^#[0-9a-fA-F]{6}$/.test(String(s.design.youtube[key] || '')) ? s.design.youtube[key] : YT_PALETTE[key];
        });
        s.design.youtubeFont = FONT_KEYS.includes(s.design.youtubeFont) ? s.design.youtubeFont : YT_FONT;
        s.design.ytsets = Object.assign({}, SETS_PALETTE, (raw.design && raw.design.ytsets) || {});
        COLOR_KEYS.forEach((key) => {
          s.design.ytsets[key] = /^#[0-9a-fA-F]{6}$/.test(String(s.design.ytsets[key] || '')) ? s.design.ytsets[key] : SETS_PALETTE[key];
        });
        s.design.ytsetsFont = FONT_KEYS.includes(s.design.ytsetsFont) ? s.design.ytsetsFont : SETS_FONT;
        s.design.logo = typeof s.design.logo === 'string' && s.design.logo.length <= 400000 ? s.design.logo : '';
        s.design.logoHeight = clamp(Math.round(Number(s.design.logoHeight) || 64), 16, 200);
        s.design.logoPos = s.design.logoPos === 'right' ? 'right' : 'left';
        s.design.titleLogos = Array.isArray(s.design.titleLogos)
          ? s.design.titleLogos.slice(0, TITLE_LOGO_COUNT).map((x) => (typeof x === 'string' && x.length <= 320000 ? x : ''))
          : [];
        s.design.titleLogoHeight = clamp(Math.round(Number(s.design.titleLogoHeight) || 120), 16, 1000);
        s.design.titleLogoTicker = Boolean(s.design.titleLogoTicker);
        s.design.titleTicker = Boolean(s.design.titleTicker);
        s.design.titleLogosVisible = s.design.titleLogosVisible !== false;
        s.design.titlePosition = s.design.titlePosition === 'above' ? 'above' : 'below';
        s.design.teamLogoA = typeof s.design.teamLogoA === 'string' && s.design.teamLogoA.length <= 400000 ? s.design.teamLogoA : '';
        s.design.teamLogoB = typeof s.design.teamLogoB === 'string' && s.design.teamLogoB.length <= 400000 ? s.design.teamLogoB : '';
        s.design.teamLogoHeight = clamp(Math.round(Number(s.design.teamLogoHeight) || 56), 16, 600);
        s.design.youtubeLogoHeight = clamp(Math.round(Number(s.design.youtubeLogoHeight) || s.design.teamLogoHeight), 16, 600);
        s.design.youtubeLogoA = typeof s.design.youtubeLogoA === 'string' && s.design.youtubeLogoA.length <= 400000 ? s.design.youtubeLogoA : '';
        s.design.youtubeLogoB = typeof s.design.youtubeLogoB === 'string' && s.design.youtubeLogoB.length <= 400000 ? s.design.youtubeLogoB : '';
        s.design.bgImage = safeImage(s.design.bgImage, 2400000);
        s.design.homeImage = safeImage(s.design.homeImage, 1200000);
        s.design.awayImage = safeImage(s.design.awayImage, 1200000);
        s.design.bgFit = ['cover', 'contain', 'stretch', 'repeat'].includes(s.design.bgFit) ? s.design.bgFit : 'cover';
        s.design.bgDim = clamp(Math.round(Number(s.design.bgDim) || 0), 0, 90);
        s.design.bgBlur = clamp(Math.round(Number(s.design.bgBlur) || 0), 0, 30);
        s.design.teamImageDim = clamp(Math.round(Number(s.design.teamImageDim) || 0), 0, 90);
        ['A', 'B'].forEach((t) => {
          s.score[t] = clamp(Math.round(Number(s.score[t]) || 0), 0, 99);
          s.setsWon[t] = clamp(Math.round(Number(s.setsWon[t]) || 0), 0, Math.ceil(s.settings.bestOf / 2));
          s.timeouts[t] = clamp(Math.round(Number(s.timeouts[t]) || 0), 0, MAX_TIMEOUTS);
          s.names[t] = String(s.names[t] || '').slice(0, 30).toUpperCase() || (t === 'A' ? 'КОМАНДА А' : 'КОМАНДА Б');
        });
        s.titles.match = String(s.titles.match || '').slice(0, 40) || 'ВОЛЕЙБОЛ';
        s.setNumber = clamp(Math.round(Number(s.setNumber) || 1), 1, s.settings.bestOf);
        s.rev = Math.max(0, Math.round(Number(s.rev) || 0));
        s.matchOver = Boolean(s.matchOver);
        if (s.serve !== 'A' && s.serve !== 'B') s.serve = null;
        return s;
      }

      function lsKeyFor(r) {
        return LS_KEY + ':' + r;
      }

      function readLegacy() {
        try {
          const raw = localStorage.getItem(LS_KEY);
          return raw ? normalize(JSON.parse(raw)) : null;
        } catch {
          return null;
        }
      }

      function loadLocal(r) {
        try {
          const raw = localStorage.getItem(lsKeyFor(r));
          if (raw) return normalize(JSON.parse(raw));
          const legacy = readLegacy();
          if (legacy && legacy.settings.room === r) return legacy;
        } catch { /* ignore */ }
        return defaultState();
      }

      const roomFromUrl = (params.get('room') || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      const legacyState = readLegacy();
      let room = roomFromUrl || (legacyState && legacyState.settings.room) || 'main';
      let state = loadLocal(room);
      const themeParam = params.get('theme');
      if (['arena', 'kts', 'dark', 'blue'].includes(themeParam)) state.settings.theme = themeParam;
      state.settings.room = room;

      const undoStack = [];
      let lastScores = { A: null, B: null };
      let audioCtx = null;
      let pendingLogo = '';
      let pendingTitleLogos = [];
      const pendingTeamLogo = { A: '', B: '' };
      const pendingYtLogo = { A: '', B: '' };
      let pendingBgImage = '';
      let pendingHomeImage = '';
      let pendingAwayImage = '';
      let lanIp = '';

      const ui = {
        body: document.body,
        name: { A: $('#nameA'), B: $('#nameB') },
        scoreEl: { A: $('#scoreA'), B: $('#scoreB') },
        scoreBox: { A: $('#scoreBoxA'), B: $('#scoreBoxB') },
        setsWon: { A: $('#midSetsWonA'), B: $('#midSetsWonB') },
        timeoutEl: { A: $('#midToA'), B: $('#midToB') },
        serve: { A: $('#serveA'), B: $('#serveB') },
        mid: $('.box-arena-mid'),
        kts: null,
        matchTitle: $('#matchTitle'),
        matchTitleEcho: $('#matchTitleEcho'),
        titleTrack: $('#titleTrack'),
        setMeta: $('#setMeta'),
        liveBadge: $('#liveBadge'),
        setsRow: $('#midSetsRow'),
        titleBox: $('.box-title'),
        titleLogos: $('#titleLogos'),
        titleLogosVisibleBtn: $('#titleLogosVisibleBtn'),
        titleLogoTickerBtn: $('#titleLogoTickerBtn'),
        titleTickerBtn: $('#titleTickerBtn'),
        titlePositionBtn: $('#titlePositionBtn'),
        logo: $('#logoImg'),
        logoPreview: $('#logoPreview'),
        teamLogo: { A: $('#teamLogoA'), B: $('#teamLogoB') },
        teamLogoPreview: { A: $('#teamLogoAPreview'), B: $('#teamLogoBPreview') },
        ytLogoPreview: { A: $('#ytLogoAPreview'), B: $('#ytLogoBPreview') },
        bgLayer: $('#bgLayer'),
        bgShade: $('#bgShade'),
        bgImagePreview: $('#bgImagePreview'),
        homeImagePreview: $('#homeImagePreview'),
        awayImagePreview: $('#awayImagePreview'),
        winnerBadge: $('#winnerBadge'),
        winnerName: $('#winnerName'),
        syncPill: $('#syncPill'),
        syncText: $('#syncText'),
        soundBtn: $('#soundBtn'),
        toast: $('#toast'),
        settingsOverlay: $('#settingsOverlay'),
        settingsForm: $('#settingsForm'),
        boardLinkText: $('#boardLinkText'),
        remoteLinkText: $('#remoteLinkText'),
        obsFull: $('#obsFull'),
        obsBug: $('#obsBug')
      };

      /* ---------- Сохранение ---------- */
      function persist() {
        try { localStorage.setItem(lsKeyFor(room), JSON.stringify(state)); } catch { /* ignore */ }
      }

      /* ---------- Синхронизация ---------- */
      const sync = {
        ws: null,
        connected: false,
        peers: 0,
        retry: 0,
        timer: null,
        clientId: Math.random().toString(36).slice(2, 10),
        connect() {
          this.close();
          const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
          const url = proto + '//' + location.host + '/ws?room=' + encodeURIComponent(room);
          let ws;
          try { ws = new WebSocket(url); } catch { this.setStatus(false); return; }
          this.ws = ws;
          ws.onopen = () => {
            this.connected = true;
            this.retry = 0;
            this.setStatus(true);
            ws.send(JSON.stringify({ type: 'hello', room, clientId: this.clientId }));
          };
          ws.onmessage = (event) => {
            let msg;
            try { msg = JSON.parse(event.data); } catch { return; }
            if (msg.type === 'state' && msg.state) {
              const remote = normalize(msg.state);
              if (remote.rev > state.rev) {
                state = remote;
                state.settings.room = room;
                persist();
                render();
              } else if (state.rev > remote.rev) {
                this.sendState();
              } else if (JSON.stringify(remote) !== JSON.stringify(state)) {
                state = remote;
                state.settings.room = room;
                persist();
                render();
              }
            }
            if (msg.type === 'need-state') {
              this.sendState();
            }
            if (msg.type === 'presence') {
              this.peers = Number(msg.count) || 0;
              this.setStatus(true);
            }
          };
          ws.onclose = () => {
            this.connected = false;
            this.setStatus(false);
            this.scheduleReconnect();
          };
          ws.onerror = () => { try { ws.close(); } catch { /* ignore */ } };
        },
        scheduleReconnect() {
          clearTimeout(this.timer);
          const delay = Math.min(10000, 1000 * Math.pow(2, this.retry++));
          this.timer = setTimeout(() => this.connect(), delay);
        },
        close() {
          clearTimeout(this.timer);
          if (this.ws) {
            try { this.ws.onclose = null; this.ws.close(); } catch { /* ignore */ }
            this.ws = null;
          }
        },
        sendState() {
          if (!this.ws || this.ws.readyState !== 1) return;
          try {
            this.ws.send(JSON.stringify({ type: 'state', room, clientId: this.clientId, state }));
          } catch { /* ignore */ }
        },
        setStatus(online) {
          ui.syncPill.classList.toggle('online', online);
          ui.syncPill.classList.toggle('offline', !online);
          ui.syncText.textContent = online ? (this.peers > 1 ? 'онлайн · ' + this.peers : 'онлайн') : 'офлайн';
        }
      };

      /* ---------- Звук ---------- */
      function ensureAudio() {
        if (!audioCtx) {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          if (Ctx) audioCtx = new Ctx();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      }

      function tone(freq, duration, type, gain, delay) {
        if (!state.settings.sound) return;
        ensureAudio();
        if (!audioCtx) return;
        const t0 = audioCtx.currentTime + (delay || 0);
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, t0);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(gain || 0.09, t0 + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
        osc.connect(g).connect(audioCtx.destination);
        osc.start(t0);
        osc.stop(t0 + duration + 0.04);
      }

      function playSound(kind) {
        if (!state.settings.sound) return;
        if (kind === 'point') { tone(640, 0.07, 'square', 0.05); }
        else if (kind === 'minus') { tone(320, 0.08, 'triangle', 0.05); }
        else if (kind === 'timeout') { tone(360, 0.2, 'triangle', 0.08); tone(280, 0.22, 'triangle', 0.07, 0.18); }
        else if (kind === 'set') { tone(523, 0.12, 'sine', 0.1); tone(659, 0.12, 'sine', 0.1, 0.13); tone(784, 0.18, 'sine', 0.1, 0.26); }
        else if (kind === 'match') { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.16, 'square', 0.07, i * 0.15)); }
        else if (kind === 'undo') { tone(420, 0.08, 'sine', 0.06); tone(300, 0.1, 'sine', 0.05, 0.08); }
        else if (kind === 'serve') { tone(720, 0.05, 'sine', 0.04); }
      }

      /* ---------- Логика ---------- */
      const need = () => Math.ceil(state.settings.bestOf / 2);
      const isDeciding = () => state.settings.bestOf > 1 && state.setNumber >= state.settings.bestOf;
      const targetPoints = () => isDeciding() ? state.settings.deciding : state.settings.points;

      function bump(el) {
        if (!el) return;
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
      }

      function commit(mutator) {
        if (DISPLAY) return null;
        const before = clone(state);
        const soundKind = mutator(state) || null;
        state.rev = Math.max(Date.now(), state.rev + 1);
        state.settings.room = room;
        undoStack.push(before);
        if (undoStack.length > 120) undoStack.shift();
        persist();
        render();
        sync.sendState();
        if (soundKind) playSound(soundKind);
        return soundKind;
      }

      function finishSet(s, winner) {
        s.sets.push({ a: s.score.A, b: s.score.B });
        s.setsWon[winner] = Math.min(need(), s.setsWon[winner] + 1);
        s.score = { A: 0, B: 0 };
        s.timeouts = { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS };
        s.serve = winner;
        if (s.setsWon[winner] >= need()) {
          s.matchOver = true;
          s.setNumber = Math.max(1, s.sets.length);
        } else {
          s.setNumber = Math.min(s.settings.bestOf, s.setNumber + 1);
        }
      }

      function addPoint(team) {
        if (state.matchOver) return;
        let sound = 'point';
        commit((s) => {
          s.score[team] = Math.min(99, s.score[team] + 1);
          s.serve = team;
          const mine = s.score[team];
          const theirs = s.score[team === 'A' ? 'B' : 'A'];
          const target = s.settings.bestOf > 1 && s.setNumber >= s.settings.bestOf ? s.settings.deciding : s.settings.points;
          if (s.settings.autoClose && mine >= target && mine - theirs >= 2) {
            finishSet(s, team);
            sound = s.matchOver ? 'match' : 'set';
          }
          return sound;
        });
      }

      function removePoint(team) {
        if (state.matchOver) return;
        if (state.score[team] <= 0) return;
        commit((s) => {
          s.score[team] = Math.max(0, s.score[team] - 1);
          return 'minus';
        });
      }

      function timeout(team) {
        if (state.matchOver) return;
        if (state.timeouts[team] <= 0) { showToast('Тайм-ауты закончились'); return; }
        commit((s) => {
          s.timeouts[team] = Math.max(0, s.timeouts[team] - 1);
          return 'timeout';
        });
      }

      function toggleServe(team) {
        if (state.matchOver) return;
        commit((s) => {
          s.serve = s.serve === team ? null : team;
          return 'serve';
        });
      }

      function endSetManual() {
        if (state.matchOver) { showToast('Матч завершён — нажмите «Новый матч»'); return; }
        const a = state.score.A;
        const b = state.score.B;
        if (a === b) { showToast('Счёт равный — партию завершить нельзя'); return; }
        commit((s) => {
          finishSet(s, a > b ? 'A' : 'B');
          return s.matchOver ? 'match' : 'set';
        });
      }

      function resetSet() {
        if (state.matchOver) { showToast('Матч завершён — нажмите «Новый матч»'); return; }
        commit((s) => {
          s.score = { A: 0, B: 0 };
          s.timeouts = { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS };
          return 'undo';
        });
      }

      function newMatch() {
        if (!confirm('Начать новый матч? Текущий счёт и партии будут сброшены.')) return;
        commit((s) => {
          s.score = { A: 0, B: 0 };
          s.setsWon = { A: 0, B: 0 };
          s.sets = [];
          s.setNumber = 1;
          s.serve = null;
          s.timeouts = { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS };
          s.matchOver = false;
          return 'undo';
        });
      }

      function undo() {
        if (!undoStack.length) return;
        const prev = undoStack.pop();
        state = normalize(prev);
        state.rev = Math.max(Date.now(), state.rev + 1);
        state.settings.room = room;
        persist();
        render();
        sync.sendState();
        playSound('undo');
      }

      /* ---------- Отрисовка ---------- */
      function applyStatsBlock() {
        if (params.get('stats') !== 'block') return;
        const heading = $('.box-arena-heading');
        const pair = heading ? heading.querySelector('.mid-pair') : null;
        const stats = $('.box-arena-mid .mid-stats');
        if (pair && stats) stats.prepend(pair);
        if (heading) heading.remove();
        ui.body.classList.add('stats-block');
      }

      function applyBottomBar() {
        if (ui.kts) return;
        const arena = $('.arena');
        if (!arena || !ui.setsRow) return;
        const bottom = document.createElement('div');
        bottom.className = 'box-bottom-bar';
        const build = (team, side) => {
          const wrap = document.createElement('div');
          wrap.className = 'box-arena-counters box-arena-counters-' + side;
          wrap.classList.toggle('hide-timeouts', !state.settings.showTimeouts);
          const sets = document.createElement('div');
          sets.className = 'box-arena-counter counter-sets';
          sets.innerHTML = '<span class="el-arena-counter-value" id="ktsSets' + team + '">' + state.setsWon[team] + '</span>' +
            '<span class="el-arena-counter-label">SETS<br>WON</span>';
          const to = document.createElement('div');
          to.className = 'box-arena-counter counter-timeouts';
          to.innerHTML = '<span class="el-arena-counter-value" id="ktsTo' + team + '" data-team="' + team +
            '" title="Тайм-аут: нажмите, чтобы потратить">' + state.timeouts[team] + '</span>' +
            '<span class="el-arena-counter-label">TIME<br>OUTS</span>';
          wrap.append(sets, to);
          bottom.append(wrap);
          return wrap;
        };
        const home = build('A', 'home');
        bottom.append(ui.setsRow);
        const away = build('B', 'away');
        arena.append(bottom);
        ui.kts = {
          bottom: bottom,
          wrap: { A: home, B: away },
          sets: { A: home.querySelector('#ktsSetsA'), B: away.querySelector('#ktsSetsB') },
          to: { A: home.querySelector('#ktsToA'), B: away.querySelector('#ktsToB') }
        };
        ['A', 'B'].forEach((team) => {
          ui.kts.to[team].addEventListener('click', () => timeout(team));
        });
      }

      function revertBottomBar() {
        if (!ui.kts) return;
        const mid = $('.box-arena-mid');
        if (mid && ui.setsRow) mid.appendChild(ui.setsRow);
        ui.kts.bottom.remove();
        ui.kts = null;
      }

      function isKtsLayout(layoutValue) {
        return !YT_STYLE && !SETS_STYLE &&
          (KTS_STYLE || (layoutValue === 'kts' && params.get('stats') !== 'block'));
      }

      function isYoutubeLayout(layoutValue) {
        return !KTS_STYLE && !SETS_STYLE &&
          (YT_STYLE || (layoutValue === 'youtube' && params.get('stats') !== 'block'));
      }

      function isSetsLayout(layoutValue) {
        return !KTS_STYLE && !YT_STYLE &&
          (SETS_STYLE || (layoutValue === 'ytsets' && params.get('stats') !== 'block'));
      }

      // Палитра и шрифт, которые сейчас редактируются: у третьего, четвёртого и пятого табло — свои.
      function paletteFor(layoutValue) {
        if (isKtsLayout(layoutValue)) {
          return { kind: 'kts', palette: state.design.kts || KTS_PALETTE, font: state.design.ktsFont || KTS_FONT };
        }
        if (isYoutubeLayout(layoutValue)) {
          return { kind: 'youtube', palette: state.design.youtube || YT_PALETTE, font: state.design.youtubeFont || YT_FONT };
        }
        if (isSetsLayout(layoutValue)) {
          return { kind: 'ytsets', palette: state.design.ytsets || SETS_PALETTE, font: state.design.ytsetsFont || SETS_FONT };
        }
        return { kind: 'design', palette: state.design, font: state.design.font };
      }

      function applyDesign() {
        const d = state.design;
        const kts = isKtsLayout(d.layout);
        const yt = isYoutubeLayout(d.layout);
        const sets = isSetsLayout(d.layout);
        if (kts || yt || sets) applyBottomBar();
        else revertBottomBar();
        ui.body.classList.toggle('style-kts', kts);
        ui.body.classList.toggle('style-youtube', yt);
        ui.body.classList.toggle('style-ytsets', sets);
        ui.body.dataset.layout = (kts || yt || sets) ? 'arena' : (LAYOUT_KEYS.includes(d.layout) ? d.layout : 'arena');
        const arenaEl = $('.arena');
        if (arenaEl) arenaEl.style.setProperty('--set-cols', String(state.settings.bestOf));
        SCALE_KEYS.forEach((key) => {
          const [min, max] = SCALE_LIMITS[key];
          const value = clamp(Number(d[key]) || 100, min, max);
          ui.body.style.setProperty(SCALE_VARS[key], String(value / 100));
        });
        const active = paletteFor(d.layout);
        const palette = active.palette;
        const font = active.font;
        ui.body.style.setProperty('--font-family', FONTS[font] || FONTS.bebas);
        ui.body.style.setProperty('--bg', palette.bg);
        ui.body.style.setProperty('--title-bg', palette.titleBg);
        ui.body.style.setProperty('--text', palette.text);
        ui.body.style.setProperty('--home-bg', palette.homeBg);
        ui.body.style.setProperty('--home-fg', palette.homeFg);
        ui.body.style.setProperty('--away-bg', palette.awayBg);
        ui.body.style.setProperty('--away-fg', palette.awayFg);
        if (ui.liveBadge) ui.liveBadge.hidden = !(yt || sets);
        ui.body.style.setProperty('--logo-height', d.logoHeight + 'px');
        ui.body.style.setProperty('--title-logo-height', d.titleLogoHeight + 'px');
        ui.body.classList.toggle('logo-ticker', Boolean(d.titleLogoTicker));
        updateTitleLogoTickerBtn();
        ui.body.classList.toggle('title-ticker', Boolean(d.titleTicker));
        updateTitleTickerBtn();
        updateTitleLogosVisibleBtn();
        ui.body.classList.toggle('title-above-logos', d.titlePosition === 'above');
        updateTitlePositionBtn();
        ui.body.style.setProperty('--team-logo-height', d.teamLogoHeight + 'px');
        ui.body.style.setProperty('--youtube-logo-height', d.youtubeLogoHeight + 'px');

        const hasBg = Boolean(d.bgImage);
        ui.bgLayer.hidden = !hasBg;
        if (hasBg) {
          ui.bgLayer.style.backgroundImage = 'url("' + d.bgImage + '")';
          ui.bgLayer.style.backgroundSize = d.bgFit === 'stretch' ? '100% 100%' : (d.bgFit === 'repeat' ? 'auto' : d.bgFit);
          ui.bgLayer.style.backgroundRepeat = d.bgFit === 'repeat' ? 'repeat' : 'no-repeat';
          ui.bgLayer.style.filter = d.bgBlur > 0 ? 'blur(' + d.bgBlur + 'px)' : 'none';
          ui.bgLayer.style.transform = d.bgBlur > 0 ? 'scale(1.06)' : 'scale(1.02)';
        }
        ui.bgShade.hidden = !hasBg || d.bgDim <= 0;
        if (hasBg) ui.bgShade.style.background = 'rgba(0, 0, 0, ' + (d.bgDim / 100) + ')';

        const teamImages = { A: d.homeImage, B: d.awayImage };
        ['A', 'B'].forEach((team) => {
          const src = teamImages[team];
          const has = Boolean(src);
          const prefix = team === 'A' ? 'home' : 'away';
          ui.body.style.setProperty('--' + prefix + '-image', has ? 'url("' + src + '")' : 'none');
          ui.body.style.setProperty('--' + prefix + '-image-dim', String(has ? d.teamImageDim / 100 : 0));
        });

        ['A', 'B'].forEach((team) => {
          // На YouTube-табло (board4/board5) свои логотипы; если они не заданы — общие.
          const ytSrc = team === 'A' ? d.youtubeLogoA : d.youtubeLogoB;
          const src = (yt || sets) && ytSrc ? ytSrc : (team === 'A' ? d.teamLogoA : d.teamLogoB);
          const img = ui.teamLogo[team];
          const has = Boolean(src);
          img.hidden = !has;
          if (has && img.getAttribute('src') !== src) img.src = src;
        });

        const hasLogo = Boolean(d.logo);
        ui.logo.hidden = !hasLogo;
        if (hasLogo && ui.logo.getAttribute('src') !== d.logo) ui.logo.src = d.logo;
        ui.logo.classList.toggle('pos-left', d.logoPos !== 'right');
        ui.logo.classList.toggle('pos-right', d.logoPos === 'right');
        ui.titleBox.classList.toggle('has-logo', hasLogo);
        ui.titleBox.classList.toggle('pos-left', d.logoPos !== 'right');
        ui.titleBox.classList.toggle('pos-right', d.logoPos === 'right');
        requestFit();
      }

      function render() {
        ui.body.dataset.theme = state.settings.theme;
        applyDesign();
        const transparent = params.get('bg') === 'transparent' || (DISPLAY && params.get('bg') !== 'opaque');
        ui.body.classList.toggle('transparent', transparent);
        ui.body.classList.toggle('display', DISPLAY);

        ui.matchTitle.textContent = state.titles.match;
        syncTitleTickerText();
        renderTitleLogos();

        ['A', 'B'].forEach((t) => {
          if (document.activeElement !== ui.name[t]) ui.name[t].textContent = state.names[t];
          ui.scoreEl[t].textContent = state.score[t];
          ui.setsWon[t].textContent = state.setsWon[t];
          ui.timeoutEl[t].textContent = state.timeouts[t];
          if (ui.kts) {
            ui.kts.sets[t].textContent = state.setsWon[t];
            ui.kts.to[t].textContent = state.timeouts[t];
          }
          ui.serve[t].classList.toggle('on', state.serve === t);
          if (lastScores[t] !== null && lastScores[t] !== state.score[t]) bump(ui.scoreEl[t]);
          lastScores[t] = state.score[t];
        });
        ui.mid.classList.toggle('hide-timeouts', !state.settings.showTimeouts);
        if (ui.kts) {
          ['A', 'B'].forEach((t) => {
            ui.kts.wrap[t].classList.toggle('hide-timeouts', !state.settings.showTimeouts);
          });
        }

        const target = targetPoints();
        ui.setMeta.textContent = 'ПАРТИЯ ' + state.setNumber + ' · ДО ' + target;

        const winner = state.matchOver ? (state.setsWon.A >= need() ? 'A' : (state.setsWon.B >= need() ? 'B' : null)) : null;
        ui.winnerBadge.hidden = !winner;
        if (winner) ui.winnerName.textContent = state.names[winner] + ' — победа';
        ui.body.classList.toggle('match-over', Boolean(winner));

        renderSets();
        renderControls();
        ui.soundBtn.textContent = state.settings.sound ? '🔊' : '🔇';
        requestFit();
      }

      function updateTitleLogosVisibleBtn() {
        const on = state.design.titleLogosVisible !== false;
        ui.titleLogosVisibleBtn.textContent = 'Логотипы в шапке: ' + (on ? 'ВКЛ' : 'ВЫКЛ');
        ui.titleLogosVisibleBtn.classList.toggle('on', on);
        ui.titleLogosVisibleBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }

      function updateTitleLogoTickerBtn() {
        const on = Boolean(state.design.titleLogoTicker);
        ui.titleLogoTickerBtn.textContent = 'Бегущая строка логотипов: ' + (on ? 'ВКЛ' : 'ВЫКЛ');
        ui.titleLogoTickerBtn.classList.toggle('on', on);
        ui.titleLogoTickerBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }

      function updateTitleTickerBtn() {
        const on = Boolean(state.design.titleTicker);
        ui.titleTickerBtn.textContent = 'Бегущая строка заголовка: ' + (on ? 'ВКЛ' : 'ВЫКЛ');
        ui.titleTickerBtn.classList.toggle('on', on);
        ui.titleTickerBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }

      function syncTitleTickerText() {
        const text = state.titles.match;
        const track = ui.titleTrack;
        if (!track) return;

        // Оставляем только первую копию-эхо, остальные создадим под ширину шапки.
        Array.from(track.querySelectorAll('.title-echo')).slice(1).forEach((el) => el.remove());
        if (ui.matchTitleEcho) ui.matchTitleEcho.textContent = text;
        if (!state.design.titleTicker) return;

        const copyWidth = ui.matchTitle.getBoundingClientRect().width || 1;
        const boxWidth = ui.titleBox ? ui.titleBox.clientWidth : window.innerWidth;
        const perHalf = Math.max(1, Math.ceil(boxWidth / copyWidth) + 1);
        const needed = perHalf * 2 - 1;
        const echoes = Array.from(track.querySelectorAll('.title-echo'));
        while (echoes.length < needed) {
          const clone = document.createElement('div');
          clone.className = 'el-title title-echo';
          clone.setAttribute('aria-hidden', 'true');
          clone.textContent = text;
          track.appendChild(clone);
          echoes.push(clone);
        }
        const seconds = Math.max(18, Math.min(60, (copyWidth * perHalf) / 80));
        track.style.setProperty('--title-marquee-duration', seconds + 's');
      }

      function updateTitlePositionBtn() {
        const above = state.design.titlePosition === 'above';
        ui.titlePositionBtn.textContent = 'Название турнира: ' + (above ? 'СВЕРХУ' : 'СНИЗУ');
        ui.titlePositionBtn.classList.toggle('on', above);
        ui.titlePositionBtn.setAttribute('aria-pressed', above ? 'true' : 'false');
      }

      let lastTitleLogosKey = null;
      function renderTitleLogos() {
        const logos = (state.design.titleLogos || []).filter(Boolean).slice(0, TITLE_LOGO_COUNT);
        const visible = state.design.titleLogosVisible !== false;
        const key = logos.join('|') + '|' + (visible ? '1' : '0');
        if (key === lastTitleLogosKey) return;
        lastTitleLogosKey = key;
        const row = ui.titleLogos;
        row.hidden = logos.length === 0 || !visible;
        row.replaceChildren();
        if (logos.length) {
          row.style.setProperty('--cell-w', (100 / logos.length) + 'vw');
          ['blur', 'sharp'].forEach((kind) => {
            const strip = document.createElement('div');
            strip.className = 'logo-strip logo-strip--' + kind;
            for (let copy = 0; copy < 4; copy++) {
              logos.forEach((src) => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = '';
                strip.appendChild(img);
              });
            }
            row.appendChild(strip);
          });
        }
        requestFit();
      }

      function requestFit() {
        fitNameText();
        fitTitleText();
        fitScoreText();
        fitMidText();
        syncTitleTickerText();
      }

      function fitNameText() {
        const MIN_FIT = 0.26;
        let commonFit = 1;
        ['A', 'B'].forEach((team) => {
          const el = ui.name[team];
          el.style.setProperty('--name-fit', '1');
          const available = el.clientWidth;
          const width = el.scrollWidth;
          if (!available || !width) return;
          if (width <= available) return;
          let fit = Math.max(MIN_FIT, (available / width) * 0.98);
          el.style.setProperty('--name-fit', String(fit));
          let guard = 0;
          while (el.scrollWidth > el.clientWidth + 1 && fit > MIN_FIT && guard < 48) {
            fit = Math.max(MIN_FIT, fit * 0.97);
            el.style.setProperty('--name-fit', String(fit));
            guard += 1;
          }
          commonFit = Math.min(commonFit, fit);
        });
        // Одинаковый размер у обеих команд: плашки названий выглядят ровно.
        ['A', 'B'].forEach((team) => {
          ui.name[team].style.setProperty('--name-fit', String(commonFit));
        });
      }

      let scoreMeasureCtx = null;

      function scoreTextMetrics(text, fontFamily, fontWeight, fontSize) {
        if (!scoreMeasureCtx) scoreMeasureCtx = document.createElement('canvas').getContext('2d');
        // Canvas не понимает line-height в font, поэтому собираем строку сами.
        scoreMeasureCtx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
        const m = scoreMeasureCtx.measureText(text || '0');
        const left = m.actualBoundingBoxLeft || 0;
        const right = m.actualBoundingBoxRight || 0;
        const asc = m.actualBoundingBoxAscent || 0;
        const desc = m.actualBoundingBoxDescent || 0;
        return {
          advance: m.width || right - left || fontSize * 0.6,
          inkWidth: Math.max(1, right - left),
          inkHeight: Math.max(1, asc + desc),
          inkCenterX: (left + right) / 2,
          asc,
          desc,
          fontAsc: m.fontBoundingBoxAscent || fontSize * 0.8,
          fontDesc: m.fontBoundingBoxDescent || fontSize * 0.2
        };
      }

      function fitScoreText() {
        const teams = ['A', 'B'];
        const els = teams.map((team) => ui.scoreEl[team]);
        const boxes = teams.map((team) => ui.scoreBox[team]);
        if (els.some((el) => !el) || boxes.some((box) => !box)) return;

        const bodyScaleRaw = getComputedStyle(ui.body).getPropertyValue('--score-scale').trim();
        const scale = Math.min(5, Math.max(0.5, Number(bodyScaleRaw) || 1));
        const refs = {};
        teams.forEach((team, i) => {
          const el = els[i];
          const cs = getComputedStyle(el);
          const text = el.textContent || '0';
          // Метрики canvas на мелком шрифте округляются до целых пикселей,
          // поэтому нормализуем их на крупном эталоне и масштабируем линейно.
          refs[team] = { text, m: scoreTextMetrics(text, cs.fontFamily, cs.fontWeight, 1000) };
          // Строчка равна контуру цифры: в плашках с авто-высотой иначе остаются поля.
          el.style.setProperty('--score-line', (refs[team].m.inkHeight / 1000).toFixed(5));
        });

        // Заморозим масштаб и подгонку: иначе высота плашки зависит от цифры,
        // а цифра — от высоты плашки. Ползунок начинает всё время «разгонять» размер.
        ui.body.style.setProperty('--score-scale', '1');
        els.forEach((el) => el.style.setProperty('--score-fit', '1'));
        void boxes[0].offsetHeight;

        const base = {};
        let maxRowHeight = Infinity;
        const arena = boxes[0].closest('.arena');
        if (arena) {
          const acs = getComputedStyle(arena);
          const ar = arena.getBoundingClientRect();
          const contentH = ar.height - parseFloat(acs.paddingTop) - parseFloat(acs.paddingBottom);
          const rowSizes = acs.gridTemplateRows.split(' ').map(parseFloat).filter(Number.isFinite);
          const gap = parseFloat(acs.rowGap) || 0;
          const gridTop = ar.top + parseFloat(acs.paddingTop);
          const rowTop = (i) => gridTop + rowSizes.slice(0, i).reduce((sum, v) => sum + v + gap, 0);
          const findRow = (y) => rowSizes.findIndex((h, i) => y >= rowTop(i) - 2 && y <= rowTop(i) + h + 2);
          const scoreRect = boxes[0].getBoundingClientRect();
          const scoreRow = Math.max(0, findRow(scoreRect.top + scoreRect.height / 2));

          // Все строки, где есть видимый контент, должны остаться на месте.
          // Пустая строка-распорка (1fr) в расчёт не идёт — она сжимается первой.
          const fixedRows = new Set();
          Array.from(arena.children).forEach((child) => {
            const r = child.getBoundingClientRect();
            if (r.height <= 0 || r.width <= 0) return;
            const row = findRow(r.top + r.height / 2);
            if (row >= 0 && row !== scoreRow) fixedRows.add(row);
          });
          let fixedH = 0;
          fixedRows.forEach((i) => { fixedH += rowSizes[i] || 0; });
          maxRowHeight = Math.max(0, contentH - fixedH - gap * Math.max(0, rowSizes.length - 1));
        }

        teams.forEach((team, i) => {
          const box = boxes[i];
          const bcs = getComputedStyle(box);
          const br = box.getBoundingClientRect();
          base[team] = {
            padY: parseFloat(bcs.paddingTop) + parseFloat(bcs.paddingBottom),
            inkH: Math.max(1, br.height - parseFloat(bcs.paddingTop) - parseFloat(bcs.paddingBottom)),
            inkW: Math.max(1, br.width - parseFloat(bcs.paddingLeft) - parseFloat(bcs.paddingRight))
          };
        });

        ui.body.style.setProperty('--score-scale', bodyScaleRaw || '1');
        void boxes[0].offsetHeight;

        const fits = teams.map((team, i) => {
          const ref = refs[team].m;
          const ownHeight = base[team].inkH * scale;
          const roomHeight = Number.isFinite(maxRowHeight) ? Math.max(1, maxRowHeight - base[team].padY - 2) : Infinity;
          const roomWidth = base[team].inkW * ref.inkHeight / Math.max(1, ref.inkWidth);
          const targetInk = Math.min(ownHeight, roomHeight, roomWidth);
          return Math.max(0.05, Math.min(12, targetInk / ownHeight));
        });
        // Обе команды должны быть одного размера: плашку ограничивает самая
        // длинная цифра, иначе двузначный счёт делает одну сторону заметно ниже.
        const commonFit = Math.min.apply(null, fits);
        teams.forEach((team, i) => {
          els[i].style.setProperty('--score-fit', String(commonFit));
        });
        void boxes[0].offsetHeight;

        // Подравниваем по настоящему контуру глифа, а не по строчке шрифта.
        teams.forEach((team, i) => {
          const el = els[i];
          const cs = getComputedStyle(el);
          const font = parseFloat(cs.fontSize) || 1;
          const lineHeight = parseFloat(cs.lineHeight) || font * 1.2;
          const m = scoreTextMetrics(refs[team].text, cs.fontFamily, cs.fontWeight, font);
          const baseline = (lineHeight - (m.fontAsc + m.fontDesc)) / 2 + m.fontAsc;
          const inkCenterY = baseline + (m.desc - m.asc) / 2;
          el.style.setProperty('--fit-dx', (m.advance / 2 - m.inkCenterX).toFixed(2) + 'px');
          el.style.setProperty('--fit-dy', (lineHeight / 2 - inkCenterY).toFixed(2) + 'px');
        });
      }

      function fitTitleText() {
        const el = ui.matchTitle;
        if (!el) return;
        const host = ui.titleTrack || el;
        host.style.removeProperty('--title-line');
        host.style.removeProperty('--title-dy');
        host.style.removeProperty('--title-spacing');
        host.style.setProperty('--title-fit', '1');

        // Без бегущей строки длинный заголовок уменьшаем по ширине, чтобы
        // он полностью помещался в плашку и не обрезался по краям.
        if (!document.body.classList.contains('title-ticker')) {
          const MIN_FIT = 0.2;
          const measure = () => {
            host.style.setProperty('--title-fit', '1');
            const available = el.clientWidth;
            const content = el.scrollWidth;
            return available && content > available ? Math.max(MIN_FIT, (available / content) * 0.98) : 1;
          };
          let fit = measure();
          // У слишком длинного заголовка плотный межбуквенный интервал даёт
          // заметно более крупные буквы, а значит и более высокую плашку —
          // без пустых полей сверху и снизу.
          if (fit < 0.95) {
            host.style.setProperty('--title-spacing', '0.02em');
            fit = measure();
          }
          host.style.setProperty('--title-fit', fit.toFixed(4));
          let guard = 0;
          while (fit > MIN_FIT && el.scrollWidth > el.clientWidth + 1 && guard < 48) {
            fit = Math.max(MIN_FIT, fit * 0.97);
            host.style.setProperty('--title-fit', fit.toFixed(4));
            guard += 1;
          }
        }

        const cs = getComputedStyle(el);
        const text = el.textContent || state.titles.match || '—';
        const font = parseFloat(cs.fontSize);
        if (!font) return;
        const m = scoreTextMetrics(text, cs.fontFamily, cs.fontWeight, font);
        // Небольшой запас в 1 px с каждой стороны страхует от обрезки
        // верхних элементов букв при округлении дробных пикселей.
        const SAFE = 2;
        host.style.setProperty('--title-line', ((m.inkHeight + SAFE) / font).toFixed(5));

        const now = getComputedStyle(el);
        const lineHeight = parseFloat(now.lineHeight) || font * 1.1;
        const baseline = (lineHeight - (m.fontAsc + m.fontDesc)) / 2 + m.fontAsc;
        const inkCenterY = baseline + (m.desc - m.asc) / 2;
        host.style.setProperty('--title-dy', (lineHeight / 2 - inkCenterY).toFixed(2) + 'px');
      }

      function fitMidText() {
        const el = ui.mid;
        if (!el) return;
        const host = el.closest('.arena') || el;
        const MIN_FIT = 0.6;
        host.style.setProperty('--mid-fit', '1');
        const availableW = host.clientWidth;
        const availableH = host.clientHeight;
        if (!availableW || !availableH) return;
        const pairs = Array.from(host.querySelectorAll('.mid-pair'));
        // Блок теперь однострочный: следим и за высотой, и за шириной.
        const overflow = () => {
          if (el.scrollHeight > el.clientHeight + 1) return true;
          return pairs.some((pair) => pair.scrollWidth > pair.clientWidth + 1);
        };
        if (!overflow()) return;
        let fit = 1;
        if (el.scrollHeight > el.clientHeight + 1) {
          fit = Math.min(fit, (el.clientHeight / el.scrollHeight) * 0.98);
        }
        pairs.forEach((pair) => {
          if (pair.scrollWidth > pair.clientWidth + 1) {
            fit = Math.min(fit, (pair.clientWidth / pair.scrollWidth) * 0.98);
          }
        });
        fit = Math.max(MIN_FIT, fit);
        host.style.setProperty('--mid-fit', String(fit));
        let guard = 0;
        while (overflow() && fit > MIN_FIT && guard < 80) {
          fit = Math.max(MIN_FIT, fit * 0.97);
          host.style.setProperty('--mid-fit', String(fit));
          guard += 1;
        }
      }

      window.addEventListener('resize', requestFit);
      window.addEventListener('orientationchange', requestFit);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(requestFit).catch(() => null);

      function renderSetsInto(row) {
        row.replaceChildren();
        const total = state.settings.bestOf;
        state.sets.forEach((set) => {
          const el = document.createElement('div');
          el.className = 'box-arena-set';
          el.innerHTML = '<span class="el-arena-set-score ' + (set.a > set.b ? 'winner' : '') + '">' + set.a +
            '</span><span class="el-arena-set-sep">-</span><span class="el-arena-set-score ' + (set.b > set.a ? 'winner' : '') + '">' + set.b + '</span>';
          row.appendChild(el);
        });
        if (!state.matchOver) {
          const cur = document.createElement('div');
          cur.className = 'box-arena-set current';
          cur.innerHTML = '<span class="el-arena-set-score ' + (state.score.A > state.score.B ? 'winner' : '') + '">' + state.score.A +
            '</span><span class="el-arena-set-sep">-</span><span class="el-arena-set-score ' + (state.score.B > state.score.A ? 'winner' : '') + '">' + state.score.B + '</span>';
          row.appendChild(cur);
        }
        const played = state.sets.length + (state.matchOver ? 0 : 1);
        for (let i = played; i < total; i += 1) {
          const empty = document.createElement('div');
          empty.className = 'box-arena-set unplayed';
          empty.innerHTML = '<span class="el-arena-set-empty">-</span>';
          row.appendChild(empty);
        }
      }

      function renderSets() {
        renderSetsInto(ui.setsRow);
      }

      function renderControls() {
        const frozen = state.matchOver || DISPLAY;
        ['A', 'B'].forEach((t) => {
          ui.scoreBox[t].style.cursor = frozen ? 'default' : 'pointer';
        });
        const overHint = state.matchOver ? 'Матч завершён — нажмите «Новый матч»' : '';
        $$('.controls .ctrl').forEach((btn) => {
          if (btn.id === 'undo') {
            btn.disabled = undoStack.length === 0;
            return;
          }
          if (btn.id === 'endSet' || btn.id === 'resetSet' || btn.id === 'newMatch') btn.disabled = DISPLAY;
          else btn.disabled = frozen;
          if (btn.id === 'resetSet') btn.title = overHint || 'Сбросить очки текущей партии (R)';
          else if (btn.id === 'endSet') btn.title = overHint || 'Завершить текущую партию (S)';
          else if (btn.id === 'newMatch') btn.title = 'Новый матч (N)';
        });
        ['A', 'B'].forEach((t) => {
          ui.timeoutEl[t].style.cursor = frozen || state.timeouts[t] <= 0 ? 'default' : 'pointer';
          if (ui.kts) ui.kts.to[t].style.cursor = frozen || state.timeouts[t] <= 0 ? 'default' : 'pointer';
        });
      }

      let toastTimer = null;
      function showToast(text) {
        ui.toast.textContent = text;
        ui.toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => ui.toast.classList.remove('show'), 2200);
      }

      /* ---------- Редактирование ---------- */
      function bindName(el, team) {
        el.addEventListener('input', () => {
          state.names[team] = el.textContent.replace(/\s+/g, ' ').trim().toUpperCase().slice(0, 30) || (team === 'A' ? 'КОМАНДА А' : 'КОМАНДА Б');
          state.rev = Math.max(Date.now(), state.rev + 1);
          persist();
          sync.sendState();
          requestFit();
        });
        el.addEventListener('blur', () => {
          el.textContent = state.names[team];
          render();
        });
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); el.blur(); }
        });
      }
      bindName(ui.name.A, 'A');
      bindName(ui.name.B, 'B');

      [['match', ui.matchTitle]].forEach(([key, el]) => {
        el.addEventListener('input', () => {
          state.titles[key] = el.textContent.replace(/\s+/g, ' ').trim().slice(0, 40);
          state.rev = Math.max(Date.now(), state.rev + 1);
          fitTitleText();
          syncTitleTickerText();
          persist();
          sync.sendState();
        });
        el.addEventListener('blur', () => { el.textContent = state.titles[key]; });
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); el.blur(); } });
      });

      /* ---------- События ---------- */
      ui.scoreBox.A.addEventListener('click', (e) => { if (e.shiftKey || e.altKey) removePoint('A'); else addPoint('A'); });
      ui.scoreBox.B.addEventListener('click', (e) => { if (e.shiftKey || e.altKey) removePoint('B'); else addPoint('B'); });
      ui.scoreBox.A.addEventListener('contextmenu', (e) => { e.preventDefault(); removePoint('A'); });
      ui.scoreBox.B.addEventListener('contextmenu', (e) => { e.preventDefault(); removePoint('B'); });

      $('#plusA').addEventListener('click', () => addPoint('A'));
      $('#minusA').addEventListener('click', () => removePoint('A'));
      $('#plusB').addEventListener('click', () => addPoint('B'));
      $('#minusB').addEventListener('click', () => removePoint('B'));
      $('#toAbtn').addEventListener('click', () => timeout('A'));
      $('#toBbtn').addEventListener('click', () => timeout('B'));
      ui.timeoutEl.A.addEventListener('click', () => timeout('A'));
      ui.timeoutEl.B.addEventListener('click', () => timeout('B'));
      ui.serve.A.addEventListener('click', () => toggleServe('A'));
      ui.serve.B.addEventListener('click', () => toggleServe('B'));
      $('#endSet').addEventListener('click', endSetManual);
      $('#resetSet').addEventListener('click', resetSet);
      $('#undo').addEventListener('click', undo);
      $('#newMatch').addEventListener('click', newMatch);

      $('#soundBtn').addEventListener('click', () => {
        state.settings.sound = !state.settings.sound;
        state.rev = Math.max(Date.now(), state.rev + 1);
        persist();
        render();
        sync.sendState();
      });

      $('#fsBtn').addEventListener('click', () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      });

      function boardUrl(transparentBg) {
        const url = new URL('board.html', location.href);
        url.searchParams.set('room', room);
        if (transparentBg) url.searchParams.set('bg', 'transparent');
        return url.toString();
      }

      function remoteUrl() {
        const port = location.port || '8787';
        if (location.protocol === 'file:') {
          return 'http://<IP-компьютера>:' + port + '/remote.html?room=' + encodeURIComponent(room);
        }
        const hostname = location.hostname;
        const local = !hostname || hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
        const base = local
          ? (lanIp ? 'http://' + lanIp + ':' + port : 'http://<IP-компьютера>:' + port)
          : location.origin;
        return base + '/remote.html?room=' + encodeURIComponent(room);
      }

      $('#boardBtn').addEventListener('click', () => {
        window.open(boardUrl(false), '_blank', 'noopener');
      });

      $('#remoteBtn').addEventListener('click', async () => {
        let url = remoteUrl();
        if (url.includes('<IP-компьютера>') && location.protocol !== 'file:') {
          try {
            const data = await fetch('/net').then((response) => response.json());
            if (data && Array.isArray(data.ips) && data.ips.length) {
              lanIp = String(data.ips[0] || '');
              url = remoteUrl();
            }
          } catch { /* ignore */ }
        }
        if (url.includes('<IP-компьютера>')) {
          showToast('Не удалось определить IP. Откройте /net или настройки ⚙');
          return;
        }
        const phone = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || innerWidth <= 760;
        if (phone) location.href = url;
        else window.open(url, '_blank', 'noopener');
      });

      ui.syncPill.addEventListener('click', () => {
        const full = boardUrl(true);
        const bug = location.origin + '/overlay.html?room=' + encodeURIComponent(room);
        const text = 'Комната: ' + room + '\nТабло: ' + boardUrl(false) + '\nПульт: ' + remoteUrl() + '\nOBS табло: ' + full + '\nOBS оверлей: ' + bug;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => showToast('Ссылки для OBS скопированы'), () => showToast(full));
        } else {
          showToast(full);
        }
      });

      /* ---------- Настройки ---------- */
      function openSettings() {
        const f = ui.settingsForm;
        f.elements.match.value = state.titles.match;
        f.elements.room.value = room;
        f.elements.teamA.value = state.names.A;
        f.elements.teamB.value = state.names.B;
        f.elements.bestOf.value = String(state.settings.bestOf);
        f.elements.points.value = String(state.settings.points);
        f.elements.deciding.value = String(state.settings.deciding);
        f.elements.theme.value = state.settings.theme;
        f.elements.layout.value = state.design.layout;
        lastLayoutBeforeYoutube = state.design.layout === 'youtube' || !LAYOUT_KEYS.includes(state.design.layout)
          ? 'arena'
          : state.design.layout;
        f.elements.youtube.checked = f.elements.layout.value === 'youtube';
        SCALE_KEYS.forEach((key) => { f.elements[key].value = state.design[key]; });
        syncScaleOutputs();
        fillPaletteFields(f.elements.layout.value);
        f.elements.logoHeight.value = state.design.logoHeight;
        f.elements.logoPos.value = state.design.logoPos;
        f.elements.logo.value = '';
        pendingLogo = state.design.logo;
        updateLogoPreview();
        f.elements.titleLogoHeight.value = state.design.titleLogoHeight;
        updateTitleLogosVisibleBtn();
        updateTitleLogoTickerBtn();
        const savedTitleLogos = state.design.titleLogos || [];
        pendingTitleLogos = [];
        for (let i = 0; i < TITLE_LOGO_COUNT; i += 1) {
          titleLogoInputs[i].value = '';
          pendingTitleLogos.push(typeof savedTitleLogos[i] === 'string' ? savedTitleLogos[i] : '');
          updateTitleLogoPreview(i);
        }
        f.elements.teamLogoA.value = '';
        f.elements.teamLogoB.value = '';
        f.elements.teamLogoHeight.value = state.design.teamLogoHeight;
        pendingTeamLogo.A = state.design.teamLogoA;
        pendingTeamLogo.B = state.design.teamLogoB;
        updateTeamLogoPreview('A');
        updateTeamLogoPreview('B');
        f.elements.youtubeLogoA.value = '';
        f.elements.youtubeLogoB.value = '';
        pendingYtLogo.A = state.design.youtubeLogoA;
        pendingYtLogo.B = state.design.youtubeLogoB;
        f.elements.youtubeLogoHeight.value = state.design.youtubeLogoHeight;
        updateYtLogoPreview('A');
        updateYtLogoPreview('B');
        f.elements.bgImage.value = '';
        f.elements.bgFit.value = state.design.bgFit;
        f.elements.bgDim.value = state.design.bgDim;
        f.elements.bgBlur.value = state.design.bgBlur;
        f.elements.homeImage.value = '';
        f.elements.awayImage.value = '';
        f.elements.teamImageDim.value = state.design.teamImageDim;
        pendingBgImage = state.design.bgImage;
        pendingHomeImage = state.design.homeImage;
        pendingAwayImage = state.design.awayImage;
        updateImagePreview(ui.bgImagePreview, pendingBgImage);
        updateImagePreview(ui.homeImagePreview, pendingHomeImage);
        updateImagePreview(ui.awayImagePreview, pendingAwayImage);
        f.elements.autoClose.checked = state.settings.autoClose;
        f.elements.sound.checked = state.settings.sound;
        f.elements.showTimeouts.checked = state.settings.showTimeouts;
        ui.boardLinkText.textContent = boardUrl(false);
        ui.remoteLinkText.textContent = remoteUrl();
        ui.obsFull.textContent = boardUrl(true);
        ui.obsBug.textContent = location.origin + '/overlay.html?room=' + room;
        ui.settingsOverlay.hidden = false;
        f.elements.match.focus();
      }

      function closeSettings() {
        ui.settingsOverlay.hidden = true;
        applyDesign();
      }

      function updateLogoPreview() {
        const has = Boolean(pendingLogo);
        ui.logoPreview.src = has ? pendingLogo : '';
        ui.logoPreview.classList.toggle('on', has);
      }

      function updateTitleLogoPreview(index) {
        const src = pendingTitleLogos[index] || '';
        titleLogoPreviews[index].src = src;
        titleLogoPreviews[index].classList.toggle('on', Boolean(src));
      }

      function updateTeamLogoPreview(team) {
        const src = pendingTeamLogo[team];
        const has = Boolean(src);
        ui.teamLogoPreview[team].src = has ? src : '';
        ui.teamLogoPreview[team].classList.toggle('on', has);
      }

      function updateYtLogoPreview(team) {
        const src = pendingYtLogo[team];
        const has = Boolean(src);
        ui.ytLogoPreview[team].src = has ? src : '';
        ui.ytLogoPreview[team].classList.toggle('on', has);
      }

      function updateImagePreview(img, src) {
        const has = Boolean(src);
        img.src = has ? src : '';
        img.classList.toggle('on', has);
      }

      function syncScaleOutputs() {
        SCALE_KEYS.forEach((key) => {
          const input = ui.settingsForm.elements[key];
          const output = document.querySelector('[data-scale-out="' + key + '"]');
          if (input && output) output.textContent = input.value + '%';
        });
      }

      function applyScalePreview() {
        SCALE_KEYS.forEach((key) => {
          const input = ui.settingsForm.elements[key];
          if (input) ui.body.style.setProperty(SCALE_VARS[key], String(Number(input.value) / 100));
        });
        requestFit();
      }

      function updateFontPreview() {
        const el = $('#fontPreview');
        if (!el) return;
        const value = ui.settingsForm.elements.font.value;
        el.style.fontFamily = FONTS[value] || FONTS.bebas;
      }

      // Поля «Цвета» и «Шрифт» показывают палитру того табло, которое выбрано в форме.
      function fillPaletteFields(layoutValue) {
        const f = ui.settingsForm;
        const active = paletteFor(layoutValue);
        COLOR_KEYS.forEach((key) => { f.elements[key].value = active.palette[key]; });
        f.elements.font.value = FONT_KEYS.includes(active.font) ? active.font : 'bebas';
        updateFontPreview();
      }

      function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
          reader.readAsDataURL(file);
        });
      }

      function loadImage(dataUrl) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Не удалось открыть картинку'));
          img.src = dataUrl;
        });
      }

      async function compressImage(file, maxSide, maxChars) {
        if (!file || !/^image\//.test(file.type)) throw new Error('Это не картинка');
        if (file.size > 12 * 1024 * 1024) throw new Error('Файл больше 12 МБ');
        const original = await fileToDataUrl(file);
        if (file.type === 'image/svg+xml' && original.length <= maxChars) return original;
        const img = await loadImage(original);
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;
        if (!width || !height) throw new Error('Пустая картинка');
        const scale = Math.min(1, maxSide / Math.max(width, height));
        let w = Math.max(1, Math.round(width * scale));
        let h = Math.max(1, Math.round(height * scale));
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Браузер не может обработать картинку');
        const qualities = [0.9, 0.8, 0.68, 0.55, 0.42];
        for (let attempt = 0; attempt < 2; attempt += 1) {
          canvas.width = w;
          canvas.height = h;
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          for (const q of qualities) {
            const data = canvas.toDataURL('image/webp', q);
            if (data.length <= maxChars) return data;
          }
          w = Math.max(1, Math.round(w * 0.72));
          h = Math.max(1, Math.round(h * 0.72));
        }
        throw new Error('Картинка слишком большая — попробуйте другую');
      }

      function pickImage(input, options) {
        const file = input.files && input.files[0];
        if (!file) return;
        input.value = '';
        showToast('Обрабатываю картинку…');
        compressImage(file, options.maxSide, options.maxChars)
          .then((src) => {
            options.done(src);
            showToast('Картинка готова');
          })
          .catch((err) => showToast(err && err.message ? err.message : 'Не удалось загрузить картинку'));
      }

      const titleLogoInputs = [];
      const titleLogoPreviews = [];
      (function buildTitleLogoFields() {
        const grid = $('#titleLogoGrid');
        if (!grid) return;
        for (let i = 0; i < TITLE_LOGO_COUNT; i += 1) {
          const item = document.createElement('div');
          const head = document.createElement('div');
          head.className = 'team-logo-head';
          head.textContent = 'ЛОГО ' + (i + 1);
          const row = document.createElement('div');
          row.className = 'logo-row';
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.id = 'fTitleLogo' + (i + 1);
          const clear = document.createElement('button');
          clear.type = 'button';
          clear.className = 'btn small';
          clear.textContent = 'УБРАТЬ';
          const preview = document.createElement('span');
          preview.className = 'logo-preview';
          const img = document.createElement('img');
          img.alt = '';
          preview.appendChild(img);
          row.append(input, clear, preview);
          item.append(head, row);
          grid.appendChild(item);

          input.addEventListener('change', () => {
            pickImage(input, {
              maxSide: 320,
              maxChars: 200000,
              done: (src) => {
                pendingTitleLogos[i] = src;
                updateTitleLogoPreview(i);
              }
            });
          });
          clear.addEventListener('click', () => {
            pendingTitleLogos[i] = '';
            input.value = '';
            updateTitleLogoPreview(i);
          });

          titleLogoInputs.push(input);
          titleLogoPreviews.push(img);
        }
      })();

      ui.settingsForm.elements.theme.addEventListener('change', () => {
        const palette = THEMES[ui.settingsForm.elements.theme.value];
        if (!palette) return;
        COLOR_KEYS.forEach((key) => { ui.settingsForm.elements[key].value = palette[key]; });
      });

      ui.settingsForm.elements.layout.addEventListener('change', () => {
        const value = ui.settingsForm.elements.layout.value;
        const kts = isKtsLayout(value);
        const yt = isYoutubeLayout(value);
        const sets = isSetsLayout(value);
        if (kts || yt || sets) applyBottomBar();
        else revertBottomBar();
        ui.body.classList.toggle('style-kts', kts);
        ui.body.classList.toggle('style-youtube', yt);
        ui.body.classList.toggle('style-ytsets', sets);
        ui.body.dataset.layout = (kts || yt || sets) ? 'arena' : (LAYOUT_KEYS.includes(value) ? value : 'arena');
        const active = paletteFor(value);
        const palette = active.palette;
        const font = active.font;
        ui.body.style.setProperty('--font-family', FONTS[font] || FONTS.bebas);
        ui.body.style.setProperty('--bg', palette.bg);
        ui.body.style.setProperty('--title-bg', palette.titleBg);
        ui.body.style.setProperty('--text', palette.text);
        ui.body.style.setProperty('--home-bg', palette.homeBg);
        ui.body.style.setProperty('--home-fg', palette.homeFg);
        ui.body.style.setProperty('--away-bg', palette.awayBg);
        ui.body.style.setProperty('--away-fg', palette.awayFg);
        if (ui.liveBadge) ui.liveBadge.hidden = !(yt || sets);
        const ytBox = ui.settingsForm.elements.youtube;
        if (ytBox) ytBox.checked = value === 'youtube';
        fillPaletteFields(value);
        requestFit();
      });

      let lastLayoutBeforeYoutube = 'arena';
      ui.settingsForm.elements.youtube.addEventListener('change', () => {
        const check = ui.settingsForm.elements.youtube;
        const select = ui.settingsForm.elements.layout;
        if (check.checked) {
          if (select.value !== 'youtube') lastLayoutBeforeYoutube = select.value;
          select.value = 'youtube';
        } else if (select.value === 'youtube') {
          select.value = LAYOUT_KEYS.includes(lastLayoutBeforeYoutube) && lastLayoutBeforeYoutube !== 'youtube'
            ? lastLayoutBeforeYoutube
            : 'arena';
        }
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });

      ui.settingsForm.elements.font.addEventListener('change', () => {
        const value = ui.settingsForm.elements.font.value;
        ui.body.style.setProperty('--font-family', FONTS[value] || FONTS.bebas);
        updateFontPreview();
        requestFit();
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(requestFit).catch(() => null);
        }
        setTimeout(requestFit, 160);
      });

      SCALE_KEYS.forEach((key) => {
        const input = ui.settingsForm.elements[key];
        input.addEventListener('input', () => {
          const output = document.querySelector('[data-scale-out="' + key + '"]');
          if (output) output.textContent = input.value + '%';
          ui.body.style.setProperty(SCALE_VARS[key], String(Number(input.value) / 100));
          requestFit();
        });
      });

      $('#scaleReset').addEventListener('click', () => {
        SCALE_KEYS.forEach((key) => { ui.settingsForm.elements[key].value = 100; });
        syncScaleOutputs();
        applyScalePreview();
      });

      ui.settingsForm.elements.logo.addEventListener('change', () => {
        const input = ui.settingsForm.elements.logo;
        pickImage(input, {
          maxSide: 640,
          maxChars: 320000,
          done: (src) => {
            pendingLogo = src;
            updateLogoPreview();
          }
        });
      });

      $('#logoClear').addEventListener('click', () => {
        pendingLogo = '';
        ui.settingsForm.elements.logo.value = '';
        updateLogoPreview();
      });

      ui.settingsForm.elements.titleLogoHeight.addEventListener('input', () => {
        const value = clamp(Math.round(Number(ui.settingsForm.elements.titleLogoHeight.value) || 120), 16, 1000);
        ui.body.style.setProperty('--title-logo-height', value + 'px');
        requestFit();
      });

      ui.titleLogosVisibleBtn.addEventListener('click', () => {
        state.design.titleLogosVisible = state.design.titleLogosVisible === false;
        state.rev = Math.max(Date.now(), state.rev + 1);
        updateTitleLogosVisibleBtn();
        persist();
        render();
        sync.sendState();
        showToast(state.design.titleLogosVisible ? 'Логотипы в шапке включены' : 'Логотипы в шапке выключены — только название и счёт');
      });

      ui.titleLogoTickerBtn.addEventListener('click', () => {
        state.design.titleLogoTicker = !state.design.titleLogoTicker;
        state.rev = Math.max(Date.now(), state.rev + 1);
        updateTitleLogoTickerBtn();
        persist();
        render();
        sync.sendState();
        showToast(state.design.titleLogoTicker ? 'Бегущая строка включена' : 'Бегущая строка выключена');
      });

      ui.titleTickerBtn.addEventListener('click', () => {
        state.design.titleTicker = !state.design.titleTicker;
        state.rev = Math.max(Date.now(), state.rev + 1);
        updateTitleTickerBtn();
        persist();
        render();
        sync.sendState();
        showToast(state.design.titleTicker ? 'Бегущая строка заголовка включена' : 'Бегущая строка заголовка выключена');
      });

      ui.titlePositionBtn.addEventListener('click', () => {
        state.design.titlePosition = state.design.titlePosition === 'above' ? 'below' : 'above';
        state.rev = Math.max(Date.now(), state.rev + 1);
        updateTitlePositionBtn();
        persist();
        render();
        sync.sendState();
        showToast(state.design.titlePosition === 'above' ? 'Название турнира сверху логотипов' : 'Название турнира снизу логотипов');
      });

      [['A', 'fTeamLogoA', 'teamLogoAClear'], ['B', 'fTeamLogoB', 'teamLogoBClear']].forEach(([team, inputId, clearId]) => {
        const input = document.getElementById(inputId);
        input.addEventListener('change', () => {
          pickImage(input, {
            maxSide: 640,
            maxChars: 320000,
            done: (src) => {
              pendingTeamLogo[team] = src;
              updateTeamLogoPreview(team);
            }
          });
        });
        document.getElementById(clearId).addEventListener('click', () => {
          pendingTeamLogo[team] = '';
          input.value = '';
          updateTeamLogoPreview(team);
        });
      });

      [['A', 'fYtLogoA', 'ytLogoAClear'], ['B', 'fYtLogoB', 'ytLogoBClear']].forEach(([team, inputId, clearId]) => {
        const input = document.getElementById(inputId);
        input.addEventListener('change', () => {
          pickImage(input, {
            maxSide: 640,
            maxChars: 320000,
            done: (src) => {
              pendingYtLogo[team] = src;
              updateYtLogoPreview(team);
            }
          });
        });
        document.getElementById(clearId).addEventListener('click', () => {
          pendingYtLogo[team] = '';
          input.value = '';
          updateYtLogoPreview(team);
        });
      });

      document.getElementById('fBgImage').addEventListener('change', (e) => {
        const input = e.currentTarget;
        pickImage(input, {
          maxSide: 1920,
          maxChars: 1500000,
          done: (src) => {
            pendingBgImage = src;
            updateImagePreview(ui.bgImagePreview, pendingBgImage);
          }
        });
      });
      document.getElementById('bgImageClear').addEventListener('click', () => {
        pendingBgImage = '';
        document.getElementById('fBgImage').value = '';
        updateImagePreview(ui.bgImagePreview, '');
      });

      [['home', 'fHomeImage', 'homeImageClear'], ['away', 'fAwayImage', 'awayImageClear']].forEach(([team, inputId, clearId]) => {
        const input = document.getElementById(inputId);
        input.addEventListener('change', () => {
          pickImage(input, {
            maxSide: 1400,
            maxChars: 900000,
            done: (src) => {
              if (team === 'home') pendingHomeImage = src;
              else pendingAwayImage = src;
              updateImagePreview(team === 'home' ? ui.homeImagePreview : ui.awayImagePreview, src);
            }
          });
        });
        document.getElementById(clearId).addEventListener('click', () => {
          if (team === 'home') pendingHomeImage = '';
          else pendingAwayImage = '';
          input.value = '';
          updateImagePreview(team === 'home' ? ui.homeImagePreview : ui.awayImagePreview, '');
        });
      });

      $('#settingsBtn').addEventListener('click', openSettings);
      $('#settingsCancel').addEventListener('click', closeSettings);
      ui.settingsOverlay.addEventListener('click', (e) => { if (e.target === ui.settingsOverlay) closeSettings(); });

      ui.settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const f = ui.settingsForm;
        const newRoom = String(f.elements.room.value || 'main').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'main';

        if (newRoom !== room) {
          persist();
          room = newRoom;
          state = loadLocal(room);
          state.settings.room = room;
          undoStack.length = 0;
          persist();
          closeSettings();
          render();
          sync.connect();
          history.replaceState(null, '', '?room=' + encodeURIComponent(room));
          showToast('Комната: ' + room);
          return;
        }

        const bestOf = [1, 3, 5].includes(Number(f.elements.bestOf.value)) ? Number(f.elements.bestOf.value) : 5;
        const points = [11, 15, 21, 25].includes(Number(f.elements.points.value)) ? Number(f.elements.points.value) : 25;
        const deciding = [11, 15, 21].includes(Number(f.elements.deciding.value)) ? Number(f.elements.deciding.value) : 15;
        const formatChanged = bestOf !== state.settings.bestOf || points !== state.settings.points || deciding !== state.settings.deciding;
        const inProgress = state.sets.length > 0 || state.score.A > 0 || state.score.B > 0 || state.setsWon.A > 0 || state.setsWon.B > 0;
        if (formatChanged && inProgress && !confirm('Изменение формата сбросит текущий матч. Продолжить?')) return;

        state.titles.match = String(f.elements.match.value || '').trim().slice(0, 40) || 'ВОЛЕЙБОЛ';
        state.names.A = String(f.elements.teamA.value || '').trim().toUpperCase().slice(0, 30) || 'КОМАНДА А';
        state.names.B = String(f.elements.teamB.value || '').trim().toUpperCase().slice(0, 30) || 'КОМАНДА Б';
        state.settings.bestOf = bestOf;
        state.settings.points = points;
        state.settings.deciding = deciding;
        state.settings.theme = f.elements.theme.value;
        const layoutValue = LAYOUT_KEYS.includes(f.elements.layout.value) ? f.elements.layout.value : 'arena';
        state.design.layout = layoutValue;
        const active = paletteFor(layoutValue);
        const activePalette = active.palette;
        COLOR_KEYS.forEach((key) => {
          const value = String(f.elements[key].value || '');
          if (/^#[0-9a-fA-F]{6}$/.test(value)) activePalette[key] = value;
        });
        const fontValue = FONT_KEYS.includes(f.elements.font.value) ? f.elements.font.value : 'bebas';
        if (active.kind === 'kts') state.design.ktsFont = fontValue;
        else if (active.kind === 'youtube') state.design.youtubeFont = fontValue;
        else if (active.kind === 'ytsets') state.design.ytsetsFont = fontValue;
        else state.design.font = fontValue;
        SCALE_KEYS.forEach((key) => {
          const [min, max] = SCALE_LIMITS[key];
          state.design[key] = clamp(Math.round(Number(f.elements[key].value) || 100), min, max);
        });
        state.design.logoHeight = clamp(Math.round(Number(f.elements.logoHeight.value) || 64), 16, 200);
        state.design.logoPos = f.elements.logoPos.value === 'right' ? 'right' : 'left';
        state.design.logo = pendingLogo;
        state.design.titleLogos = pendingTitleLogos.slice(0, TITLE_LOGO_COUNT).map((x) => (typeof x === 'string' ? x : ''));
        state.design.titleLogoHeight = clamp(Math.round(Number(f.elements.titleLogoHeight.value) || 120), 16, 1000);
        state.design.teamLogoA = pendingTeamLogo.A;
        state.design.teamLogoB = pendingTeamLogo.B;
        state.design.teamLogoHeight = clamp(Math.round(Number(f.elements.teamLogoHeight.value) || 56), 16, 600);
        state.design.youtubeLogoHeight = clamp(Math.round(Number(f.elements.youtubeLogoHeight.value) || 56), 16, 600);
        state.design.youtubeLogoA = pendingYtLogo.A;
        state.design.youtubeLogoB = pendingYtLogo.B;
        state.design.bgImage = pendingBgImage;
        state.design.bgFit = ['cover', 'contain', 'stretch', 'repeat'].includes(f.elements.bgFit.value) ? f.elements.bgFit.value : 'cover';
        state.design.bgDim = clamp(Math.round(Number(f.elements.bgDim.value) || 0), 0, 90);
        state.design.bgBlur = clamp(Math.round(Number(f.elements.bgBlur.value) || 0), 0, 30);
        state.design.homeImage = pendingHomeImage;
        state.design.awayImage = pendingAwayImage;
        state.design.teamImageDim = clamp(Math.round(Number(f.elements.teamImageDim.value) || 0), 0, 90);
        state.settings.autoClose = f.elements.autoClose.checked;
        state.settings.sound = f.elements.sound.checked;
        state.settings.showTimeouts = f.elements.showTimeouts.checked;
        state.settings.room = newRoom;

        if (formatChanged) {
          state.score = { A: 0, B: 0 };
          state.setsWon = { A: 0, B: 0 };
          state.sets = [];
          state.setNumber = 1;
          state.serve = null;
          state.timeouts = { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS };
          state.matchOver = false;
          undoStack.length = 0;
        }

        state.rev = Math.max(Date.now(), state.rev + 1);
        persist();
        closeSettings();
        render();

        sync.sendState();
      });

      /* ---------- Клавиатура ---------- */
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeSettings(); return; }
        if (e.target && (e.target.isContentEditable || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName))) return;
        const k = e.key.toLowerCase();
        if (k === 'a') { e.preventDefault(); addPoint('A'); }
        else if (k === 'z') { e.preventDefault(); removePoint('A'); }
        else if (k === 'k') { e.preventDefault(); addPoint('B'); }
        else if (k === 'm') { e.preventDefault(); removePoint('B'); }
        else if (k === 's') { e.preventDefault(); endSetManual(); }
        else if (k === 'u') { e.preventDefault(); undo(); }
        else if (k === 'r') { e.preventDefault(); resetSet(); }
        else if (k === 'n') { e.preventDefault(); newMatch(); }
        else if (k === 'f') { e.preventDefault(); $('#fsBtn').click(); }
        else if (k === 'b') { e.preventDefault(); $('#boardBtn').click(); }
        else if (k === 't') { e.preventDefault(); timeout(e.shiftKey ? 'B' : 'A'); }
      });

      document.addEventListener('pointerdown', ensureAudio, { once: true });

      window.addEventListener('beforeunload', () => sync.close());

      /* ---------- Старт ---------- */
      if (DISPLAY) {
        ui.name.A.contentEditable = 'false';
        ui.name.B.contentEditable = 'false';
        ui.matchTitle.contentEditable = 'false';
      }
      applyStatsBlock();
      if (location.protocol !== 'file:') {
        fetch('/net').then((response) => response.json()).then((data) => {
          if (data && Array.isArray(data.ips) && data.ips.length) {
            lanIp = String(data.ips[0] || '');
            if (!ui.settingsOverlay.hidden) ui.remoteLinkText.textContent = remoteUrl();
          }
        }).catch(() => null);
      }
      render();
      sync.connect();
      persist();
    })();
  </script>
</body>

</html>
```

## remote.html

```html
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#070b13">
  <title>Пульт — Волейбол</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@400;600;800&family=Oswald:wght@400;600;700&family=Roboto+Condensed:wght@400;700&family=Russo+One&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      height: 100%;
      background: #070b13;
      color: #e8eefb;
      font-family: var(--app-font, "Bebas Neue", "Oswald", Roboto, system-ui, -apple-system, "Segoe UI", sans-serif);
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      overscroll-behavior: none;
      touch-action: manipulation;
      user-select: none;
    }

    .app {
      display: grid;
      grid-template-rows: auto auto minmax(0, 1fr) auto;
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
      width: 100%;
      max-width: 1100px;
      height: 100dvh;
      margin: 0 auto;
      padding: 8px;
      padding-top: calc(8px + env(safe-area-inset-top));
      padding-bottom: calc(4px + env(safe-area-inset-bottom));
    }

    .top {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 34px;
      padding: 0 4px;
    }

    .top-title {
      flex: 1 1 auto;
      min-width: 0;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #a9bbdd;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .top-meta {
      flex: 0 0 auto;
      font-size: 10px;
      letter-spacing: 0.12em;
      color: #7086ad;
      white-space: nowrap;
    }

    .match-strip {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      min-height: 30px;
      padding: 4px 8px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.03);
      color: #7f93b8;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .match-strip::-webkit-scrollbar { display: none; }

    .strip-item {
      display: inline-flex;
      align-items: baseline;
      gap: 4px;
      flex: 0 0 auto;
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .strip-item b {
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.02em;
      color: #dbe7fb;
      font-variant-numeric: tabular-nums;
    }

    .strip-sep {
      flex: 0 0 auto;
      width: 1px;
      height: 12px;
      background: rgba(255, 255, 255, 0.12);
    }

    .strip-timeouts b { color: #ffd28a; }
    .strip-history b { color: #9fd8ff; }

    .status {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 9px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.04);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #93a7cc;
      cursor: pointer;
    }

    .status .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #f87171;
      box-shadow: 0 0 8px rgba(248, 113, 113, 0.9);
    }

    .status.online .dot {
      background: #34d399;
      box-shadow: 0 0 8px rgba(52, 211, 153, 0.9);
    }

    .teams {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
      min-height: 0;
    }

    .team {
      --team-bg: #1c2740;
      --team-fg: #ffffff;
      display: grid;
      grid-template-rows: auto auto minmax(48px, 1fr) auto;
      min-height: 0;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 18px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.18));
      box-shadow: 0 16px 40px -24px rgba(0, 0, 0, 0.95);
    }

    .team-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 14px;
      background-color: var(--team-bg);
      color: var(--team-fg);
    }

    .team-name {
      flex: 1 1 auto;
      min-width: 0;
      font-size: clamp(15px, 3.6vw, 24px);
      font-weight: 900;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .team-sets {
      flex: 0 0 auto;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.82;
      white-space: nowrap;
    }

    .score {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 0;
      font-size: clamp(58px, 15vh, 150px);
      font-weight: 900;
      line-height: 1;
      color: #ffffff;
      font-variant-numeric: tabular-nums;
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.65);
    }

    .plus {
      width: 100%;
      min-height: 48px;
      border: 0;
      border-radius: 0;
      background-color: var(--team-bg);
      color: var(--team-fg);
      font-family: inherit;
      font-size: clamp(20px, 3.4vh, 32px);
      font-weight: 900;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      cursor: pointer;
      transition: filter 0.08s, transform 0.08s;
    }

    .plus:active:not(:disabled) {
      filter: brightness(1.28);
      transform: scale(0.995);
    }

    button:disabled {
      cursor: default;
      opacity: 0.4;
    }

    .actions {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.55fr);
      gap: 8px;
      padding: 8px;
      background: rgba(0, 0, 0, 0.28);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 54px;
      padding: 6px 10px;
      border-radius: 12px;
      font-family: inherit;
      font-weight: 800;
      font-size: 17px;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: filter 0.08s, background 0.12s;
    }

    .btn:active:not(:disabled) { filter: brightness(1.25); }

    .minus {
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.07);
      color: #d7e3f8;
    }

    .timeout {
      border: 1px solid rgba(255, 190, 59, 0.42);
      background: rgba(255, 190, 59, 0.13);
      color: #ffd28a;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .timeout .to-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      border-radius: 999px;
      background: rgba(255, 190, 59, 0.22);
      font-size: 13px;
      letter-spacing: 0;
    }

    .foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-height: 26px;
      padding: 0 4px;
      font-size: 10px;
      letter-spacing: 0.08em;
      color: #66799c;
    }

    .link-btn {
      border: 0;
      background: none;
      padding: 6px 2px;
      color: #8ea0c4;
      font-family: inherit;
      font-size: 11px;
      letter-spacing: 0.04em;
      text-decoration: underline;
      cursor: pointer;
    }

    .over {
      position: fixed;
      inset: 0;
      z-index: 20;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgba(4, 8, 16, 0.88);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
      text-align: center;
    }

    .over[hidden] { display: none; }

    .over-card {
      width: min(420px, 100%);
      padding: 26px 22px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 20px;
      background: rgba(20, 28, 46, 0.92);
    }

    .over-title {
      margin: 0 0 6px;
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #8ea0c4;
    }

    .over-name {
      margin: 0 0 20px;
      font-size: clamp(24px, 6vw, 38px);
      font-weight: 900;
      line-height: 1.05;
      text-transform: uppercase;
    }

    .over-btn {
      width: 100%;
      min-height: 52px;
      border: 0;
      border-radius: 12px;
      background: #2f6bff;
      color: #ffffff;
      font-family: inherit;
      font-size: 16px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      cursor: pointer;
    }

    .toast {
      position: fixed;
      left: 50%;
      bottom: 86px;
      z-index: 30;
      transform: translate(-50%, 12px);
      padding: 9px 16px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      background: rgba(8, 12, 22, 0.94);
      font-size: 12px;
      letter-spacing: 0.04em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s, transform 0.18s;
    }

    .toast.show {
      opacity: 1;
      transform: translate(-50%, 0);
    }

    @media (orientation: landscape), (min-width: 760px) {
      .teams { grid-template-columns: 1fr 1fr; }
    }

    @media (max-height: 540px) {
      .score { font-size: clamp(46px, 14vh, 96px); }
      .btn { min-height: 46px; }
      .plus { min-height: 40px; }
      .team-head { padding: 6px 12px; }
      .match-strip { min-height: 26px; padding: 2px 8px; }
    }
  </style>
</head>
<body>
  <div class="app">
    <header class="top">
      <div class="top-title" id="matchTitle">ВОЛЕЙБОЛ</div>
      <div class="top-meta" id="setMeta">ПАРТИЯ 1 · ДО 25</div>
      <button class="status" id="statusPill" type="button" title="Нажмите, чтобы переподключиться">
        <span class="dot"></span><span id="statusText">офлайн</span>
      </button>
    </header>

    <div class="match-strip" aria-label="Сводка матча">
      <span class="strip-item strip-timeouts"><span>⏱ Тайм-ауты</span><b id="stripTimeouts">2:2</b></span>
      <span class="strip-sep" aria-hidden="true"></span>
      <span class="strip-item"><span>Счёт</span><b id="stripScore">0:0</b></span>
      <span class="strip-sep" aria-hidden="true"></span>
      <span class="strip-item"><span>Партии</span><b id="stripSets">0:0</b></span>
      <span class="strip-sep" aria-hidden="true"></span>
      <span class="strip-item strip-history"><span>История</span><b id="stripHistory">—</b></span>
    </div>

    <main class="teams">
      <section class="team" id="cardA">
        <div class="team-head">
          <span class="team-name" id="nameA">КОМАНДА А</span>
          <span class="team-sets" id="setsA">ПАРТИИ 0</span>
        </div>
        <div class="score" id="scoreA">0</div>
        <button class="plus" id="plusA" type="button" aria-label="Добавить очко команде A">+1</button>
        <div class="actions">
          <button class="btn minus" id="minusA" type="button" aria-label="Убрать очко команде A">−1</button>
          <button class="btn timeout" id="timeoutA" type="button">⏱ Тайм-аут <span class="to-count" id="toA">2</span></button>
        </div>
      </section>

      <section class="team" id="cardB">
        <div class="team-head">
          <span class="team-name" id="nameB">КОМАНДА Б</span>
          <span class="team-sets" id="setsB">ПАРТИИ 0</span>
        </div>
        <div class="score" id="scoreB">0</div>
        <button class="plus" id="plusB" type="button" aria-label="Добавить очко команде B">+1</button>
        <div class="actions">
          <button class="btn minus" id="minusB" type="button" aria-label="Убрать очко команде B">−1</button>
          <button class="btn timeout" id="timeoutB" type="button">⏱ Тайм-аут <span class="to-count" id="toB">2</span></button>
        </div>
      </section>
    </main>

    <footer class="foot">
      <button class="link-btn" id="undoBtn" type="button">↺ Отменить</button>
      <a class="link-btn" id="boardLink" href="board.html" target="_blank" rel="noopener">Открыть табло</a>
      <button class="link-btn" id="reloadBtn" type="button">Обновить</button>
    </footer>
  </div>

  <div class="over" id="over" hidden>
    <div class="over-card">
      <p class="over-title">Матч завершён</p>
      <p class="over-name" id="overName">—</p>
      <button class="over-btn" id="newMatchBtn" type="button">Новый матч</button>
    </div>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    (() => {
      'use strict';

      const LS_KEY = 'arena-volley-v2';
      const MAX_TIMEOUTS = 2;

      const params = new URLSearchParams(location.search);
      const room = (params.get('room') || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'main';
      const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
      const isHex = (value) => /^#[0-9a-fA-F]{6}$/.test(String(value || ''));

      const FONTS = {
        bebas: '"Bebas Neue", "Oswald", Roboto, system-ui, sans-serif',
        oswald: '"Oswald", system-ui, sans-serif',
        anton: '"Anton", "Russo One", system-ui, sans-serif',
        montserrat: '"Montserrat", system-ui, sans-serif',
        roboto: '"Roboto Condensed", system-ui, sans-serif',
        system: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
      };

      const $ = (selector) => document.querySelector(selector);

      const ui = {
        body: document.body,
        title: $('#matchTitle'),
        meta: $('#setMeta'),
        stripScore: $('#stripScore'),
        stripSets: $('#stripSets'),
        stripTimeouts: $('#stripTimeouts'),
        stripHistory: $('#stripHistory'),
        statusPill: $('#statusPill'),
        statusText: $('#statusText'),
        card: { A: $('#cardA'), B: $('#cardB') },
        name: { A: $('#nameA'), B: $('#nameB') },
        sets: { A: $('#setsA'), B: $('#setsB') },
        score: { A: $('#scoreA'), B: $('#scoreB') },
        plus: { A: $('#plusA'), B: $('#plusB') },
        minus: { A: $('#minusA'), B: $('#minusB') },
        timeout: { A: $('#timeoutA'), B: $('#timeoutB') },
        toCount: { A: $('#toA'), B: $('#toB') },
        undoBtn: $('#undoBtn'),
        boardLink: $('#boardLink'),
        reloadBtn: $('#reloadBtn'),
        over: $('#over'),
        overName: $('#overName'),
        newMatchBtn: $('#newMatchBtn'),
        toast: $('#toast')
      };

      function defaultState() {
        return {
          rev: 0,
          names: { A: 'КОМАНДА А', B: 'КОМАНДА Б' },
          titles: { match: 'ВОЛЕЙБОЛ' },
          score: { A: 0, B: 0 },
          setsWon: { A: 0, B: 0 },
          sets: [],
          setNumber: 1,
          serve: null,
          timeouts: { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS },
          matchOver: false,
          design: {
            font: 'bebas',
            homeBg: '#141fff',
            homeFg: '#f9ca24',
            awayBg: '#202132',
            awayFg: '#ffffff'
          },
          settings: {
            bestOf: 5,
            points: 25,
            deciding: 15,
            autoClose: true,
            room
          }
        };
      }

      function normalize(raw) {
        const base = defaultState();
        if (!raw || typeof raw !== 'object') return base;
        const s = Object.assign({}, base, raw);
        s.names = Object.assign({}, base.names, raw.names || {});
        s.titles = Object.assign({}, base.titles, raw.titles || {});
        s.score = Object.assign({}, base.score, raw.score || {});
        s.setsWon = Object.assign({}, base.setsWon, raw.setsWon || {});
        s.timeouts = Object.assign({}, base.timeouts, raw.timeouts || {});
        s.settings = Object.assign({}, base.settings, raw.settings || {});
        s.design = Object.assign({}, base.design, raw.design || {});
        s.sets = Array.isArray(raw.sets)
          ? raw.sets.filter((x) => x && Number.isFinite(Number(x.a)) && Number.isFinite(Number(x.b)))
            .map((x) => ({ a: Number(x.a), b: Number(x.b) }))
          : [];
        s.settings.bestOf = [1, 3, 5].includes(Number(s.settings.bestOf)) ? Number(s.settings.bestOf) : 5;
        s.settings.points = [11, 15, 21, 25].includes(Number(s.settings.points)) ? Number(s.settings.points) : 25;
        s.settings.deciding = [11, 15, 21].includes(Number(s.settings.deciding)) ? Number(s.settings.deciding) : 15;
        s.settings.autoClose = s.settings.autoClose !== false;
        s.design.font = FONTS[s.design.font] ? s.design.font : 'bebas';
        ['A', 'B'].forEach((team) => {
          s.score[team] = clamp(Math.round(Number(s.score[team]) || 0), 0, 99);
          s.setsWon[team] = clamp(Math.round(Number(s.setsWon[team]) || 0), 0, Math.ceil(s.settings.bestOf / 2));
          s.timeouts[team] = clamp(Math.round(Number(s.timeouts[team]) || 0), 0, MAX_TIMEOUTS);
          s.names[team] = String(s.names[team] || '').slice(0, 30).toUpperCase() || (team === 'A' ? 'КОМАНДА А' : 'КОМАНДА Б');
        });
        s.titles.match = String(s.titles.match || '').slice(0, 40) || 'ВОЛЕЙБОЛ';
        s.setNumber = clamp(Math.round(Number(s.setNumber) || 1), 1, s.settings.bestOf);
        s.rev = Math.max(0, Math.round(Number(s.rev) || 0));
        s.matchOver = Boolean(s.matchOver);
        if (s.serve !== 'A' && s.serve !== 'B') s.serve = null;
        return s;
      }

      function loadLocal() {
        try {
          const raw = localStorage.getItem(LS_KEY + ':' + room);
          if (raw) return normalize(JSON.parse(raw));
        } catch { /* ignore */ }
        return null;
      }

      function persist() {
        try { localStorage.setItem(LS_KEY + ':' + room, JSON.stringify(state)); } catch { /* ignore */ }
      }

      let state = loadLocal() || defaultState();
      const undoStack = [];
      let ws = null;
      let connected = false;
      let retry = 0;
      let reconnectTimer = null;
      let peers = 0;
      const clientId = Math.random().toString(36).slice(2, 10);

      const need = () => Math.ceil(state.settings.bestOf / 2);
      const targetPoints = () => (state.settings.bestOf > 1 && state.setNumber >= state.settings.bestOf
        ? state.settings.deciding
        : state.settings.points);

      /* ---------- Синхронизация ---------- */

      function setOnline(online) {
        connected = online;
        ui.statusPill.classList.toggle('online', online);
        ui.statusText.textContent = online ? (peers > 1 ? 'онлайн · ' + peers : 'онлайн') : 'офлайн';
      }

      function sendPatch() {
        if (!ws || ws.readyState !== 1) return;
        try {
          ws.send(JSON.stringify({
            type: 'patch',
            room,
            clientId,
            rev: state.rev,
            patch: {
              score: state.score,
              setsWon: state.setsWon,
              sets: state.sets,
              setNumber: state.setNumber,
              serve: state.serve,
              timeouts: state.timeouts,
              matchOver: state.matchOver
            }
          }));
        } catch { /* ignore */ }
      }

      function sendFullState() {
        if (!ws || ws.readyState !== 1) return;
        state.settings.room = room;
        try {
          ws.send(JSON.stringify({ type: 'state', room, clientId, state }));
        } catch { /* ignore */ }
      }

      function closeSocket() {
        clearTimeout(reconnectTimer);
        if (ws) {
          try { ws.onclose = null; ws.close(); } catch { /* ignore */ }
          ws = null;
        }
      }

      function scheduleReconnect() {
        clearTimeout(reconnectTimer);
        const delay = Math.min(8000, 700 * Math.pow(1.7, retry++));
        reconnectTimer = setTimeout(connect, delay);
      }

      function handleMessage(msg) {
        if (msg.type === 'welcome') {
          setOnline(true);
          return;
        }
        if (msg.type === 'state' && msg.state) {
          const remote = normalize(msg.state);
          remote.settings.room = room;
          if (remote.rev > state.rev) {
            state = remote;
            undoStack.length = 0;
            persist();
            render();
          } else if (state.rev > remote.rev) {
            sendFullState();
          }
          return;
        }
        if (msg.type === 'need-state') {
          sendFullState();
          return;
        }
        if (msg.type === 'presence') {
          peers = Number(msg.count) || 0;
          setOnline(connected);
          return;
        }
        if (msg.type === 'ack') {
          if (Number(msg.rev) > state.rev) state.rev = Number(msg.rev);
        }
      }

      function connect() {
        closeSocket();
        const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
        let socket;
        try {
          socket = new WebSocket(proto + '//' + location.host + '/ws?room=' + encodeURIComponent(room));
        } catch {
          setOnline(false);
          scheduleReconnect();
          return;
        }
        ws = socket;
        socket.onopen = () => {
          if (ws !== socket) return;
          connected = true;
          retry = 0;
          setOnline(true);
          try { socket.send(JSON.stringify({ type: 'hello', room, clientId })); } catch { /* ignore */ }
        };
        socket.onmessage = (event) => {
          if (ws !== socket) return;
          let msg;
          try { msg = JSON.parse(event.data); } catch { return; }
          handleMessage(msg);
        };
        socket.onclose = () => {
          if (ws !== socket) return;
          ws = null;
          setOnline(false);
          scheduleReconnect();
        };
        socket.onerror = () => {
          try { socket.close(); } catch { /* ignore */ }
        };
      }

      /* ---------- Действия ---------- */

      function pushUndo() {
        undoStack.push({
          score: Object.assign({}, state.score),
          setsWon: Object.assign({}, state.setsWon),
          sets: state.sets.map((set) => ({ a: set.a, b: set.b })),
          setNumber: state.setNumber,
          serve: state.serve,
          timeouts: Object.assign({}, state.timeouts),
          matchOver: state.matchOver
        });
        if (undoStack.length > 80) undoStack.shift();
      }

      function finishSet(s, winner) {
        s.sets.push({ a: s.score.A, b: s.score.B });
        s.setsWon[winner] = Math.min(Math.ceil(s.settings.bestOf / 2), s.setsWon[winner] + 1);
        s.score = { A: 0, B: 0 };
        s.timeouts = { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS };
        s.serve = winner;
        if (s.setsWon[winner] >= Math.ceil(s.settings.bestOf / 2)) {
          s.matchOver = true;
          s.setNumber = Math.max(1, s.sets.length);
        } else {
          s.setNumber = Math.min(s.settings.bestOf, s.setNumber + 1);
        }
      }

      function publish() {
        state.rev = Math.max(Date.now(), state.rev + 1);
        state.settings.room = room;
        persist();
        render();
        sendPatch();
      }

      function vibrate(pattern) {
        try {
          if (navigator.vibrate) navigator.vibrate(pattern);
        } catch { /* ignore */ }
      }

      function addPoint(team) {
        if (state.matchOver) return;
        pushUndo();
        state.score[team] = Math.min(99, state.score[team] + 1);
        state.serve = team;
        const other = team === 'A' ? 'B' : 'A';
        if (state.settings.autoClose && state.score[team] >= targetPoints() && state.score[team] - state.score[other] >= 2) {
          finishSet(state, team);
        }
        publish();
        vibrate(state.matchOver ? [30, 60, 30] : 24);
      }

      function removePoint(team) {
        if (state.matchOver || state.score[team] <= 0) return;
        pushUndo();
        state.score[team] = Math.max(0, state.score[team] - 1);
        publish();
        vibrate(14);
      }

      function timeout(team) {
        if (state.matchOver) return;
        if (state.timeouts[team] <= 0) {
          showToast('Тайм-ауты закончились');
          vibrate([30, 50, 30]);
          return;
        }
        pushUndo();
        state.timeouts[team] = Math.max(0, state.timeouts[team] - 1);
        publish();
        vibrate([18, 40, 18]);
      }

      function undo() {
        const prev = undoStack.pop();
        if (!prev) {
          showToast('Нечего отменять');
          return;
        }
        state.score = prev.score;
        state.setsWon = prev.setsWon;
        state.sets = prev.sets;
        state.setNumber = prev.setNumber;
        state.serve = prev.serve;
        state.timeouts = prev.timeouts;
        state.matchOver = prev.matchOver;
        publish();
        vibrate(14);
      }

      function newMatch() {
        if (!confirm('Начать новый матч? Счёт и партии будут сброшены.')) return;
        pushUndo();
        state.score = { A: 0, B: 0 };
        state.setsWon = { A: 0, B: 0 };
        state.sets = [];
        state.setNumber = 1;
        state.serve = null;
        state.timeouts = { A: MAX_TIMEOUTS, B: MAX_TIMEOUTS };
        state.matchOver = false;
        publish();
      }

      /* ---------- Отрисовка ---------- */

      function showToast(text) {
        ui.toast.textContent = text;
        ui.toast.classList.add('show');
        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(() => ui.toast.classList.remove('show'), 1800);
      }

      function render() {
        const d = state.design || {};
        ui.body.style.setProperty('--app-font', FONTS[d.font] || FONTS.bebas);
        ui.title.textContent = state.titles.match;
        ui.meta.textContent = 'ПАРТИЯ ' + state.setNumber + ' · ДО ' + targetPoints();
        ui.stripScore.textContent = state.score.A + ':' + state.score.B;
        ui.stripSets.textContent = state.setsWon.A + ':' + state.setsWon.B;
        ui.stripTimeouts.textContent = state.timeouts.A + ':' + state.timeouts.B;
        ui.stripHistory.textContent = state.sets.length
          ? state.sets.map((set) => set.a + ':' + set.b).join(' · ')
          : '—';

        ['A', 'B'].forEach((team) => {
          const bg = team === 'A' ? d.homeBg : d.awayBg;
          const fg = team === 'A' ? d.homeFg : d.awayFg;
          ui.card[team].style.setProperty('--team-bg', isHex(bg) ? bg : '#1c2740');
          ui.card[team].style.setProperty('--team-fg', isHex(fg) ? fg : '#ffffff');
          ui.name[team].textContent = state.names[team];
          ui.sets[team].textContent = 'ПАРТИИ ' + state.setsWon[team];
          ui.score[team].textContent = state.score[team];
          ui.toCount[team].textContent = state.timeouts[team];
          ui.plus[team].disabled = state.matchOver;
          ui.minus[team].disabled = state.matchOver || state.score[team] <= 0;
          ui.timeout[team].disabled = state.matchOver || state.timeouts[team] <= 0;
        });

        ui.body.classList.toggle('match-over', state.matchOver);
        ui.over.hidden = !state.matchOver;
        if (state.matchOver) {
          const winner = state.setsWon.A >= need() ? 'A' : 'B';
          ui.overName.textContent = state.names[winner] + ' — победа';
        }
        ui.undoBtn.disabled = undoStack.length === 0;
        ui.boardLink.href = 'board.html?room=' + encodeURIComponent(room);
      }

      /* ---------- События ---------- */

      ['A', 'B'].forEach((team) => {
        ui.plus[team].addEventListener('click', () => addPoint(team));
        ui.minus[team].addEventListener('click', () => removePoint(team));
        ui.timeout[team].addEventListener('click', () => timeout(team));
      });

      ui.undoBtn.addEventListener('click', undo);
      ui.newMatchBtn.addEventListener('click', newMatch);
      ui.statusPill.addEventListener('click', () => {
        retry = 0;
        connect();
      });
      ui.reloadBtn.addEventListener('click', () => location.reload());

      document.addEventListener('contextmenu', (event) => event.preventDefault());

      window.addEventListener('beforeunload', closeSocket);

      render();
      connect();
    })();
  </script>
</body>
</html>
```

## board.html

```html
<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Табло — Волейбол</title>
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: #000;
    }

    body.transparent {
      background: transparent;
    }

    iframe {
      display: block;
      width: 100vw;
      height: 100dvh;
      border: 0;
      background: transparent;
    }
  </style>
</head>

<body>
  <iframe id="board" title="Табло матча" allow="autoplay; fullscreen"></iframe>
  <script>
    (() => {
      'use strict';

      const params = new URLSearchParams(location.search);
      const inner = new URL('index.html', location.href);
      inner.searchParams.set('display', '1');

      const room = String(params.get('room') || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      if (room) inner.searchParams.set('room', room);

      const theme = params.get('theme');
      if (['arena', 'kts', 'dark', 'blue'].includes(theme)) inner.searchParams.set('theme', theme);

      if (params.get('bg') === 'transparent') {
        inner.searchParams.set('bg', 'transparent');
        document.body.classList.add('transparent');
      } else {
        inner.searchParams.set('bg', 'opaque');
      }

      document.getElementById('board').src = inner.href;
    })();
  </script>
</body>

</html>
```

## board2.html

```html
<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Табло — Волейбол (второй вариант)</title>
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: #000;
    }

    body.transparent {
      background: transparent;
    }

    iframe {
      display: block;
      width: 100vw;
      height: 100dvh;
      border: 0;
      background: transparent;
    }
  </style>
</head>

<body>
  <iframe id="board" title="Табло матча" allow="autoplay; fullscreen"></iframe>
  <script>
    (() => {
      'use strict';

      const params = new URLSearchParams(location.search);
      const inner = new URL('index.html', location.href);
      inner.searchParams.set('display', '1');
      inner.searchParams.set('stats', 'block');

      const room = String(params.get('room') || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      if (room) inner.searchParams.set('room', room);

      const theme = params.get('theme');
      if (['arena', 'kts', 'dark', 'blue'].includes(theme)) inner.searchParams.set('theme', theme);

      if (params.get('bg') === 'transparent') {
        inner.searchParams.set('bg', 'transparent');
        document.body.classList.add('transparent');
      } else {
        inner.searchParams.set('bg', 'opaque');
      }

      document.getElementById('board').src = inner.href;
    })();
  </script>
</body>

</html>
```

## board3.html

```html
<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Табло — Волейбол (стиль KeepTheScore)</title>
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: #000;
    }

    body.transparent {
      background: transparent;
    }

    iframe {
      display: block;
      width: 100vw;
      height: 100dvh;
      border: 0;
      background: transparent;
    }
  </style>
</head>

<body>
  <iframe id="board" title="Табло матча" allow="autoplay; fullscreen"></iframe>
  <script>
    (() => {
      'use strict';

      const params = new URLSearchParams(location.search);
      const inner = new URL('index.html', location.href);
      inner.searchParams.set('display', '1');
      inner.searchParams.set('style', 'kts');

      const room = String(params.get('room') || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      if (room) inner.searchParams.set('room', room);

      if (params.get('bg') === 'transparent') {
        inner.searchParams.set('bg', 'transparent');
        document.body.classList.add('transparent');
      } else {
        inner.searchParams.set('bg', 'opaque');
      }

      document.getElementById('board').src = inner.href;
    })();
  </script>
</body>

</html>
```

## board4.html

```html
<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Табло — Волейбол (стиль YouTube, прямой эфир)</title>
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: #000;
    }

    body.transparent {
      background: transparent;
    }

    iframe {
      display: block;
      width: 100vw;
      height: 100dvh;
      border: 0;
      background: transparent;
    }
  </style>
</head>

<body>
  <iframe id="board" title="Табло матча" allow="autoplay; fullscreen"></iframe>
  <script>
    (() => {
      'use strict';

      const params = new URLSearchParams(location.search);
      const inner = new URL('index.html', location.href);
      inner.searchParams.set('display', '1');
      inner.searchParams.set('style', 'youtube');

      const room = String(params.get('room') || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      if (room) inner.searchParams.set('room', room);

      if (params.get('bg') === 'transparent') {
        inner.searchParams.set('bg', 'transparent');
        document.body.classList.add('transparent');
      } else {
        inner.searchParams.set('bg', 'opaque');
      }

      document.getElementById('board').src = inner.href;
    })();
  </script>
</body>

</html>
```

## board5.html

```html
<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Табло — Волейбол (сеты, как KeepTheScore)</title>
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: #000;
    }

    body.transparent {
      background: transparent;
    }

    iframe {
      display: block;
      width: 100vw;
      height: 100dvh;
      border: 0;
      background: transparent;
    }
  </style>
</head>

<body>
  <iframe id="board" title="Табло матча" allow="autoplay; fullscreen"></iframe>
  <script>
    (() => {
      'use strict';

      const params = new URLSearchParams(location.search);
      const inner = new URL('index.html', location.href);
      inner.searchParams.set('display', '1');
      inner.searchParams.set('style', 'sets');

      const room = String(params.get('room') || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);
      if (room) inner.searchParams.set('room', room);

      if (params.get('bg') === 'transparent') {
        inner.searchParams.set('bg', 'transparent');
        document.body.classList.add('transparent');
      } else {
        inner.searchParams.set('bg', 'opaque');
      }

      document.getElementById('board').src = inner.href;
    })();
  </script>
</body>

</html>
```

## overlay.html

```html
<!doctype html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Волейбол — OBS оверлей</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@400;600;800&family=Oswald:wght@400;600;700&family=Roboto+Condensed:wght@400;700&family=Russo+One&display=swap" rel="stylesheet">
  <style>
    :root {
      --home-bg: #141fff;
      --home-fg: #f9ca24;
      --away-bg: #202132;
      --away-fg: #ffffff;
      --panel: rgba(0, 0, 0, 0.38);
      --text: #ffffff;
      --scale: 1;
      --pos: 40px;
      --name-font: 34px;
      --score-font: 74px;
      --meta-font: 15px;
      --radius: 0px;
    }

    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-variant-numeric: tabular-nums;
      font-feature-settings: "tnum", "tnum";
    }

    html,
    body {
      height: 100%;
      margin: 0;
      background: transparent;
      overflow: hidden;
    }

    body {
      font-family: "Bebas Neue", "Oswald", Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: var(--pos);
    }

    body.top {
      align-items: flex-start;
    }

    .wrap {
      transform: scale(var(--scale));
      transform-origin: bottom center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.55));
    }

    body.top .wrap {
      transform-origin: top center;
    }

    .bug {
      display: flex;
      align-items: stretch;
      height: 86px;
      background: var(--panel);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .team {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 190px;
      max-width: 320px;
      padding: 0 16px;
    }

    .team.home {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(0, 0, 0, 0.12) 100%);
      background-color: var(--home-bg);
      color: var(--home-fg);
      justify-content: flex-end;
    }

    .team.away {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(0, 0, 0, 0.12) 100%);
      background-color: var(--away-bg);
      color: var(--away-fg);
      justify-content: flex-start;
    }

    .name {
      font-weight: 900;
      font-size: var(--name-font);
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.55);
      flex: 1 1 auto;
      min-width: 0;
    }

    .team.home .name {
      text-align: right;
    }

    .sets {
      flex: 0 0 auto;
      min-width: 30px;
      padding: 3px 7px;
      background: rgba(0, 0, 0, 0.38);
      font-weight: 900;
      font-size: calc(var(--name-font) * 0.62);
      line-height: 1;
      text-align: center;
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.55);
    }

    .ball {
      flex: 0 0 auto;
      width: 20px;
      height: 20px;
      opacity: 0;
      transform: scale(0.7);
      transition: opacity 0.2s, transform 0.2s;
    }

    .ball.on {
      opacity: 1;
      transform: scale(1);
      filter: drop-shadow(0 0 5px currentColor);
    }

    .ball svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .ov-team-logo {
      display: none;
      height: calc(var(--name-font) * 0.95);
      max-width: 44px;
      flex: 0 0 auto;
      object-fit: contain;
    }

    .ov-team-logo.on {
      display: block;
    }

    .score {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 92px;
      padding: 0 10px;
      font-weight: 900;
      font-size: var(--score-font);
      line-height: 1;
      text-shadow: 0 4px 14px rgba(0, 0, 0, 0.65);
    }

    .score.home {
      background-color: var(--home-bg);
      color: var(--home-fg);
      border-left: 1px solid rgba(255, 255, 255, 0.08);
    }

    .score.away {
      background-color: var(--away-bg);
      color: var(--away-fg);
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }

    .score.bump {
      animation: bump 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2);
    }

    @keyframes bump {
      0% { transform: scale(1); }
      35% { transform: scale(1.12); }
      100% { transform: scale(1); }
    }

    .dash {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      font-size: calc(var(--score-font) * 0.8);
      font-weight: 900;
      color: rgba(255, 255, 255, 0.75);
      text-shadow: 0 4px 14px rgba(0, 0, 0, 0.65);
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      background: var(--panel);
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-size: var(--meta-font);
      white-space: nowrap;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
    }

    .meta .sep {
      opacity: 0.4;
    }

    .meta .history {
      letter-spacing: 0.1em;
      opacity: 0.86;
    }

    .meta .winner {
      color: #ffd166;
      font-weight: 700;
    }

    .ov-logo {
      display: none;
      height: calc(var(--meta-font) * 1.7);
      max-width: 110px;
      object-fit: contain;
    }

    .ov-logo.on {
      display: block;
    }
  </style>
</head>

<body>
  <div class="wrap">
    <div class="bug">
      <div class="team home">
        <span class="ball" id="ballA" title="Подача">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3c3.4 2.9 5 5.9 5 9s-1.6 6.1-5 9" />
            <path d="M12 3c-3.4 2.9-5 5.9-5 9s1.6 6.1 5 9" />
            <path d="M3.4 9.2c4 1.7 7.9 1.7 11.9 0M3.4 14.8c4-1.7 7.9-1.7 11.9 0" />
          </svg>
        </span>
        <img class="ov-team-logo" id="ovLogoA" alt="">
        <span class="name" id="nameA">КАРА-КУЛЖА</span>
        <span class="sets" id="setsA">0</span>
      </div>
      <div class="score home" id="scoreA">0</div>
      <div class="dash">:</div>
      <div class="score away" id="scoreB">0</div>
      <div class="team away">
        <span class="sets" id="setsB">0</span>
        <span class="name" id="nameB">НООКАТ</span>
        <img class="ov-team-logo" id="ovLogoB" alt="">
        <span class="ball" id="ballB" title="Подача">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3c3.4 2.9 5 5.9 5 9s-1.6 6.1-5 9" />
            <path d="M12 3c-3.4 2.9-5 5.9-5 9s1.6 6.1 5 9" />
            <path d="M3.4 9.2c4 1.7 7.9 1.7 11.9 0M3.4 14.8c4-1.7 7.9-1.7 11.9 0" />
          </svg>
        </span>
      </div>
    </div>
    <div class="meta">
      <img class="ov-logo" id="ovLogo" alt="">
      <span id="setMeta">ПАРТИЯ 1 · ДО 25</span>
      <span class="sep">·</span>
      <span class="history" id="history">—</span>
      <span class="winner" id="winner" hidden></span>
    </div>
  </div>

  <script>
    (() => {
      'use strict';

      const FONTS = {
        bebas: '"Bebas Neue", "Oswald", Roboto, system-ui, sans-serif',
        oswald: '"Oswald", system-ui, sans-serif',
        anton: '"Anton", "Russo One", system-ui, sans-serif',
        montserrat: '"Montserrat", system-ui, sans-serif',
        roboto: '"Roboto Condensed", system-ui, sans-serif',
        system: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
      };

      const params = new URLSearchParams(location.search);
      const room = (params.get('room') || 'main').replace(/[^a-zA-Z0-9_-]/g, '') || 'main';
      const scale = Math.min(3, Math.max(0.3, Number(params.get('scale')) || 1));
      const pos = params.get('pos') === 'top' ? 'top' : 'bottom';

      document.documentElement.style.setProperty('--scale', String(scale));
      if (pos === 'top') document.body.classList.add('top');
      if (params.get('size')) {
        const f = Math.min(3, Math.max(0.5, Number(params.get('size')) || 1));
        document.documentElement.style.setProperty('--name-font', (34 * f) + 'px');
        document.documentElement.style.setProperty('--score-font', (74 * f) + 'px');
        document.documentElement.style.setProperty('--meta-font', (15 * f) + 'px');
        document.querySelector('.bug').style.height = (86 * f) + 'px';
      }

      const $ = (s) => document.querySelector(s);
      const el = {
        nameA: $('#nameA'), nameB: $('#nameB'),
        scoreA: $('#scoreA'), scoreB: $('#scoreB'),
        setsA: $('#setsA'), setsB: $('#setsB'),
        ballA: $('#ballA'), ballB: $('#ballB'),
        setMeta: $('#setMeta'), history: $('#history'), winner: $('#winner'),
        logo: $('#ovLogo'), teamLogoA: $('#ovLogoA'), teamLogoB: $('#ovLogoB')
      };

      let state = null;
      let last = { A: null, B: null };

      function normalize(raw) {
        if (!raw || typeof raw !== 'object') return null;
        const settings = Object.assign({ bestOf: 5, points: 25, deciding: 15 }, raw.settings || {});
        return {
          rev: Number(raw.rev) || 0,
          names: Object.assign({ A: 'КОМАНДА А', B: 'КОМАНДА Б' }, raw.names || {}),
          score: Object.assign({ A: 0, B: 0 }, raw.score || {}),
          setsWon: Object.assign({ A: 0, B: 0 }, raw.setsWon || {}),
          sets: Array.isArray(raw.sets) ? raw.sets : [],
          setNumber: Number(raw.setNumber) || 1,
          serve: raw.serve === 'A' || raw.serve === 'B' ? raw.serve : null,
          matchOver: Boolean(raw.matchOver),
          settings: {
            bestOf: Number(settings.bestOf) || 5,
            points: Number(settings.points) || 25,
            deciding: Number(settings.deciding) || 15
          },
          design: Object.assign({
            font: 'bebas',
            text: '#ffffff',
            homeBg: '#141fff',
            homeFg: '#f9ca24',
            awayBg: '#202132',
            awayFg: '#ffffff',
            logo: '',
            logoHeight: 64,
            logoPos: 'left',
            teamLogoA: '',
            teamLogoB: '',
            teamLogoHeight: 56
          }, raw.design || {})
        };
      }

      function bump(node) {
        node.classList.remove('bump');
        void node.offsetWidth;
        node.classList.add('bump');
      }

      function render() {
        if (!state) return;
        const design = state.design || {};
        const root = document.documentElement;
        root.style.setProperty('--text', design.text || '#ffffff');
        root.style.setProperty('--home-bg', design.homeBg || '#141fff');
        root.style.setProperty('--home-fg', design.homeFg || '#f9ca24');
        root.style.setProperty('--away-bg', design.awayBg || '#202132');
        root.style.setProperty('--away-fg', design.awayFg || '#ffffff');
        document.body.style.fontFamily = FONTS[design.font] || FONTS.bebas;
        const hasLogo = Boolean(design.logo);
        el.logo.classList.toggle('on', hasLogo);
        if (hasLogo && el.logo.getAttribute('src') !== design.logo) el.logo.src = design.logo;

        const hasTeamA = Boolean(design.teamLogoA);
        const hasTeamB = Boolean(design.teamLogoB);
        el.teamLogoA.classList.toggle('on', hasTeamA);
        el.teamLogoB.classList.toggle('on', hasTeamB);
        if (hasTeamA && el.teamLogoA.getAttribute('src') !== design.teamLogoA) el.teamLogoA.src = design.teamLogoA;
        if (hasTeamB && el.teamLogoB.getAttribute('src') !== design.teamLogoB) el.teamLogoB.src = design.teamLogoB;

        el.nameA.textContent = state.names.A;
        el.nameB.textContent = state.names.B;
        el.setsA.textContent = state.setsWon.A;
        el.setsB.textContent = state.setsWon.B;

        if (last.A !== null && last.A !== state.score.A) bump(el.scoreA);
        if (last.B !== null && last.B !== state.score.B) bump(el.scoreB);
        last.A = state.score.A;
        last.B = state.score.B;
        el.scoreA.textContent = state.score.A;
        el.scoreB.textContent = state.score.B;

        el.ballA.classList.toggle('on', state.serve === 'A');
        el.ballB.classList.toggle('on', state.serve === 'B');

        const target = state.settings.bestOf > 1 && state.setNumber >= state.settings.bestOf ? state.settings.deciding : state.settings.points;
        el.setMeta.textContent = 'ПАРТИЯ ' + state.setNumber + ' · ДО ' + target;

        const hist = state.sets.map((s) => s.a + ':' + s.b).join('  ');
        el.history.textContent = hist || '—';

        const need = Math.ceil(state.settings.bestOf / 2);
        const winner = state.matchOver ? (state.setsWon.A >= need ? state.names.A : (state.setsWon.B >= need ? state.names.B : null)) : null;
        el.winner.hidden = !winner;
        if (winner) el.winner.textContent = '🏆 ' + winner;
      }

      function apply(raw) {
        const next = normalize(raw);
        if (!next) return;
        if (!state || next.rev >= state.rev) {
          state = next;
          render();
        }
      }

      // Локальный кэш (если оверлей открыт в том же браузере, что и пульт)
      try {
        const perRoom = localStorage.getItem('arena-volley-v2:' + room);
        const raw = perRoom || localStorage.getItem('arena-volley-v2');
        if (raw) {
          const cached = JSON.parse(raw);
          const matchesRoom = perRoom || !cached || !cached.settings || cached.settings.room === room;
          if (matchesRoom) apply(cached);
        }
      } catch { /* ignore */ }

      let ws = null;
      let retry = 0;
      let timer = null;
      const clientId = Math.random().toString(36).slice(2, 10);

      function connect() {
        clearTimeout(timer);
        const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
        try {
          ws = new WebSocket(proto + '//' + location.host + '/ws?room=' + encodeURIComponent(room));
        } catch {
          schedule();
          return;
        }
        ws.onopen = () => {
          retry = 0;
          ws.send(JSON.stringify({ type: 'hello', room, clientId }));
        };
        ws.onmessage = (event) => {
          let msg;
          try { msg = JSON.parse(event.data); } catch { return; }
          if (msg.type === 'state' && msg.state) apply(msg.state);
        };
        ws.onclose = () => schedule();
        ws.onerror = () => { try { ws.close(); } catch { /* ignore */ } };
      }

      function schedule() {
        clearTimeout(timer);
        timer = setTimeout(connect, Math.min(10000, 1000 * Math.pow(2, retry++)));
      }

      connect();
      render();
    })();
  </script>
</body>

</html>
```

## server.js

```js
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
```

## package.json

```json
{
  "name": "arena-volley-scoreboard",
  "version": "1.0.0",
  "private": true,
  "description": "Волейбольное табло в стиле KeepTheScore Arena: онлайн-синхронизация, тайм-ауты, подача, звук и OBS-оверлей",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "engines": {
    "node": ">=18"
  },
  "keywords": [
    "volleyball",
    "scoreboard",
    "obs",
    "websocket",
    "keepthescore"
  ],
  "license": "MIT"
}
```

## Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
ENV DATA_DIR=/data

COPY . .

RUN mkdir -p /data

EXPOSE 8080
VOLUME ["/data"]

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:8080/health >/dev/null || exit 1

CMD ["node", "server.js"]
```

## render.yaml

```yaml
services:
  - type: web
    name: arena-volley
    runtime: node
    plan: free
    region: frankfurt
    autoDeploy: true
    buildCommand: npm install --omit=dev
    startCommand: node server.js
    healthCheckPath: /health
    envVars:
      - key: NODE_VERSION
        value: "22"

    # Постоянное хранение состояния комнат (платный compute-план, Free диск не поддерживает):
    # Settings -> Disks -> Add Disk, Mount Path: /var/data
    # Затем раскомментируйте блок ниже.
    #
    # envVars:
    #   - key: DATA_DIR
    #     value: /var/data
    # disk:
    #   name: arena-data
    #   mountPath: /var/data
    #   sizeGB: 1
```

## railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 120,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## README.md

````md
# 🏐 Волейбольное табло «Arena»

Локальная копия волейбольного табло в стиле **KeepTheScore Arena** с онлайн-синхронизацией,
тайм-аутами, индикатором подачи, звуками, OBS-оверлеем и отдельным пультом для телефона.

Работает **без npm-зависимостей и сборки**: сервер — чистый Node.js, клиент — статические HTML-файлы.
Табло можно открыть даже двойным кликом по `index.html` (без синхронизации), а для сети и OBS
запускается маленький сервер. Для доступа из интернета проект готов к деплою на Render, Railway
или VPS — см. [DEPLOY.md](DEPLOY.md). Отдельная страница `board.html` показывает только табло — без пульта.
`board2.html` — второй вариант табло: `SETS WON` и `TIME OUTS` строками в центральном блоке,
очки по партиям снизу. `board3.html` — табло в стиле KeepTheScore: тёмно-синий фон, крупный
счёт на панелях, а внизу одной полосой во всю ширину — `SETS WON`, `TIME OUTS` и партии.
`board4.html` — табло для прямого эфира на YouTube: почти чёрный фон, красная метка `LIVE`,
такой же крупный счёт и нижняя полоса со статистикой.
`board5.html` — пятое табло для YouTube в виде таблицы сетов, как на KeepTheScore: команды
слева, очки по партиям колонками справа, заголовок матча внизу, метка `LIVE`.
`remote.html` — минимальный пульт для телефона: только счёт и тайм-ауты.

## 🌐 Рабочая онлайн-версия

Сайт задеплоен на Render (Free, регион Frankfurt):

```
https://arena-volley.onrender.com/                     пульт + табло
https://arena-volley.onrender.com/remote.html          пульт на телефоне
https://arena-volley.onrender.com/board5.html          YouTube — таблица сетов
https://arena-volley.onrender.com/overlay.html         оверлей для OBS
https://arena-volley.onrender.com/health               проверка сервера
```

Исходники: [github.com/zholomanovaza-boss/boss](https://github.com/zholomanovaza-boss/boss).
Обновление сайта: загрузить файлы в репозиторий — Render пересоберёт сервис автоматически.
Бесплатный инстанс засыпает после 15 минут без запросов; во время матча держите открытой
вкладку с пультом или таблом (WebSocket не даёт сервису уснуть). Подробности — [DEPLOY.md](DEPLOY.md).

---

## 1. Быстрый старт

Нужен только [Node.js](https://nodejs.org/) версии 18 или новее.

```bash
cd "C:\Users\Admin\Documents\Проект по умолчанию"
node server.js
```

Откройте:

| Что | Адрес |
| --- | --- |
| Пульт + табло | http://localhost:8787/ |
| Пульт на телефоне | `http://<LAN-IP>:8787/remote.html?room=main` |
| Отдельная страница табло | http://localhost:8787/board.html?room=main |
| Второй вариант табло | http://localhost:8787/board2.html?room=main |
| Табло в стиле KeepTheScore | http://localhost:8787/board3.html?room=main |
| Табло для YouTube (прямой эфир) | http://localhost:8787/board4.html?room=main |
| YouTube — таблица сетов | http://localhost:8787/board5.html?room=main |
| Табло для OBS | http://localhost:8787/board.html?room=main&bg=transparent |
| Второй вариант для OBS | http://localhost:8787/board2.html?room=main&bg=transparent |
| KeepTheScore для OBS | http://localhost:8787/board3.html?room=main&bg=transparent |
| YouTube для OBS | http://localhost:8787/board4.html?room=main&bg=transparent |
| YouTube-сеты для OBS | http://localhost:8787/board5.html?room=main&bg=transparent |
| Компактный оверлей | http://localhost:8787/overlay.html?room=main |
| Проверка сервера | http://localhost:8787/health |
| Адреса в локальной сети | http://localhost:8787/net |

Точный адрес пульта для телефона печатается в консоли при запуске сервера
и показывается в настройках (⚙) на компьютере.

Порт можно изменить:

```bash
set PORT=3000 && node server.js
```

или в PowerShell:

```powershell
$env:PORT=3000; node server.js
```

Через `package.json`:

```bash
npm start
```

> npm-пакеты не нужны, `npm install` выполнять не обязательно.

Чтобы открыть табло из любой точки интернета (телефон вне Wi-Fi, зрители, второй город),
используйте готовые настройки деплоя: **[DEPLOY.md](DEPLOY.md)** — Railway, Render, Docker/VPS.

---

## 2. Как играть

- **Клик по счёту** команды — +1 очко.
- **Shift + клик** или правый клик по счёту — −1 очко.
- **Клик по мячу** рядом с названием команды — переключить подачу.
- **Клик по «Time Outs»** — потратить тайм-аут (2 на партию, сбрасываются в новой партии).
- **Блок Sets Won / Time Outs** — статистика по центру между двумя большими счетами.
  Каждая строка идёт в одну линию по схеме «число — подпись — число»: слева значение команды A,
  в центре крупная подпись с тонкими вертикальными линиями по бокам, справа значение команды B —
  например `3 | SETS WON | 0` и `2 | TIME OUTS | 2`.
  Ниже, между большими счетами, вертикальной колонкой идут все партии матча
  (завершённые, текущая и оставшиеся) одним столбиком.
  Каждая строка занимает всю
  ширину колонки и оформлена одинаковой плашкой с теми же отступами, скруглением и фоном;
  фон самой колонки совпадает с фоном плашек, поэтому промежутки между строками не светлее
  и не темнее их — колонка выглядит ровно. Несыгранные партии сохраняют фон, но их цифры приглушены,
  а текущая партия выделена тонкой внутренней рамкой. Названия команд и счёт выровнены
  по ширине и краям, текст названия стоит точно по центру плашки (иконка подачи не сдвигает его),
  а обе команды получают одинаковый размер шрифта — плашки названий выглядят симметрично.
  Блок обновляется автоматически.
- Партия закрывается автоматически при достижении нужного счёта с разницей 2 очка
  (настройка «Автоматически закрывать партию») либо кнопкой «Партия».
- Когда матч завершён, кнопки «Партия» и «Сброс» остаются доступными и подсказывают,
  что нужно нажать «Новый матч»; сама кнопка «Новый матч» всегда активна на пульте
  и полностью очищает счёт, партии и тайм-ауты.

### Горячие клавиши

| Клавиша | Действие |
| --- | --- |
| `A` | +1 команде A |
| `Z` | −1 команде A |
| `K` | +1 команде B |
| `M` | −1 команде B |
| `S` | завершить партию вручную |
| `R` | сбросить очки текущей партии |
| `U` | отменить последнее действие |
| `N` | новый матч |
| `T` | тайм-аут команды A |
| `Shift + T` | тайм-аут команды B |
| `F` | полный экран |
| `B` | открыть отдельную страницу табло |
| `Esc` | закрыть настройки |

Заголовок матча и названия команд редактируются прямо на табло
(клик по тексту). В режиме `display=1` редактирование отключено.

---

## 3. Онлайн-синхронизация

Пульт и табло обмениваются состоянием через WebSocket. Изменения мгновенно появляются
на всех подключённых устройствах: телефоне, планшете, втором ноутбуке, OBS-оверлее.

### Одна сеть (телефон + компьютер)

1. Запустите `node server.js` на компьютере.
2. Узнайте локальный IP:

   ```powershell
   ipconfig
   ```

   Нужен адрес вида `192.168.x.x` (IPv4).
3. Откройте на телефоне: `http://192.168.x.x:8787/?room=main` (полный пульт)
   или `http://192.168.x.x:8787/remote.html?room=main` (только счёт и тайм-ауты).
4. Разрешите Node.js доступ к сети в брандмауэре Windows, если появится запрос.

Оба устройства должны быть в одной Wi-Fi сети, комната (`room`) — одинаковой.

### Интернет / стрим

Подойдёт любой хостинг, который умеет Node.js и WebSocket:

- **Render** — New → Web Service → репозиторий с файлами → Build Command: `npm install`
  (или пусто), Start Command: `node server.js`.
- **Railway** — Deploy from GitHub, Start Command: `node server.js`.
- **Fly.io / VPS** — `node server.js` под процесс-менеджером (`pm2`, `systemd`).

Порт хостинг передаёт через переменную `PORT` — сервер это учитывает.

После деплоя:

```
https://ваш-домен/?room=match1
https://ваш-домен/overlay.html?room=match1
```

`wss://` (защищённый WebSocket) клиент выбирает автоматически, если страница открыта по HTTPS.

### Комнаты

Комната задаётся параметром `?room=...` или в настройках (⚙). Имя — только латинские буквы,
цифры, `_` и `-`, до 40 символов. Разные матчи могут идти в разных комнатах одновременно.
Комнаты полностью независимы: у каждой свои команды, счёт, партии и настройки. Переключение
комнаты в настройках загружает состояние выбранной комнаты, а не переносит текущий матч.
Состояние комнаты хранится в `data/<room>.json` и переживает перезапуск сервера.

### Как устроена синхронизация

- Клиент отправляет полный `state` с меткой `rev` (возрастающий timestamp).
- Сервер принимает состояние только если `rev` больше текущего (last-write-wins),
  иначе возвращает клиенту актуальное состояние.
- Сервер рассылает состояние остальным участникам комнаты и сохраняет его на диск.
- Если сервер недоступен, табло продолжает работать локально (`localStorage`,
  ключ `arena-volley-v2:<room>`), а при восстановлении связи синхронизируется автоматически.

---

## 4. Пульт на телефоне

Откройте на телефоне `http://<LAN-IP>:8787/remote.html?room=main` — это отдельный
минимальный пульт, в котором есть только то, что нужно во время игры:

- **+1** — большое поле счёта и кнопка на весь экран (удобно нажимать большим пальцем);
- **−1** — убрать очко;
- **⏱ Тайм-аут** — потратить тайм-аут команды, рядом видно, сколько осталось (2 на партию);
- **↺ Отменить** — отменить последнее действие (работает и для очков, и для тайм-аутов);
- **Партии** — Sets Won и номер текущей партии;
- **Сводка матча** — одной строкой: остаток тайм-аутов, счёт текущей партии,
  счёт по партиям и история завершённых партий;
- **Новый матч** — когда матч закончился.

Где взять адрес:

1. Нажмите кнопку **📱** в шапке табло — она сразу откроет пульт
   (на телефоне — в этом же окне, на компьютере — в новой вкладке).
2. Запустите `node server.js` на компьютере — сервер напечатает готовую ссылку
   в блоке **Phone remote (same Wi-Fi)**.
3. Или откройте на компьютере настройки (⚙) — там показан адрес пульта.
4. Можно узнать IP вручную: `/net` в браузере или `ipconfig` в консоли.

Телефон и компьютер должны быть в одной Wi-Fi сети. Разрешите Node.js доступ
к сети в брандмауэре Windows, если появится запрос.

Пульт отправляет только изменившиеся поля (`score`, `setsWon`, `sets`, `setNumber`,
`serve`, `timeouts`, `matchOver`), поэтому он работает быстро даже на слабом телефоне.
Оформление, названия команд, логотипы и фоны с пульта не меняются — это делается
на компьютере, а телефон только ведёт счёт. Все изменения сразу появляются на табло,
в отдельной странице `board.html` и в OBS-оверлее.

Если связь пропала, пульт показывает «офлайн» и продолжает считать локально,
а после восстановления сети синхронизируется с сервером. Нажмите на индикатор
«офлайн/онлайн», чтобы переподключиться вручную.

---

## 5. OBS-оверлей

### Вариант A. Компактный scorebug (рекомендуется)

Добавьте в OBS источник **Browser**:

- URL: `http://localhost:8787/overlay.html?room=main`
- Ширина: `1920`, высота: `1080`
- Поставьте галочку **Shutdown source when not visible** по желанию.
- Фон прозрачный — оверлей накладывается поверх игры.

Параметры URL:

| Параметр | Значение | Описание |
| --- | --- | --- |
| `room` | `main` | комната синхронизации |
| `pos` | `bottom` / `top` | положение на экране |
| `scale` | `0.3 … 3` | масштаб (например, `1.4`) |
| `size` | `0.5 … 3` | размер самого scorebug (например, `1.2`) |

Примеры:

```
http://localhost:8787/overlay.html?room=main&pos=top&scale=1.2
http://localhost:8787/overlay.html?room=main&pos=bottom&size=1.35&scale=0.9
```

### Вариант B. Полное табло

Отдельная страница только с табло — без пульта и настроек:

```
http://localhost:8787/board.html?room=main
```

Для OBS с прозрачным фоном:

```
http://localhost:8787/board.html?room=main&bg=transparent
```

В пульте есть кнопка **📺** — она открывает эту страницу в новой вкладке.
`board.html` можно открывать и напрямую, и как Browser Source в OBS.
Если нужен непрозрачный фон, не добавляйте `bg=transparent`.

### Вариант C. Второе табло

Второй вариант оформления — со `SETS WON` и `TIME OUTS` отдельными строками в центральном
блоке, а очки по партиям снизу:

```
http://localhost:8787/board2.html?room=main
```

То же самое можно открыть напрямую:

```
http://localhost:8787/index.html?display=1&stats=block&room=main
```

Для OBS с прозрачным фоном:

```
http://localhost:8787/board2.html?room=main&bg=transparent
```

Параметры `room`, `theme` и `bg` работают так же, как у `board.html`. Обычное табло
(`index.html` и `board.html` без `stats=block`) при этом остаётся прежним.

### Вариант D. Табло в стиле KeepTheScore

Третий вариант — как на классическом табло KeepTheScore: тёмно-синий фон, название матча
по центру сверху, названия команд белым, крупные счета на тёмных панелях. Внизу одной
полосой во всю ширину идут счётчики `SETS WON`, `TIME OUTS` (у каждой команды) и все партии:

```
http://localhost:8787/board3.html?room=main
```

То же самое напрямую:

```
http://localhost:8787/index.html?display=1&style=kts&room=main
```

Для OBS с прозрачным фоном:

```
http://localhost:8787/board3.html?room=main&bg=transparent
```

У этого варианта **свои цвета и свой шрифт**: они хранятся отдельно от остальных табло,
поэтому правки не затрагивают `index.html` и `board2.html`. Откройте **⚙ Настройки** при
выбранном варианте **KeepTheScore** и меняйте:

- **Фон** — цвет фона табло;
- **Плашка** — фон полосы с заголовком матча;
- **Текст** — цвет названий команд, заголовка и подписей;
- **A — фон / A — текст** — панель и цифры команды A;
- **B — фон / B — текст** — панель и цифры команды B;
- **Шрифт** — шрифт всего третьего табло.

Масштабы шрифтов из настроек продолжают работать, а параметры `room` и `bg` — как у
остальных табло. Обычное табло и второй вариант при этом не меняются.

Этот же вариант можно включить без отдельной страницы: **⚙ Настройки → Вариант табло →
KeepTheScore — третье табло**. Выбор сохраняется, и `board.html` / `index.html` начинают
показывать третье табло. `board3.html` и `?style=kts` остаются для OBS и прямых ссылок.

### Вариант E. Табло для YouTube (прямой эфир)

Четвёртый вариант — для прямых трансляций на YouTube: почти чёрный фон, красная метка
`LIVE` в шапке, крупный счёт на тёмных панелях и нижняя полоса с `SETS WON`, `TIME OUTS`
и партиями:

```
http://localhost:8787/board4.html?room=main
```

То же самое напрямую:

```
http://localhost:8787/index.html?display=1&style=youtube&room=main
```

Для OBS с прозрачным фоном:

```
http://localhost:8787/board4.html?room=main&bg=transparent
```

Включить его можно и в настройках: **⚙ Настройки → Вариант табло → YouTube** или галочкой
**«Табло для YouTube (прямой эфир)»** под списком. Галочка — быстрый переключатель: она
включает четвёртое табло, а при снятии возвращает предыдущий вариант. У этого табло свои
цвета и шрифт (как у KeepTheScore): при выборе варианта поля «Цвета» и «Шрифт» показывают
его настройки. Метка `LIVE` и красная линия под шапкой — фирменный акцент YouTube, он
не меняется вместе с палитрой.

### Вариант F. YouTube — таблица сетов (как KeepTheScore)

Пятый вариант — отдельное табло для YouTube в виде таблицы сетов, как на
`keepthescore.com`: слева строками идут команды, справа колонками — очки по партиям.
Счётчик выигранных партий стоит рядом с названием команды, текущая партия выделена
ярче, несыгранные показаны двумя прочерками. Заголовок матча — нижней полосой
во всю ширину, справа в нём метка `LIVE`:

```
http://localhost:8787/board5.html?room=main
```

То же самое напрямую:

```
http://localhost:8787/index.html?display=1&style=sets&room=main
```

Для OBS с прозрачным фоном:

```
http://localhost:8787/board5.html?room=main&bg=transparent
```

Включить вариант можно и в настройках: **⚙ Настройки → Вариант табло →
YouTube — сеты (как KeepTheScore)**. У этого табло **свои цвета и свой шрифт** —
при выборе варианта поля «Цвета» и «Шрифт» переключаются на его палитру, а остальные
табло сохраняют свои настройки. Количество колонок сетов берётся из формата матча
(до 1, 2 или 3 побед), поэтому таблица всегда помещается по ширине.

### Обновление OBS без перезапуска

Оверлей держит WebSocket-соединение и обновляется сам. Если OBS не видит изменения,
нажмите «Обновить» у источника Browser или проверьте `/health`.

---

## 6. Настройки

Кнопка **⚙** в правом верхнем углу:

- заголовок матча;
- названия команд;
- комната синхронизации;
- формат матча: до 1, 2 или 3 побед (1/3/5 партий);
- партия до 11 / 15 / 21 / 25 очков;
- решающая партия до 11 / 15 / 21;
- тема: Arena / KeepTheScore (тёмно-синяя) / тёмная / синяя;
- **вариант табло** — 10 готовых оформлений (см. ниже), четвёртое табло для YouTube
  включается ещё и галочкой;
- **размеры шрифтов и плашек** — ползунки для заголовка матча, названий команд,
  блока Sets Won / Time Outs, истории партий (50–150 %), **счёта (50–300 %)**
  и размера плашек у всех блоков (70–140 %); счёт автоматически уменьшается только тогда,
  когда реально не помещается в своё поле.
- **шрифт**: Bebas Neue / Oswald / Anton / Montserrat / Roboto Condensed / системный.
  Шрифт применяется сразу при выборе (живой предпросмотр) ко всем элементам табло,
  включая блок Sets Won / Time Outs и строки партий; рядом со списком есть строка
  предпросмотра. Для кириллицы у Bebas Neue и Anton автоматически используется совместимый
  по стилю Oswald / Russo One, поэтому названия команд и заголовки меняются вместе со всем табло;
- свои цвета: фон, плашка, общий текст, фон и текст каждой команды;
  у третьего табло (KeepTheScore), четвёртого (YouTube) и пятого (YouTube — сеты)
  цвета и шрифт свои — форма переключается на них автоматически при выборе варианта;
- логотип: PNG / SVG / JPG, размер и положение слева или справа в шапке табло;
- **до 10 логотипов в шапке одной сплошной строкой сверху** — загружаются в настройках
  («Логотипы в заголовке»), идут подряд без зазоров и полей, от края до края шапки;
  границы между соседними логотипами сглажены мягким переходом, чтобы фон не просвечивал,
  а редактируемый заголовок матча вынесен на отдельную строку под ними; размер настраивается полем
  «Размер логотипов в заголовке, px» (до 1000 px, автоматически подгоняется под окно,
  чтобы не было переполнения);
- **кнопка «Логотипы в шапке: ВКЛ/ВЫКЛ»** там же: выключает строку из 10 логотипов,
  остаются только название турнира, названия команд и счёт (по умолчанию логотипы включены);
  состояние сохраняется для комнаты и сразу применяется на всех табло;
- **кнопка «Бегущая строка логотипов»** в настройках рядом с размером логотипов:
  по умолчанию ряд стоит на месте, нажатие кнопки включает плавную прокрутку по кругу
  без разрывов; состояние сохраняется для комнаты и сразу применяется на всех табло;
- **кнопка «Название турнира: СНИЗУ/СВЕРХУ»** там же: переключает редактируемый заголовок
  между строкой под логотипами и строкой над ними (по умолчанию снизу), состояние тоже
  сохраняется для комнаты и сразу видно на всех табло;
- надпись «ПАРТИЯ N · ДО 25» в шапке больше не показывается;
- логотипы команд A и B: отдельные файлы и общий размер (до 600 px);
  отдельно можно задать логотипы и размер **только для YouTube** (`board4.html` / `board5.html`, до 600 px):
  если YouTube-логотипы не загружены, эти табло используют общие логотипы;
- свой фон табло: PNG / JPG / WEBP, способ вписывания, затемнение и размытие;
- свой фон команд A и B: отдельные картинки и общее затемнение;
- авто-закрытие партии, звуки, показ тайм-аутов.

Тема задаёт готовую палитру, а цвета можно сразу подправить вручную в том же окне.
Логотипы, фон и оформление синхронизируются между устройствами и попадают в OBS-оверлей.
Картинки автоматически уменьшаются и сжимаются в браузере, поэтому можно выбирать большие файлы.

### Варианты табло

В настройках в списке **«Вариант табло»** доступны десять оформлений. Первые семь меняют
сетку, форму плашек и расположение элементов, а цвета, шрифт, логотипы и фоны остаются вашими.
Восьмой вариант — KeepTheScore — включает отдельное тёмно-синее табло со своей палитрой
и шрифтом, девятый — YouTube — табло для прямого эфира с меткой `LIVE` и своей палитрой,
десятый — YouTube — сеты — таблица сетов с заголовком внизу, меткой `LIVE` и своей палитрой.
При выборе этих вариантов поля «Цвета» и «Шрифт» показывают настройки соответствующего
табло, а остальные оформления сохраняют свои.

| Вариант | Описание |
| --- | --- |
| **Arena** | основной вид как у KeepTheScore: крупные плашки, вертикальная статистика между счетами |
| **Классика** | карточки с рамками, название команды и счёт — единый блок |
| **Трансляция** | команды и счёт в одну строку, статистика — вертикально между счетами |
| **Дуэль** | счёта по краям, вертикальная статистика между ними |
| **Минимал** | прозрачные плашки, только текст и тонкие линии |
| **Стекло** | полупрозрачные карточки с размытием фона |
| **Оверлей** | компактная плашка-scorebug для OBS и нижней трети экрана, статистика между счетами |
| **KeepTheScore** | третье табло: тёмно-синий фон, крупный счёт на панелях, внизу одной полосой SETS WON / TIME OUTS и партии |
| **YouTube** | четвёртое табло для прямого эфира: тёмный фон, метка LIVE, крупный счёт, внизу одной полосой SETS WON / TIME OUTS и партии |
| **YouTube — сеты** | пятое табло: таблица сетов как на KeepTheScore — команды слева, счёт по партиям колонками справа, заголовок внизу, метка LIVE |

Все варианты работают с масштабами шрифтов: если при большом размере счёт не помещается
в плашку, он автоматически немного уменьшается, поэтому цифры не выходят за границы.
Так же автоматически подгоняется статистика: строка `SETS WON` между названиями команд и блок
`TIME OUTS` / партии немного сжимаются по ширине и высоте, чтобы подпись оставалась над значением
и ничего не выходило за границы между счетами. Названия команд
уменьшаются только если действительно не влезают в плашку.

---

## 7. Звук

Звуки синтезируются через Web Audio API — отдельные файлы не нужны.
Очки, снятие очка, тайм-аут, завершение партии и матча, отмена действия звучат по-разному.
Кнопка 🔊 в шапке включает/выключает звук. Браузер включает аудио после первого клика
по странице — это нормальное ограничение автовоспроизведения.

---

## 8. Файлы

```
index.html      табло + пульт (вся логика и стили в одном файле)
remote.html     лёгкий пульт для телефона: только счёт и тайм-ауты
board.html      отдельная страница только с табло (для второй вкладки и OBS)
board2.html     второй вариант табло: статистика строками в центре (для OBS)
board3.html     третий вариант в стиле KeepTheScore (для OBS)
board4.html     четвёртый вариант для YouTube: метка LIVE (для OBS)
board5.html     пятый вариант для YouTube: таблица сетов, заголовок внизу (для OBS)
overlay.html    компактный OBS-scorebug
server.js       HTTP-сервер + WebSocket + хранение комнат
package.json    npm start, без зависимостей
Dockerfile      образ для Railway/VPS и любого Docker-хостинга
render.yaml     готовый Blueprint для Render
railway.json    настройки запуска для Railway
DEPLOY.md       пошаговая инструкция по онлайн-хостингу
README.md       эта инструкция
CODE.md         полный код всех файлов одним текстом
data/           создаётся автоматически, состояние комнат
```

---

## 9. Частые вопросы

**Табло пишет «офлайн».**
Сервер не запущен или страница открыта как файл (`file://`). Запустите `node server.js`
и откройте `http://localhost:8787/`. Для работы по сети проверьте брандмауэр и одинаковость
`room` на устройствах.

**Порт занят.**
Задайте другой: `set PORT=8788 && node server.js` (Windows CMD) или
`$env:PORT=8788; node server.js` (PowerShell).

**Изменения не появляются на втором устройстве.**
Проверьте, что у обоих одинаковый `room` в адресе, и откройте `/health` — там видно число
комнат и клиентов.

**Телефон не открывает пульт.**
Телефон и компьютер должны быть в одной Wi-Fi сети. Откройте на компьютере `/net` —
там будет нужный IPv4-адрес, и используйте его в ссылке `http://<IP>:8787/remote.html?room=main`.
Если страница не грузится, разрешите Node.js доступ к сети в брандмауэре Windows.

**Нужен ли Supabase/Firebase?**
Нет. Синхронизацию обеспечивает собственный WebSocket-сервер. Если позже понадобится
облачная база, состояние можно зеркалировать в Supabase/Firebase, но для матча достаточно
`data/<room>.json`.

**Можно ли раздать ссылку зрителям?**
Да, но зрителям лучше давать `?display=1` или `overlay.html` — на пульте есть кнопки.
Отдельной авторизации нет: кто знает адрес комнаты, тот может менять счёт. Для публичного
стрима держите ссылку на пульт приватной.

---

## 10. Технические детали

- Node.js `http` + ручная реализация WebSocket (RFC 6455), без `ws` и других пакетов.
- Поддержка фрагментированных сообщений, ping/pong, корректного close-handshake.
- Лимит сообщения — 8 МБ (фон и логотипы в data URL), защита от path traversal, запрет раздачи `data/`.
- WebSocket: `ws://host/ws?room=<room>`.
- Сообщения клиента: `hello`, `state`, `sync`, `patch`, `ping`.
- Сообщения сервера: `welcome`, `state`, `presence`, `need-state`, `ack`, `pong`.
- `state` содержит `rev`, `names`, `titles`, `score`, `setsWon`, `sets`, `setNumber`,
  `serve`, `timeouts`, `matchOver`, `settings`, `design`.
- `patch` — лёгкое обновление счёта с телефона: сервер принимает только поля
  `score`, `setsWon`, `sets`, `setNumber`, `serve`, `timeouts`, `matchOver`,
  сам подставляет `rev` и подтверждает изменение сообщением `ack`.
- `GET /net` — локальные IPv4-адреса компьютера и порт; используется для ссылки на пульт.
- `GET /health` — состояние сервера, число комнат и клиентов.
- Переменные окружения: `PORT` (порт), `HOST` (по умолчанию `0.0.0.0`),
  `DATA_DIR` (папка состояния комнат; на хостинге укажите постоянный диск).
- На хостинге клиент автоматически использует `wss://`, если страница открыта по HTTPS.
- Папка `DATA_DIR` никогда не раздаётся как статика, даже если находится внутри проекта.

---

## 11. Онлайн-хостинг

Для доступа из интернета нужен Node.js-хостинг с WebSocket. В проекте уже есть
`Dockerfile`, `render.yaml` и `railway.json`, а сервер читает `PORT` и `DATA_DIR`.

Кратко:

- **Railway** — самый быстрый вариант без Git: `npm i -g @railway/cli`, затем
  `railway login`, `railway init`, `railway up`, `railway domain`.
  Для сохранения состояния добавьте volume на `/data` и переменную `DATA_DIR=/data`.
- **Render** — через GitHub: New → Web Service → Start Command `node server.js`,
  Health Check `/health`. На платном тарифе добавьте диск `/var/data` и `DATA_DIR=/var/data`.
- **VPS/Docker** — `docker build -t arena-volley .` и запуск с volume на `/data`,
  HTTPS через Caddy или Nginx.

После деплоя ссылки выглядят так:

```
https://<домен>/?room=main                  пульт + табло (только для вас)
https://<домен>/remote.html?room=main       пульт на телефоне
https://<домен>/board5.html?room=main       табло для зрителей
https://<домен>/overlay.html?room=main      оверлей для OBS
https://<домен>/health                      проверка сервера
```

Подробные шаги, настройка постоянного диска, HTTPS, обновление и меры безопасности —
в **[DEPLOY.md](DEPLOY.md)**.

> На ноябрь 2026: Railway Trial — $5 разово на 30 дней, дальше Free $0/мес
> (кредит $1/мес, volume до 500 МБ) или Hobby $5/мес; сервис не засыпает.
> Render Free — $0, но засыпает через 15 минут без запросов и не хранит файлы;
> постоянное хранение — платный compute от $7/мес + диск от $0.25/ГБ/мес.
> Актуальные детали — в **[DEPLOY.md](DEPLOY.md)**.
````

## DEPLOY.md

````md
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
````
