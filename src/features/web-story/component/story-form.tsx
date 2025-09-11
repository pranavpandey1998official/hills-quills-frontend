'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImagePicker } from '@/components/molecules/image-picker';
import { Plus, Trash2, ImageIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category, ImageFile, PREVIEW_STORY_IMAGE, Region } from '@/types/common';
import { MAX_SLIDES } from '@/types/constant';
import { TagsInput } from '@/components/molecules/tags-input';


export type SlideForm = {
  id: number;
  image: ImageFile;
  caption: string;
  duration: number;
}


export interface StoryFormState {
  cover_image: ImageFile;
  title: string;
  category: Category | undefined;
  region: Region | undefined;
  slides: SlideForm[];
  tags: string[];
}

interface StoryFormProps {
  formData: StoryFormState;
  handleChange: (field: string, value: any) => void;
}

const defaultSlide: SlideForm = {
  id: 1,
  image: PREVIEW_STORY_IMAGE,
  caption: '',
  duration: 5,
};

const StoryForm = ({ formData, handleChange }: StoryFormProps) => {
  function addSlide() {
    const maxId = formData.slides.reduce((acc, slide) => Math.max(acc, slide.id), 0);

    const newSlide: SlideForm = {
      ...defaultSlide,
      id: maxId + 1,
    };
    const newFormData = {
      ...formData,
      slides: [...formData.slides, newSlide],
    };
    handleChange('slides', newFormData.slides);
  }

  function removeSlide(id: number) {
    const newFormData = {
      ...formData,
      slides: formData.slides.filter((slide) => slide.id !== id),
    };
    handleChange('slides', newFormData.slides);
  }

  function updateSlide(id: number, field: string, value: any) {
    const slide = formData.slides.find((slide) => slide.id === id);
    if (!slide) return;
    const newSlide = {
      ...slide,
      [field]: value,
    };
    const newFormData = {
      ...formData,
      slides: formData.slides.map((slide) => (slide.id === id ? newSlide : slide)),
    };
    handleChange('slides', newFormData.slides);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Story Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid lg:grid-cols-8 gap-4">
            <div className="col-span-3">
              <ImagePicker
                value={formData.cover_image}
                onChange={(file) => handleChange('cover_image', file)}
                placeholderSrc="/images/story_placeholder.png"
                ariaLabel={`Upload image for cover Image`}
                className="w-full"
                aspectRatio="9/16"
              />
            </div>
            <div className="col-span-5 space-y-8">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter story title"
                />
              </div>

              <div className="space-y-2 pb-8">
                <Label htmlFor="tags">Tags</Label>
                <TagsInput
                  id="tags"
                  value={formData.tags}
                  onChange={(tags) => handleChange('tags', tags)}
                  placeholder="Type a tag and press Enter"
                />
                <p className="text-muted-foreground text-xs">
                  Add keywords to help people find your post.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Category).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region *</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => handleChange('region', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Region).map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Slides */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between">
            <div>
              <CardTitle>Story Slides</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                Add photos and captions for your story. Each slide will be displayed in 9:16 aspect
                ratio.
              </p>
            </div>
            <Button className="mt-2 sm:mt-0" onClick={addSlide}>
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
                    <h4 className="text-lg font-semibold">Slide {slide.id}</h4>
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
                        placeholderSrc="/images/story_placeholder.png"
                        ariaLabel={`Upload image for slide ${index + 1}`}
                        className="w-full"
                        aspectRatio="9/16"
                      />
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
                          value={slide.duration}
                          onChange={(e) =>
                            updateSlide(slide.id, 'duration', parseInt(e.target.value) || 5)
                          }
                        />
                        <p className="text-muted-foreground text-sm">
                          How long this slide will be displayed (1-30 seconds)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Caption *
                          <span
                            className={`ml-2 text-xs ${slide.caption.length > 100 ? 'text-red-500' : 'text-muted-foreground'}`}
                          >
                            ({slide.caption.length}/100)
                          </span>
                        </Label>
                        <Textarea
                          value={slide.caption}
                          onChange={(e) => updateSlide(slide.id, 'caption', e.target.value)}
                          placeholder="Enter a compelling caption for this slide (max 100 characters)..."
                          rows={8}
                          maxLength={100}
                        />
                        <p className="text-muted-foreground text-sm">
                          Write an engaging caption that complements the image. Maximum 100
                          characters.
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
              {formData.slides.length} / {MAX_SLIDES} slide{formData.slides.length !== 1 ? 's' : ''} added
            </p>
            {formData.slides.length > 0 && (
              <Button onClick={addSlide} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Another Slide
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StoryForm;
