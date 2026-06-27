import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const publicRoutes = ['/login', '/logout', '/_next/static', '/favicon.ico']
const adminRoutes = ['/banks', '/parties', '/users']

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(secret)
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload as { userId: number; username: string; role: string }
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes (except /login — handled below for redirect)
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  const token = request.cookies.get('session')?.value
  const payload = token ? await verifyToken(token) : null

  // If user is authenticated and trying to access /login, redirect to /
  if (pathname === '/login' && payload) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // If not authenticated, redirect to /login
  if (!payload) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If route requires ADMIN role and user is not ADMIN, redirect to /
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))
  if (isAdminRoute && payload.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Allow access
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
