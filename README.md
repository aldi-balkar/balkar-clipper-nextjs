# Balkar Clipper - AI Video Clipper

Frontend web application untuk AI video clipper menggunakan Next.js, TypeScript, dan Tailwind CSS.

**🔗 Full Stack Integration:** Frontend ini sudah terintegrasi dengan [Backend Python FastAPI](../balkar-clipper-python)

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React 19** - UI Library

### Backend (Integrated)
- **Python 3.10+** - Backend Runtime
- **FastAPI** - API Framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Whisper** - Audio Transcription
- **LLaVA** - Vision AI (Local)
- **OpenAI API** - Alternative AI

## 📁 Project Structure

```
balkar-clipper-nextjs/
├── app/
│   ├── layout.tsx              # Root layout dengan metadata
│   ├── page.tsx                # Homepage dengan semua sections
│   ├── globals.css             # Global styles & animations
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard untuk generate video
│   └── history/
│       └── page.tsx            # History page untuk project
├── components/
│   ├── Navbar.tsx              # Navigation bar responsif
│   ├── Hero.tsx                # Hero section dengan animasi
│   ├── Features.tsx            # Grid fitur AI
│   ├── HowItWorks.tsx          # Step-by-step workflow
│   ├── Pricing.tsx             # Pricing plans
│   ├── Results.tsx             # Showcase hasil clipper
│   ├── Testimonials.tsx        # Review dari pengguna
│   ├── CTA.tsx                 # Call-to-action section
│   ├── Footer.tsx              # Footer dengan links
│   └── dashboard/              # Dashboard components
│       ├── ProcessingState.tsx # Processing dengan steps & time estimate
│       ├── ErrorState.tsx      # Error handling dengan solutions
│       ├── EmptyState.tsx      # Empty state dengan tips
│       ├── InputForm.tsx       # Form input dengan validation
│       ├── VideoResultCard.tsx # Video result dengan highlights
│       ├── HookSection.tsx     # Hook editor dengan alternatives
│       ├── CoverSection.tsx    # Cover editor dengan inline edit
│       ├── CaptionSection.tsx  # Caption & hashtags editor
│       └── UsagePanel.tsx      # Usage statistics
├── lib/
│   ├── api.ts                  # Real API integration (NEW)
│   ├── mockApi.ts              # Mock API untuk testing
│   └── types.ts                # TypeScript type definitions
├── public/
│   └── images/                 # Placeholder untuk gambar hasil
├── .env.local                  # API configuration (NEW)
├── start-fullstack.sh          # Start both frontend & backend (NEW)
├── API_INTEGRATION.md          # API integration docs (NEW)
└── README.md
```

## 🎨 Features

### ✅ Frontend Features:

1. **Landing Page** - Homepage dengan Hero, Features, Pricing, Testimonials
2. **Dashboard Page** - Interface untuk generate video dari YouTube URL
3. **History Page** - Daftar semua project yang pernah di-generate
4. **Responsive Design** - Desktop, tablet, dan mobile
5. **Dark Theme** - Konsisten dengan desain modern
6. **Smooth Animations** - Fade-in, hover effects, transitions
7. **SEO Optimized** - Meta tags dan semantic HTML
8. **TypeScript** - Full type safety

### ✅ UX Improvements (8 Priorities):

1. 🔴 **ProcessingState** - Step details, time estimates, real-time status
2. 🟠 **ErrorState** - 6 error types dengan solutions (video_too_long, invalid_url, etc.)
3. 🟠 **Button Feedback** - Loading states, disabled states, visual feedback
4. 🟡 **VideoResultCard** - Best result highlighting, visual hierarchy
5. 🟡 **HookSection** - Large emphasis, alternatives generator
6. 🟡 **CoverSection** - Inline editing, 1-click regenerate
7. 🟢 **EmptyState** - 3 variants dengan tips edukatif
8. 🟢 **History Page** - Clear status, resume/retry functionality

### ✅ Backend Integration:

- **Real API** - Connected to Python FastAPI backend
- **Polling** - Real-time status updates every 3 seconds
- **Error Handling** - Comprehensive error mapping
- **Type Safety** - TypeScript types aligned with backend schemas

## 🚀 Quick Start (Full Stack)

### Option 1: Start Both Servers at Once

```bash
# Make script executable (first time only)
chmod +x start-fullstack.sh

# Start both frontend and backend
./start-fullstack.sh
```

This will:
- Start Python backend at http://localhost:8000
- Start Next.js frontend at http://localhost:3000
- Open API docs at http://localhost:8000/docs

### Option 2: Start Separately

