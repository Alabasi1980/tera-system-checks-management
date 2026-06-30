# 19_DATABASE_DESIGN.md
## CockingApp — تصميم قاعدة البيانات (Prisma Schema)

| Metadata | |
|----------|-|
| **Phase** | 3 — Project Preparation |
| **Status** | Draft v1 |
| **Source** | `06_DATA_MODEL_PREPARATION.md` |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Date** | 2026-06-30 |

---

## 1. مخطط Prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── التصنيفات ────────────────────────────────────
model Category {
  id          Int       @id @default(autoincrement())
  nameAr      String    @unique @db.VarChar(100)
  slug        String    @unique @db.VarChar(100)
  description String?   @db.VarChar(500)
  sortOrder   Int?      @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  recipes     Recipe[]

  @@map("categories")
}

// ─── المكونات ──────────────────────────────────────
model Ingredient {
  id          Int       @id @default(autoincrement())
  nameAr      String    @unique @db.VarChar(100)
  slug        String    @unique @db.VarChar(100)
  defaultUnit Unit      @default(GRAM)
  description String?   @db.VarChar(500)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  recipeIngredients RecipeIngredient[]

  @@map("ingredients")
}

// ─── الوصفات ───────────────────────────────────────
model Recipe {
  id          Int       @id @default(autoincrement())
  categoryId  Int
  title       String    @db.VarChar(200)
  slug        String    @unique @db.VarChar(200)
  description String?   @db.VarChar(500)
  videoUrl    String?   @db.VarChar(500)
  prepTime    Int?      // وقت التحضير بالدقائق (1B)
  cookTime    Int?      // وقت الطهي بالدقائق (1B)
  servings    Int?      // عدد الأشخاص (1B)
  isPublished Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  category            Category            @relation(fields: [categoryId], references: [id])
  recipeIngredients   RecipeIngredient[]
  images              RecipeImage[]
  steps               RecipeStep[]
  comments            Comment[]

  @@index([categoryId])
  @@index([slug])
  @@index([isPublished, publishedAt])
  @@map("recipes")
}

// ─── مكونات الوصفة (جدول وسيط) ─────────────────────
model RecipeIngredient {
  id           Int       @id @default(autoincrement())
  recipeId     Int
  ingredientId Int
  quantity     Decimal   @db.Decimal(8, 2)
  unit         Unit?     // إذا اختلفت عن الوحدة الافتراضية للمكون
  notes        String?   @db.VarChar(200) // مثل "مذاب"، "مقطع"
  sortOrder    Int?      @default(0)

  recipe      Recipe     @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  ingredient  Ingredient @relation(fields: [ingredientId], references: [id])

  @@unique([recipeId, ingredientId])
  @@index([recipeId])
  @@index([ingredientId])
  @@map("recipe_ingredients")
}

// ─── صور الوصفة ────────────────────────────────────
model RecipeImage {
  id        Int      @id @default(autoincrement())
  recipeId  Int
  url       String   @db.VarChar(500)
  alt       String?  @db.VarChar(200)
  isPrimary Boolean? @default(false)
  sortOrder Int?     @default(0)
  createdAt DateTime @default(now())

  recipe    Recipe   @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@index([recipeId])
  @@map("recipe_images")
}

// ─── خطوات التحضير ─────────────────────────────────
model RecipeStep {
  id          Int      @id @default(autoincrement())
  recipeId    Int
  stepNumber  Int
  instruction String   @db.Text
  createdAt   DateTime @default(now())

  recipe      Recipe   @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@unique([recipeId, stepNumber])
  @@index([recipeId])
  @@index([recipeId, stepNumber])
  @@map("recipe_steps")
}

// ─── التعليقات (1B) ────────────────────────────────
model Comment {
  id          Int       @id @default(autoincrement())
  recipeId    Int
  authorName  String    @db.VarChar(100)
  content     String    @db.Text
  isApproved  Boolean   @default(false)
  approvedAt  DateTime?
  createdAt   DateTime  @default(now())

  recipe      Recipe    @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@index([recipeId])
  @@index([isApproved])
  @@map("comments")
}

// ─── Enum: وحدات القياس ────────────────────────────
enum Unit {
  CUP    // كوب
  TBSP   // ملعقة كبيرة (Tablespoon)
  TSP    // ملعقة صغيرة (Teaspoon)
  KG     // كيلوغرام
  GRAM   // غرام
  ML     // مليلتر
  L      // لتر
  PIECE  // حبة

  @@map("unit_enum")
}
```

---

## 2. ملاحظات على التصميم

| الملاحظة | الشرح |
|----------|-------|
| **Cascade Delete** | عند حذف وصفة، تُحذف تلقائياً: مكوناتها، صورها، خطواتها، تعليقاتها |
| **Unique Constraint** | `@@unique([recipeId, ingredientId])` — منع تكرار المكون في نفس الوصفة |
| **Unique Step** | `@@unique([recipeId, stepNumber])` — منع تكرار رقم الخطوة في نفس الوصفة |
| **Enum للوحدات** | قيم ثابتة لضمان التناسق |
| **Decimal للكمية** | لدعم الكسور (0.5 كوب، 1.25 كغم) |
| **Nullable Unit** | في RecipeIngredient، إذا كانت null → تستخدم defaultUnit من Ingredient |

---

## 3. إستراتيجية الترحيل (Migration)

1. `npx prisma migrate dev --name init` — إنشاء الجداول الأولية (Core 1A بدون Comment و prepTime/cookTime/servings)
2. `npx prisma migrate dev --name add-comments` — إضافة جدول التعليقات + الأوقات (1B)
3. `npx prisma generate` — تحديث Prisma Client

**في الإنتاج (on-premise):**
- `npx prisma migrate deploy` — تطبيق الترحيلات بدون تأكيد

---

## 4. الفهارس (Indexes)

| الجدول | الفهرس | الغرض |
|--------|--------|-------|
| `recipes` | `categoryId` | سرعة تصفية الوصفات حسب التصنيف |
| `recipes` | `slug` | سرعة البحث بالرابط |
| `recipes` | `isPublished, publishedAt` | سرعة عرض الوصفات المنشورة مرتبة |
| `recipe_ingredients` | `recipeId` | سرعة جلب مكونات وصفة |
| `recipe_ingredients` | `ingredientId` | سرعة البحث عن الوصفات التي تحتوي مكوناً |
| `recipe_steps` | `recipeId, stepNumber` | سرعة جلب الخطوات مرتبة |
| `comments` | `isApproved` | سرعة عرض التعليقات المعتمدة |

---

## 5. اعتبارات Prisma

- **Prisma Studio**: `npx prisma studio` لإدارة البيانات أثناء التطوير
- **Seeding**: ملف `prisma/seed.ts` لبيانات اختبارية (تصنيفات، مكونات، وصفة نموذجية)
- **علاقات Eager/Lazy**: استخدام `include` أو `select` حسب الحاجة لتحسين الأداء

---

## 6. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | مخطط Prisma الكامل مع العلاقات والفهارس |
