'use client';

import Image from 'next/image';

const results = [
  {
    platform: 'TikTok',
    views: '2.5M',
    engagement: '15.2%',
    thumbnail: '/images/tiktok-result.jpg',
    username: '@creator_name',
    description: 'Viral cooking tips that got 2.5M views in 24 hours',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  {
    platform: 'Instagram',
    views: '1.8M',
    engagement: '12.8%',
    thumbnail: '/images/instagram-result.jpg',
    username: '@fitness_guru',
    description: '30-second workout routine that resonated with millions',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    platform: 'YouTube',
    views: '3.2M',
    engagement: '18.5%',
    thumbnail: '/images/youtube-result.jpg',
    username: '@tech_reviewer',
    description: 'Product review highlights that drove massive traffic',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    platform: 'TikTok',
    views: '4.1M',
    engagement: '22.3%',
    thumbnail: '/images/tiktok-result-2.jpg',
    username: '@motivational_daily',
    description: 'Inspirational quote video that went mega viral',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  {
    platform: 'Instagram',
    views: '2.3M',
    engagement: '16.7%',
    thumbnail: '/images/instagram-result-2.jpg',
    username: '@travel_wanderer',
    description: 'Travel vlog highlights that captured wanderlust',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    platform: 'YouTube',
    views: '5.7M',
    engagement: '24.1%',
    thumbnail: '/images/youtube-result-2.jpg',
    username: '@podcast_highlights',
    description: 'Podcast clips that skyrocketed channel growth',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Results() {
  return (
    <section id="results" className="w-full py-24 bg-gradient-to-b from-purple-900/10 to-transparent">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto px-4">
          <span className="text-purple-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-6 mb-6 leading-tight">
            Hasil nyata dari creator seperti Anda
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Lihat bagaimana Balkar Clipper membantu ribuan creator menghasilkan konten viral 
            yang siap langsung diupload ke platform favorit mereka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[9/16] bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
                {/* Placeholder gradient */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      {result.icon}
                    </div>
                    <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {result.views}
                    </div>
                    <div className="text-slate-400 text-sm">Views</div>
                  </div>
                </div>
                
                {/* Platform Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <div className="text-purple-400">{result.icon}</div>
                  <span className="text-sm font-semibold">{result.platform}</span>
                </div>

                {/* Engagement Badge */}
                <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-bold text-white">{result.engagement}</span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-purple-400 font-semibold text-sm mb-2">
                  {result.username}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {result.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Ready to upload</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-xs">
                      📱
                    </div>
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-xs">
                      📥
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">
            Ingin hasil seperti ini? Mulai buat clips viral Anda sekarang
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50">
            Start Creating Now
          </button>
        </div>
      </div>
    </section>
  );
}
