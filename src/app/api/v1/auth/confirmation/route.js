import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('confirmation_token')

  if (!token) {
    return NextResponse.redirect(new URL('/confirmed?error=invalid_token', request.url))
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api/v1'

  try {
    const res = await fetch(
      `${apiUrl}/auth/confirmation?confirmation_token=${encodeURIComponent(token)}`,
      { redirect: 'manual' }
    )

    if (res.ok || res.status === 302) {
      return NextResponse.redirect(new URL('/confirmed?success=true', request.url))
    }

    return NextResponse.redirect(new URL('/confirmed?error=invalid_token', request.url))
  } catch {
    return NextResponse.redirect(new URL('/confirmed?error=invalid_token', request.url))
  }
}
