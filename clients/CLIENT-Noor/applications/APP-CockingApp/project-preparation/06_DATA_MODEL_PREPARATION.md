# 06_DATA_MODEL_PREPARATION.md
## CockingApp — تصور البيانات الأولي

| Metadata | |
|----------|-|
| **Phase** | 3 — Project Preparation |
| **Status** | Draft v1 |
| **Dependencies** | `03_MODULES_AND_FEATURES.md`, `05_BUSINESS_WORKFLOWS.md` |
| **Next** | `19_DATABASE_DESIGN.md` (Prisma schema) |
| **Date** | 2026-06-30 |

---

## 1. قائمة الكيانات (Entities)

| الكيان | المعرف | الوصف | Core/1B |
|--------|--------|-------|---------|
| التصنيف | `Category` | فئة الوصفات (مقبلات، رئيسية، حلويات...) | Core |
| المكون | `Ingredient` | مادة خام أو منتج (دقيق، سكر، بيض...) بوحدة قياس افتراضية | Core |
| الوصفة | `Recipe` | وصفة الطبخ — العنوان، الصور، الفيديو، الخطوات، الأوقات | Core |
| مكونات الوصفة | `RecipeIngredient` | ربط بين الوصفة والمكون مع الكمية والوحدة | Core |
| صورة الوصفة | `RecipeImage` | صور متعددة لكل وصفة | Core |
| خطوة التحضير | `RecipeStep` | خطوة من خطوات تحضير الوصفة (نص + ترتيب) | Core |
| التعليق | `Comment` | تعليق زائر على وصفة | 1B |
| المفضلة | `Favorite` | حفظ وصفة في المفضلة (لوجيك: معرف وصفة + معرف متصفح) | 1B |

> **ملاحظة**: المفضلة ستُخزّن محلياً (LocalStorage) وليس في قاعدة البيانات.

---

## 2. مخطط العلاقات (ER Diagram)

```
Category 1───* Recipe
                  │
         Recipe 1───* RecipeIngredient *───1 Ingredient
                  │
         Recipe 1───* RecipeImage
                  │
         Recipe 1───* RecipeStep
                  │
         Recipe 1───* Comment
```

### شرح العلاقات:

| العلاقة | النوع | شرح |
|---------|-------|------|
| `Category → Recipe` | واحد إلى متعدد | تصنيف واحد يضم عدة وصفات |
| `Recipe → RecipeIngredient → Ingredient` | متعدد إلى متعدد عبر جدول وسيط | وصفة تحتوي عدة مكونات، والمكون موجود في عدة وصفات |
| `Recipe → RecipeImage` | واحد إلى متعدد | وصفة تحتوي عدة صور |
| `Recipe → RecipeStep` | واحد إلى متعدد | وصفة تحتوي عدة خطوات مرتبة |
| `Recipe → Comment` | واحد إلى متعدد | وصفة تحتوي عدة تعليقات |

---

## 3. مواصفات الحقول

### Category (التصنيف)

| الحقل | النوع | الطول | إجباري | فريد | ملاحظات |
|-------|------|-------|--------|------|---------|
| id | Int (PK) | — | ✅ | ✅ | Auto-increment |
| nameAr | String | 100 | ✅ | ✅ | اسم التصنيف بالعربية |
| slug | String | 100 | ✅ | ✅ | Slug للرابط (category-name) |
| description | String | 500 | ❌ | ❌ | وصف التصنيف |
| sortOrder | Int | — | ❌ | ❌ | ترتيب العرض |
| createdAt | DateTime | — | ✅ | ❌ | |
| updatedAt | DateTime | — | ✅ | ❌ | |

### Ingredient (المكون)

| الحقل | النوع | الطول | إجباري | فريد | ملاحظات |
|-------|------|-------|--------|------|---------|
| id | Int (PK) | — | ✅ | ✅ | Auto-increment |
| nameAr | String | 100 | ✅ | ✅ | اسم المكون بالعربية |
| slug | String | 100 | ✅ | ✅ | |
| defaultUnit | Enum | — | ✅ | ❌ | وحدة القياس الافتراضية (انظر الوحدات) |
| description | String | 500 | ❌ | ❌ | |
| createdAt | DateTime | — | ✅ | ❌ | |
| updatedAt | DateTime | — | ✅ | ❌ | |

### Recipe (الوصفة)

