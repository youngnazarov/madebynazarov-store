
import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/downloadStore';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    if (!shopId || !secretKey) return NextResponse.json({ ok:false, error:'Credentials missing' }, { status: 500 });

    const event = payload?.event;
    const paymentId = payload?.object?.id;

    if (event === 'payment.succeeded' && paymentId) {
      // Verify with YooKassa API
      const verifyRes = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
        headers: { 'Authorization': 'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64') }
      });
      const data = await verifyRes.json();
      if (verifyRes.ok && data.status === 'succeeded') {
        const orderId = data?.metadata?.order_id as string | undefined;
        const filePath = data?.metadata?.file_path as string | undefined;
        if (orderId && filePath) {
          const token = createToken(orderId, filePath);
          console.log('Download token created:', token, 'for order', orderId);
        }
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
