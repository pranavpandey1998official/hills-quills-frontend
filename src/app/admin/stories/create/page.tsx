'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Save, Send, Upload, Trash2, Image as ImageIcon, Clock } from 'lucide-react';
import { ImagePicker } from '@/components/molecules/image-picker';
import { UTTARAKHAND_REGIONS, ARTICLE_CATEGORIES } from '@/types/articles';
import { toast } from 'sonner';

interface StorySlide {
  id: string;
  image?: File;
  caption: string;
  time: number; // Duration in seconds
}

export default function CreateStoryPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    region: '',
    slides: [] as StorySlide[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.region) {
      newErrors.region = 'Region is required';
    }

    if (formData.slides.length === 0) {
      newErrors.slides = 'At least one slide is required';
    }

    // Validate each slide
    formData.slides.forEach((slide, index) => {
      if (!slide.image) {
        newErrors[`slide-${index}-image`] = `Slide ${index + 1} image is required`;
      }
      if (!slide.caption.trim()) {
        newErrors[`slide-${index}-caption`] = `Slide ${index + 1} caption is required`;
      } else if (slide.caption.length > 100) {
        newErrors[`slide-${index}-caption`] = `Slide ${index + 1} caption must be 100 characters or less`;
      }
      if (!slide.time || slide.time < 1 || slide.time > 30) {
        newErrors[`slide-${index}-time`] = `Slide ${index + 1} time must be between 1-30 seconds`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (action: 'save' | 'submit') => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically call your API to save/submit the story
      console.log('Story data:', { ...formData, action });

      toast.success(action === 'save' ? 'Story saved as draft' : 'Story submitted for review');
      // Redirect to dashboard or stories list
      window.location.href = '/admin/stories';
    } catch (error) {
      toast.error('Failed to save story');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const addSlide = () => {
    const newSlide: StorySlide = {
      id: Date.now().toString(),
      image: undefined,
      caption: '',
      time: 5, // Default 5 seconds
    };
    setFormData((prev) => ({ ...prev, slides: [...prev.slides, newSlide] }));
  };

  const updateSlide = (
    slideId: string,
    field: string,
    value: string | number | File | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) =>
        slide.id === slideId ? { ...slide, [field]: value } : slide
      ),
    }));

    // Clear field-specific errors
    const slideIndex = formData.slides.findIndex((s) => s.id === slideId);
    if (slideIndex !== -1) {
      const errorKey = `slide-${slideIndex}-${field}`;
      if (errors[errorKey]) {
        setErrors((prev) => ({ ...prev, [errorKey]: '' }));
      }
    }
  };

  const removeSlide = (slideId: string) => {
    setFormData((prev) => ({
      ...prev,
      slides: prev.slides.filter((slide) => slide.id !== slideId),
    }));
  };

  return (
    <div className="mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Story</h1>
        <p className="text-muted-foreground">
          Create engaging visual stories with photos and captions. Each slide will be displayed in
          9:16 aspect ratio.
        </p>
      </div>

      {/* Story Information */}
      <Card>
        <CardHeader>
          <CardTitle>Story Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter story title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ARTICLE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => handleChange('region', value)}
              >
                <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {UTTARAKHAND_REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.region && <p className="text-sm text-red-500">{errors.region}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Slides */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Story Slides</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                Add photos and captions for your story. Each slide will be displayed in 9:16 aspect
                ratio.
              </p>
            </div>
            <Button onClick={addSlide}>
              <Plus className="mr-2 h-4 w-4" />
              Add Slide
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.slides.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
              <ImageIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <p className="text-muted-foreground mb-2">No slides added yet</p>
              <p className="text-muted-foreground mb-4 text-sm">
                Add your first slide to start creating your story
              </p>
              <Button onClick={addSlide}>Add Your First Slide</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {formData.slides.map((slide, index) => (
                <div key={slide.id} className="rounded-lg border bg-gray-50 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold">Slide {index + 1}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSlide(slide.id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 space-y-6">
                    {/* Image Section */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">Photo (9:16 Aspect Ratio) *</Label>
                      <ImagePicker
                        value={slide.image}
                        onChange={(file) => updateSlide(slide.id, 'image', file)}
                        placeholderSrc="/images/placeholder.png"
                        ariaLabel={`Upload image for slide ${index + 1}`}
                        className="w-full"
                        aspectRatio="9/16"
                      />
                      {errors[`slide-${index}-image`] && (
                        <p className="text-sm text-red-500">{errors[`slide-${index}-image`]}</p>
                      )}
                    </div>
                    <div className="space-y-12">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-4 w-4" />
                          Display Time (seconds) *
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="30"
                          value={slide.time}
                          onChange={(e) =>
                            updateSlide(slide.id, 'time', parseInt(e.target.value) || 5)
                          }
                          className={errors[`slide-${index}-time`] ? 'border-red-500' : ''}
                        />
                        {errors[`slide-${index}-time`] && (
                          <p className="text-sm text-red-500">{errors[`slide-${index}-time`]}</p>
                        )}
                        <p className="text-muted-foreground text-sm">
                          How long this slide will be displayed (1-30 seconds)
                        </p>
                      </div>
                                             <div className="space-y-2">
                         <Label className="text-sm font-medium">
                           Caption * 
                           <span className={`ml-2 text-xs ${slide.caption.length > 100 ? 'text-red-500' : 'text-muted-foreground'}`}>
                             ({slide.caption.length}/100)
                           </span>
                         </Label>
                         <Textarea
                           value={slide.caption}
                           onChange={(e) => updateSlide(slide.id, 'caption', e.target.value)}
                           placeholder="Enter a compelling caption for this slide (max 100 characters)..."
                           rows={8}
                           maxLength={100}
                           className={errors[`slide-${index}-caption`] ? 'border-red-500' : ''}
                         />
                         {errors[`slide-${index}-caption`] && (
                           <p className="text-sm text-red-500">{errors[`slide-${index}-caption`]}</p>
                         )}
                         <p className="text-muted-foreground text-sm">
                           Write an engaging caption that complements the image. Maximum 100 characters.
                         </p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-muted-foreground text-sm">
              {formData.slides.length} slide{formData.slides.length !== 1 ? 's' : ''} added
            </p>
            {formData.slides.length > 0 && (
              <Button onClick={addSlide} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Another Slide
              </Button>
            )}
          </div>

          {errors.slides && <p className="text-sm text-red-500">{errors.slides}</p>}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex  space-x-3 pt-6">
      <Button type="button" onClick={() => handleSubmit('submit')} disabled={isSubmitting}>
          <Send className="mr-2 h-4 w-4" />
          Publish Story
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit('save')}
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>

        <Button type="button" variant="destructive" onClick={() => window.history.back()}>
          Reset
        </Button>
      </div>
    </div>
  );
}
