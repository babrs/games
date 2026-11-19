# Babrs Games

Игровая платформа Babrs: статический сайт на SvelteKit. Публикуется на GitHub Pages: https://babrs.github.io/games/

## Разделы

| Маршрут | Содержимое |
| :--- | :--- |
| `/` | портал игр |
| `/dobble/` | Good Dobble «Байкал»: 57 символов |
| `/dobble/rules/` | правила Good Dobble |
| `/mafia/baikal/` | Байкальская мафия: персонажи и описание |
| `/mafia/baikal/rules/` | правила Байкальской мафии |
| `/mafia/baikal/host/` | приложение ведущего (PWA, работает без интернета) |

## Структура

- `src/routes/<раздел>/__components/` — компоненты, которые нужны только одной странице.
- `src/lib/content/` — данные игр (схемы `model` рядом с каждым модулем).
- `src/lib/agnostic/js/` — игровая логика без Svelte: тесты в `npm test`.
- `src/lib/svelte/stores/` — модули состояния `.svelte.js`.
- Общие компоненты и стили — из пакета `babrs-ui`.

## Команды

```sh
npm install
npm run dev      # разработка
npm run build    # статическая сборка в build/ (base = /games)
npm test         # тесты чистой логики
```

## Публикация

Workflow `.github/workflows/gh-pages.yml` собирает сайт и пушит его в ветку `gh-pages`. Pages настроен на ветку `gh-pages`. Сборка запускается при пуше в `main`, по `repository_dispatch` `ui-updated` из `Babrs/ui` и вручную.
