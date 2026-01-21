'use client';

const plans = [
  {
    name: 'Free',
    price: 'Rp 0',
    period: 'forever',
    description: 'Perfect untuk pemula dan pelajar',
    features: [
      '10 clips per bulan',
      'Video hingga 30 menit',
      'Export 720p',
      'Basic captions',
      'Watermark Balkar',
      'Community support',
    ],
    cta: 'Start Free',
    popular: false,
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'Rp 199.000',
    period: '/bulan',
    description: 'Untuk creator dan profesional',
    features: [
      '100 clips per bulan',
      'Video hingga 2 jam',
      'Export 1080p',
      'AI captions + emoji',
      'No watermark',
      'Priority support',
      'Custom branding',
      'AI B-roll',
    ],
    cta: 'Start Pro Trial',
    popular: true,
    highlight: false,
  },
  {
    name: 'Disabilitas',
    price: 'Gratis Selamanya',
    period: '',
    description: 'Untuk teman-teman berkebutuhan khusus',
    features: [
      'Unlimited clips',
      'Video tanpa batas durasi',
      'Export 4K',
      'Semua fitur AI',
      'No watermark',
      'Priority support',
      'Custom branding',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Daftar Sekarang',
    popular: false,
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Untuk tim dan organisasi besar',
    features: [
      'Unlimited clips',
      'Video tanpa batas durasi',
      'Export 4K',
      'Semua fitur AI',
      'No watermark',
      'Priority support',
      'Custom branding',
      'Team workspace',
      'API access',
      'SLA 99.9%',
    ],
    cta: 'Contact Sales',
    popular: false,
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-24 bg-[#0a0e27]">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto px-4">
          <span className="text-purple-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-6 mb-6 leading-tight">
            Pilih paket yang sesuai untuk Anda
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Kami percaya setiap orang berhak mendapatkan akses ke teknologi AI.
            Untuk teman-teman berkebutuhan khusus, kami menyediakan akses gratis selamanya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-3xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ${
                plan.highlight
                  ? 'border-green-500/60 shadow-xl shadow-green-500/20 hover:shadow-green-500/30'
                  : plan.popular
                  ? 'border-purple-500/60 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30'
                  : 'border-slate-700/50 hover:border-slate-600/50 hover:shadow-purple-500/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                  Visi & Misi Balkar
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-black mb-1">
                  {plan.price}
                </div>
                <div className="text-slate-400 text-sm">{plan.period}</div>
              </div>

              <button
                className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/50'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.highlight
                          ? 'text-green-400'
                          : 'text-purple-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Vision Mission Card */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-3xl p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Visi & Misi Balkar untuk Disabilitas</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Kami di Balkar percaya bahwa teknologi harus dapat diakses oleh semua orang, tanpa terkecuali. 
                Untuk teman-teman berkebutuhan khusus, kami menyediakan akses <span className="text-green-400 font-bold">100% gratis selamanya</span> ke 
                semua fitur premium kami.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                Ini adalah komitmen kami untuk menciptakan dunia digital yang lebih inklusif dan memberikan 
                kesempatan yang sama bagi semua orang untuk berkarya dan mengekspresikan diri melalui konten video.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  Pelajari lebih lanjut
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
                >
                  Hubungi kami untuk verifikasi
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
