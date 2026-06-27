'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('session', '', { maxAge: 0, path: '/' })
  redirect('/login')
}
