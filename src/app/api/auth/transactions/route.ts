import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(req: Request) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  const userId = getUserIdFromToken(token);
  const transactions = await Transaction.find({ userId }).sort({ date: -1 });
  return NextResponse.json({ transactions });
}

export async function POST(req: Request) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  const userId = getUserIdFromToken(token);

  const { type, description, amount, date } = await req.json();
  if (!type || !description || !amount || !date) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const tx = await Transaction.create({
    userId,
    type,
    description,
    amount,
    date: new Date(date),
  });
  return NextResponse.json({ transaction: tx });
}
