'use client';

import { useState } from 'react';
import { GenerateOptions, VideoStyle, OutputLanguage, VideoDuration } from '@/lib/types';

interface InputFormProps {
  onGenerate: (options: GenerateOptions) => void;
  isProcessing: boolean;
}

export default function InputForm({ onGenerate, isProcessing }: InputFormProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [style, setStyle] = useState<VideoStyle>('santai');
  const [language, setLanguage] = useState<OutputLanguage>('indonesia');
  const [generateHook, setGenerateHook] = useState(true);
  const [generateCaption, setGenerateCaption] = useState(true);
  const [generateCover, setGenerateCover] = useState(true);
  
  // Advanced settings
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [duration, setDuration] = useState<VideoDuration>('15-30');
  const [numberOfOutputs, setNumberOfOutputs] = useState<1 | 3 | 5>(1);
  const [subtitleStyle, setSubtitleStyle] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!youtubeUrl.trim()) {
      alert('Masukkan URL YouTube');
      return;
    }

    onGenerate({
      youtubeUrl,
      style,
      language,
      generateHook,
      generateCaption,
      generateCover,
      duration,
      numberOfOutputs,
      subtitleStyle,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
        {/* YouTube URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Link YouTube <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            disabled={isProcessing}
          />
        </div>

        {/* Style Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Gaya Video
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as VideoStyle)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              disabled={isProcessing}
            >
              <option value="santai">🎉 Santai</option>
              <option value="edukatif">📚 Edukatif</option>
              <option value="emosional">❤️ Emosional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Bahasa Output
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as OutputLanguage)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              disabled={isProcessing}
            >
              <option value="indonesia">🇮🇩 Indonesia</option>
              <option value="english">🇬🇧 English</option>
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mb-6 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={generateHook}
              onChange={(e) => setGenerateHook(e.target.checked)}
              className="w-5 h-5 bg-slate-900/50 border-2 border-slate-600 rounded checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              disabled={isProcessing}
            />
            <span className="text-slate-300 group-hover:text-white transition-colors">
              Generate Hook Menarik
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={generateCaption}
              onChange={(e) => setGenerateCaption(e.target.checked)}
              className="w-5 h-5 bg-slate-900/50 border-2 border-slate-600 rounded checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              disabled={isProcessing}
            />
            <span className="text-slate-300 group-hover:text-white transition-colors">
              Generate Caption + Hashtag
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={generateCover}
              onChange={(e) => setGenerateCover(e.target.checked)}
              className="w-5 h-5 bg-slate-900/50 border-2 border-slate-600 rounded checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              disabled={isProcessing}
            />
            <span className="text-slate-300 group-hover:text-white transition-colors">
              Generate Cover Image
            </span>
          </label>
        </div>

        {/* Advanced Settings Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold mb-4 transition-colors"
          disabled={isProcessing}
        >
          <svg
            className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Pengaturan Lanjutan
        </button>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="bg-slate-900/30 border border-slate-700/30 rounded-xl p-6 mb-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Durasi Video
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as VideoDuration)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all"
                  disabled={isProcessing}
                >
                  <option value="15-30">15-30 detik</option>
                  <option value="30-45">30-45 detik</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Jumlah Output
                </label>
                <select
                  value={numberOfOutputs}
                  onChange={(e) => setNumberOfOutputs(Number(e.target.value) as 1 | 3 | 5)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all"
                  disabled={isProcessing}
                >
                  <option value={1}>1 video</option>
                  <option value={3}>3 video</option>
                  <option value={5}>5 video</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={subtitleStyle}
                onChange={(e) => setSubtitleStyle(e.target.checked)}
                className="w-5 h-5 bg-slate-900/50 border-2 border-slate-600 rounded checked:bg-purple-500 checked:border-purple-500 transition-all"
                disabled={isProcessing}
              />
              <span className="text-slate-300 group-hover:text-white transition-colors">
                Gunakan Subtitle Style
              </span>
            </label>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || !youtubeUrl.trim()}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg shadow-purple-500/50 disabled:shadow-none"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sedang Diproses...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🚀</span>
              <span>Generate Video Short</span>
            </span>
          )}
        </button>
        
        {!youtubeUrl.trim() && !isProcessing && (
          <p className="text-center text-sm text-slate-400 mt-2">
            Masukkan link YouTube untuk mulai
          </p>
        )}
      </div>
    </form>
  );
}
