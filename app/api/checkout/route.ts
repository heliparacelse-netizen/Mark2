export async function GET(req: Request) {
  return new Response(JSON.stringify({ message: 'checkout placeholder' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
