import React, { useState, useRef } from 'react';
import { uploadImage, UploadType, validateImage, MAX_FILE_SIZE } from '@/lib/uploadImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  type?: UploadType;
  className?: string;
  label?: string;
  initialImageUrl?: string;
}

export function ImageUploader({
  onImageUploaded,
  type = 'article',
  className = '',
  label = 'Upload Image',
  initialImageUrl,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    
    // Validate file before trying to upload
    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a preview immediately for better UX
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Perform the actual upload
      const result = await uploadImage(file, type);
      
      if (!result.success || !result.url) {
        setError(result.error || 'Upload failed');
        // Optionally revert preview
        setPreviewUrl(initialImageUrl || null);
      } else {
        // Notify parent component of successful upload
        onImageUploaded(result.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setPreviewUrl(initialImageUrl || null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearImage = () => {
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Notify parent that the image was cleared, passing empty string
    onImageUploaded('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="image-upload">{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            ref={fileInputRef}
          />
          {isUploading && (
            <Button variant="ghost" size="icon" disabled>
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Only image files (JPG, PNG, GIF) up to 5MB are allowed
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {previewUrl && (
        <div className="relative w-full max-w-sm">
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded-md shadow-md object-cover w-full max-h-64"
          />
          <Button
            onClick={handleClearImage}
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 rounded-full opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
