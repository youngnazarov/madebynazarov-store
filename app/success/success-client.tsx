'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessClient() {
  const sp = useSearchParams();
  const order = sp.get('order') || '';
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const poll = async () => {
      if (!order) { setChecking(false); return; }
      try {
        const res = await fetch('/api/download/by-order?order=' + encodeURIComponent(order), {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          // поддерживаем оба варианта: token или url
          if (data?.url) {
            setDownloadUrl(data.url);
            setChecking(false);
            return;
          }
          if (data?.token) {
            setDownloadUrl('/api/download/' + data.token);
            setChecking(false);
            return;
          }
        }
      } catch {
        // тихо повторяем
      }
      timer = setTimeout(poll, 2000);
    };

    poll();
    return () => { if (timer) clearTimeout(timer); };
  }, [order]);

  return (
    <div className="container py-10 text-center space-y-4 max-w-xl mx-auto">
      <div className="text-5xl">✅</div>
      <h1 className="text-2xl font-semibold">Оплата прошла успешно!</h1>

      {!order && (
        <p className="text-gray-700">
          Переход без параметра заказа. Если ссылка не появилась, свяжитесь с поддержкой.
        </p>
      )}

      {checking && (
        <p className="text-gray-600">Проверяем подтверждение платежа…</p>
      )}

      {downloadUrl && (
        <a href={downloadUrl} className="btn-primary px-5 py-3 rounded-full">
          Скачать материалы
        </a>
      )}

      <p className="text-sm text-gray-600">
        Вопросы — Telegram:{" "}
        <a
          href="https://t.me/madebynazarov"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          @madebynazarov
        </a>
      </p>
    </div>
  );
}

