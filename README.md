Установить зависимости:
`npm -i`

Локально запустить тесты только в Chromium:
`npm test`

Локально запустить тесты в трёх браузерах:
`npx playwright test`

Запуск с помощью чистого докера:
1. Собрать образ:
`docker build -t playwright-tests .`
2. Запустить тесты
`docker run --rm playwright-tests`

Запуск с помощью docker-compose:
`docker compose -f docker-compose.local.yml run --build --rm playwright`