# 21_VALIDATION_AND_ERROR_HANDLING.md
## CockingApp — التحقق من البيانات ومعالجة الأخطاء

| Metadata | |
|----------|-|
| **Phase** | 3 — Project Preparation |
| **Status** | Draft v1 |
| **Dependencies** | `06_DATA_MODEL_PREPARATION.md`, `12_BUSINESS_RULES.md` |
| **Date** | 2026-06-30 |

---

## 1. التحقق من صحة البيانات (Validation)

### 1.1 وصفة — إنشاء/تعديل

| الحقل | القاعدة | رسالة الخطأ |
|-------|---------|-------------|
| `title` | مطلوب، max 200 حرف | "عنوان الوصفة مطلوب" |
| `categoryId` | مطلوب، رقم صحيح موجود | "يجب اختيار تصنيف" |
| `slug` | يتم إنشاؤه تلقائياً من العنوان | — |
| `description` | اختياري، max 500 حرف | — |
| `videoUrl` | اختياري، إذا وُجد يجب أن يكون رابط YouTube صحيحاً | "رابط YouTube غير صحيح" |
| `prepTime` (1B) | رقم صحيح ≥ 0 (بالدقائق) | "وقت التحضير يجب أن يكون 0 أو أكثر" |
| `cookTime` (1B) | رقم صحيح ≥ 0 (بالدقائق) | "وقت الطهي يجب أن يكون 0 أو أكثر" |
| `servings` (1B) | رقم صحيح ≥ 1 | "عدد الأشخاص يجب أن يكون 1 على الأقل" |

### 1.2 مكونات الوصفة

| الحقل | القاعدة | رسالة الخطأ |
|-------|---------|-------------|
| `ingredientId` | مطلوب، موجود في قاعدة البيانات | "المكون غير موجود" |
| `quantity` | مطلوب، رقم > 0 (يسمح بالكسور 0.5) | "الكمية يجب أن تكون أكبر من 0" |
| `unit` | اختياري — إذا لم يُحدد، تستخدم الوحدة الافتراضية للمكون | — |
| `notes` | اختياري، max 200 حرف | — |

### 1.3 مكون (Ingredient)

| الحقل | القاعدة | رسالة الخطأ |
|-------|---------|-------------|
| `nameAr` | مطلوب، فريد، max 100 حرف | "اسم المكون مطلوب ومميز" |
| `defaultUnit` | مطلوب — اختيار من القائمة | "يرجى اختيار وحدة قياس" |

### 1.4 تصنيف (Category)

| الحقل | القاعدة | رسالة الخطأ |
|-------|---------|-------------|
| `nameAr` | مطلوب، فريد، max 100 حرف | "اسم التصنيف مطلوب ومميز" |
| `sortOrder` | اختياري، رقم صحيح ≥ 0 | — |

### 1.5 تعليق (1B)

| الحقل | القاعدة | رسالة الخطأ |
|-------|---------|-------------|
| `authorName` | مطلوب، max 100 حرف | "الاسم مطلوب" |
| `content` | مطلوب، max 1000 حرف | "التعليق مطلوب (max 1000 حرف)" |
| محتوى HTML | ممنوع — نص عادي فقط | — |

### 1.6 صورة

| الحقل | القاعدة | رسالة الخطأ |
|-------|---------|-------------|
| نوع الملف | `image/jpeg`, `image/png`, `image/webp` | "نوع الملف غير مدعوم. الأنواع المسموحة: JPG, PNG, WebP" |
| الحجم | max 5MB | "حجم الصورة يتجاوز 5MB" |

---

## 2. معالجة الأخطاء — API Routes

### 2.1 هيكل الاستجابة

```typescript
// استجابة ناجحة
{
  "success": true,
  "data": { ... }
}

// استجابة خطأ
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "رسالة الخطأ",
    "details": [  // للتحقق من صحة الحقول
      { "field": "title", "message": "عنوان الوصفة مطلوب" }
    ]
  }
}
```

### 2.2 رموز الحالة (Status Codes)

