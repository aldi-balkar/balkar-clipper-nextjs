# Balkar Clipper - AI Video Clipper

Frontend web application untuk AI video clipper menggunakan Next.js, TypeScript, dan Tailwind CSS.

## 🚀 Tech Stack

- **Next.js 15** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React 19** - UI Library

## 📁 Project Structure

```
balkar-clipper-nextjs/
├── app/
│   ├── layout.tsx          # Root layout dengan metadata
│   ├── page.tsx            # Homepage dengan semua sections
│   └── globals.css         # Global styles & animations
├── components/
│   ├── Navbar.tsx          # Navigation bar responsif
│   ├── Hero.tsx            # Hero section dengan animasi
│   ├── TrustedBy.tsx       # Logo perusahaan
│   ├── Features.tsx        # Grid fitur AI
│   ├── HowItWorks.tsx      # Step-by-step workflow
│   ├── Pricing.tsx         # Pricing plans dengan visi misi disabilitas
│   ├── Results.tsx         # Showcase hasil clipper
│   ├── Testimonials.tsx    # Review dari pengguna
│   ├── CTA.tsx             # Call-to-action section
│   └── Footer.tsx          # Footer dengan links
├── public/
│   └── images/             # Placeholder untuk gambar hasil
└── README.md

```

## 🎨 Features

### ✅ Sudah Diimplementasi:

1. **Responsive Design** - Desktop, tablet, dan mobile
2. **Dark Theme** - Konsisten dengan desain Vizard.ai
3. **Smooth Animations** - Fade-in, hover effects, parallax
4. **AI Features Section** - 6 fitur utama dengan icon SVG
5. **Pricing Section** - 4 paket termasuk gratis untuk disabilitas
6. **Results Section** - Showcase 6 contoh hasil untuk TikTok, Instagram, YouTube
7. **Visi Misi Disabilitas** - Komitmen Balkar untuk inklusivitas
8. **Interactive Elements** - Button hovers, card animations
9. **SEO Optimized** - Meta tags dan semantic HTML
10. **TypeScript** - Full type safety

### 🎯 Fitur Khusus:

- **Icon Profesional**: Semua menggunakan SVG, tidak ada emoji (kecuali di placeholder)
- **Pricing untuk Disabilitas**: Paket gratis selamanya dengan highlight khusus
- **Results Showcase**: 6 kartu hasil siap upload ke platform sosial media
- **Gradient Orbs**: Animasi background yang smooth
- **Scroll Animations**: Intersection Observer untuk fade-in effects

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📝 Environment Variables

Tidak ada environment variables yang diperlukan untuk versi static ini.
Untuk integrasi backend di masa depan, tambahkan `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 🎨 Customization

### Mengubah Warna

Edit `tailwind.config.ts` untuk mengubah color scheme:

```typescript
theme: {
  extend: {
    colors: {
      purple: { ... },
      pink: { ... },
    }
  }
}
```

### Menambahkan Gambar

1. Letakkan gambar di `public/images/`
2. Update path di komponen Results.tsx
3. Gunakan next/image untuk optimasi

## 📱 Sections

1. **Navbar** - Sticky navigation dengan mobile menu
2. **Hero** - Headline + CTA + Stats + Video preview
3. **Trusted By** - Logo scrolling companies
4. **Features** - 6 AI features grid
5. **How It Works** - 3 step process
6. **Pricing** - 4 plans (Free, Pro, Disabilitas, Enterprise)
7. **Results** - 6 example clips ready to upload
8. **Testimonials** - 6 user reviews
9. **CTA** - Final call-to-action
10. **Footer** - Links dan social media

## 🌟 Visi & Misi Disabilitas

Balkar Clipper menyediakan akses **100% GRATIS SELAMANYA** untuk teman-teman berkebutuhan khusus.
Ini adalah komitmen kami untuk menciptakan dunia digital yang lebih inklusif.

**Fitur untuk Disabilitas:**
- Unlimited clips
- Semua fitur AI premium
- 4K export
- No watermark
- Priority support
- Dedicated account manager

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

```bash
# Build
npm run build

# Upload folder .next, public, dan package.json ke server
```

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Developer

Built with ❤️ for Balkar Clipper Project

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

**Note**: Ini adalah frontend static. Untuk implementasi penuh diperlukan:
- Backend API untuk video processing
- Database untuk user management
- Cloud storage untuk video files
- Payment gateway untuk subscription
- Authentication system