**Terminal 1 - Backend:**
```bash
cd ../balkar-clipper-python
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

## 📚 Documentation

- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Complete API integration guide
- **[UX_UPGRADE_SUMMARY.md](./UX_UPGRADE_SUMMARY.md)** - UX improvements details
- **[COMPONENT_USAGE_EXAMPLES.md](./COMPONENT_USAGE_EXAMPLES.md)** - Component usage examples
- **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Implementation checklist
- **[BEFORE_AFTER_VISUAL_GUIDE.md](./BEFORE_AFTER_VISUAL_GUIDE.md)** - Visual before/after comparison

## 🔗 API Endpoints

Frontend menggunakan endpoints berikut dari backend:

- `POST /api/projects` - Create new video project
- `GET /api/projects/{id}` - Get project status & results
- `GET /api/projects` - Get project history
- `POST /api/projects/{id}/retry` - Retry failed project
- `GET /api/usage` - Get user usage statistics
- `GET /api/health` - Health check

## 🛠️ Development

### Frontend Only (Mock API)

```bash
# Install dependencies
npm install

# Run development server with mock API
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Full Stack Development

```bash
# 1. Setup Backend (First Time)
cd ../balkar-clipper-python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Copy and configure .env
cp .env.example .env
# Edit .env with your API keys (OpenAI, Database URL, etc.)

# 2. Setup Frontend (First Time)
cd ../balkar-clipper-nextjs
npm install

# 3. Start Both Servers
./start-fullstack.sh
```

### Useful Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Test API Connection
curl http://localhost:8000/api/health

# View API Documentation
open http://localhost:8000/docs
```

## 📝 Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_PREFIX=/api
```

### Backend (`.env`)

Lihat `../balkar-clipper-python/.env.example` untuk konfigurasi lengkap:
- Database URL (PostgreSQL)
- OpenAI API Key
- Whisper model configuration
- LLaVA configuration

## 🌐 Pages

### 1. Landing Page (`/`)

- Hero section dengan CTA
- Features showcase (8 fitur AI)
- How It Works (3 langkah)
- Pricing (4 paket)
- Results showcase (6 contoh)
- Testimonials (6 testimoni)
- Trusted By section
- Footer dengan semua link

### 2. Dashboard (`/dashboard`)

- Input form dengan YouTube URL
- Generate video dengan AI (✅ connected to backend)
- Real-time processing status dengan polling
- Lihat hasil Hook, Cover, Caption
- Usage tracker (videos left)
- Error handling dengan 6 error types
- Retry functionality untuk failed projects

### 3. History (`/history`)

- Daftar project dari database (✅ connected to backend)
- Filter by status (all, completed, processing, failed)
- Lihat detail setiap project dengan results
- Resume/retry functionality
- Empty state dengan educational tips

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

## 🔧 Troubleshooting

### Frontend tidak bisa connect ke backend

```bash
# Check backend is running
curl http://localhost:8000/api/health

# Check .env.local configuration
cat .env.local

# Verify CORS settings in backend
# File: ../balkar-clipper-python/app/main.py
```

### Error "Connection refused"

Backend mungkin belum running:
```bash
cd ../balkar-clipper-python
source venv/bin/activate
python -m uvicorn app.main:app --reload
```

### Database errors

Backend memerlukan PostgreSQL:
```bash
# Install PostgreSQL
brew install postgresql@14
brew services start postgresql@14

# Or use Docker
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:14
```

Lihat **[API_INTEGRATION.md](./API_INTEGRATION.md)** untuk troubleshooting lengkap.

## 📱 Sections

1. **Navbar** - Sticky navigation dengan mobile menu
2. **Hero** - Headline + CTA + Stats + Video preview
3. **Trusted By** - Logo scrolling companies
4. **Features** - 8 AI features grid
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

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_API_PREFIX=/api
```

### Backend Deployment

Lihat dokumentasi di `../balkar-clipper-python/README.md` untuk deployment instructions:
- Railway.app (recommended)
- AWS EC2
- Google Cloud Run
- DigitalOcean

### Manual Build

```bash
# Build frontend
npm run build

# Upload .next/, public/, dan package.json ke server
# Start with: npm start
```

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Developer

Built with ❤️ for Balkar Clipper Project by **Aldi Balkar**

Repository: https://github.com/aldi-balkar/balkar-clipper-nextjs

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open pull request

---

**Status**: ✅ Full-stack implementation complete
- ✅ Frontend dengan 8 UX priority upgrades
- ✅ Backend integration dengan Python FastAPI
- ✅ Real-time polling untuk status updates
- ✅ Comprehensive error handling
- ✅ Database integration (PostgreSQL)
- ✅ AI integration (Whisper, LLaVA, OpenAI)
