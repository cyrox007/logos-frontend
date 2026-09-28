# Logos frontend

Публичная Vue-витрина для отдельной тематики публикаций. Собственного backend и административной части у проекта нет: данные, рубрики, SEO и публикации обслуживаются единым backend `jsint-site`.

## Настройка

Создайте `.env.local`:

```env
VUE_APP_SERVER=https://jsinteractive.ru
VUE_APP_SITE_KEY=logos
```

Для локальной разработки:

```bash
npm ci
npm run serve
```

Production-сборка:

```bash
npm ci
npm run build
```

## Как работает интеграция

Frontend использует только публичный GET API:

```text
/api/public/v1/sites/logos/bootstrap
/api/public/v1/sites/logos/categories
/api/public/v1/sites/logos/publications
/api/public/v1/sites/logos/publications/<slug>
```

В `jsint-site` должен существовать активный сайт с ключом `logos`. Origin этой витрины нужно добавить в настройках сайта в список разрешённых origin публичного API.

Создание и редактирование материалов выполняется только через общую админку `jsint-site`. Секреты, API-ключи, cookie административной сессии и приватные ключи во frontend не передаются.

## Развёртывание

Содержимое каталога `dist/` после `npm run build` можно отдавать любым статическим web-сервером. Для Vue Router сервер должен возвращать `index.html` для неизвестных frontend-маршрутов.
