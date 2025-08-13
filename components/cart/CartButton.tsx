'use client';
import Link from 'next/link';
import { useCart } from './cartStore';

export function CartButton(){
  const items = useCart(s => s.items);
  const count = items.reduce((a,b)=>a+b.qty,0);
  return (
    <Link href="/cart" className="btn relative">
      Корзина
      {count>0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center
          text-[11px] rounded-full px-2 py-0.5 bg-blue-600 text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

