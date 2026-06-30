# 15_SECURITY_AND_ACCESS_CONTROL.md
## CockingApp — الأمان والتحكم بالوصول

| Metadata | |
|----------|-|
| **Phase** | 3 — Project Preparation |
| **Status** | Draft v1 |
| **Dependencies** | `04_USERS_ROLES_PERMISSIONS.md`, `08_TECHNICAL_ARCHITECTURE.md` |
| **Security Sensitivity** | Medium |
| **Date** | 2026-06-30 |

---

## 1. تصنيف الحساسية الأمنية

| المجال | التصنيف | ملاحظات |
|--------|---------|---------|
| بيانات المستخدمين | 🟢 منخفض | لا توجد بيانات شخصية — زوار مجهولون |
| بيانات الوصفات | 🟢 منخفض | معلومات عامة غير حساسة |
| لوحة التحكم | 🟡 متوسط | نقطة الدخول الوحيدة التي تحتاج حماية |
| رفع الملفات | 🟡 متوسط | صور — يجب التحقق من الأنواع |
| التعليقات | 🟢 منخفض | محتوى عام— فلtering SPAM أساسي |

---

## 2. حماية لوحة التحكم (Admin)

### 2.1 المصادقة (Authentication)

| الآلية | الاختيار | التفاصيل |
|--------|----------|---------|
| الطريقة | **JWT (JSON Web Token)** | بسيطة ومناسبة لـ on-premise |
| التخزين | **HTTP‑Only Cookie** | آمن من XSS |
| كلمة المرور | **bcrypt** (hash + salt) | غير مخزنة كنص عادي |
| Admin واحد | بيانات الاعتماد في `.env` | Admin واحد فقط كما هو مطلوب |

### 2.2 تدفق تسجيل الدخول

```
POST /api/admin/auth/login
  ← body: { username, password }
  → التحقق من البيانات
  → إنشاء JWT Token (مدة الصلاحية: 24 ساعة)
  → تخزين في HTTP‑Only Cookie
  → إعادة توجيه إلى /admin

GET /api/admin/auth/me
  ← التحقق من الـ Cookie
  → إعادة بيانات الـ Admin (أو 401)

POST /api/admin/auth/logout
  ← مسح الـ Cookie
  → إعادة توجيه إلى /admin/login
```

### 2.3 Middleware للحماية

```typescript
// middleware.ts — حماية جميع routes تحت /admin
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // حماية كل /admin/* عدا صفحة login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('session')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    try {
      // التحقق من صحة التوكن
      // إذا غير صالح → redirect to login
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  return NextResponse.next()
}
```

---

## 3. حماية API Routes

| المسار | الحماية | الطريقة |
|--------|---------|---------|
| `/api/recipes/*` | عام (عام) | GET فقط للزوار |
| `/api/categories/*` | عام | GET فقط |
| `/api/admin/*` | محمي | التحقق من الـ JWT في كل طلب |
| `/api/admin/login` | عام | POST فقط — نقطة الدخول |
| `/api/admin/logout` | محمي | POST — مسح الجلسة |

### التحقق من Admin في API Route

```typescript
// lib/auth.ts
import { cookies } from 'next/headers'

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return null

  try {
    // التحقق من JWT
    const payload = await verifyToken(token)
    return payload
  } catch {
    return null
  }
}

export function requireAdmin() {
  // استخدام في API Routes: throws 401 if not authenticated
}
```

---

## 4. حماية رفع الملفات

| الإجراء | التفاصيل |
|---------|---------|
| أنواع الملفات المسموحة | `image/jpeg`, `image/png`, `image/webp` |
| الحجم الأقصى | 5MB لكل صورة |
| التخزين | خارج `public/` أو داخل `public/images/recipes/` |
| أسماء الملفات | إعادة تسمية بـ UUID (منع تجاوز المسار واسم متكرر) |
| الرفع | فقط من Admin (خلف المصادقة) |

---

## 5. حماية التعليقات

| الإجراء | التفاصيل |
|---------|---------|
| موافقة مسبقة | التعليقات لا تظهر تلقائياً — تحتاج موافقة Admin |
| منع HTML | تعطيل HTML في التعليقات (نص عادي فقط) |
| طول النص | max 1000 حرف |
| منع الروابط | (اختياري) تصفية الروابط |

---

## 6. حماية قاعدة البيانات

| الإجراء | التفاصيل |
|---------|---------|
| SQL Injection | محمي تلقائياً بواسطة Prisma (parameterized queries) |
| XSS | Next.js يقوم بـ escaping تلقائياً (خاصة `dangerouslySetInnerHTML`) |
| CSRF | استخدام SameSite cookies + التحقق من Origin في API Routes |
| Rate Limiting | (اختياري) تقليل الطلبات المتكررة على API Routes |

---

## 7. متغيرات البيئة الآمنة

```env
# .env (غير مضمن في Git)
DATABASE_URL="postgresql://..."
SESSION_SECRET="[random-64-char-string]"
ADMIN_USERNAME="noor"
ADMIN_PASSWORD_HASH="[bcrypt-hash]"
```

> `.env` مضافة في `.gitignore` — لا ترفع أبداً إلى المستودع.

---

## 8. قائمة التحقق الأمني

- [x] لوحة التحكم محمية بـ JWT
- [ ] كلمة المرور مخزنة بـ bcrypt hash
- [x] API Routes محمية بالـ middleware
- [x] رفع الملفات يتحقق من النوع والحجم
- [x] التعليقات تحتاج موافقة مسبقة
- [x] لا HTML في التعليقات
- [x] Prisma يمنع SQL Injection
- [x] .env في .gitignore
- [ ] Session timeout (24 ساعة)
- [ ] SameSite cookies

---

## 9. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | توثيق الأمان والتحكم بالوصول |
