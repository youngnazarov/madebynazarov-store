
'use client';
import data from '@/data/products.json';
import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';

export default function SearchPage(){
  const [q, setQ] = useState('');
  const results = useMemo(() => (data as any).filter((p: any) =>
    (p.title + ' ' + p.summary + ' ' + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase())
  ), [q]);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Поиск</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Поиск по каталогу..." type="search" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(p => <ProductCard key={p.id} p={p as any} />)}
      </div>
    </div>
  )
}
