'use server'

import { getSession } from '@/lib/auth'

export async function getCurrentUser(): Promise<{
  username: string
  role: string
} | null> {
  const session = await getSession()
  if (!session) return null
  return { username: session.username, role: session.role }
}
