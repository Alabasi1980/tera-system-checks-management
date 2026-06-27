'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export type BankItem = {
  id: number
  name: string
  branch: string | null
  accountNumber: string | null
  notes: string | null
  createdAt: Date
  checkCount: number
}

export type BankFormData = {
  name: string
  branch?: string
  accountNumber?: string
  notes?: string
}

export async function listBanks(): Promise<BankItem[] | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  const banks = await prisma.bank.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { checks: true } } },
  })

  return banks.map((b) => ({
    id: b.id,
    name: b.name,
    branch: b.branch,
    accountNumber: b.accountNumber,
    notes: b.notes,
    createdAt: b.createdAt,
    checkCount: b._count.checks,
  }))
}

export async function createBank(
  data: BankFormData
): Promise<{ success: true } | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  const existing = await prisma.bank.findFirst({
    where: { name: data.name },
  })

  if (existing) {
    return { error: 'بنك بنفس الاسم موجود مسبقًا' }
  }

  await prisma.bank.create({
    data: {
      name: data.name,
      branch: data.branch || null,
      accountNumber: data.accountNumber || null,
      notes: data.notes || null,
    },
  })

  revalidatePath('/banks')
  return { success: true }
}

export async function updateBank(
  id: number,
  data: BankFormData
): Promise<{ success: true } | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  const existing = await prisma.bank.findFirst({
    where: { name: data.name, id: { not: id } },
  })

  if (existing) {
    return { error: 'بنك بنفس الاسم موجود مسبقًا' }
  }

  await prisma.bank.update({
    where: { id },
    data: {
      name: data.name,
      branch: data.branch || null,
      accountNumber: data.accountNumber || null,
      notes: data.notes || null,
    },
  })

  revalidatePath('/banks')
  return { success: true }
}

export async function deleteBank(
  id: number
): Promise<{ success: true } | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  const checkCount = await prisma.check.count({
    where: { bankId: id },
  })

  if (checkCount > 0) {
    return {
      error:
        'لا يمكن حذف هذا البنك لأنه مرتبط بشيكات موجودة. قم بحذف أو إعادة ربط الشيكات المرتبطة أولاً.',
    }
  }

  await prisma.bank.delete({ where: { id } })

  revalidatePath('/banks')
  return { success: true }
}
