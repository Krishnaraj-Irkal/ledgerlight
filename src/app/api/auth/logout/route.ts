// File: src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  // Clear the cookie
  res.cookies.set('token', '', { path: '/', maxAge: 0 });
  return res;
}
