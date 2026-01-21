'use client';

import { useState } from 'react';
import { Hook as HookType } from '@/lib/types';

interface HookSectionProps {
  hook: HookType;
  onUpdate: (hook: HookType) => void;
  onGenerateAlternatives?: () => void;
}

export default function HookSection({ hook, onUpdate, onGenerateAlternatives }: HookSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(hook.text);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    onUpdate({ ...hook, text: editedText });
    setIsEditing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hook.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAlternatives = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      if (onGenerateAlternatives) {
        onGenerateAlternatives();
      } else {
        alert('Generate alternatives feature coming soon!');
      }
    }, 1500);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <span className="text-2xl">🎣</span>
          </div>
          <div>
            <h3 className="font-black text-xl">Hook Menarik</h3>
            <p className="text-sm text-slate-400">Opening yang bikin viewer stay di 3 detik pertama</p>
          </div>
        </div>
      </div>

      {/* Hook Text - EMPHASIZED */}
      {isEditing ? (
        <div className="space-y-4 mb-6">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={3}
            className="w-full px-5 py-4 bg-slate-900/50 border-2 border-purple-500 rounded-xl text-white text-xl font-semibold placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all resize-none"
            placeholder="Tulis hook menarik..."
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-sm rounded-lg transition-all"
            >
              ✓ Simpan
            </button>
            <button
              onClick={() => {
                setEditedText(hook.text);
                setIsEditing(false);
              }}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          {/* Big Prominent Hook Display */}
          <div
            className="p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border-2 border-purple-500/30 rounded-2xl mb-4 cursor-pointer hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all group relative overflow-hidden"
            onClick={() => setIsEditing(true)}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-500 via-orange-500 to-pink-500"></div>
            
            <p className="text-white text-2xl md:text-3xl font-black leading-tight mb-3 pl-4">
              "{hook.text}"
            </p>
            
            <div className="flex items-center justify-between pl-4">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm text-purple-300 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Klik untuk edit
                </span>
              </div>
              <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-yellow-300">⚡ 3 Detik Pertama</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                copied
                  ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50'
                  : 'bg-slate-700 hover:bg-slate-600 text-white border-2 border-transparent'
              }`}
            >
              {copied ? (
                <>
                  <span>✓</span>
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Hook</span>
                </>
              )}
            </button>

            <button
              onClick={handleGenerateAlternatives}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold text-sm rounded-lg transition-all flex items-center gap-2 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Coba Hook Alternatif</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Toggle to include in video */}
      <div className="pt-4 border-t border-slate-700/30">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={hook.includeInVideo}
            onChange={(e) => onUpdate({ ...hook, includeInVideo: e.target.checked })}
            className="w-5 h-5 bg-slate-900/50 border-2 border-slate-600 rounded checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer"
          />
          <span className="text-slate-300 group-hover:text-white transition-colors font-medium">
            Sertakan hook ini di video
          </span>
        </label>
      </div>
    </div>
  );
}
