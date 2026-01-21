'use client';

export default function CTA() {
  return (
    <section className="w-full py-24 bg-[#0a0e27]">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Get started for free
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10">
            Join 10 million+ creators transforming their content with AI
          </p>
          <a
            href="/dashboard"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50 inline-flex items-center gap-2"
          >
            Get Clips For Free
            <svg
              className="w-5 h-5"
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
          <p className="text-slate-400 text-sm mt-6">
            No credit card required • Free forever plan
          </p>
        </div>
      </div>
    </section>
  );
}
