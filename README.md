# Logos frontend

Публичная Vue-витрина для отдельной тематики публикаций. Собственного backend и административной части у проекта нет: публикации, рубрики, страницы и media централизованно хранятся и управляются в `jsint-site`. Дизайн, маршрутизация и SEO принадлежат самому Logos.

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

Создание и редактирование материалов выполняется только через общую админку `jsint-site`. Logos получает опубликованные данные через публичный API и самостоятельно формирует `title`, `meta description`, canonical, OpenGraph, JSON-LD и остальные SEO-представления. Секреты, API-ключи, cookie административной сессии и приватные ключи во frontend не передаются.

Публикация может содержать версионированный профиль `data`, например `logos.article@1` или `logos.lecture@1`. Logos использует такие поля, как аннотация, ключевые слова, список литературы и автор, но не зависит от внутреннего `extra_data` backend.

Перед сборкой можно отдельно проверить архитектурный контракт:

```bash
npm run verify
```

Старые страницы авторизации, регистрации и собственного редактора из проекта удалены: Logos является только публичной витриной.

## Развёртывание

Содержимое каталога `dist/` после `npm run build` можно отдавать любым статическим web-сервером. Для Vue Router сервер должен возвращать `index.html` для неизвестных frontend-маршрутов.
