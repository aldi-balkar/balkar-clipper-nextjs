'use client';

const testimonials = [
  {
    name: 'Carlee Myers',
    role: 'Stress Management Coach',
    avatar: 'CM',
    badge: '90% Cheaper than hiring an editor',
    text: 'Balkar Clipper has made editing financially more accessible for me. Previously, I would hire freelancers for the task, costing around $400 to create 10 clips. Now, it offers both time and money savings.',
    rating: 5,
  },
  {
    name: 'Jasmin P.',
    role: 'Co-founder, Coach, Facilitator',
    avatar: 'JP',
    badge: '10x Faster than manual clipping',
    text: 'This tool makes it so easy to keep creating content! As an entrepreneur, I need to constantly showcase what I\'m up to. I love that I can plug in workshop videos, and it quickly creates bite-sized clips ready to post.',
    rating: 5,
  },
  {
    name: 'Jeff S.',
    role: 'Co-Host, Entertainment',
    avatar: 'JS',
    badge: '100% No manual tweaks needed',
    text: 'I was surprised as most AI tools create weak content, but this turned over an hour of footage into solid, shareable posts. Easy to use, fully featured, and delivers exactly as expected.',
    rating: 5,
  },
  {
    name: 'AddictiveLabs',
    role: 'Content Creator',
    avatar: 'AL',
    badge: '5x Increase in views',
    text: 'I\'ve noticed quite a bit of a difference since starting. I\'ve jumped in subscribers. Now I average about 50,000 to 60,000 views a day. That\'s a huge growth from zero views.',
    rating: 5,
  },
  {
    name: 'Rasha E.',
    role: 'Success Trainer & Speaker',
    avatar: 'RE',
    badge: '80% Time saved in content creation',
    text: 'Incredibly intuitive and has saved me hours of editing - one click generates reels that are easy to refine. Plus, their customer support connects you with real humans, a rare and valuable touch!',
    rating: 5,
  },
  {
    name: 'Gilberto V.',
    role: 'Graphic Designer',
    avatar: 'GV',
    badge: 'Effortless workflow',
    text: 'Has streamlined my workflow by solving direct editing problems and freeing up my time. The user-friendly interface makes editing text and exporting effortless.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-24 bg-[#0a0e27]">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto px-4">
          <span className="text-purple-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            What Creators Say
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-6 mb-6 leading-tight">
            What creators say about Balkar Clipper
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 hover:border-purple-500/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Badge */}
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-bold mb-6">
                {testimonial.badge}
              </div>

              {/* Text */}
              <p className="text-slate-300 leading-relaxed mb-6">
                {testimonial.text}
              </p>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
