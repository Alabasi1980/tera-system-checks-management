# 08_TECHNICAL_ARCHITECTURE.md
## CockingApp — البنية التقنية والقرارات المعمارية

| Metadata | |
|----------|-|
| **Phase** | 3 — Project Preparation |
| **Status** | Draft v1 |
| **Dependencies** | `00_PROJECT_INPUTS.md`, `06_DATA_MODEL_PREPARATION.md`, `07_SCREENS_AND_UI_STRUCTURE.md` |
| **Date** | 2026-06-30 |

---

## 1. المكدس التقني النهائي

| الطبقة | التقنية | الغرض |
|--------|---------|-------|
| **Framework** | Next.js 14+ (App Router) | التوجيه، SSR، API Routes |
| **Language** | TypeScript (strict) | أمان الأنواع |
| **Database** | PostgreSQL 15+ | تخزين البيانات |
| **ORM** | Prisma | الوصول إلى قاعدة البيانات |
| **UI** | Tailwind CSS | التصميم السريع والمتجاوب |
| **Font** | Tajawal (Google Fonts) | الخط العربي |
| **Auth** | next-auth / lucia / JWT بسيط | حماية لوحة التحكم |
| **File Upload** | (مكتبة محلية) multer/sharp أو uploadthing | رفع الصور |
| **PDF** | @react-pdf/renderer أو html2pdf | تحميل PDF |
| **Icons** | lucide-react | أيقونات |

---

## 2. هيكل المجلدات (Folder Structure)

```
cocking-app/
├── prisma/
│   ├── schema.prisma          # تعريف قاعدة البيانات
│   ├── migrations/            # ملفات الترحيل
│   └── seed.ts                # بيانات اختبارية
│
├── public/
│   ├── images/                # الصور المرفوعة
│   │   └── recipes/           # صور الوصفات
│   └── uploads/               # ملفات أخرى
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Public layout (RTL)
│   │   ├── page.tsx           # الصفحة الرئيسية
│   │   ├── categories/
│   │   │   ├── page.tsx       # قائمة التصنيفات
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # وصفات حسب التصنيف
│   │   ├── recipes/
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # صفحة وصفة مفصلة
│   │   ├── search/
│   │   │   └── page.tsx       # نتائج البحث
│   │   ├── shopping-list/
│   │   │   └── page.tsx       # قائمة المشتريات (1B)
│   │   ├── favorites/
│   │   │   └── page.tsx       # المفضلة (1B)
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx     # Admin layout (sidebar)
│   │   │   ├── login/
│   │   │   │   └── page.tsx   # تسجيل الدخول
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── recipes/
│   │   │   │   ├── page.tsx   # قائمة الوصفات
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   ├── ingredients/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   └── comments/
│   │   │       └── page.tsx   # إدارة التعليقات (1B)
│   │   │
│   │   └── api/               # API Routes
│   │       ├── recipes/
│   │       │   ├── route.ts           # GET (قائمة)
│   │       │   └── [slug]/
│   │       │       ├── route.ts       # GET (تفاصيل)
│   │       │       └── comments/
│   │       │           └── route.ts   # GET/POST
│   │       ├── categories/
│   │       │   └── route.ts
│   │       └── admin/
│   │           ├── dashboard/
│   │           │   └── route.ts
│   │           ├── recipes/
│   │           │   ├── route.ts
│   │           │   └── [id]/
│   │           │       ├── route.ts
│   │           │       └── images/
│   │           │           └── route.ts
│   │           ├── categories/
│   │           │   ├── route.ts
│   │           │   └── [id]/
│   │           │       └── route.ts
│   │           ├── ingredients/
│   │           │   ├── route.ts
│   │           │   └── [id]/
│   │           │       └── route.ts
│   │           ├── comments/
│   │           │   └── route.ts
│   │           └── auth/
│   │               └── route.ts
│   │
│   ├── components/            # المكونات المشتركة
│   │   ├── public/            # مكونات الواجهة العامة
│   │   │   ├── RecipeCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── IngredientList.tsx
│   │   │   ├── StepList.tsx
│   │   │   ├── ScalerControl.tsx       # (1B)
│   │   │   ├── FavoriteButton.tsx      # (1B)
│   │   │   ├── PDFDownloadButton.tsx   # (1B)
│   │   │   ├── CommentSection.tsx      # (1B)
│   │   │   └── ShoppingListPanel.tsx   # (1B)
│   │   │
│   │   ├── admin/             # مكونات لوحة التحكم
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminTable.tsx
│   │   │   ├── RecipeForm.tsx
│   │   │   ├── IngredientPicker.tsx
│   │   │   ├── StepEditor.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   └── DashboardCards.tsx
│   │   │
│   │   └── ui/                # مكونات واجهة عامة
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       ├── Toast.tsx
│   │       └── Spinner.tsx
│   │
│   ├── lib/                   # مكتبات وأدوات
│   │   ├── prisma.ts          # اتصال Prisma (singleton)
│   │   ├── auth.ts            # إعداد Auth
│   │   ├── upload.ts          # رفع الملفات
│   │   ├── pdf.ts             # إنشاء PDF (1B)
│   │   └── utils.ts           # دوال مساعدة
│   │
│   └── types/                 # أنواع TypeScript
│       ├── index.ts           # أنواع عامة
│       └── prisma.ts          # أنواع Prisma (auto-generated)
│
├── .env.local                 # المتغيرات المحلية
├── .env.example               # نموذج المتغيرات
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. تدفق البيانات (Data Flow)

### قراءة البيانات (Public)
```
Browser ← Next.js SSR/SSG ← API Routes (Next.js) ← Prisma ← PostgreSQL
                                │
                           Server Components
                                │
                           Client Components (حيث needed)