| الحقل | النوع | الطول | إجباري | فريد | ملاحظات |
|-------|------|-------|--------|------|---------|
| id | Int (PK) | — | ✅ | ✅ | Auto-increment |
| categoryId | Int (FK) | — | ✅ | ❌ | ربط بالتصنيف |
| title | String | 200 | ✅ | ❌ | عنوان الوصفة |
| slug | String | 200 | ✅ | ✅ | |
| description | String | 500 | ❌ | ❌ | وصف قصير |
| videoUrl | String | 500 | ❌ | ❌ | رابط YouTube |
| prepTime | Int | — | ❌ | ❌ | وقت التحضير (دقائق) — 1B |
| cookTime | Int | — | ❌ | ❌ | وقت الطهي (دقائق) — 1B |
| servings | Int | — | ❌ | ❌ | عدد الأشخاص — للقياس الديناميكي 1B |
| isPublished | Boolean | — | ✅ | ❌ | حالة النشر |
| publishedAt | DateTime | — | ❌ | ❌ | تاريخ النشر |
| createdAt | DateTime | — | ✅ | ❌ | |
| updatedAt | DateTime | — | ✅ | ❌ | |

### RecipeIngredient (مكونات الوصفة — جدول وسيط)

| الحقل | النوع | الطول | إجباري | ملاحظات |
|-------|------|-------|--------|---------|
| id | Int (PK) | — | ✅ | Auto-increment |
| recipeId | Int (FK) | — | ✅ | ربط بالوصفة |
| ingredientId | Int (FK) | — | ✅ | ربط بالمكون |
| quantity | Decimal | — | ✅ | الكمية (يمكن أن تكون كسرية: 0.5) |
| unit | Enum | — | ❌ | وحدة القياس (إذا اختلفت عن الافتراضية) |
| notes | String | 200 | ❌ | ملاحظات (مثل "مذاب" أو "مقطع") |
| sortOrder | Int | — | ❌ | ترتيب المكونات |

### RecipeImage (صورة الوصفة)

| الحقل | النوع | الطول | إجباري | ملاحظات |
|-------|------|-------|--------|---------|
| id | Int (PK) | — | ✅ | Auto-increment |
| recipeId | Int (FK) | — | ✅ | |
| url | String | 500 | ✅ | مسار الصورة |
| alt | String | 200 | ❌ | نص بديل |
| isPrimary | Boolean | — | ❌ | الصورة الرئيسية |
| sortOrder | Int | — | ❌ | |
| createdAt | DateTime | — | ✅ | |

### RecipeStep (خطوة التحضير)

| الحقل | النوع | الطول | إجباري | ملاحظات |
|-------|------|-------|--------|---------|
| id | Int (PK) | — | ✅ | Auto-increment |
| recipeId | Int (FK) | — | ✅ | |
| stepNumber | Int | — | ✅ | ترتيب الخطوة |
| instruction | Text | — | ✅ | نص الخطوة (يمكن أن يكون طويلاً) |
| createdAt | DateTime | — | ✅ | |

### Comment (تعليق) — 1B

| الحقل | النوع | الطول | إجباري | ملاحظات |
|-------|------|-------|--------|---------|
| id | Int (PK) | — | ✅ | Auto-increment |
| recipeId | Int (FK) | — | ✅ | |
| authorName | String | 100 | ✅ | اسم المعلق |
| content | Text | — | ✅ | نص التعليق |
| isApproved | Boolean | — | ✅ | حالة الموافقة |
| approvedAt | DateTime | — | ❌ | |
| createdAt | DateTime | — | ✅ | |

---

## 4. وحدات القياس المدعومة

| المعرف | الاسم | النوع |
|--------|-------|-------|
| CUP | كوب | حجم |
| TBSP | ملعقة كبيرة | حجم |
| TSP | ملعقة صغيرة | حجم |
| KG | كيلوغرام | وزن |
| G | غرام | وزن |
| ML | مليلتر | حجم |
| PIECE | حبة | عدد |
| L | لتر | حجم |

---

## 5. قواعد البيانات الأساسية

- **المكونات فريدة**: لا يمكن إضافة مكون بنفس الاسم مرتين (unique on nameAr)
- **التصنيفات فريدة**: لا يمكن إضافة تصنيف بنفس الاسم مرتين
- **حذف التصنيف**: if category has recipes → prevent delete or reassign
- **حذف المكون**: if ingredient is used in recipes → prevent delete (soft delete or warn)
- **التعليقات**: تظهر فقط إذا isApproved = true
- **الوصفات**: تظهر فقط إذا isPublished = true

---

## 6. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | تصور البيانات الأولي مع الكيانات والحقول والعلاقات |
