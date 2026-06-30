# PROJECT_RULES.md
## CockingApp — قواعد المشروع

| Metadata | |
|----------|-|
| **Phase** | 3 — Project Preparation |
| **Status** | ✅ Active |
| **Last Updated** | 2026-06-30 |

---

## 1. قواعد تشغيل Tera الأساسية

هذه القواعد هي الإعداد الافتراضي لتشغيل Tera Agent في هذا المشروع:

### 1.1 Authority Order
عند تضارب التعليمات، يُحتّم بالترتيب التالي:
1. تعليمات النظام/runtime ذات الأولوية الأعلى
2. تعليمات المستخدم الصريحة (ما لم تخالف السلامة أو قيود النظام)
3. `.opencode/agents/tera.md`
4. `tera-system/runtime/*`
5. `tera-system/TeraAgent.md` والمراجع النظامية الأخرى
6. `project-control/*`
7. `project-preparation/*`
8. ذاكرة المحادثة (chat memory)

### 1.2 Phase Discipline
- لا انتقال إلى المرحلة التالية قبل اكتمال المرحلة الحالية واعتمادها
- لا تنفيذ (Phase 6) بدون موافقة Build Mode
- لا تجاوز لبوابات الأمان (Pre-Execution Gate, Post-Execution Review Gate)

### 1.3 Scope Control
- الالتزام بالنطاق المعتمد في `02_SCOPE_AND_BOUNDARIES.md`
- أي إضافة خارج النطاق تتطلب Change Request وتوثيق في `ISSUES_AND_GAPS.md`
- لا إضافة ميزات غير مطلوبة صراحةً

### 1.4 Language
- جميع ملفات الإعداد وواجهة المستخدم: **العربية (RTL)**
- التعليقات في الكود: بالإنجليزية (ممارسة قياسية)

### 1.5 Technology
- **المكدس**: Next.js (App Router) + TypeScript + Prisma + PostgreSQL
- **التصميم**: Claude Design System من `getdesign.md` — ألوان كريمي/مرجاني/كحلي
- **الاستضافة**: On-premise (سيرفر العميل)
- **لا مكتبات خارجية غير ضرورية**

### 1.6 File Standards
- جميع ملفات الإعداد في `project-preparation/`
- جميع ملفات التحكم في `project-control/`
- جميع ملفات العميل في `client-approval/`, `client-assets/`, `client-communications/`, `delivery/`
- لا إنشاء ملفات في `tera-system/` أثناء تنفيذ المشروع
- أي قالب HTML يُبنى بنفس تصميم `APPLICATION_PROPOSAL_TEMPLATE.html`

### 1.7 Anti-Bloat
- لا إنشاء ملفات غير ضرورية
- لا شاشات منفصلة لكل إجراء ما لم تكن مبررة
- لا Sub-Agents إضافيين بدون مبرر واضح
- لا مكتبات/تبعيات غير مطلوبة
- `TASK-ID` واحد = وحدة تنفيذ ومراجعة واحدة فقط

### 1.8 Safety
- Pre-Execution Gate إلزامي قبل أي تنفيذ
- Post-Execution Review Gate إلزامي بعد أي تنفيذ
- لا قبول لأي تسليم بناءً على تقرير الـ Sub-Agent فقط — المراجعة الفعلية للملفات إلزامية
- لا كشف للأسرار أو credentials في أي ملف

---

## 2. قواعد خاصة بالمشروع

*(تضاف هنا عند الاتفاق عليها مع ماجد أو نور)*

- لا توجد قواعد خاصة حتى الآن

---

## 3. قواعد Git

- لا commit أو push بدون موافقة صريحة
- لا force push
- كل push يُسجل في `PROJECT_ACTIVITY_LOG.md`
- الروابط المخزنة في `project-control/GIT_REMOTE.md`

---

## 4. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | القواعد الافتراضية لتشغيل Tera مع إعدادات مشروع CockingApp |
