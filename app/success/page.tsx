
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage(){
  const sp = useSearchParams();
  const order = sp.get('order') || '';
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    let timer: any;
    const poll = async () => {
      if (!order) { setChecking(false); return; }
      const res = await fetch('/api/download/by-order?order=' + encodeURIComponent(order));
      if (res.ok) {
        const data = await res.json();
        if (data?.token && data?.url) { setDownloadUrl(data.url); setChecking(false); return; }
      }
      timer = setTimeout(poll, 2000);
    };
    poll();
    return () => timer && clearTimeout(timer);
  }, [order]);

  return (
    <div className="max-w-xl mx-auto text-center space-y-4">
      <div className="text-5xl">✅</div>
      <h1 className="text-2xl font-semibold">Оплата прошла успешно!</h1>
      {!order && <p className="text-gray-700">Возврат без параметра заказа. Если ссылка не появилась, свяжитесь с поддержкой.</p>}
      {checking && <p className="text-gray-600">Проверяем подтверждение платежа...</p>}
      {downloadUrl && <a href={downloadUrl} className="btn-primary">Скачать материалы</a>}
      <p className="text-sm text-gray-600">Если возникли вопросы — Telegram: <a href="https://t.me/madebynazarov" target="_blank" className="underline">@madebynazarov</a></p>
    </div>
  )
}
