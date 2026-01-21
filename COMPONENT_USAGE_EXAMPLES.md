# 🎯 Component Usage Examples

Berikut adalah contoh cara menggunakan component-component yang telah di-upgrade.

---

## 1. ErrorState Component

### Basic Usage
```tsx
import ErrorState from '@/components/dashboard/ErrorState';

// Video terlalu panjang
<ErrorState 
  errorType="video_too_long"
  onChooseAnother={() => router.push('/dashboard')}
  onUpgrade={() => router.push('/pricing')}
/>

// Network error
<ErrorState 
  errorType="network_error"
  onRetry={() => handleRetry()}
/>

// Processing failed
<ErrorState 
  errorType="processing_failed"
  onRetry={() => handleRetry()}
  onChooseAnother={() => resetForm()}
/>
```

### Custom Message
```tsx
<ErrorState 
  errorType="unknown"
  customMessage="Terjadi kesalahan saat mengunduh video. Server mungkin sedang sibuk."
  onRetry={() => handleRetry()}
/>
```

### All Error Types
- `video_too_long` - Shows upgrade + choose another options
- `invalid_url` - Shows choose another option
- `quota_exceeded` - Shows upgrade option
- `processing_failed` - Shows retry + choose another
- `network_error` - Shows retry option
- `unknown` - Shows retry + choose another

---

## 2. EmptyState Component

### Dashboard Empty State
```tsx
import EmptyState from '@/components/dashboard/EmptyState';

<EmptyState 
  variant="dashboard"
  actionHref="/dashboard"
/>
```

### History Empty State
```tsx
<EmptyState 
  variant="history"
  actionHref="/dashboard"
/>
```

### Custom Empty State
```tsx
<EmptyState 
  variant="generic"
  title="Belum Ada Favorit"
  description="Video yang kamu favoritkan akan muncul di sini."
  actionLabel="Jelajahi Video"
  actionHref="/explore"
/>
```

### With Custom Action
```tsx
<EmptyState 
  variant="generic"
  title="Filter Tidak Ada Hasil"
  description="Coba ganti filter atau reset pencarian."
  actionLabel="Reset Filter"
  onAction={() => resetFilters()}
/>
```

---

## 3. ProcessingState Component

### Basic Usage
```tsx
import ProcessingState from '@/components/dashboard/ProcessingState';
import { ProcessingStep } from '@/lib/types';

const [currentStep, setCurrentStep] = useState<ProcessingStep>('downloading');
const [progress, setProgress] = useState(0);

<ProcessingState 
  currentStep={currentStep}
  progress={progress}
/>
```

### Processing Steps Flow
```tsx
// Step 1: downloading (±30s)
setCurrentStep('downloading');
setProgress(25);

// Step 2: transcribing (±1-2min)
setCurrentStep('transcribing');
setProgress(50);

// Step 3: analyzing (±30s)
setCurrentStep('analyzing');
setProgress(75);

// Step 4: rendering (±1min)
setCurrentStep('rendering');
setProgress(90);

// Done
setProgress(100);
```

---

## 4. VideoResultCard Component

### Basic Usage
```tsx
import VideoResultCard from '@/components/dashboard/VideoResultCard';

<VideoResultCard video={video} />
```

### Highlight Best Video
```tsx
// Mark as best with "Paling Potensial"
<VideoResultCard 
  video={video}
  isBest={true}
  bestReason="potential"
/>

// Mark as best with "Durasi Ideal"
<VideoResultCard 
  video={video}
  isBest={true}
  bestReason="duration"
/>

// Mark as best with "Engagement Tinggi"
<VideoResultCard 
  video={video}
  isBest={true}
  bestReason="engagement"
/>
```

### Grid Layout Example
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {videos.map((video, index) => (
    <VideoResultCard 
      key={video.id}
      video={video}
      isBest={index === 0} // First video is best
      bestReason="potential"
    />
  ))}
</div>
```

---

## 5. HookSection Component

### Basic Usage
```tsx
import HookSection from '@/components/dashboard/HookSection';

const [hook, setHook] = useState<Hook>({
  text: "Kamu nggak akan percaya apa yang terjadi selanjutnya!",
  includeInVideo: true
});

<HookSection 
  hook={hook}
  onUpdate={setHook}
/>
```

### With Alternatives Generator
```tsx
const handleGenerateAlternatives = async () => {
  const alternatives = await generateHookAlternatives(hook.text);
  // Show modal with alternatives
  showAlternativesModal(alternatives);
};

<HookSection 
  hook={hook}
  onUpdate={setHook}
  onGenerateAlternatives={handleGenerateAlternatives}
/>
```

---

## 6. CoverSection Component

### Basic Usage
```tsx
import CoverSection from '@/components/dashboard/CoverSection';

const [covers, setCovers] = useState<Cover[]>([
  {
    platform: 'youtube',
    imageUrl: '/covers/youtube.jpg',
    headline: 'Rahasia Sukses yang Belum Banyak Orang Tahu!'
  },
  {
    platform: 'tiktok',
    imageUrl: '/covers/tiktok.jpg',
    headline: 'Life Hack yang Bikin Hidup Lebih Mudah'
  }
]);

