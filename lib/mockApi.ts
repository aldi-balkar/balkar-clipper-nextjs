// Mock API responses for development

import { GeneratedResult, HistoryItem, UsageInfo, JobStatus } from './types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock: Generate video shorts
export const mockGenerateVideo = async (options: any): Promise<GeneratedResult> => {
  await delay(2000);
  
  return {
    id: `job_${Date.now()}`,
    status: 'processing' as JobStatus,
    createdAt: new Date(),
    videos: [],
  };
};

// Mock: Get generation status
export const mockGetJobStatus = async (jobId: string): Promise<GeneratedResult> => {
  await delay(1000);
  
  return {
    id: jobId,
    status: 'done' as JobStatus,
    createdAt: new Date(),
    videos: [
      {
        id: 'video_1',
        videoUrl: '/mock-video-1.mp4',
        thumbnailUrl: '/images/youtube-result.jpg',
        duration: 28,
        platforms: ['youtube', 'tiktok'],
        subtitleUrl: '/mock-subtitle-1.srt',
      },
      {
        id: 'video_2',
        videoUrl: '/mock-video-2.mp4',
        thumbnailUrl: '/images/instagram-result.jpg',
        duration: 42,
        platforms: ['instagram', 'facebook'],
        subtitleUrl: '/mock-subtitle-2.srt',
      },
    ],
    hook: {
      text: 'Rahasia sukses yang jarang orang tau! 🔥',
      includeInVideo: true,
    },
    caption: {
      text: 'Video ini akan mengubah cara pandang kamu tentang produktivitas! Simak sampai habis ya 🚀',
      hashtags: ['#produktivitas', '#motivasi', '#tipskerja', '#contentcreator', '#viral'],
    },
    covers: [
      {
        platform: 'youtube',
        imageUrl: '/mock-cover-youtube.jpg',
        headline: 'RAHASIA SUKSES YANG JARANG DIKETAHUI',
      },
      {
        platform: 'tiktok',
        imageUrl: '/mock-cover-tiktok.jpg',
        headline: 'CARA SUKSES CEPAT!',
      },
    ],
  };
};

// Mock: Get history
export const mockGetHistory = async (): Promise<HistoryItem[]> => {
  await delay(500);
  
  return [
    {
      id: 'job_1',
      youtubeUrl: 'https://youtube.com/watch?v=example1',
      status: 'done',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      thumbnailUrl: '/images/youtube-result.jpg',
      title: 'Tips Produktivitas untuk Content Creator',
    },
    {
      id: 'job_2',
      youtubeUrl: 'https://youtube.com/watch?v=example2',
      status: 'done',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      thumbnailUrl: '/images/instagram-result.jpg',
      title: 'Tutorial Editing Video Cepat',
    },
    {
      id: 'job_3',
      youtubeUrl: 'https://youtube.com/watch?v=example3',
      status: 'processing',
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
      title: 'Cara Membuat Konten Viral',
    },
  ];
};

// Mock: Get usage info
export const mockGetUsage = async (): Promise<UsageInfo> => {
  await delay(300);
  
  return {
    used: 7,
    total: 10,
    planName: 'Free',
    nextResetDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
  };
};
