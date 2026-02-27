import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByEmail } from '@/lib/users'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
  }
  const user = createUser(name, email, password)
  return NextResponse.json({ id: user.id, name: user.name, email: user.email })
}
