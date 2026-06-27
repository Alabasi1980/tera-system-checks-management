import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_SEED_PASSWORD

  if (!password) {
    console.error('ADMIN_SEED_PASSWORD must be set in .env')
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.user.upsert({
    where: { username },
    update: { passwordHash, isActive: true },
    create: {
      username,
      passwordHash,
      displayName: 'مدير النظام',
      role: 'ADMIN',
      isActive: true,
    },
  })

  console.log(`✅ Admin user ready: ${admin.username} (${admin.role})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
