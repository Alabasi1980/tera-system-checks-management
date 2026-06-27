'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken } from '@/lib/auth'

export async function login(
  prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'يرجى إدخال اسم المستخدم وكلمة المرور' }
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }
  }

  if (!user.isActive) {
    return { error: 'هذا الحساب غير نشط. الرجاء التواصل مع المشرف' }
  }

  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    return { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }
  }

  const token = await createToken({
    userId: user.id,
    username: user.username,
    role: user.role,
  })

  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })

  redirect('/')
}
