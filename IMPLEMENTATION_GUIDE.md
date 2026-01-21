# Balkar Clipper - AI Video Short Generator

Platform AI-powered untuk mengubah video YouTube menjadi video short viral untuk TikTok, Instagram Reels, YouTube Shorts, dan Facebook Reels.

## 🎯 Fitur Utama

### ✅ Sudah Diimplementasi

1. **Dashboard Page** (`/dashboard`)
   - Input YouTube URL dengan validasi
   - Dropdown untuk memilih gaya video (Santai, Edukatif, Emosional)
   - Dropdown bahasa output (Indonesia/English)
   - Checkboxes untuk generate Hook, Caption, dan Cover
   - Advanced Settings (collapsible):
     - Pilih durasi video (15-30s atau 30-45s)
     - Jumlah output (1, 3, atau 5 video)
     - Toggle subtitle style

2. **Processing State**
   - Step-based progress indicator dengan 4 tahap:
     - Downloading video
     - Transcribing audio
     - Analyzing highlights
     - Rendering video
   - Progress bar dengan percentage
   - Visual feedback untuk setiap step
   - Loading animations

3. **Result Section**
   - Video Result Cards dengan:
     - Video preview placeholder
     - Duration badge
     - Platform tags (YouTube, TikTok, Instagram, Facebook)
     - Download button untuk video
     - Download button untuk subtitle (.srt)
   
4. **Hook Section**
   - AI-generated hook text yang menarik
   - Editable text field dengan click-to-edit
   - Copy-to-clipboard functionality
   - Toggle untuk include/exclude hook di video

5. **Caption & Hashtag Section**
   - Editable caption textarea
   - Hashtags display sebagai badges
   - Copy all (caption + hashtags) button
   - Click-to-edit functionality

6. **Cover Generator**
   - Grid layout untuk multiple platforms
   - Preview placeholder untuk setiap platform
   - Editable headline text
   - Regenerate text button
   - Download cover button per platform
   - Platform-specific color themes

7. **History Page** (`/history`)
   - List semua project dengan status
   - Filter tabs (All, Done, Processing, Failed)
   - Thumbnail preview
   - Status badges dengan color coding
   - Relative date formatting
   - Action buttons per status

8. **Usage Panel**
   - Progress bar untuk usage
   - Current plan info (Free/Pro)
   - Usage count (used/total)
   - Next reset date
   - Upgrade button
   - Warning ketika credit hampir habis

## 📁 Struktur File

```
balkar-clipper-nextjs/
├── app/
│   ├── dashboard/
│   │   └── page.tsx           # Main dashboard page
│   ├── history/
│   │   └── page.tsx           # History page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/
│   │   ├── InputForm.tsx      # Form input YouTube URL & options
│   │   ├── ProcessingState.tsx # Progress indicator
│   │   ├── UsagePanel.tsx     # Usage info & plan
│   │   ├── VideoResultCard.tsx # Video result display
│   │   ├── HookSection.tsx    # Hook editor
│   │   ├── CaptionSection.tsx # Caption & hashtag editor
│   │   └── CoverSection.tsx   # Cover image generator
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ... (other landing components)
└── lib/
    ├── types.ts               # TypeScript type definitions
    └── mockApi.ts             # Mock API responses
```

## 🎨 Komponen Reusable

### InputForm
Input form dengan advanced settings collapsible.

**Props:**
- `onGenerate: (options: GenerateOptions) => void` - Callback ketika form disubmit
- `isProcessing: boolean` - Flag untuk disable form saat processing

### ProcessingState
Progress indicator dengan step visualization.

**Props:**
- `currentStep: ProcessingStep` - Step yang sedang diproses
- `progress: number` - Progress percentage (0-100)

### VideoResultCard
Card untuk menampilkan video result.

**Props:**
- `video: VideoOutput` - Data video output

### HookSection
Section untuk edit dan manage hook.

**Props:**
- `hook: Hook` - Data hook
- `onUpdate: (hook: Hook) => void` - Callback untuk update hook

### CaptionSection
Section untuk edit caption dan hashtags.

**Props:**
- `caption: Caption` - Data caption
- `onUpdate: (caption: Caption) => void` - Callback untuk update caption

### CoverSection
Section untuk manage cover images.

**Props:**
- `covers: Cover[]` - Array cover images
- `onUpdate: (covers: Cover[]) => void` - Callback untuk update covers

### UsagePanel
Panel menampilkan info usage dan plan.

**Props:**
- `usage: UsageInfo` - Data usage

## 🔧 Type Definitions

Lihat file `lib/types.ts` untuk definisi lengkap. Beberapa type penting:

- `GenerateOptions` - Options untuk generate video
- `VideoOutput` - Data video hasil generate
- `Hook` - Data hook text
- `Caption` - Data caption dan hashtags
- `Cover` - Data cover image per platform
- `GeneratedResult` - Complete result dari generation
- `HistoryItem` - Item untuk history list
- `UsageInfo` - Info usage dan plan

## 🎭 Mock API

File `lib/mockApi.ts` menyediakan mock responses untuk development:

- `mockGenerateVideo()` - Simulate video generation
- `mockGetJobStatus()` - Get job status dengan complete results
- `mockGetHistory()` - Get history list
- `mockGetUsage()` - Get usage info

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

## 📱 Pages

- `/` - Landing page dengan features, pricing, testimonials
- `/dashboard` - Main dashboard untuk generate video
- `/history` - History page untuk lihat semua project

## 🎯 Integrasi Backend

Untuk menghubungkan dengan backend:

1. Ganti mock API calls di `lib/mockApi.ts` dengan real API endpoints
2. Setup axios atau fetch configuration
3. Handle authentication tokens
4. Setup error handling dan retry logic
5. Implement real video upload/download

Contoh:

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateVideo = async (options: GenerateOptions) => {
  const response = await api.post('/generate', options);
  return response.data;
};

export const getJobStatus = async (jobId: string) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};
```

## 🎨 Styling

- Tailwind CSS v4 untuk styling
- Color scheme: Purple (#A855F7) dan Pink (#EC4899)
- Dark theme dengan background `#0a0e27`
- Responsive design untuk mobile dan desktop
- Smooth animations dan transitions

## 📝 TODO / Improvements

- [ ] Implement real API integration
- [ ] Add authentication (login/register)
- [ ] Add payment integration untuk upgrade
- [ ] Add real video player
- [ ] Add actual file upload/download
- [ ] Add notification system
- [ ] Add webhook untuk processing status
- [ ] Add analytics dashboard
- [ ] Add team collaboration features
- [ ] Add API rate limiting UI

## 🤝 Contributing

Aplikasi ini sudah siap untuk dikembangkan lebih lanjut. Struktur code clean dan modular, memudahkan untuk:
- Menambah fitur baru
- Integrasi dengan backend
- Customization styling
- Menambah platform baru

---

**Built with ❤️ for Indonesian Content Creators**
