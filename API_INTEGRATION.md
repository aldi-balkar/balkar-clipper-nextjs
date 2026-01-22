# API Integration Guide

Frontend Next.js ini sudah terintegrasi dengan backend Python FastAPI.

## 🔗 Backend Repository

Backend Python: `balkar-clipper-python` (folder sejajar dengan frontend ini)

## 📋 Setup & Running

### 1. Start Backend (Python)

```bash
cd ../balkar-clipper-python

# Install dependencies (first time)
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env and configure:
# - DATABASE_URL (PostgreSQL)
# - USE_MOCK_AI=True (untuk testing tanpa AI)
# - USE_LOCAL_AI=True (untuk testing dengan LLaVA lokal)

# Run database migrations
# (Backend akan auto-create tables on startup)

# Start server
python -m uvicorn app.main:app --reload
```

Backend akan running di: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

### 2. Start Frontend (Next.js)

```bash
# Install dependencies (first time)
npm install

# Start development server
npm run dev
```

Frontend akan running di: **http://localhost:3000**

## 🌐 API Endpoints

Frontend menggunakan endpoints berikut:

### Projects
- `POST /api/projects` - Create new video project
- `GET /api/projects/{id}` - Get project status & results
- `GET /api/projects` - Get project history
- `POST /api/projects/{id}/retry` - Retry failed project

### Usage
- `GET /api/usage` - Get user usage statistics

### Health
- `GET /api/health` - Health check

## 📁 File Structure

```
lib/
├── api.ts          # Real API integration (NEW)
├── mockApi.ts      # Mock API for testing
└── types.ts        # TypeScript types
```

## 🔧 Configuration

File `.env.local` (sudah dibuat):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_PREFIX=/api
```

## 🎯 Features Integrated

### ✅ Dashboard Page (`app/dashboard/page.tsx`)
- Real API integration untuk generate video
- Polling status dengan interval 3 detik
- Error handling dengan ErrorState component
- Usage tracking dari backend

### ✅ History Page (`app/history/page.tsx`)
- Fetch project history dari backend
- Display status (processing, done, failed)
- Empty state handling

### ✅ Error Handling
Error types dari backend di-map ke frontend:
- `403` → `quota_exceeded`
- `400` + "URL" → `invalid_url`
- `400` + "terlalu panjang" → `video_too_long`
- `500` → `processing_failed`
- Network error → `network_error`
- Other → `unknown`

## 🔄 API Flow

### Generate Video Flow:

```
1. User submit form
   ↓
2. Frontend: generateVideo(options)
   → POST /api/projects
   ← { project_id }
   ↓
3. Frontend: pollProjectStatus(projectId)
   → GET /api/projects/{id} (every 3s)
   ← { status, progress_step, progress_message }
   ↓
4. Update UI dengan ProcessingState
   - downloading (25%)
   - transcribing (50%)
   - analyzing (75%)
   - rendering (90%)
   ↓
5. Status = completed
   ← { videos, hook, caption, covers }
   ↓
6. Display results dengan VideoResultCard, HookSection, etc.
```

## 🐛 Debugging

### Check Backend is Running

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-22T..."
}
```

### Check CORS

Backend sudah configured untuk allow all origins di development:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### View API Docs

Buka: http://localhost:8000/docs

Swagger UI akan menampilkan semua endpoints dan schemas.

## 🚀 Production Deployment

### Backend

1. Deploy Python FastAPI ke:
   - Railway
   - Heroku
   - DigitalOcean
   - AWS EC2
   - Google Cloud Run

2. Setup PostgreSQL database

3. Configure environment variables:
   ```
   DATABASE_URL=postgresql://...
   USE_MOCK_AI=False
   OPENAI_API_KEY=...
   ```

### Frontend

1. Update `.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_API_PREFIX=/api
   ```

2. Deploy ke Vercel/Netlify:
   ```bash
   npm run build
   ```

3. Set environment variables di deployment platform

## 📝 API Response Examples

### Create Project Response
```json
{
  "project_id": "uuid-here",
  "status": "processing",
  "message": "Project created successfully"
}
```

### Project Status Response (Processing)
```json
{
  "id": "uuid",
  "status": "processing",
  "progress_step": "transcribing",
  "progress_message": "Mengubah audio jadi teks..."
}
```

### Project Status Response (Completed)
```json
{
  "id": "uuid",
  "status": "completed",
  "videos": [
    {
      "id": "video-1",
      "video_url": "/storage/videos/...",
      "thumbnail_url": "/storage/thumbnails/...",
      "duration_seconds": 28,
      "subtitle_url": "/storage/subtitles/..."
    }
  ],
  "hook": {
    "text": "Kamu nggak akan percaya apa yang terjadi!"
  },
  "caption": {
    "text": "Amazing discovery...",
    "hashtags": ["#viral", "#trending"]
  },
  "covers": [
    {
      "platform": "youtube",
      "image_url": "/storage/covers/...",
      "headline": "Rahasia Sukses!"
    }
  ]
}
```

## 🔐 Authentication (Future)

Saat ini menggunakan default user. Untuk production:

1. Backend: Implement JWT auth di `app/core/auth.py`
2. Frontend: Add auth context & token management
3. Store token di localStorage/cookies
4. Include token di API headers:
   ```typescript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

## 💡 Tips

1. **Use Mock API for UI Development**
   - Ganti import dari `lib/api.ts` ke `lib/mockApi.ts`
   - Tidak perlu backend running

2. **Debug API Calls**
   - Buka Network tab di browser DevTools
   - Monitor request/response
   - Check CORS errors

3. **Backend Logs**
   - Backend akan print logs di terminal
   - Check errors di backend console

## ✅ Integration Checklist

- [x] `.env.local` created dengan API URL
- [x] `lib/api.ts` created dengan real API functions
- [x] Dashboard page updated untuk use real API
- [x] History page updated untuk use real API
- [x] Error handling dengan ErrorState
- [x] Polling untuk realtime updates
- [x] TypeScript types aligned dengan backend schemas

## 🎉 Ready to Use!

Sekarang frontend dan backend sudah fully integrated. Tinggal:

1. Start backend: `cd ../balkar-clipper-python && uvicorn app.main:app --reload`
2. Start frontend: `npm run dev`
3. Open http://localhost:3000
4. Test generate video dengan real backend!
