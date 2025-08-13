'use client';
import { useCart } from '@/components/cart/cartStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AddToCart({ product }: { product: any }) {
  const add = useCart(s => s.add);
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  return (
    <button
      onClick={() => {
        setAdding(true);
        add({ id: product.id, title: product.title, price: product.price, currency: product.currency });
        router.push('/cart'); // сразу показываем корзину
      }}
      className="btn rounded-full"
      disabled={adding}
    >
      {adding ? 'Добавляем…' : 'В корзину'}
    </button>
  );
}

export function BuyNow({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });
      const data = await res.json();
      if (data.confirmation_url) window.location.href = data.confirmation_url;
      else alert('Не удалось создать платёж. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleBuy} disabled={loading}
      className="btn-primary px-5 py-3 rounded-full"
    >
      {loading ? '…' : 'Купить сейчас'}
    </button>
  );
}

