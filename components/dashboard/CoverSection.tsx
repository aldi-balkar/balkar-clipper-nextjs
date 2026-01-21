'use client';

import { useState } from 'react';
import { Cover, PlatformType } from '@/lib/types';

interface CoverSectionProps {
  covers: Cover[];
  onUpdate: (covers: Cover[]) => void;
}

const platformIcons: Record<PlatformType, { icon: string; color: string; name: string }> = {
  youtube: { icon: '📺', color: 'from-red-500 to-red-600', name: 'YouTube' },
  tiktok: { icon: '🎵', color: 'from-cyan-500 to-cyan-600', name: 'TikTok' },
  instagram: { icon: '📸', color: 'from-pink-500 to-purple-600', name: 'Instagram' },
  facebook: { icon: '👥', color: 'from-blue-500 to-blue-600', name: 'Facebook' },
};

export default function CoverSection({ covers, onUpdate }: CoverSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedHeadline, setEditedHeadline] = useState('');
  const [regenerating, setRegenerating] = useState<number | null>(null);

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditedHeadline(covers[index].headline);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const newCovers = [...covers];
      newCovers[editingIndex] = { ...newCovers[editingIndex], headline: editedHeadline };
      onUpdate(newCovers);
      setEditingIndex(null);
    }
  };

  const handleRegenerate = async (index: number) => {
    setRegenerating(index);
    // Simulate API call
    setTimeout(() => {
      const newCovers = [...covers];
      newCovers[index] = { 
        ...newCovers[index], 
        headline: 'Rahasia Sukses yang Belum Banyak Orang Tahu! 🔥' 
      };
      onUpdate(newCovers);
      setRegenerating(null);
    }, 1500);
  };

  const handleDownload = (cover: Cover) => {
    // In production, this would trigger actual download
    console.log('Download cover:', cover.imageUrl);
    alert(`Download cover ${platformIcons[cover.platform].name} dimulai...`);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <span className="text-xl">🎨</span>
        </div>
        <div>
          <h3 className="font-bold text-lg">Cover Image</h3>
          <p className="text-sm text-slate-400">Thumbnail untuk setiap platform - klik teks untuk edit</p>
        </div>
      </div>

      {/* Cover Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {covers.map((cover, index) => {
          const platformInfo = platformIcons[cover.platform];
          const isEditing = editingIndex === index;

          return (
            <div
              key={cover.platform}
              className="bg-slate-900/30 border border-slate-700/30 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all"
            >
              {/* Cover Preview */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                {/* Placeholder for actual cover image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${platformInfo.color} rounded-2xl flex items-center justify-center`}>
                      <span className="text-3xl">{platformInfo.icon}</span>
                    </div>
                    <p className="text-slate-400 text-sm font-semibold">{platformInfo.name}</p>
                  </div>
                </div>

                {/* Headline Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold text-center text-sm leading-tight">
                    {cover.headline}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 space-y-3">
                {/* Inline Edit Headline */}
                {isEditing ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Edit Headline
                    </label>
                    <input
                      type="text"
                      value={editedHeadline}
                      onChange={(e) => setEditedHeadline(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900/50 border-2 border-purple-500 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400 transition-all"
                      placeholder="Edit headline..."
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') setEditingIndex(null);
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-lg transition-all"
                      >
                        ✓ Simpan
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg transition-all"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => handleEditStart(index)}
                    className="cursor-pointer group/edit hover:bg-slate-800/50 p-2 rounded-lg transition-all"
                  >
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      Headline
                    </label>
                    <p className="text-white text-sm font-medium leading-snug group-hover/edit:text-purple-300 transition-colors">
                      {cover.headline}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 opacity-0 group-hover/edit:opacity-100 transition-opacity">
                      ✏️ Klik untuk edit
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRegenerate(index)}
                    disabled={regenerating === index}
                    className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 disabled:cursor-not-allowed"
                  >
                    {regenerating === index ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Regenerating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Regenerate</span>
                      </>
                    )}
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(cover)}
                    className={`flex-1 py-2 bg-gradient-to-r ${platformInfo.color} hover:opacity-90 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
