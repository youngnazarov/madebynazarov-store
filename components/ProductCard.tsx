'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';
import { useCart } from './cart/cartStore';
import { useState } from 'react';

export default function ProductCard({ p }: { p: Product }) {
  const add = useCart(s => s.add);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    add({ id: p.id, title: p.title, price: p.price, currency: p.currency });
    router.push('/cart'); // сразу показываем результат
  };

  const handleBuy = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: p.id })
      });
      const data = await res.json();
      if (data?.confirmation_url) window.location.href = data.confirmation_url;
      else alert('Не удалось создать платёж.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="relative">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="aspect-video w-full rounded-xl object-cover border border-gray-100 bg-gray-50"
        />
        <div className="absolute top-2 left-2 badge">{p.tags?.[0]}</div>
      </div>
      <div className="mt-3 flex-1">
        <h3 className="font-medium">{p.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.summary}</p>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">{p.price.toLocaleString('ru-RU')} {p.currency}</span>
          <Link href={`/product/${p.slug}`} className="text-sm underline">Подробнее</Link>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAdd} className="btn flex-1">В корзину</button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
  Купить
</button>
        </div>
      </div>
    </div>
  );
}

