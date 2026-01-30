# Renessans Admin Demo

Mustaqil admin panel demo versiyasi - backend talab qilinmaydi.

## 🚀 Quick Start

```bash
# Dependencies o'rnatish
npm install

# Development server ishga tushirish
npm run dev
```

Brauzerda: http://localhost:5173

## 🔐 Demo Login

| Field | Value |
|-------|-------|
| **Email** | admin@gmail.com |
| **Password** | admin123 |

## 📋 Features

- ✅ **Dashboard** - Statistika va oxirgi faoliyat
- ✅ **News** - Yangiliklar boshqaruvi
- ✅ **Gallery** - Galereya rasmlari
- ✅ **Opportunities** - Imkoniyatlar
- ✅ **FAQ** - Ko'p so'raladigan savollar
- ✅ **Contact** - Aloqa xabarlar

## 🛠 Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Zustand (state management)

## 📂 Project Structure

```
adminDemo/
├── src/
│   ├── components/       # UI components
│   ├── data/
│   │   └── mockData.ts   # 🔸 All mock data
│   ├── features/
│   │   ├── auth/         # Login, auth store
│   │   ├── dashboard/    # Dashboard page
│   │   ├── news/         # News CRUD
│   │   ├── gallery/      # Gallery CRUD
│   │   ├── opportunities/ # Opportunities CRUD
│   │   ├── faq/          # FAQ CRUD
│   │   └── contact/      # Contact messages
│   └── lib/              # Utils
└── package.json
```

## ⚠️ Important Notes

- Bu **DEMO** versiya - hamma ma'lumotlar mock
- Backend yo'q - hamma narsa client-side
- Sahifani yangilaganda ma'lumotlar reset bo'ladi
- Production uchun **frontend** papkasini ishlating

## 📝 License

© 2026 Renessans Uzbekistan
