import imageCompression from 'browser-image-compression';
import { UploadImageResponse } from '@/types/common';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class RequestError extends Error {
  code: number;
  statusCode: number;
  
  constructor(message: string, code: number, statusCode: number) {
      super(message);
      this.name = 'RequestError';
      this.code = code;
      this.statusCode = statusCode;
      
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
          Error.captureStackTrace(this, RequestError);
      }
  }
}

type Response<T> = {
  data: T;
  message: string;
  code: number;
  pagination?: {
    hasNext: number;
    nextCursor: number;
  }
};

export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<Response<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      // Use localStorage only on client side
      let token;
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('auth_token');
      }
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new RequestError(errorData.message || 'Request failed', errorData.code || 0, response.status);
      }
      
      return await response.json() as Response<T>;
    } catch (error: any) {
      throw new RequestError(error.message || 'Request failed', 0, 500);
    }
  },

  get<T>(endpoint: string): Promise<Response<T>> {
    return this.request<T>(endpoint);
  },

  post<T>(endpoint: string, data: any): Promise<Response<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put<T>(endpoint: string, data: any): Promise<Response<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  patch<T>(endpoint: string, data: any): Promise<Response<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete<T>(endpoint: string): Promise<Response<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  },

  async uploadImage<T> (
    file: File,
  ): Promise<Response<UploadImageResponse>> {
    try {
      const options = {
        maxSizeMB: 0.5,
        useWebWorker: true,
        maxIteration: 30,
      }
      const compressedFile = await imageCompression(file, options);
  
      // Create form data
      const formData = new FormData();
      formData.append('image', compressedFile);
      
      // Use the API client to make the request
      const url = `${API_BASE_URL}/upload`;
      
      // For FormData, we need to use fetch directly since our apiClient is set up for JSON
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data as Response<UploadImageResponse>;
    } catch (error: any) {
      throw new RequestError(error.message || 'Request failed', 0, 500);
    }
  }
};

// Auth API endpoints for reference:
// Admin login: POST /auth/admin/login
// Author login: POST /auth/authors/login
// Admin profile: GET /auth/admin/me
// Author profile: GET /auth/author/me
