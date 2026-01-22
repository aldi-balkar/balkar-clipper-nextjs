'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import InputForm from '@/components/dashboard/InputForm';
import ProcessingState from '@/components/dashboard/ProcessingState';
import UsagePanel from '@/components/dashboard/UsagePanel';
import VideoResultCard from '@/components/dashboard/VideoResultCard';
import HookSection from '@/components/dashboard/HookSection';
import CaptionSection from '@/components/dashboard/CaptionSection';
import CoverSection from '@/components/dashboard/CoverSection';
import { GenerateOptions, GeneratedResult, UsageInfo, ProcessingStep } from '@/lib/types';
import { generateVideo, pollProjectStatus, getUserUsage, APIError } from '@/lib/api';
import ErrorState from '@/components/dashboard/ErrorState';

export default function DashboardPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('downloading');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [error, setError] = useState<{
    type: 'video_too_long' | 'invalid_url' | 'quota_exceeded' | 'processing_failed' | 'network_error' | 'unknown';
    message: string;
  } | null>(null);

  // Load usage info on mount
  useEffect(() => {
    loadUsage();
  }, []);

  const loadUsage = async () => {
    try {
      const usageData = await getUserUsage();
      setUsage(usageData);
    } catch (err) {
      console.error('Failed to load usage:', err);
    }
  };

  const handleGenerate = async (options: GenerateOptions) => {
    setIsProcessing(true);
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      // Create project
      const { projectId } = await generateVideo(options);

      // Poll for status updates
      const finalResult = await pollProjectStatus(
        projectId,
        (status, step, progressValue) => {
          setCurrentStep(step);
          setProgress(progressValue);
        },
        3000 // Poll every 3 seconds
      );

      setResult(finalResult);
      setProgress(100);
      
      // Refresh usage
      await loadUsage();
    } catch (err) {
      if (err instanceof APIError) {
        setError({
          type: err.type,
          message: err.message,
        });
      } else {
        setError({
          type: 'unknown',
          message: err instanceof Error ? err.message : 'Unknown error occurred',
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsProcessing(false);
    setResult(null);
    setProgress(0);
  };

  const handleChooseAnother = () => {
    setError(null);
    setIsProcessing(false);
    setResult(null);
    setProgress(0);
  };

  const handleUpdateHook = (hook: any) => {
    if (result) {
      setResult({ ...result, hook });
    }
  };

  const handleUpdateCaption = (caption: any) => {
    if (result) {
      setResult({ ...result, caption });
    }
  };

  const handleUpdateCovers = (covers: any) => {
    if (result) {
      setResult({ ...result, covers });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] py-24">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-400 text-lg">
            Transform YouTube video jadi konten viral dalam hitungan menit ⚡
          </p>
          
          {/* Quick Links */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link
              href="/history"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Riwayat
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Upgrade
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {!isProcessing && !result && !error && (
              <InputForm onGenerate={handleGenerate} isProcessing={false} />
            )}

            {isProcessing && (
              <ProcessingState currentStep={currentStep} progress={progress} />
            )}

            {error && (
              <ErrorState
                errorType={error.type}
                customMessage={error.message}
                onRetry={handleRetry}
                onChooseAnother={handleChooseAnother}
                onUpgrade={() => window.location.href = '/#pricing'}
              />
            )}

            {result && !isProcessing && !error && (
              <>
                {/* Success Message */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-400 text-lg">Berhasil! 🎉</h3>
                    <p className="text-slate-300">Video short kamu sudah siap didownload dan diposting</p>
                  </div>
                </div>

                {/* Videos */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Video Results</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {result.videos.map((video) => (
                      <VideoResultCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>

                {/* Hook */}
                {result.hook && (
                  <HookSection hook={result.hook} onUpdate={handleUpdateHook} />
                )}

                {/* Caption */}
                {result.caption && (
                  <CaptionSection caption={result.caption} onUpdate={handleUpdateCaption} />
                )}

                {/* Covers */}
                {result.covers && result.covers.length > 0 && (
                  <CoverSection covers={result.covers} onUpdate={handleUpdateCovers} />
                )}

                {/* New Generation Button */}
                <button
                  onClick={() => {
                    setResult(null);
                    setProgress(0);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/50"
                >
                  🎬 Buat Video Baru
                </button>
              </>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Usage Panel */}
            {usage && <UsagePanel usage={usage} />}

            {/* Tips Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>💡</span> Tips
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Pilih video dengan durasi 5-30 menit untuk hasil terbaik</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Video dengan audio jernih menghasilkan subtitle lebih akurat</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Edit hook dan caption sesuai gaya kamu sendiri</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Test di berbagai platform untuk reach maksimal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
