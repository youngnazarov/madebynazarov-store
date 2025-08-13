import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="container py-10 grid gap-6 md:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="logo" className="w-6 h-6" />
            <span className="font-semibold">madebynazarov</span>
          </div>
          <p className="text-sm text-gray-600">
            Цифровые продукты: Notion, Excel, курсы.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Навигация</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/catalog">Каталог</Link></li>
            <li><Link href="/about">О проекте</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/blog">Блог</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Правовое</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/legal/terms">Публичная оферта</Link></li>
            <li><Link href="/legal/privacy">Политика конфиденциальности</Link></li>
            <li><Link href="/legal/refund">Возвраты</Link></li>
            <li><Link href="/legal/license">Лицензия</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Контакты</h4>
          <p className="text-sm">Telegram: <a href="https://t.me/madebynazarov" target="_blank">@youngnazarov</a></p>
          <p className="text-sm">Instagram: @madebynazarov</p>
          <p className="text-sm">Email: d4nil4nazarov@yandex.ru</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} madebynazarov. Все права защищены.
      </div>
    </footer>
  );
}
