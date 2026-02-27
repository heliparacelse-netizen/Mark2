import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  
  try {
    const { plan } = await req.json()

    const priceMap: Record<string, string | undefined> = {
      starter: process.env.STRIPE_PRICE_STARTER,
      pro: process.env.STRIPE_PRICE_PRO,
      studio: process.env.STRIPE_PRICE_STUDIO,
    }

    const priceId = priceMap[plan]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?upgraded=true&plan=${plan}`,
      cancel_url: `${baseUrl}/#pricing`,
      metadata: { plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
