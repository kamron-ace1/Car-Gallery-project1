# BMW Heritage Gallery 🚗

BMW avtomobil brendining eng noyob va eksklyuziv modellariga bag'ishlangan zamonaviy web-sayt.

## 📋 Loyiha haqida

**BMW Heritage Gallery** – bu BMW tarixidagi eng mashhur modellarni jamlagan interaktiv galereya. Saytda 8 ta noyob model, ularning texnik xususiyatlari va qiziqarli tarixiy ma'lumotlar mavjud.

## ✨ Asosiy funksiyalar

- **8 ta noyob BMW modeli** – 507 Roadster, 3.0 CSL "Batmobile", M1, M3 GTR va boshqalar
- **To'liq texnik ma'lumotlar** – Dvigatel, ot kuchi, tezlik, ishlab chiqarish soni
- **3 til** – Ingliz, Nemis, O'zbek
- **Zamonaviy dizayn** – Glassmorphism, animatsiyalar, parallax
- **Responsive** – Barcha qurilmalarga mos
- **Filter va qidiruv** – Modellarni osongina topish
- **Wishlist** – Sevimli modellarni saqlash
- **Auth tizimi** – Ro'yxatdan o'tish va kirish

## 🚘 Galereyadagi modellar

| Model | Nickname | Yil | Dvigatel | Ishlab chiqarish |
|-------|----------|-----|----------|------------------|
| M3 GTR Strassenversion | "The Most Wanted" | 2001 | 4.0L V8 | 10 dona |
| BMW 3.0 CSL | "The Modern Batmobile" | 2023 | 3.0L Twin-Turbo Inline-6 | 50 dona |
| M4 CSL | "The Lightweight Legend" | 2023 | 3.0L Twin-Turbo Inline-6 | 1000 dona |
| M5 CS | "The Ultimate Driving Machine" | 2021 | 4.4L Twin-Turbo V8 | 1100 dona |
| XM Label Red | "The Red Beast" | 2024 | 4.4L V8 Plug-in Hybrid | 500 dona |
| M850i Edition M Heritage | "The Tribute Edition" | 2026 | 4.4L Twin-Turbo V8 | 500 dona |
| M340i 50 Jahre Edition | "The Golden Jubilee" | 2026 | 3.0L Turbo Inline-6 | limited |

## 🛠 Texnologiyalar

- **HTML5** – Struktura
- **CSS3** – Stillar, animatsiyalar
- **JavaScript (ES6+)** – Interaktivlik
- **Tailwind CSS** – Utility-first CSS framework
- **Font Awesome 6** – Ikonkalar


## 📁 Loyiha strukturasi

```text
GALLERY-PROJECT/
├── 📁 assets/
│   ├── 📁 fonts/          # Shriftlar
│   ├── 📁 icons/          # Ikonkalar
│   ├── 📁 images/         # Avtomobil va UI rasmlari (cars, gallery, hero, logos)
├── 📁 css/
│   ├── 📄 animations.css   # Maxsus animatsiyalar
│   ├── 📄 components.css   # Komponentlar uchun stillar
│   ├── 📄 responsive.css   # Mobil qurilmalarga moslashuv
│   ├── 📄 style.css        # Asosiy dizayn
│   └── 📄 variables.css    # Rang va o'zgaruvchilar
├── 📁 js/
│   ├── 📄 animations.js    # JS animatsiyalari
│   ├── 📄 auth.js          # Kirish va ro'yxatdan o'tish
│   ├── 📄 car-modal.js     # Mashina haqida popup oynasi
│   ├── 📄 cars-data.js     # Avtomobillar ma'lumotlar bazasi
│   ├── 📄 gallery-data.js  # Galereya kontenti
│   ├── 📄 language.js      # Tilni almashtirish mantiqi
│   ├── 📄 main.js          # Asosiy script
│   ├── 📄 search.js        # Qidiruv tizimi
│   ├── 📄 ui.js            # Interfeys boshqaruvi
│   └── 📄 wishlist.js      # Sevimli modellar mantiqi
├── 📁 utils/
│   ├── 📄 constants.js     # O'zgarmas qiymatlar
│   └── 📄 helpers.js       # Yordamchi funksiyalar
├── 📄 index.html           # Asosiy sahifa
└── 📄 README.md            # Loyiha qo'llanmasi