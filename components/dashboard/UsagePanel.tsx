'use client';

import { UsageInfo } from '@/lib/types';

interface UsagePanelProps {
  usage: UsageInfo;
}

export default function UsagePanel({ usage }: UsagePanelProps) {
  const percentage = (usage.used / usage.total) * 100;
  const daysLeft = Math.ceil((usage.nextResetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Paket {usage.planName}</h3>
          <p className="text-sm text-slate-400">Reset dalam {daysLeft} hari</p>
        </div>
        <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
          <span className="text-sm font-bold text-purple-300">{usage.used}/{usage.total}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full h-2.5 bg-slate-900/50 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage >= 90
                ? 'bg-gradient-to-r from-red-500 to-orange-500'
                : percentage >= 70
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Usage Text */}
      <p className="text-sm text-slate-400 mb-4">
        Kamu sudah menggunakan <span className="text-white font-semibold">{usage.used} dari {usage.total}</span> kredit video bulan ini
      </p>

      {/* Upgrade Button */}
      {usage.planName === 'Free' && (
        <button className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-sm rounded-lg transition-all transform hover:scale-[1.02]">
          ⚡ Upgrade ke Pro
        </button>
      )}

      {/* Warning if almost full */}
      {percentage >= 80 && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-400">
            ⚠️ Kredit hampir habis! {percentage >= 90 ? 'Pertimbangkan untuk upgrade.' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
