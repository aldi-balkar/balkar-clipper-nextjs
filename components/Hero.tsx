'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -top-20 -right-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3 mb-8 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </span>
            <span className="text-slate-300 text-sm">
              Introducing AI-Powered Video Magic ✨
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight transition-all duration-700 delay-100 px-4 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Turn your long video into
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              viral clips
            </span>{' '}
            with AI magic
          </h1>

          {/* Description */}
          <p
            className={`text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto transition-all duration-700 delay-200 px-4 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Transform hours of content into 30+ engaging clips in seconds.
            Perfect for TikTok, Instagram Reels, and YouTube Shorts.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-300 px-4 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href="/dashboard"
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              Get Clips For Free
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <button className="group px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2">
              Watch Demo
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center pt-8 border-t border-slate-800 transition-all duration-700 delay-400 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                10M+
              </div>
              <div className="text-slate-400 text-sm">Creators Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                4.9★
              </div>
              <div className="text-slate-400 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                1B+
              </div>
              <div className="text-slate-400 text-sm">Clips Generated</div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="mt-16">
            <div className="relative max-w-5xl mx-auto">
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50 shadow-2xl">
                <div className="relative bg-slate-900/50 rounded-xl overflow-hidden aspect-video">
                  {/* Simulated video interface */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-pink-900/20" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="group w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-all shadow-xl shadow-purple-500/50">
                      <svg
                        className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Video UI elements */}
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-slate-300 font-medium border border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Watch Demo
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-1/3 rounded-full"></div>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">1:23 / 3:45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
