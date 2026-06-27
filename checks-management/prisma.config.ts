import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasourceUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/checks_management',
})
