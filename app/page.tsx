import data from '@/data/products.json';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section
  className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-cover bg-center py-12 md:py-20"
  style={{ backgroundImage: "url('/images/bg-hero.jpg')" }}
>
  {/* затемнение фона */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* контент в контейнере */}
  <div className="relative z-10 container text-center space-y-5 px-4">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border text-gray-800 shadow-md transition hover:shadow-lg hover:-translate-y-0.5">
      🚀 Авторский магазин цифровых инструментов
    </div>

    <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white">
      Цифровые продукты для продуктивности и свободы
    </h1>

    <p className="text-gray-200 max-w-2xl mx-auto">
      Шаблоны Notion, таблицы Excel и мини-курсы. Мгновенная оплата и моментальный доступ.
    </p>

    {/* кнопки: колонка на мобиле, ряд на больших */}
    <div className="flex flex-col sm:flex-row justify-center gap-3">
      <a href="/catalog" className="btn-primary px-5 py-3 rounded-full transition hover:brightness-110">
        Смотреть каталог
      </a>
      <a
        href="/about"
        className="px-5 py-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 border shadow-md transition hover:shadow-lg hover:-translate-y-0.5"
      >
        О проекте
      </a>
    </div>
  </div>
</section>

    </div>
  );
}
