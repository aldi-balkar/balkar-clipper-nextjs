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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-slate-400">Memuat riwayat...</p>
            </div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <EmptyState 
            variant="history"
            title={filter === 'all' ? 'Belum Ada Riwayat' : `Tidak Ada Project ${filter === 'done' ? 'Selesai' : filter === 'processing' ? 'Diproses' : 'Gagal'}`}
            description={filter === 'all' 
              ? 'Semua video yang pernah kamu generate akan muncul di sini. Mulai buat video pertama kamu sekarang!' 
              : `Tidak ada project dengan status ${filter}. Coba filter lain atau buat video baru.`}
            actionLabel="Generate Sekarang"
            actionHref="/dashboard"
          />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/40 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-full md:w-48 aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl overflow-hidden relative">
                      {item.thumbnailUrl ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 opacity-50">
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-slate-600 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1 truncate">
                          {item.title || 'Untitled Project'}
                        </h3>
                        <p className="text-sm text-slate-400 truncate mb-2">
                          {item.youtubeUrl}
                        </p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {item.status === 'done' && (
                        <>
                          <button className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-sm rounded-lg transition-all flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Lihat Hasil
                          </button>
                          <button className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition-all flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </button>
                        </>
                      )}
                      {item.status === 'processing' && (
                        <button 
                          onClick={() => alert('Redirect ke processing page')}
                          className="px-5 py-2.5 bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/50 hover:bg-yellow-500/30 font-bold text-sm rounded-lg transition-all flex items-center gap-2"
                        >
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Lihat Progress
                        </button>
                      )}
                      {item.status === 'failed' && (
                        <>
                          <button className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-sm rounded-lg transition-all flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Coba Lagi
                          </button>
                          <button className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition-all flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Lihat Error
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
