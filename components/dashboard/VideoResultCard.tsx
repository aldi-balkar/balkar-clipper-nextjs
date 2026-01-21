'use client';

import { useState } from 'react';
import { VideoOutput, PlatformType } from '@/lib/types';

interface VideoResultCardProps {
  video: VideoOutput;
  isBest?: boolean;
  bestReason?: 'potential' | 'duration' | 'engagement';
}

const platformIcons: Record<PlatformType, { icon: string; color: string; name: string }> = {
  youtube: { icon: '📺', color: 'bg-red-500/20 text-red-400 border-red-500/50', name: 'YouTube' },
  tiktok: { icon: '🎵', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50', name: 'TikTok' },
  instagram: { icon: '📸', color: 'bg-pink-500/20 text-pink-400 border-pink-500/50', name: 'Instagram' },
  facebook: { icon: '👥', color: 'bg-blue-500/20 text-blue-400 border-blue-500/50', name: 'Facebook' },
};

const bestReasonLabels = {
  potential: { label: '⭐ Paling Potensial', color: 'from-yellow-500 to-orange-500' },
  duration: { label: '⏱️ Durasi Ideal', color: 'from-green-500 to-emerald-500' },
  engagement: { label: '🔥 Engagement Tinggi', color: 'from-pink-500 to-purple-500' },
};

export default function VideoResultCard({ video, isBest = false, bestReason = 'potential' }: VideoResultCardProps) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = (type: 'video' | 'subtitle') => {
    // In production, this would trigger actual download
    const url = type === 'video' ? video.videoUrl : video.subtitleUrl;
    console.log('Download:', url);
    alert(`Download ${type} dimulai...`);
    setShowDownloadMenu(false);
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all group relative ${
      isBest 
        ? 'border-yellow-500/50 shadow-xl shadow-yellow-500/20 ring-2 ring-yellow-500/30' 
        : 'border-slate-700/50 hover:border-purple-500/40'
    }`}>
      {/* Best Badge */}
      {isBest && (
        <div className="absolute top-2 right-2 z-10">
          <div className={`px-3 py-1.5 bg-gradient-to-r ${bestReasonLabels[bestReason].color} rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1`}>
            {bestReasonLabels[bestReason].label}
          </div>
        </div>
      )}
      
      {/* Video Preview */}
      <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
        {/* Placeholder for video thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm">Video Preview</p>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg">
          <span className="text-sm font-bold text-white">{formatDuration(video.duration)}</span>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
          <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        {/* Platform Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {video.platforms.map((platform) => {
            const platformInfo = platformIcons[platform];
            return (
              <span
                key={platform}
                className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-semibold ${platformInfo.color}`}
              >
                <span>{platformInfo.icon}</span>
                {platformInfo.name}
              </span>
            );
          })}
        </div>

        {/* Download Buttons */}
        <div className="space-y-2">
          {/* Primary CTA */}
          <button
            onClick={() => handleDownload('video')}
            className={`w-full py-3 font-bold text-sm rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${
              isBest
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-yellow-500/30'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-purple-500/30'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Video
          </button>

          {/* Secondary Actions */}
          <div className="flex gap-2">
            {video.subtitleUrl && (
              <button
                onClick={() => handleDownload('subtitle')}
                className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Subtitle
              </button>
            )}
            <button
              onClick={() => alert('Preview feature coming soon!')}
              className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
