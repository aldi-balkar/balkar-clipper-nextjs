// Type definitions for Balkar Clipper

export type VideoStyle = 'santai' | 'edukatif' | 'emosional';
export type OutputLanguage = 'indonesia' | 'english';
export type VideoDuration = '15-30' | '30-45';
export type PlatformType = 'youtube' | 'tiktok' | 'instagram' | 'facebook';
export type JobStatus = 'processing' | 'done' | 'failed';
export type ProcessingStep = 'downloading' | 'transcribing' | 'analyzing' | 'rendering';

export interface GenerateOptions {
  youtubeUrl: string;
  style: VideoStyle;
  language: OutputLanguage;
  generateHook: boolean;
  generateCaption: boolean;
  generateCover: boolean;
  duration: VideoDuration;
  numberOfOutputs: 1 | 3 | 5;
  subtitleStyle: boolean;
}

export interface VideoOutput {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  platforms: PlatformType[];
  subtitleUrl?: string;
}

export interface Hook {
  text: string;
  includeInVideo: boolean;
}

export interface Caption {
  text: string;
  hashtags: string[];
}

export interface Cover {
  platform: PlatformType;
  imageUrl: string;
  headline: string;
}

export interface GeneratedResult {
  id: string;
  videos: VideoOutput[];
  hook?: Hook;
  caption?: Caption;
  covers?: Cover[];
  createdAt: Date;
  status: JobStatus;
}

export interface HistoryItem {
  id: string;
  youtubeUrl: string;
  status: JobStatus;
  createdAt: Date;
  thumbnailUrl?: string;
  title?: string;
}

export interface UsageInfo {
  used: number;
  total: number;
  planName: string;
  nextResetDate: Date;
}
