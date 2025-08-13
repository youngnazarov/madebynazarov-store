'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container flex items-center gap-3 py-3">
        {/* ЛОГО + НАЗВАНИЕ */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="logo" className="w-6 h-6" />
          <span className="font-semibold">madebynazarov</span>
        </Link>

        {/* NAV ДЛЯ ДЕСКТОПА */}
        <nav className="ml-auto hidden md:flex items-center gap-2">
          <Link href="/" className="px-3 py-2 rounded-full border hover:bg-gray-50">Магазин</Link>
          <Link href="/catalog" className="px-3 py-2 rounded-full border hover:bg-gray-50">Каталог</Link>
          <Link href="/about" className="px-3 py-2 rounded-full border hover:bg-gray-50">О проекте</Link>
          <Link href="/faq" className="px-3 py-2 rounded-full border hover:bg-gray-50">FAQ</Link>
          <a href="/search" className="px-3 py-2 rounded-full border hover:bg-gray-50">Поиск</a>
          <a href="https://t.me/madebynazarov" target="_blank" className="px-3 py-2 rounded-full border hover:bg-gray-50">Telegram</a>
          <a href="https://instagram.com/madebynazarov" target="_blank" className="px-3 py-2 rounded-full border hover:bg-gray-50">Instagram</a>
          <Link href="/cart" className="px-3 py-2 rounded-full border hover:bg-gray-50">Корзина</Link>
        </nav>
      </div>

      {/* КОМПАКТНАЯ ЛЕНТА ДЛЯ МОБИЛКИ */}
      <div className="md:hidden border-t border-gray-200">
        <div className="container -mx-4 px-4 py-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            <Link href="/" className="px-3 py-2 rounded-full border whitespace-nowrap">Магазин</Link>
            <Link href="/catalog" className="px-3 py-2 rounded-full border whitespace-nowrap">Каталог</Link>
            <Link href="/about" className="px-3 py-2 rounded-full border whitespace-nowrap">О проекте</Link>
            <Link href="/faq" className="px-3 py-2 rounded-full border whitespace-nowrap">FAQ</Link>
            <a href="/search" className="px-3 py-2 rounded-full border whitespace-nowrap">Поиск</a>
            <a href="https://t.me/madebynazarov" target="_blank" className="px-3 py-2 rounded-full border whitespace-nowrap">Telegram</a>
            <a href="https://instagram.com/madebynazarov" target="_blank" className="px-3 py-2 rounded-full border whitespace-nowrap">Instagram</a>
            <Link href="/cart" className="px-3 py-2 rounded-full border whitespace-nowrap">Корзина</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
