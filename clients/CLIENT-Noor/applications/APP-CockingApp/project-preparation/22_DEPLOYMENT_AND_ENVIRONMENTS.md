# 22_DEPLOYMENT_AND_ENVIRONMENTS.md
## CockingApp — النشر والبيئات

| Metadata | |
|----------|-|
| **Phase** | 3 — Project Preparation |
| **Status** | Draft v1 |
| **Dependencies** | `08_TECHNICAL_ARCHITECTURE.md` |
| **Deployment Type** | On-premise (سيرفر العميل) |
| **Date** | 2026-06-30 |

---

## 1. البيئات

| البيئة | الغرض | تفاصيل السيرفر |
|--------|-------|----------------|
| **Development** | تطوير محلي | `localhost:3000` — PostgreSQL محلي |
| **Production** | سيرفر العميل | On-premise — التفاصيل لم تحدد بعد |

> ⚠️ **معلومة ناقصة**: تفاصيل سيرفر العميل (OS, RAM, CPU, storage, network) لم تحدد بعد. يجب الحصول عليها قبل النشر.

---

## 2. متطلبات السيرفر (مبدئية)

| المكون | المتطلبات المقترحة |
|--------|-------------------|
| OS | Ubuntu 22.04 LTS / Windows Server 2022 |
| Node.js | v18 LTS أو أحدث |
| PostgreSQL | 15 أو أحدث |
| RAM | 2GB minimum (4GB recommended) |
| Storage | 20GB+ (حسب عدد الصور) |
| Process Manager | PM2 (للـ Node.js) أو systemd |

---

## 3. خطوات النشر (Production)

### 3.1 تحضير السيرفر

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# تثبيت PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# تثبيت PM2 (مدير العمليات)
sudo npm install -g pm2

# تثبيت nginx (لـ reverse proxy — اختياري)
sudo apt install -y nginx
```

### 3.2 إعداد قاعدة البيانات

```bash
# إنشاء قاعدة بيانات
sudo -u postgres psql -c "CREATE DATABASE cockingapp;"
sudo -u postgres psql -c "CREATE USER cockingapp WITH ENCRYPTED PASSWORD 'your-password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE cockingapp TO cockingapp;"
```

### 3.3 نشر التطبيق

```bash
# نسخ الملفات إلى السيرفر (scp أو git pull)
git pull origin main

# تثبيت الاعتماديات
npm install

# بناء التطبيق
npm run build

# تطبيق ترحيلات قاعدة البيانات
npx prisma migrate deploy

# تشغيل التطبيق عبر PM2
pm2 start npm --name "cockingapp" -- start
pm2 save
pm2 startup
```

### 3.4 إعداد Nginx (Reverse Proxy — اختياري)

```nginx
server {
    listen 80;
    server_name cockingapp.local;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /images/ {
        # خدمة الصور المرفوعة مباشرة
        alias /var/www/cockingapp/public/images/;
    }
}
```

---

## 4. متغيرات البيئة للإنتاج

```env
# .env (ملف الإنتاج)
DATABASE_URL="postgresql://cockingapp:password@localhost:5432/cockingapp"
SESSION_SECRET="[generate-64-char-random-string]"
ADMIN_USERNAME="noor"
ADMIN_PASSWORD_HASH="[bcrypt-hash-of-password]"
UPLOAD_DIR="/var/www/cockingapp/public/images/recipes"
NEXT_PUBLIC_SITE_URL="http://[server-ip-or-domain]"
```

---

## 5. الصيانة

### 5.1 تحديث التطبيق

```bash
git pull origin main
npm install
npm run build
npx prisma migrate deploy
pm2 restart cockingapp
```

### 5.2 مراقبة السيرفر

| الأداة | الغرض |
|--------|-------|
| PM2 Monitor | `pm2 monit` — مراقبة الذاكرة وCPU |
| PM2 Logs | `pm2 logs cockingapp` — مراقبة الأخطاء |
| PostgreSQL Logs | سجلات قاعدة البيانات |

---

## 6. قائمة التحقق للنشر

- [ ] تحديد تفاصيل سيرفر العميل (OS, specs)
- [ ] تثبيت Node.js + PostgreSQL على السيرفر
- [ ] إعداد قاعدة البيانات والمستخدم
- [ ] نسخ ملفات التطبيق إلى السيرفر
- [ ] إعداد `.env` بقيم الإنتاج
- [ ] تشغيل `npm install` و `npm run build`
- [ ] تشغيل `npx prisma migrate deploy`
- [ ] تشغيل التطبيق عبر PM2
- [ ] (اختياري) إعداد Nginx كـ reverse proxy
- [ ] اختبار أن التطبيق يعمل بشكل صحيح

---

## 7. Open Decisions

| القرار المعلق | المسؤول |
|---------------|---------|
| تفاصيل سيرفر العميل (OS, RAM, storage) | العميل (نور/ماجد) |
| Domain name أو IP ثابت | العميل |
| هل يحتاج SSL؟ | العميل |
| تكرار النسخ الاحتياطي | العميل |

---

## 8. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v1 | 2026-06-30 | Tera | توثيق النشر والبيئات — مؤقت لحين الحصول على تفاصيل السيرفر |
