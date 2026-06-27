import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET
const COOKIE_NAME = 'session'

function getSecretKey(): Uint8Array {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(JWT_SECRET)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createToken(payload: {
  userId: number
  username: string
  role: string
}): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecretKey())

  return token
}

export async function verifyToken(
  token: string
): Promise<{ userId: number; username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return {
      userId: payload.userId as number,
      username: payload.username as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}

export async function getSession(): Promise<{
  userId: number
  username: string
  role: string
} | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  return verifyToken(token)
}
