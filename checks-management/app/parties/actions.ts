'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export type PartyItem = {
  id: number
  name: string
  phone: string | null
  notes: string | null
  createdAt: Date
  checkCount: number
}

export type PartyFormData = {
  name: string
  phone?: string
  notes?: string
}

export async function listParties(): Promise<PartyItem[] | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  const parties = await prisma.party.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { checks: true } } },
  })

  return parties.map((p) => ({
    id: p.id,
    name: p.name,
    phone: p.phone,
    notes: p.notes,
    createdAt: p.createdAt,
    checkCount: p._count.checks,
  }))
}

export async function createParty(
  data: PartyFormData
): Promise<{ success: true } | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  await prisma.party.create({
    data: {
      name: data.name,
      phone: data.phone || null,
      notes: data.notes || null,
    },
  })

  revalidatePath('/parties')
  return { success: true }
}

export async function updateParty(
  id: number,
  data: PartyFormData
): Promise<{ success: true } | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  await prisma.party.update({
    where: { id },
    data: {
      name: data.name,
      phone: data.phone || null,
      notes: data.notes || null,
    },
  })

  revalidatePath('/parties')
  return { success: true }
}

export async function deleteParty(
  id: number
): Promise<{ success: true } | { error: string }> {
  const session = await requireAdmin()
  if ('error' in session) return session

  const checkCount = await prisma.check.count({
    where: { partyId: id },
  })

  if (checkCount > 0) {
    return {
      error:
        'لا يمكن حذف هذه الجهة لأنها مرتبطة بشيكات موجودة. قم بحذف أو إعادة ربط الشيكات المرتبطة أولاً.',
    }
  }

  await prisma.party.delete({ where: { id } })

  revalidatePath('/parties')
  return { success: true }
}
