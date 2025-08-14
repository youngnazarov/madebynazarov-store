import { Suspense } from 'react';
import type { Metadata } from 'next';
import SuccessClient from './success-client';

export const metadata: Metadata = {
  title: 'Оплата успешна — madebynazarov',
};

export const dynamic = 'force-dynamic'; // не пререндерим
export const revalidate = 0;

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="container py-10 text-center">Готовим данные…</div>}>
      <SuccessClient />
    </Suspense>
  );
}
