
import data from '@/data/products.json';
import { notFound } from 'next/navigation';
import { AddToCart, BuyNow } from './parts';

export async function generateStaticParams() {
  return (data as any).map((p: any) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string }}) {
  const product = (data as any).find((p: any) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <img src={product.thumbnail} alt={product.title} className="rounded-xl border aspect-video object-cover" />
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.summary}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="text-xl font-semibold">{product.price.toLocaleString('ru-RU')} {product.currency}</div>
          <AddToCart product={product} />
          <BuyNow product={product} />
        </div>
        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <p>Мгновенная доставка: после оплаты получите ссылку на скачивание на почту / в Telegram.</p>
          <p>Поддержка: <a href="https://t.me/madebynazarov" className="underline" target="_blank">связаться</a></p>
        </div>
      </div>
    </div>
  );
}
export const dynamicParams = false;
