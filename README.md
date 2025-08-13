
# madebynazarov-store (v3)

MVP интернет-магазина с YooKassa и авто-выдачей ссылок на скачивание.

## Новое
- `/api/create-payment` теперь добавляет `order_id` в `return_url` и `metadata`.
- Вебхук `/api/yookassa/webhook` подтверждает платеж и создаёт токен скачивания.
- `/api/download/by-order?order=...` — получить ссылку по номеру заказа.
- `/api/download/[token]` — редирект на файл в `/public/downloads` (временная ссылка).
- `/success` — автоматически ждёт токен (polling) и показывает кнопку «Скачать».

## Настройка
1) `.env.local`:
```
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
BASE_URL=http://localhost:3000
```
2) `npm i` → `npm run dev`

## Важно
- Хранилище токенов — **в памяти процесса** (только для dev/demo). Для продакшена — БД/Redis.
- Файлы лежат в `public/downloads/*`. На проде лучше хранить в облаке и выдавать подписанные ссылки.
