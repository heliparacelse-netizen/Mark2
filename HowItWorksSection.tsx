import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findUserById, updateWatermark, isPaidPlan } from '@/lib/users'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id
  const user = findUserById(userId)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (!isPaidPlan(user.plan)) {
    return NextResponse.json({ error: 'Paid plan required' }, { status: 403 })
  }

  const { enabled, text } = await req.json()
  updateWatermark(userId, enabled, text)
  return NextResponse.json({ success: true })
}
