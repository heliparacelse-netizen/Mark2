import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { getUsageByEmail, incrementUsageByEmail } from '@/lib/usage';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ used: 0 });
  return NextResponse.json({ used: getUsageByEmail(session.user.email) });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const used = incrementUsageByEmail(session.user.email);
  return NextResponse.json({ used });
}
