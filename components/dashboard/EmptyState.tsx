'use client';

import Link from 'next/link';

interface EmptyStateProps {
  variant?: 'dashboard' | 'history' | 'generic';
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

const variantConfig = {
  dashboard: {
    icon: '🎬',
    title: 'Belum Ada Video Nih',
    description: 'Tempel link YouTube kamu dan biarin AI yang kerja. Dalam hitungan menit, video panjang jadi short viral!',
    actionLabel: 'Mulai Generate',
    illustration: (
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-8xl animate-bounce">🎬</div>
        </div>
      </div>
    ),
  },
  history: {
    icon: '📋',
    title: 'Belum Ada Riwayat',
    description: 'Semua video yang pernah kamu generate akan muncul di sini. Mulai buat video pertama kamu sekarang!',
    actionLabel: 'Generate Video Pertama',
    illustration: (
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="w-32 h-32 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
    ),
  },
  generic: {
    icon: '🔍',
    title: 'Tidak Ada Data',
    description: 'Belum ada yang ditampilkan di sini.',
    actionLabel: 'Kembali',
    illustration: (
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-slate-600/20 rounded-full blur-3xl"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="w-32 h-32 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      </div>
    ),
  },
};

export default function EmptyState({ 
  variant = 'generic',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: Readonly<EmptyStateProps>) {
  const config = variantConfig[variant];
  
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayActionLabel = actionLabel || config.actionLabel;

  return (
    <div className="w-full">
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-12 text-center">
        {/* Illustration */}
        {config.illustration}

        {/* Content */}
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-black mb-3 bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
            {displayTitle}
          </h3>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            {displayDescription}
          </p>

          {/* Action Button */}
          {(actionHref || onAction) && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {actionHref && (
                <Link
                  href={actionHref}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
                >
                  <span>{displayActionLabel}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
              {!actionHref && onAction && (
                <button
                  onClick={onAction}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
                >
                  <span>{displayActionLabel}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tips (Optional for dashboard variant) */}
        {variant === 'dashboard' && (
          <div className="mt-10 pt-8 border-t border-slate-700/30">
            <p className="text-sm font-semibold text-slate-400 mb-4">💡 Tips Memulai:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-slate-900/30 rounded-xl">
                <div className="text-2xl mb-2">📺</div>
                <p className="text-sm text-slate-300 font-medium mb-1">Pilih Video Berkualitas</p>
                <p className="text-xs text-slate-500">Video 5-30 menit dengan audio jelas</p>
              </div>
              <div className="p-4 bg-slate-900/30 rounded-xl">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm text-slate-300 font-medium mb-1">Proses Super Cepat</p>
                <p className="text-xs text-slate-500">AI bekerja dalam 2-5 menit</p>
              </div>
              <div className="p-4 bg-slate-900/30 rounded-xl">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-sm text-slate-300 font-medium mb-1">Edit Sesuai Selera</p>
                <p className="text-xs text-slate-500">Hook, caption, dan cover bisa diedit</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
