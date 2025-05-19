import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  const userId = getUserIdFromToken(token);

  const tx = await Transaction.findOne({ _id: params.id, userId });
  if (!tx) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ transaction: tx });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  const userId = getUserIdFromToken(token);

  const updates = await req.json();
  const tx = await Transaction.findOneAndUpdate(
    { _id: params.id, userId },
    updates,
    { new: true }
  );
  if (!tx) {
    return NextResponse.json({ message: 'Not found or not yours' }, { status: 404 });
  }
  return NextResponse.json({ transaction: tx });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  const userId = getUserIdFromToken(token);

  const tx = await Transaction.findOneAndDelete({ _id: params.id, userId });
  if (!tx) {
    return NextResponse.json({ message: 'Not found or not yours' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Deleted' });
}
