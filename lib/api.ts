/**
 * Real API Integration with Python Backend
 * Connects to FastAPI backend at http://localhost:8000/api
 */

import { 
  GenerateOptions, 
  GeneratedResult, 
  UsageInfo, 
  HistoryItem,
  ProcessingStep,
  JobStatus
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || '/api';
const BASE_URL = `${API_URL}${API_PREFIX}`;

/**
 * API Error Handler
 */
class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public type: 'video_too_long' | 'invalid_url' | 'quota_exceeded' | 'processing_failed' | 'network_error' | 'unknown'
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail || errorData.message || 'An error occurred';
      const errorType = getErrorType(response.status, errorMessage);
      throw new APIError(response.status, errorMessage, errorType);
    }

    return response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new APIError(0, 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.', 'network_error');
    }
    
    throw new APIError(0, error instanceof Error ? error.message : 'Unknown error', 'unknown');
  }
}

/**
 * Determine error type based on status and message
 */
function getErrorType(
  status: number,
  message: string
): 'video_too_long' | 'invalid_url' | 'quota_exceeded' | 'processing_failed' | 'network_error' | 'unknown' {
  if (status === 403) return 'quota_exceeded';
  if (status === 500) return 'processing_failed';
  
  if (status === 400) {
    if (message.includes('URL') || message.includes('link')) return 'invalid_url';
    if (message.includes('terlalu panjang') || message.includes('too long')) return 'video_too_long';
  }
  
  return 'unknown';
}

/**
 * Map backend processing step to frontend step
 */
function mapProcessingStep(backendStep: string): ProcessingStep {
  const stepMap: Record<string, ProcessingStep> = {
    'downloading': 'downloading',
    'transcribing': 'transcribing',
    'analyzing': 'analyzing',
    'rendering': 'rendering',
  };
  return stepMap[backendStep] || 'downloading';
}

/**
 * Map backend status to frontend status
 */
function mapJobStatus(backendStatus: string): JobStatus {
  const statusMap: Record<string, JobStatus> = {
    'processing': 'processing',
    'completed': 'done',
    'failed': 'failed',
  };
  return statusMap[backendStatus] || 'processing';
}

/**
 * Calculate progress percentage based on step
 */
function calculateProgress(step: ProcessingStep): number {
  const progressMap: Record<ProcessingStep, number> = {
    'downloading': 25,
    'transcribing': 50,
    'analyzing': 75,
    'rendering': 90,
  };
  return progressMap[step] || 0;
}

/**
 * Generate video from YouTube URL
 * POST /projects
 */
export async function generateVideo(options: GenerateOptions): Promise<{ projectId: string }> {
  const response = await apiFetch<{ project_id: string }>('/projects', {
    method: 'POST',
    body: JSON.stringify({
      youtube_url: options.youtubeUrl,
      style: options.style,
      language: options.language,
      duration_range: options.duration,
      output_count: options.numberOfOutputs,
      generate_hook: options.generateHook,
      generate_caption: options.generateCaption,
      generate_cover: options.generateCover,
    }),
  });

  return { projectId: response.project_id };
}

/**
 * Get project status and results
 * GET /projects/{projectId}
 */
export async function getProjectStatus(projectId: string): Promise<{
  status: JobStatus;
  currentStep: ProcessingStep;
  progress: number;
  result: GeneratedResult | null;
  error?: string;
}> {
  const response = await apiFetch<{
    id: string;
    status: string;
    progress_step: string;
    progress_message: string;
    error_message?: string;
    videos?: Array<{
      id: string;
      video_url: string;
      thumbnail_url: string;
      duration_seconds: number;
      subtitle_url?: string;
    }>;
    hook?: {
      text: string;
    };
    caption?: {
      text: string;
      hashtags: string[];
    };
    covers?: Array<{
      platform: string;
      image_url: string;
      headline: string;
    }>;
  }>(`/projects/${projectId}`);

  const status = mapJobStatus(response.status);
  const currentStep = mapProcessingStep(response.progress_step);
  const progress = calculateProgress(currentStep);

  // If completed, map to GeneratedResult
  let result: GeneratedResult | null = null;
  if (status === 'done' && response.videos) {
    result = {
      id: response.id,
      videos: response.videos.map(v => ({
        id: v.id,
        videoUrl: v.video_url,
        thumbnailUrl: v.thumbnail_url,
        duration: v.duration_seconds,
        platforms: ['youtube', 'tiktok', 'instagram', 'facebook'], // Backend should provide this
        subtitleUrl: v.subtitle_url,
      })),
      hook: response.hook ? {
        text: response.hook.text,
        includeInVideo: true,
      } : undefined,
      caption: response.caption ? {
        text: response.caption.text,
        hashtags: response.caption.hashtags,
      } : undefined,
      covers: response.covers?.map(c => ({
        platform: c.platform as any,
        imageUrl: c.image_url,
        headline: c.headline,
      })),
      createdAt: new Date(),
      status: 'done',
    };
  }

  return {
    status,
    currentStep,
    progress: status === 'done' ? 100 : progress,
    result,
    error: response.error_message,
  };
}

/**
 * Get user usage statistics
 * GET /usage
 */
export async function getUserUsage(): Promise<UsageInfo> {
  const response = await apiFetch<{
    videos_generated: number;
    videos_limit: number;
    plan: string;
  }>('/usage');

  return {
    used: response.videos_generated,
    total: response.videos_limit,
    planName: response.plan,
    nextResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Mock: 30 days from now
  };
}

/**
 * Get project history
 * GET /projects
 */
export async function getProjectHistory(): Promise<HistoryItem[]> {
  const response = await apiFetch<{
    projects: Array<{
      id: string;
      youtube_url: string;
      status: string;
      created_at: string;
      thumbnail_url?: string;
    }>;
  }>('/projects');

  return response.projects.map(p => ({
    id: p.id,
    youtubeUrl: p.youtube_url,
    title: `Video from ${new URL(p.youtube_url).hostname}`, // Extract from URL or get from backend
    status: mapJobStatus(p.status),
    createdAt: new Date(p.created_at),
    thumbnailUrl: p.thumbnail_url,
  }));
}

/**
 * Retry failed project
 * POST /projects/{projectId}/retry
 */
export async function retryProject(projectId: string): Promise<void> {
  await apiFetch(`/projects/${projectId}/retry`, {
    method: 'POST',
  });
}

/**
 * Health check
 * GET /health
 */
export async function healthCheck(): Promise<{
  status: string;
  timestamp: string;
}> {
  const response = await apiFetch<{
    status: string;
    timestamp: string;
  }>('/health');
  
  return response;
}

/**
 * Poll project status until completion or failure
 * Useful for real-time updates
 */
export async function pollProjectStatus(
  projectId: string,
  onProgress: (status: JobStatus, step: ProcessingStep, progress: number) => void,
  intervalMs: number = 3000
): Promise<GeneratedResult> {
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const { status, currentStep, progress, result, error } = await getProjectStatus(projectId);
        
        onProgress(status, currentStep, progress);

        if (status === 'done' && result) {
          resolve(result);
        } else if (status === 'failed') {
          reject(new APIError(500, error || 'Processing failed', 'processing_failed'));
        } else {
          // Continue polling
          setTimeout(poll, intervalMs);
        }
      } catch (error) {
        reject(error);
      }
    };

    poll();
  });
}

export { APIError };
