'use client';

import { useEffect, useState, useRef } from 'react';

const companies = [
  'Google',
  'Stanford',
  'Ubisoft',
  'Microsoft',
  'Amazon',
  'Netflix',
  'Meta',
  'Apple',
];

export default function TrustedBy() {
  return (
    <section className="w-full py-20 border-t border-slate-800/50 bg-[#0a0e27]">
      <div className="w-full max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 text-sm font-semibold uppercase tracking-wider mb-16">
          Trusted by 10 million+ creators & businesses
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-2xl font-bold text-slate-600 hover:text-slate-400 transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
