// Real API implementation example
// Replace mockApi.ts with this when backend is ready

import axios from 'axios';
import { GenerateOptions, GeneratedResult, HistoryItem, UsageInfo } from './types';

// Configure axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.balkarclipper.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Generate video shorts from YouTube URL
 * POST /api/v1/generate
 */
export const generateVideo = async (options: GenerateOptions): Promise<{ jobId: string }> => {
  try {
    const response = await api.post('/api/v1/generate', {
      youtube_url: options.youtubeUrl,
      style: options.style,
      language: options.language,
      generate_hook: options.generateHook,
      generate_caption: options.generateCaption,
      generate_cover: options.generateCover,
      duration: options.duration,
      number_of_outputs: options.numberOfOutputs,
      subtitle_style: options.subtitleStyle,
    });
    
    return response.data;
  } catch (error) {
    console.error('Generate video error:', error);
    throw error;
  }
};

/**
 * Get job status and results
 * GET /api/v1/jobs/:jobId
 */
export const getJobStatus = async (jobId: string): Promise<GeneratedResult> => {
  try {
    const response = await api.get(`/api/v1/jobs/${jobId}`);
    
    // Transform backend response to frontend format
    return {
      id: response.data.id,
      status: response.data.status,
      createdAt: new Date(response.data.created_at),
      videos: response.data.videos?.map((v: any) => ({
        id: v.id,
        videoUrl: v.video_url,
        thumbnailUrl: v.thumbnail_url,
        duration: v.duration,
        platforms: v.platforms,
        subtitleUrl: v.subtitle_url,
      })) || [],
      hook: response.data.hook ? {
        text: response.data.hook.text,
        includeInVideo: response.data.hook.include_in_video,
      } : undefined,
      caption: response.data.caption ? {
        text: response.data.caption.text,
        hashtags: response.data.caption.hashtags,
      } : undefined,
      covers: response.data.covers?.map((c: any) => ({
        platform: c.platform,
        imageUrl: c.image_url,
        headline: c.headline,
      })) || [],
    };
  } catch (error) {
    console.error('Get job status error:', error);
    throw error;
  }
};

/**
 * Get user's generation history
 * GET /api/v1/history
 */
export const getHistory = async (
  page: number = 1,
  limit: number = 20,
  status?: string
): Promise<{ items: HistoryItem[]; total: number; page: number }> => {
  try {
    const params: any = { page, limit };
    if (status && status !== 'all') {
      params.status = status;
    }
    
    const response = await api.get('/api/v1/history', { params });
    
    return {
      items: response.data.items.map((item: any) => ({
        id: item.id,
        youtubeUrl: item.youtube_url,
        status: item.status,
        createdAt: new Date(item.created_at),
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
      })),
      total: response.data.total,
      page: response.data.page,
    };
  } catch (error) {
    console.error('Get history error:', error);
    throw error;
  }
};

/**
 * Get user's usage info
 * GET /api/v1/usage
 */
export const getUsage = async (): Promise<UsageInfo> => {
  try {
    const response = await api.get('/api/v1/usage');
    
    return {
      used: response.data.used,
      total: response.data.total,
      planName: response.data.plan_name,
      nextResetDate: new Date(response.data.next_reset_date),
    };
  } catch (error) {
    console.error('Get usage error:', error);
    throw error;
  }
};

/**
 * Update hook text
 * PATCH /api/v1/jobs/:jobId/hook
 */
export const updateHook = async (jobId: string, text: string, includeInVideo: boolean) => {
  try {
    await api.patch(`/api/v1/jobs/${jobId}/hook`, {
      text,
      include_in_video: includeInVideo,
    });
  } catch (error) {
    console.error('Update hook error:', error);
    throw error;
  }
};

/**
 * Update caption
 * PATCH /api/v1/jobs/:jobId/caption
 */
export const updateCaption = async (jobId: string, text: string) => {
  try {
    await api.patch(`/api/v1/jobs/${jobId}/caption`, {
      text,
    });
  } catch (error) {
    console.error('Update caption error:', error);
    throw error;
  }
};

/**
 * Regenerate cover headline
 * POST /api/v1/jobs/:jobId/covers/:platform/regenerate
 */
export const regenerateCoverHeadline = async (
  jobId: string,
  platform: string
): Promise<{ headline: string }> => {
  try {
    const response = await api.post(
      `/api/v1/jobs/${jobId}/covers/${platform}/regenerate`
    );
    return response.data;
  } catch (error) {
    console.error('Regenerate cover error:', error);
    throw error;
  }
};

/**
 * Download video
 * GET /api/v1/jobs/:jobId/videos/:videoId/download
 */
export const downloadVideo = async (jobId: string, videoId: string): Promise<string> => {
  try {
    const response = await api.get(
      `/api/v1/jobs/${jobId}/videos/${videoId}/download`,
      { responseType: 'blob' }
    );
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `balkar-video-${videoId}.mp4`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return url;
  } catch (error) {
    console.error('Download video error:', error);
    throw error;
  }
};

/**
 * Download subtitle
 * GET /api/v1/jobs/:jobId/videos/:videoId/subtitle
 */
export const downloadSubtitle = async (jobId: string, videoId: string): Promise<string> => {
  try {
    const response = await api.get(
      `/api/v1/jobs/${jobId}/videos/${videoId}/subtitle`,
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `balkar-subtitle-${videoId}.srt`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return url;
  } catch (error) {
    console.error('Download subtitle error:', error);
    throw error;
  }
};

/**
 * Download cover
 * GET /api/v1/jobs/:jobId/covers/:platform/download
 */
export const downloadCover = async (
  jobId: string,
  platform: string
): Promise<string> => {
  try {
    const response = await api.get(
      `/api/v1/jobs/${jobId}/covers/${platform}/download`,
      { responseType: 'blob' }
    );
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `balkar-cover-${platform}.jpg`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return url;
  } catch (error) {
    console.error('Download cover error:', error);
    throw error;
  }
};

/**
 * WebSocket connection for real-time updates
 */
export const connectWebSocket = (jobId: string, onUpdate: (data: any) => void) => {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.balkarclipper.com';
  const ws = new WebSocket(`${wsUrl}/ws/jobs/${jobId}`);
  
  ws.onopen = () => {
    console.log('WebSocket connected');
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };
  
  return ws;
};

export default api;
