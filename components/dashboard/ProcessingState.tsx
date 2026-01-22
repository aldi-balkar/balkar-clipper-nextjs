'use client';

import { ProcessingStep } from '@/lib/types';

interface ProcessingStateProps {
  currentStep: ProcessingStep;
  progress: number;
}

const steps: { 
  key: ProcessingStep; 
  label: string; 
  icon: string;
  description: string;
  estimatedTime: string;
}[] = [
  { 
    key: 'downloading', 
    label: 'Video berhasil diunduh', 
    icon: '📥',
    description: 'Mengunduh video dari YouTube',
    estimatedTime: '±30 detik'
  },
  { 
    key: 'transcribing', 
    label: 'Mengubah audio jadi teks', 
    icon: '🎤',
    description: 'Mentranskripsikan audio menjadi teks',
    estimatedTime: '±1-2 menit'
  },
  { 
    key: 'analyzing', 
    label: 'Mencari bagian paling menarik', 
    icon: '🔍',
    description: 'Menganalisis dan memilih highlight terbaik',
    estimatedTime: '±30 detik'
  },
  { 
    key: 'rendering', 
    label: 'Membuat video short', 
    icon: '🎬',
    description: 'Merender video dan menyiapkan caption & cover',
    estimatedTime: '±1 menit'
  },
];

export default function ProcessingState({ currentStep, progress }: Readonly<ProcessingStateProps>) {
  const currentStepIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Sedang Memproses</h3>
          <p className="text-slate-400">Mohon tunggu, AI kami sedang bekerja keras untuk kamu ✨</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Progress</span>
            <span className="font-bold text-purple-400">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;

            let containerClassName = 'bg-slate-900/20 border border-slate-700/30';
            if (isCurrent) {
              containerClassName = 'bg-purple-500/10 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20';
            } else if (isCompleted) {
              containerClassName = 'bg-green-500/5 border border-green-500/30';
            }

            let iconClassName = 'bg-slate-700/50 border-2 border-slate-600 text-slate-500';
            if (isCompleted) {
              iconClassName = 'bg-green-500/20 border-2 border-green-500 text-green-400';
            } else if (isCurrent) {
              iconClassName = 'bg-purple-500/20 border-2 border-purple-500 text-purple-300 animate-pulse';
            }

            let labelClassName = 'text-slate-500';
            if (isCurrent) {
              labelClassName = 'text-purple-300';
            } else if (isCompleted) {
              labelClassName = 'text-green-400';
            }

            let descriptionClassName = 'text-slate-500';
            if (isCurrent) {
              descriptionClassName = 'text-slate-300';
            } else if (isCompleted) {
              descriptionClassName = 'text-slate-400';
            }

            return (
              <div
                key={step.key}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all ${containerClassName}`}
              >
                {/* Icon/Status */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${iconClassName}`}
                >
                  {isCompleted ? '✓' : step.icon}
                </div>

                {/* Label & Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`font-bold text-base ${labelClassName}`}>
                      {isCompleted ? '✅ ' : ''}{step.label}
                    </p>
                    {(isCurrent || isPending) && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        isCurrent 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-slate-700/50 text-slate-400'
                      }`}>
                        {step.estimatedTime}
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm ${descriptionClassName}`}>
                    {step.description}
                  </p>
                  
                  {isCurrent && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-xs text-purple-300 font-medium">Sedang diproses...</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <p className="text-sm text-blue-200 font-medium mb-1">
                Kenapa lama?
              </p>
              <p className="text-sm text-slate-400">
                AI kami sedang menganalisis setiap detik video untuk menemukan momen paling menarik. Proses ini biasanya memakan waktu 2-5 menit tergantung panjang video.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
