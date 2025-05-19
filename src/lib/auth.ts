// src/lib/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserIdFromToken(token?: string) {
  if (!token) throw new Error('Unauthenticated');
  const payload = jwt.verify(token, JWT_SECRET) as { id: string };
  return payload.id;
}
