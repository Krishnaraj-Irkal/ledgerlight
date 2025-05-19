import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  await connectDB();

  // basic validation
  if (!name || !email || !password) {
    return NextResponse.json({ message: 'All fields required' }, { status: 400 });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
  }
  const hash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hash });
  return NextResponse.json({ id: user._id, email: user.email });
}
