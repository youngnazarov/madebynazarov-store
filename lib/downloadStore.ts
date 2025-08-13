
type TokenInfo = { filePath: string; expiresAt: number; orderId: string };
const tokens = new Map<string, TokenInfo>();
const orderToToken = new Map<string, string>();

export function createToken(orderId: string, filePath: string, ttlMs = 24 * 60 * 60 * 1000) {
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + ttlMs;
  tokens.set(token, { filePath, expiresAt, orderId });
  orderToToken.set(orderId, token);
  return token;
}

export function getByOrder(orderId: string){
  const token = orderToToken.get(orderId);
  if (!token) return null;
  const info = tokens.get(token);
  if (!info) return null;
  if (info.expiresAt < Date.now()) { tokens.delete(token); orderToToken.delete(orderId); return null; }
  return { token, ...info };
}

export function consumeToken(token: string){
  const info = tokens.get(token);
  if (!info) return null;
  if (info.expiresAt < Date.now()) { tokens.delete(token); return null; }
  // one-time use (optional): tokens.delete(token);
  return info;
}
