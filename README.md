## Twinpy

Twinpy — Next.js-приложение для честных оценок фильмов, рецензий и цифровых билетов.

## Требования

- Node.js 20.9 или новее
- npm

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

Перед публикацией проверьте проект:

```bash
npm run lint
npm run typecheck
npm run build
```

## Запуск на сервере

Для обычного VPS с Node.js:

```bash
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
cd twinpy
npm ci
npm run build
npm run start
```

По умолчанию Next.js слушает порт `3000`. Для постоянной работы используйте PM2 или systemd, а перед приложением поставьте Nginx с HTTPS-прокси на `localhost:3000`.

Пример с PM2:

```bash
npm install --global pm2
pm2 start npm --name twinpy -- start
pm2 save
pm2 startup
```

## Как выкатывать изменения

```bash
git pull origin main
npm ci
npm run lint
npm run typecheck
npm run build
pm2 restart twinpy
```

Если используется другой процесс-менеджер, перезапустите сервис после `npm run build`. Папку `.next` вручную переносить не нужно: она создаётся заново на сервере.

## Данные профиля

Оценки, рецензии и билеты сейчас сохраняются в `localStorage` браузера через Zustand Persist. Это удобно для демо, но данные не являются серверными и не синхронизируются между устройствами. Для production-аккаунтов понадобится API и база данных.
