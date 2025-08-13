
import { NextRequest, NextResponse } from 'next/server';
import { getByOrder } from '@/lib/downloadStore';

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const order = searchParams.get('order') || '';
  if (!order) return NextResponse.json({ error: 'order required' }, { status: 400 });
  const info = getByOrder(order);
  if (!info) return NextResponse.json({}, { status: 204 });
  const url = `/api/download/${info.token}`;
  return NextResponse.json({ token: info.token, url });
}
