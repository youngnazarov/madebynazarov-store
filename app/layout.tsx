import './globals.css'
import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Inter, Manrope } from 'next/font/google'

// Шрифты из Google с кириллицей
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-manrope',
})

export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

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

