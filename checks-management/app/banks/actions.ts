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

type NormalizedBankData = {
  name: string
  branch: string | null
  accountNumber: string | null
  notes: string | null
}

function trimValue(value: string | undefined): string {
  return typeof value === 'string' ? value.trim() : ''
}

function validateBankData(
  data: BankFormData
): NormalizedBankData | { error: string } {
  const name = trimValue(data.name)
  const branch = trimValue(data.branch)
  const accountNumber = trimValue(data.accountNumber)
  const notes = trimValue(data.notes)

  if (!name) return { error: 'اسم البنك مطلوب' }
  if (name.length > 100) return { error: 'اسم البنك يجب ألا يتجاوز 100 حرف' }
  if (branch.length > 100) return { error: 'الفرع يجب ألا يتجاوز 100 حرف' }
  if (accountNumber.length > 50) {
    return { error: 'رقم الحساب يجب ألا يتجاوز 50 حرف' }
  }
  if (notes.length > 500) return { error: 'الملاحظات يجب ألا تتجاوز 500 حرف' }

  return {
    name,
    branch: branch || null,
    accountNumber: accountNumber || null,
    notes: notes || null,
  }
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

  const validated = validateBankData(data)
  if ('error' in validated) return validated

  const existing = await prisma.bank.findFirst({
    where: { name: validated.name },
  })

  if (existing) {
    return { error: 'بنك بنفس الاسم موجود مسبقًا' }
  }

  await prisma.bank.create({
    data: {
      name: validated.name,
      branch: validated.branch,
      accountNumber: validated.accountNumber,
      notes: validated.notes,
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

  const validated = validateBankData(data)
  if ('error' in validated) return validated

  const existing = await prisma.bank.findFirst({
    where: { name: validated.name, id: { not: id } },
  })

  if (existing) {
    return { error: 'بنك بنفس الاسم موجود مسبقًا' }
  }

  await prisma.bank.update({
    where: { id },
    data: {
      name: validated.name,
      branch: validated.branch,
      accountNumber: validated.accountNumber,
      notes: validated.notes,
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