<CoverSection 
  covers={covers}
  onUpdate={setCovers}
/>
```

### Features
- ✅ Click headline to edit inline
- ✅ Press Enter to save, Escape to cancel
- ✅ One-click regenerate with loading state
- ✅ Download button per platform

---

## 7. InputForm Component

### Basic Usage
```tsx
import InputForm from '@/components/dashboard/InputForm';

const [isProcessing, setIsProcessing] = useState(false);

const handleGenerate = async (options: GenerateOptions) => {
  setIsProcessing(true);
  try {
    await generateVideo(options);
  } finally {
    setIsProcessing(false);
  }
};

<InputForm 
  onGenerate={handleGenerate}
  isProcessing={isProcessing}
/>
```

### Button States
- Empty URL: Button disabled, shows helper text
- Processing: Button shows spinner + "Sedang Diproses..."
- Normal: Button shows "🚀 Generate Video Short"

---

## 8. Complete Dashboard Flow Example

```tsx
'use client';

import { useState } from 'react';
import InputForm from '@/components/dashboard/InputForm';
import ProcessingState from '@/components/dashboard/ProcessingState';
import ErrorState from '@/components/dashboard/ErrorState';
import EmptyState from '@/components/dashboard/EmptyState';
import VideoResultCard from '@/components/dashboard/VideoResultCard';
import HookSection from '@/components/dashboard/HookSection';
import CoverSection from '@/components/dashboard/CoverSection';

export default function Dashboard() {
  const [state, setState] = useState<'empty' | 'processing' | 'error' | 'done'>('empty');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState(null);
  
  const handleGenerate = async (options) => {
    setState('processing');
    
    try {
      const result = await api.generate(options);
      setResult(result);
      setState('done');
    } catch (err) {
      setError(err.type);
      setState('error');
    }
  };

  return (
    <div>
      {state === 'empty' && (
        <>
          <InputForm onGenerate={handleGenerate} isProcessing={false} />
          <EmptyState variant="dashboard" />
        </>
      )}
      
      {state === 'processing' && (
        <ProcessingState currentStep="downloading" progress={25} />
      )}
      
      {state === 'error' && (
        <ErrorState 
          errorType={error}
          onRetry={() => setState('empty')}
          onChooseAnother={() => {
            setError(null);
            setState('empty');
          }}
        />
      )}
      
      {state === 'done' && result && (
        <>
          {/* Success message */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
            <h3>✅ Berhasil! Video sudah siap.</h3>
          </div>
          
          {/* Videos */}
          <div className="grid grid-cols-2 gap-6">
            {result.videos.map((video, i) => (
              <VideoResultCard 
                key={video.id}
                video={video}
                isBest={i === 0}
                bestReason="potential"
              />
            ))}
          </div>
          
          {/* Hook */}
          {result.hook && (
            <HookSection 
              hook={result.hook}
              onUpdate={(hook) => setResult({...result, hook})}
            />
          )}
          
          {/* Covers */}
          {result.covers && (
            <CoverSection 
              covers={result.covers}
              onUpdate={(covers) => setResult({...result, covers})}
            />
          )}
        </>
      )}
    </div>
  );
}
```

---

## 9. History Page Example

```tsx
'use client';

import EmptyState from '@/components/dashboard/EmptyState';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... fetch logic

  if (loading) {
    return <LoadingSpinner />;
  }

  if (history.length === 0) {
    return (
      <EmptyState 
        variant="history"
        actionHref="/dashboard"
      />
    );
  }

  return (
    <div>
      {history.map(item => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

---

## 💡 Pro Tips

### 1. Error Handling
Always use specific error types for better UX:
```tsx
try {
  const result = await api.generate(url);
} catch (error) {
  if (error.code === 'VIDEO_TOO_LONG') {
    showError('video_too_long');
  } else if (error.code === 'INVALID_URL') {
    showError('invalid_url');
  } else {
    showError('unknown');
  }
}
```

### 2. Progressive Enhancement
Show processing state immediately:
```tsx
const handleSubmit = async () => {
  setState('processing');
  setProgress(0);
  
  // Update progress as you go
  await downloadVideo(); // setProgress(25)
  await transcribe();    // setProgress(50)
  await analyze();       // setProgress(75)
  await render();        // setProgress(100)
};
```

### 3. Optimistic Updates
Update UI before API response for snappy feel:
```tsx
const handleEdit = (newText) => {
  // Update UI immediately
  setHook({...hook, text: newText});
  
  // Then sync with backend
  api.updateHook(newText);
};
```

### 4. Keyboard Shortcuts
Add keyboard support for power users:
```tsx
<input 
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }}
/>
```

---

## 🎨 Styling Consistency

All components follow the same design system:
- **Primary gradient:** `from-purple-500 to-pink-500`
- **Success:** Green (500)
- **Warning:** Yellow (500)
- **Error:** Red (500)
- **Info:** Blue (500)
- **Background:** `bg-slate-800/50` with `backdrop-blur-sm`
- **Border:** `border-slate-700/50`
- **Text primary:** `text-white`
- **Text secondary:** `text-slate-400`

---

Semua component telah didesain untuk **consistency**, **clarity**, dan **user-friendliness**. Happy coding! 🚀
