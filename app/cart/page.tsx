
'use client';
import { useCart } from '@/components/cart/cartStore';

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const total = items.reduce((a, b) => a + b.price * b.qty, 0);

  const checkout = async () => {
    if (items.length === 0) return;
    const first = items[0];
    const res = await fetch('/api/create-payment', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: first.id })
    });
    const data = await res.json();
    if (data.confirmation_url) window.location.href = data.confirmation_url;
    else alert('Не удалось создать платёж.');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Корзина</h1>
      {items.length === 0 ? <p>Корзина пуста.</p> : (
        <div className="grid gap-4">
          {items.map(i => (
            <div key={i.id} className="card flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="font-medium">{i.title}</div>
                <div className="text-sm text-gray-600">{i.price.toLocaleString('ru-RU')} {i.currency}</div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min={1} value={i.qty} onChange={e => setQty(i.id, parseInt(e.target.value || '1'))}
                  className="w-16 rounded-xl border border-gray-200 px-2 py-1" />
                <button className="btn" onClick={() => remove(i.id)}>Удалить</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">Итого: {total.toLocaleString('ru-RU')} RUB</div>
            <div className="flex gap-2">
<button className="btn" onClick={() => clear()}>Очистить</button>
              <button
  onClick={checkout}
  className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
>
  Перейти к оплате
</button>

            </div>
          </div>
          <p className="text-sm text-gray-600">Оплата через ЮKassa. После подтверждения платежа вы получите ссылку на скачивание.</p>
        </div>
      )}
    </div>
  );
}
