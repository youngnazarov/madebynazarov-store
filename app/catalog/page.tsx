
import data from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
export const metadata = { title: 'Каталог — madebynazarov' };
export default function CatalogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Каталог</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map(p => <ProductCard key={p.id} p={p as any} />)}
      </div>
    </div>
  );
}
