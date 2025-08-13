
import { NextRequest, NextResponse } from 'next/server';
import products from '@/data/products.json';

function getFilePathByProduct(productId: string){
  switch(productId){
    case 'notion-work': return '/downloads/notion-work.zip';
    case 'notion-study': return '/downloads/notion-study.zip';
    case 'excel-fin-freedom': return '/downloads/excel-fin-freedom.zip';
    default: return '/downloads/notion-work.zip';
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();
    const product: any = (products as any).find((p: any) => p.id === productId);
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 400 });

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    if (!shopId || !secretKey) return NextResponse.json({ error: 'YooKassa credentials not configured' }, { status: 500 });

    const idempotenceKey = crypto.randomUUID();
    const orderId = crypto.randomUUID();

    const body = {
      amount: { value: product.price.toFixed(2), currency: product.currency || 'RUB' },
      capture: true,
      confirmation: { type: 'redirect', return_url: `${baseUrl}/success?order=${orderId}` },
      description: product.title,
      metadata: { product_id: product.id, order_id: orderId, file_path: getFilePathByProduct(product.id) }
    };

    const res = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
        'Authorization': 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64')
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: 'YooKassa API error', details: data }, { status: 500 });

    return NextResponse.json({ payment_id: data.id, confirmation_url: data?.confirmation?.confirmation_url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