| الحالة | الرمز | الاستخدام |
|--------|-------|-----------|
| نجاح | 200 | GET, PUT, PATCH |
| تم الإنشاء | 201 | POST |
| طلب خاطئ | 400 | Validation errors |
| غير مصرح | 401 | غير مسجل دخول |
| ممنوع | 403 | ليس لديك صلاحية |
| غير موجود | 404 | المورد غير موجود |
| تعارض | 409 | اسم مكرر (فريد) |
| خادم | 500 | خطأ داخلي |

### 2.3 مثال: إنشاء وصفة

```typescript
// POST /api/admin/recipes
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // التحقق من Admin
    const session = await getAdminSession()
    if (!session) {
      return Response.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "غير مصرح" } },
        { status: 401 }
      )
    }
    
    // التحقق من صحة البيانات
    const errors = validateRecipe(body)
    if (errors.length > 0) {
      return Response.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "بيانات غير صحيحة", details: errors } },
        { status: 400 }
      )
    }
    
    // إنشاء الوصفة
    const recipe = await prisma.recipe.create({
      data: {
        title: body.title,
        slug: generateSlug(body.title),
        categoryId: body.categoryId,
        // ...
        recipeIngredients: {
          create: body.ingredients.map((ing: any) => ({
            ingredientId: ing.ingredientId,
            quantity: ing.quantity,
            unit: ing.unit,
            notes: ing.notes,
          }))
        },
        steps: {
          create: body.steps.map((step: any, index: number) => ({
            stepNumber: index + 1,
            instruction: step.instruction,
          }))
        }
      },
      include: {
        recipeIngredients: { include: { ingredient: true } },
        steps: { orderBy: { stepNumber: 'asc' } },
        images: true,
      }
    })
    
    return Response.json({ success: true, data: recipe }, { status: 201 })
    
  } catch (error) {
    console.error("Error creating recipe:", error)
    return Response.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "حدث خطأ في الخادم" } },
      { status: 500 }
    )
  }
}
```

---

## 3. أخطاء العميل (Client-side)

### 3.1 التحقق الفوري (Client-side Validation)

- التحقق فورياً عند كتابة النص (onChange)
- التحقق عند محاولة الإرسال (onSubmit)
- عرض الأخطاء تحت كل حقل بشكل فوري

### 3.2 حالات الخطأ في الواجهة

| المكون | السلوك |
|--------|--------|
| حقل إدخال | حد أحمر، أيقونة خطأ، رسالة خطأ تحت الحقل |
| نموذج | تعطيل زر الإرسال مع وجود أخطاء |
| تحميل | Spinner + رسالة "جاري التحميل..." |
| خطأ سيرفر (500) | Toast: "حدث خطأ في الخادم، حاول مرة أخرى" |
| عدم وجود بيانات | رسالة مناسبة: "لا توجد وصفات بعد" |
| 404 | صفحة "الصفحة غير موجودة" مع رابط للرئيسية |

### 3.3 Toast Notifications

```typescript
// دالة Toast بسيطة
type ToastType = 'success' | 'error' | 'info'

function showToast(message: string, type: ToastType = 'info') {
  // عرض Toast لمدة 3 ثوانٍ
  // success = أخضر, error = أحمر, info = أزرق
}
```

---

## 4. إدارة الحالات (Loading / Empty / Error)

| الحالة | العرض |
|--------|-------|
| **Loading** | Skeleton cards (للوصفات)، Spinner (للنماذج) |
| **Empty** | رسالة واضحة + Call to action (مثال: "لا توجد وصفات بعد، عد لاحقاً") |
| **Error** | Toast + إعادة المحاولة (حسب السياق) |
| **Not Found** | صفحة 404 مخصصة مع رابط العودة للرئيسية |

---

## 5. تسجيل الأخطاء (Server-side)

```typescript
// في التطوير: console.error + تفاصيل
// في الإنتاج: تسجيل في ملف logs (اختياري — حسب إعدادات السيرفر)
```

---

## 6. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | قواعد التحقق من البيانات ومعالجة الأخطاء |
