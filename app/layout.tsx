import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import localFont from 'next/font/local'

const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Inter-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = localFont({
  src: [
    { path: '../public/fonts/Manrope-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-manrope',
  display: 'swap',
})

export const viewport = { width: 'device-width', initialScale: 1 };
export const metadata: Metadata = {
  title: 'madebynazarov — цифровые продукты',
  description: 'Шаблоны Notion, таблицы Excel и мини-курсы. Мгновенная оплата и доступ.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <Header />
        <main className="container pb-10 pt-36 md:pt-24 lg:pt-20">
  {children}
</main>
        <Footer />
      </body>
    </html>
  )
}
