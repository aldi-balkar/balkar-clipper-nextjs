'use client';

import { useState } from 'react';
import { Caption as CaptionType } from '@/lib/types';

interface CaptionSectionProps {
  caption: CaptionType;
  onUpdate: (caption: CaptionType) => void;
}

export default function CaptionSection({ caption, onUpdate }: CaptionSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(caption.text);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    onUpdate({ ...caption, text: editedText });
    setIsEditing(false);
  };

  const handleCopy = async () => {
    const fullText = `${caption.text}\n\n${caption.hashtags.join(' ')}`;
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-xl">✍️</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">Caption & Hashtag</h3>
            <p className="text-sm text-slate-400">Deskripsi untuk postingan</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            copied
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy All'}
        </button>
      </div>

      {/* Caption Text */}
      {isEditing ? (
        <div className="space-y-3 mb-4">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-sm rounded-lg transition-all"
            >
              Simpan
            </button>
            <button
              onClick={() => {
                setEditedText(caption.text);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <div
          className="p-4 bg-slate-900/30 border border-slate-700/30 rounded-xl mb-4 cursor-pointer hover:bg-slate-900/50 transition-all group"
          onClick={() => setIsEditing(true)}
        >
          <p className="text-white leading-relaxed">{caption.text}</p>
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm text-slate-400">✏️ Klik untuk edit</span>
          </div>
        </div>
      )}

      {/* Hashtags */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          Hashtags
        </label>
        <div className="flex flex-wrap gap-2">
          {caption.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-semibold text-purple-300"
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
