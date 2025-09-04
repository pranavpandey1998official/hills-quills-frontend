"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Story } from "@/redux/slices/storiesSlice"
import { updateStory } from "@/services/story"
import { RotateCcw, Save, X, Plus, Trash2 } from "lucide-react"

interface UpdateStoryDialogProps {
  open: boolean
  story?: Story
  onUpdate: (updatedStory: Story) => void
  onCancel: () => void
}

const categories = [
  "Technology",
  "Lifestyle", 
  "Travel",
  "Food",
  "Fashion",
  "Health",
  "Entertainment",
  "Sports",
  "Business",
]

interface StorySlide {
  id: string
  image: string
  title: string
  description: string
  duration: number
}

export function UpdateStoryDialog({
  open,
  story,
  onUpdate,
  onCancel,
}: UpdateStoryDialogProps) {
  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [slides, setSlides] = useState<StorySlide[]>([])
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Store original data for reset functionality
  const [originalData, setOriginalData] = useState<{
    title: string
    description: string
    category: string
    tags: string[]
    slides: StorySlide[]
  } | null>(null)

  // Initialize form with story data when dialog opens
  useEffect(() => {
    if (open && story) {
      const data = {
        title: story.title,
        description: story.description,
        category: story.category,
        tags: [...story.tags],
        slides: [...story.slides],
      }

      setTitle(data.title)
      setDescription(data.description)
      setCategory(data.category)
      setTags(data.tags)
      setSlides(data.slides)
      setOriginalData(data)
    }
  }, [open, story])

  const handleReset = () => {
    if (originalData) {
      setTitle(originalData.title)
      setDescription(originalData.description)
      setCategory(originalData.category)
      setTags([...originalData.tags])
      setSlides([...originalData.slides])
      toast.success("Form reset to original values")
    }
  }

  const handleUpdate = async () => {
    if (!story) return

    // Validation
    if (!title.trim()) {
      toast.error("Title is required")
      return
    }
    if (!category) {
      toast.error("Category is required")
      return
    }
    if (slides.length === 0) {
      toast.error("At least one slide is required")
      return
    }

    setIsSubmitting(true)

    try {
      const updates = {
        title: title.trim(),
        description: description.trim(),
        category,
        tags,
        slides,
      }

      const updatedStory = await updateStory(story.id, updates)
      onUpdate(updatedStory)
      toast.success("Story updated successfully")
    } catch (error) {
      console.error("Failed to update story:", error)
      toast.error("Failed to update story")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    // Reset form when canceling
    if (originalData) {
      setTitle(originalData.title)
      setDescription(originalData.description)
      setCategory(originalData.category)
      setTags([...originalData.tags])
      setSlides([...originalData.slides])
    }
    setNewTag("")
    onCancel()
  }

  const hasChanges = () => {
    if (!originalData) return false
    
    return (
      title !== originalData.title ||
      description !== originalData.description ||
      category !== originalData.category ||
      JSON.stringify(tags) !== JSON.stringify(originalData.tags) ||
      JSON.stringify(slides) !== JSON.stringify(originalData.slides)
    )
  }

  // Tag management
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      if (newTag.length >= 2 && newTag.length <= 30) {
        setTags([...tags, newTag.trim()])
        setNewTag("")
      } else {
        toast.error("Tags must be between 2-30 characters")
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  // Slide management
  const addSlide = () => {
    if (slides.length < 30) {
      const newSlide: StorySlide = {
        id: Date.now().toString(),
        image: "",
        title: "",
        description: "",
        duration: 5,
      }
      setSlides([...slides, newSlide])
    }
  }

  const updateSlide = (slideId: string, field: string, value: string | number) => {
    setSlides(slides.map((slide) => 
      slide.id === slideId ? { ...slide, [field]: value } : slide
    ))
  }

  const removeSlide = (slideId: string) => {
    setSlides(slides.filter((slide) => slide.id !== slideId))
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Update Story
          </DialogTitle>
          <DialogDescription>
            Make changes to the story content and metadata. You can reset to original values at any time.
          </DialogDescription>
        </DialogHeader>

        {story && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Story ID:</span> {story.id}</p>
              <p><span className="font-medium">Current Status:</span> <span className="capitalize">{story.status}</span></p>
              <p><span className="font-medium">Views:</span> {story.views.toLocaleString()}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(story.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter story title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of your story"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag (2-30 characters)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} disabled={tags.length >= 10}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  {tags.length}/10 tags used.
                </p>
              </CardContent>
            </Card>

            {/* Slides */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Story Slides</CardTitle>
                  <Button onClick={addSlide} disabled={slides.length >= 30} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slide
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {slides.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-muted-foreground">No slides added yet</p>
                    <Button onClick={addSlide} className="mt-2">
                      Add Your First Slide
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {slides.map((slide, index) => (
                      <div key={slide.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Slide {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSlide(slide.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Image URL *</Label>
                            <Input
                              value={slide.image}
                              onChange={(e) => updateSlide(slide.id, "image", e.target.value)}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Duration (seconds)</Label>
                            <Input
                              type="number"
                              min="3"
                              max="15"
                              value={slide.duration}
                              onChange={(e) => updateSlide(slide.id, "duration", Number.parseInt(e.target.value) || 5)}
                            />
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Label>Slide Title</Label>
                          <Input
                            value={slide.title}
                            onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                            placeholder="Enter slide title"
                          />
                        </div>

                        <div className="mt-4 space-y-2">
                          <Label>Slide Description</Label>
                          <Textarea
                            value={slide.description}
                            onChange={(e) => updateSlide(slide.id, "description", e.target.value)}
                            placeholder="Enter slide description"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-muted-foreground">
                  {slides.length}/30 slides used.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={isSubmitting || !hasChanges()}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>

          <Button
            onClick={handleUpdate}
            disabled={isSubmitting || !hasChanges()}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Update Story
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
