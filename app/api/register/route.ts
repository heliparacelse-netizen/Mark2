import { NextResponse } from 'next/server';
import { userStore } from '@/lib/auth';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const exists = userStore.some((user) => user.email.toLowerCase() === String(email).toLowerCase());
  if (exists) return NextResponse.json({ error: 'User exists' }, { status: 400 });

  userStore.push({
    id: `${Date.now()}`,
    name,
    email,
    password,
    generationsUsed: 0
  });

  return NextResponse.json({ success: true });
}
