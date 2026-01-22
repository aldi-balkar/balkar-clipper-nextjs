'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/dashboard/EmptyState';
import { HistoryItem, JobStatus } from '@/lib/types';
import { getProjectHistory } from '@/lib/api';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<JobStatus | 'all'>('all');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await getProjectHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.status === filter);

  const getEmptyStateTitle = (currentFilter: JobStatus | 'all'): string => {
    if (currentFilter === 'all') return 'Belum Ada Riwayat';
    if (currentFilter === 'done') return 'Tidak Ada Project Selesai';
    if (currentFilter === 'processing') return 'Tidak Ada Project Diproses';
    return 'Tidak Ada Project Gagal';
  };

  const getStatusBadge = (status: JobStatus) => {
    const styles = {
      done: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/50',
        icon: '✓',
      },
      processing: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        border: 'border-yellow-500/50',
        icon: '⏳',
      },
      failed: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/50',
        icon: '✗',
      },
    };

    const labels = {
      done: 'Selesai',
      processing: 'Diproses',
      failed: 'Gagal',
    };

    const style = styles[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-bold ${style.bg} ${style.text} ${style.border}`}>
        <span className="text-sm">{style.icon}</span>
        <span>{labels[status]}</span>
      </span>
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hari ini';
    if (days === 1) return 'Kemarin';
    if (days < 7) return `${days} hari lalu`;
    
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] py-24">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Riwayat Project
            </h1>
            <p className="text-slate-400">
              Lihat semua video yang pernah kamu generate
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Buat Baru
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'Semua' },
            { key: 'done', label: 'Selesai' },
            { key: 'processing', label: 'Diproses' },
            { key: 'failed', label: 'Gagal' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* History List */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-slate-400">Memuat riwayat...</p>
            </div>
          </div>
        )}
        
        {!loading && filteredHistory.length === 0 && (
          <EmptyState 
            variant="history"
            title={getEmptyStateTitle(filter)}
            description={filter === 'all' 
              ? 'Semua video yang pernah kamu generate akan muncul di sini. Mulai buat video pertama kamu sekarang!' 
              : `Tidak ada project dengan status ${filter}. Coba filter lain atau buat video baru.`}
            actionLabel="Generate Sekarang"
            actionHref="/dashboard"
          />
        )}

        {!loading && filteredHistory.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredHistory.map((item, index) => {
              // Generate random score for demo (92-99)
              const score = 92 + (index % 8);
              
              return (
                <div
                  key={item.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all group cursor-pointer"
                >
                  {/* Thumbnail with Score */}
                  <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                    {item.thumbnailUrl ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-teal-600 to-blue-700 flex items-center justify-center">
                        <div className="text-6xl">🎬</div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                        <div className="text-6xl">📹</div>
                      </div>
                    )}
                    
                    {/* Duration Badge */}
                    <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md text-xs text-white font-bold">
                      00:{40 + (index % 20)}
                    </div>

                    {/* Score Badge - Bottom Left */}
                    <div className="absolute bottom-2 left-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 px-3 py-1.5 rounded-lg font-black text-lg shadow-lg">
                        {score}
                      </div>
                    </div>

                    {/* Status Badge - Top Left */}
                    <div className="absolute top-2 left-2">
                      {item.status === 'done' && (
                        <div className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-bold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {item.status === 'processing' && (
                        <div className="bg-yellow-500/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-bold flex items-center gap-1">
                          <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                      {item.status === 'failed' && (
                        <div className="bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-bold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Play Overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                        <svg className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-bold text-sm mb-1 truncate text-white">
                      {item.title || 'Untitled Project'}
                    </h3>
                    <p className="text-xs text-slate-400 mb-2">
                      {formatDate(item.createdAt)}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {item.status === 'done' && (
                        <>
                          <button className="flex-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                          <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </>
                      )}
                      {item.status === 'processing' && (
                        <button className="flex-1 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/30 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5">
                          <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing
                        </button>
                      )}
                      {item.status === 'failed' && (
                        <button className="flex-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Retry
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
