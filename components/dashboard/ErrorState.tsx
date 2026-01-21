'use client';

interface ErrorStateProps {
  errorType: 'video_too_long' | 'invalid_url' | 'quota_exceeded' | 'processing_failed' | 'network_error' | 'unknown';
  onRetry?: () => void;
  onChooseAnother?: () => void;
  onUpgrade?: () => void;
  customMessage?: string;
}

const errorConfig = {
  video_too_long: {
    icon: '⏱️',
    title: 'Video Terlalu Panjang',
    message: 'Video yang kamu pilih berdurasi lebih dari 20 menit. Untuk plan Free, maksimal durasi video adalah 20 menit.',
    color: 'orange',
    actions: ['choose_another', 'upgrade'],
  },
  invalid_url: {
    icon: '🔗',
    title: 'Link YouTube Tidak Valid',
    message: 'URL yang kamu masukkan tidak valid atau video tidak dapat diakses. Pastikan link YouTube kamu benar.',
    color: 'red',
    actions: ['choose_another'],
  },
  quota_exceeded: {
    icon: '📊',
    title: 'Kuota Habis',
    message: 'Kamu sudah menggunakan semua kuota bulanan. Upgrade ke plan berbayar untuk generate lebih banyak video.',
    color: 'yellow',
    actions: ['upgrade'],
  },
  processing_failed: {
    icon: '❌',
    title: 'Gagal Memproses Video',
    message: 'Terjadi kesalahan saat memproses video. Mungkin audio tidak jelas atau format video tidak didukung.',
    color: 'red',
    actions: ['retry', 'choose_another'],
  },
  network_error: {
    icon: '🌐',
    title: 'Koneksi Bermasalah',
    message: 'Tidak dapat terhubung ke server. Periksa koneksi internet kamu dan coba lagi.',
    color: 'blue',
    actions: ['retry'],
  },
  unknown: {
    icon: '⚠️',
    title: 'Terjadi Kesalahan',
    message: 'Terjadi kesalahan yang tidak diketahui. Tim kami sudah diberitahu dan akan segera memperbaikinya.',
    color: 'gray',
    actions: ['retry', 'choose_another'],
  },
};

export default function ErrorState({ 
  errorType, 
  onRetry, 
  onChooseAnother, 
  onUpgrade,
  customMessage 
}: ErrorStateProps) {
  const config = errorConfig[errorType];
  
  const colorClasses = {
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      icon: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
      title: 'text-orange-400',
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: 'bg-red-500/20 border-red-500/50 text-red-400',
      title: 'text-red-400',
    },
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
      title: 'text-yellow-400',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
      title: 'text-blue-400',
    },
    gray: {
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/30',
      icon: 'bg-slate-500/20 border-slate-500/50 text-slate-400',
      title: 'text-slate-400',
    },
  };

  const colors = colorClasses[config.color as keyof typeof colorClasses];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl p-8`}>
        {/* Icon & Title */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-20 h-20 ${colors.icon} border-2 rounded-full mb-4 text-4xl`}>
            {config.icon}
          </div>
          <h3 className={`text-2xl font-bold mb-3 ${colors.title}`}>
            {config.title}
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            {customMessage || config.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          {config.actions.includes('retry') && onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Coba Lagi
            </button>
          )}
          
          {config.actions.includes('choose_another') && onChooseAnother && (
            <button
              onClick={onChooseAnother}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Pilih Video Lain
            </button>
          )}
          
          {config.actions.includes('upgrade') && onUpgrade && (
            <button
              onClick={onUpgrade}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Upgrade Plan
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-slate-700/30">
          <p className="text-center text-sm text-slate-400">
            Masih bermasalah? {' '}
            <a href="mailto:support@balkar-clipper.com" className="text-purple-400 hover:text-purple-300 underline">
              Hubungi Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
