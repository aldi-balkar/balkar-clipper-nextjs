'use client';

const steps = [
  {
    number: '01',
    title: 'Upload and transcribe',
    description:
      'Upload your video and let our AI transcribe and analyze it automatically',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Get AI clips',
    description:
      'Click one button and watch as AI creates perfectly formatted clips for all platforms',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Publish and share',
    description:
      'Download, share as links or publish directly to your favorite platforms',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-24 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-4xl mx-auto px-4">
          <span className="text-purple-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-6 mb-6 leading-tight">
            From raw footage to social-ready clips,
            <br className="hidden sm:block" />a workflow that just works
          </h2>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row items-center gap-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12 hover:bg-slate-800/70 hover:border-purple-500/40 hover:translate-x-2 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent shrink-0">
                {step.number}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="shrink-0 text-purple-400 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {step.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
