import { apiClient } from './api';
import { API_BASE_URL } from "@/types/constant"
import { MAX_FILE_SIZE, UploadType, UploadResponse } from "@/types/articles"

/**
 * Validates if the file is an image and within size limits
 */
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `Image size must be less than 5MB (current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB)` 
    };
  }
  
  return { valid: true };
};

/**
 * Uploads an image to the server
 * @param file The image file to upload
 * @param type The type of upload ('article' or 'profile')
 * @returns Promise with the upload response
 */
export const uploadImage = async (
  file: File,
  type: UploadType = 'article'
): Promise<UploadResponse> => {
  try {
    // Validate the image first
    const validation = validateImage(file);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }

    // Create form data
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    
    // Use the API client to make the request
    const url = `${API_BASE_URL}/upload-image`;
    
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
    
    // More flexible response handling
    // First check for common Cloudinary response patterns
    if (data.url) {
      // Direct URL in the response
      return {
        success: true,
        url: data.url
      };
    } else if (data.data && data.data.url) {
      // Nested URL in a data object
      return {
        success: true,
        url: data.data.url
      };
    } else if (data.secure_url) {
      // Cloudinary sometimes returns secure_url directly
      return {
        success: true,
        url: data.secure_url
      };
    } else if (data.data && data.data.secure_url) {
      // Nested secure_url
      return {
        success: true,
        url: data.data.secure_url
      };
    } else if (typeof data === 'string' && data.includes('http')) {
      // Direct URL string response
      return {
        success: true,
        url: data
      };
    } else if (data.success === false) {
      // Explicit failure
      throw new Error(data.message || 'Upload failed');
    } else {
      // Can't find URL in the response
      console.error('Unexpected upload response format:', data);
      return {
        success: false,
        error: 'Could not retrieve image URL from server response'
      };
    }
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};
