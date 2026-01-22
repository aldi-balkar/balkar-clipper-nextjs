'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'long' | 'transitioning' | 'shorts'>('long');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Looping animation cycle
  useEffect(() => {
    const cycle = setInterval(() => {
      setAnimationPhase('long');
      
      // Show long video for 2 seconds
      setTimeout(() => {
        setAnimationPhase('transitioning');
      }, 2000);
      
      // Show shorts for 3 seconds
      setTimeout(() => {
        setAnimationPhase('shorts');
      }, 2800);
      
    }, 6500); // Total cycle: 6.5 seconds

    // Initial start
    setTimeout(() => {
      setAnimationPhase('transitioning');
    }, 2000);
    
    setTimeout(() => {
      setAnimationPhase('shorts');
    }, 2800);

    return () => clearInterval(cycle);
  }, []);

  const clips = [
    { id: 1, platform: 'youtube', score: 97 },
    { id: 2, platform: 'shorts', score: 99 },
    { id: 3, platform: 'instagram', score: 97 },
    { id: 4, platform: 'tiktok', score: 98 },
    { id: 5, platform: 'facebook', score: 94 },
    { id: 6, platform: 'twitter', score: 92 },
  ];

  const platformIcons: Record<string, string> = {
    youtube: '▶️',
    shorts: '🎬',
    instagram: '📷',
    tiktok: '🎵',
    facebook: '👥',
    twitter: '🐦',
  };

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
            className={`text-base sm:text-lg md:text-xl text-slate-400 mb-16 max-w-3xl mx-auto transition-all duration-700 delay-200 px-4 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Transform hours of content into 30+ engaging clips in seconds.
            Perfect for TikTok, Instagram Reels, and YouTube Shorts.
          </p>

          {/* Video Transition Demo - OpusClip Style */}
          <div
            className={`mt-8 transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Container for stacked layout */}
              <div className="relative min-h-[700px] flex flex-col items-center justify-start gap-8">
                
                {/* Helper function for long video className */}
                {(() => {
                  let longVideoClassName = 'opacity-0 translate-y-[450px] scale-60 z-10';
                  if (animationPhase === 'long') {
                    longVideoClassName = 'opacity-100 translate-y-0 scale-100 z-30';
                  } else if (animationPhase === 'transitioning') {
                    longVideoClassName = 'opacity-60 translate-y-[300px] scale-80 z-20';
                  }
                  
                  return (
                    <>
                      {/* 1. Long Video at Top */}
                      <div
                        className={`relative w-full max-w-2xl transition-all duration-700 ${longVideoClassName}`}
                      >
                  <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl p-3 border border-slate-700/60 shadow-2xl">
                    <div className="relative bg-slate-900/60 rounded-2xl overflow-hidden aspect-video">
                      {/* Video thumbnail */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-teal-600 to-blue-700 flex items-center justify-center">
                        <div className="text-8xl">🏝️</div>
                      </div>
                      
                      {/* Duration badge */}
                      <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-base text-white font-bold border border-slate-700/60">
                        20:54
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Input Box in Middle */}
                <div className="relative w-full max-w-3xl z-40">
                  <div className="relative bg-slate-800/70 backdrop-blur-md rounded-2xl border border-slate-700/60 shadow-xl overflow-hidden">
                    <div className="flex items-center gap-4 p-5">
                      <div className="flex-shrink-0 text-3xl">🔗</div>
                      <input
                        type="text"
                        placeholder="Drop a long video and..."
                        className="flex-1 bg-transparent border-none outline-none text-slate-300 placeholder-slate-500 text-lg"
                        disabled
                      />
                      <button className="flex-shrink-0 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all flex items-center gap-2 border border-slate-700/60">
                        Get clips
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Short Clips at Bottom */}
                <div
                  className={`relative w-full transition-all duration-700 ${
                    animationPhase === 'shorts' 
                      ? 'opacity-100 translate-y-0 z-30' 
                      : 'opacity-0 translate-y-[-120px] z-10'
                  }`}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                    {clips.map((clip, index) => (
                      <div
                        key={clip.id}
                        className="relative group cursor-pointer transition-all duration-500"
                        style={{
                          transitionDelay: animationPhase === 'shorts' ? `${index * 80}ms` : '0ms',
                          transform: animationPhase === 'shorts' ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.85)',
                          opacity: animationPhase === 'shorts' ? 1 : 0,
                        }}
                      >
                        <div className="relative bg-slate-800/90 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/60 hover:border-purple-500/60 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                          {/* Thumbnail */}
                          <div className="relative aspect-[9/16] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center">
                            {/* Platform icon */}
                            <div className="absolute top-2 right-2 w-9 h-9 bg-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-lg border border-slate-700/60">
                              {platformIcons[clip.platform]}
                            </div>
                            
                            {/* Score badge */}
                            <div className="absolute bottom-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-sm font-black px-2.5 py-1 rounded">
                              {clip.score}
                            </div>

                            {/* Content preview */}
                            <div className="text-5xl opacity-40">🎥</div>

                            {/* Play overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/50">
                              <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                                <svg className="w-6 h-6 text-slate-900 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Bar */}
                  {animationPhase === 'shorts' && (
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-white rounded-xl transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        AI clipping
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-white rounded-xl transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        AI captioning
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-white rounded-xl transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        AI B-Roll
                      </button>
                    </div>
                  )}
                </div>
                    </>
                  );
                })()}

              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center pt-20 border-t border-slate-800 mt-28 transition-all duration-700 delay-400 ${
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
        </div>
      </div>
    </section>
  );
}
