
import { NextRequest, NextResponse } from 'next/server';
import { consumeToken } from '@/lib/downloadStore';

export async function GET(_req: NextRequest, { params }: { params: { token: string } }){
  const info = consumeToken(params.token);
  if (!info) return NextResponse.json({ error: 'invalid or expired token' }, { status: 400 });
  // Redirect to static file in public
  return NextResponse.redirect(new URL(info.filePath, process.env.BASE_URL || 'http://localhost:3000'));
}
