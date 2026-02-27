import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { findUserById, canGenerate, incrementGenerations } from '@/lib/users'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id
  const user = findUserById(userId)
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (!canGenerate(user)) {
    return NextResponse.json({ error: 'Generation limit reached', limitReached: true }, { status: 403 })
  }

  incrementGenerations(userId)

  // Simulate generation — replace with your actual AI model call
  await new Promise((r) => setTimeout(r, 2000))

  const watermark = user.watermarkEnabled ? (user.watermarkText || 'DesignAI') : null

  return NextResponse.json({
    success: true,
    imageUrl: '/api/placeholder-design',
    watermark,
    generationsUsed: user.generationsUsed,
    plan: user.plan,
  })
}
