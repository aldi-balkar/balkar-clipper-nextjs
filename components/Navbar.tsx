'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/98 backdrop-blur-2xl shadow-xl border-b border-slate-800'
            : 'bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/30'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Balkar Clipper
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/dashboard"
                className="text-slate-300 hover:text-white transition-colors font-semibold"
              >
                Dashboard
              </Link>
              <Link
                href="/history"
                className="text-slate-300 hover:text-white transition-colors"
              >
                History
              </Link>
              <Link
                href="#features"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#results"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Results
              </Link>
              <Link
                href="#testimonials"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Testimonials
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-5 py-2.5 text-slate-300 hover:text-white transition-colors font-medium">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50">
                Get Started Free
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-6 space-y-4">
            <Link
              href="#features"
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#results"
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Results
            </Link>
            <Link
              href="#testimonials"
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="pt-4 space-y-3">
              <button className="w-full px-5 py-2.5 text-slate-300 hover:text-white transition-colors font-medium">
                Sign In
              </button>
              <button className="w-full px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