```

### كتابة البيانات (Admin)
```
Admin Browser ← React Form ← API Route (validation) ← Prisma ← PostgreSQL
                                    │
                               Image Upload ← مستودع الملفات
```

### تدفق المصادقة
```
Admin ← /admin/login ← التحقق من البيانات ← إنشاء session/JWT ← تخزين في cookie
                                                               │
                                             التحقق في كل /admin/* request
```

---

## 4. استراتيجية العرض (Rendering)

| النوع | الاستخدام | مثال |
|-------|-----------|------|
| **SSR (Server)** | صفحات ديناميكية للمتصفحات | صفحة وصفة، تصنيفات |
| **ISR** | صفحات تتغير أحياناً (revalidate) | الصفحة الرئيسية (revalidate: 60s) |
| **Client-side** | تفاعل المستخدم | نماذج، أزرار، قائمة مشتريات |
| **API Routes** | بيانات JSON للـ Client Components | إرسال النماذج، تحميل البيانات |

---

## 5. قواعد Prisma

### Singleton Pattern (منع تعدد الاتصالات)

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 6. إدارة الملفات (الصور)

- **التخزين**: في `public/images/recipes/` (أو مسار مطلق على السيرفر للإنتاج)
- **التنظيم**: `public/images/recipes/[recipeId]/[filename]`
- **الرفع**: Next.js API Route ← multer/formidable ← تخزين محلي
- **التحقق**: نوع الملف (image/jpeg, image/png, image/webp)، حجم (max 5MB)
- **معالجة**: تحجيم الصور عبر sharp للـ thumbnails

---

## 7. البيئات

| البيئة | الغرض | قاعدة البيانات |
|--------|-------|---------------|
| **Development** | تطوير محلي | PostgreSQL محلي |
| **Production** | سيرفر العميل (on-premise) | PostgreSQL على السيرفر |

ملف `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/cockingapp"
SESSION_SECRET="your-secret-key-here"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="bcrypt-hash"
UPLOAD_DIR="./public/images/recipes"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 8. اعتبارات الأداء

| المجال | الإجراء |
|--------|---------|
| الصور | تحويل إلى WebP، تصغير الحجم، lazy loading |
| Prisma | استخدام `select` بدلاً من `include` لجلب الحقول المطلوبة فقط |
| الفهارس | كما هو موثق في `19_DATABASE_DESIGN.md` |
| التخزين المؤقت | Next.js built-in caching للـ SSR/ISR |
| المكونات | فصل Server/Client Components — تقليل `'use client'` |

---

## 9. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | البنية التقنية الكاملة مع هيكل المجلدات وتدفق البيانات |
