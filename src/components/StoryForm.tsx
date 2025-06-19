"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Save, Send, Upload, Trash2 } from "lucide-react"
import { createStory, updateStory } from "@/redux/slices/storiesSlice"
import type { AppDispatch } from "@/redux/store"
import { toast } from "sonner"

interface StoryFormProps {
  mode: "create" | "edit"
  initialData?: any
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

export function StoryForm({ mode, initialData }: StoryFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tags: [] as string[],
    slides: [] as StorySlide[],
  })
  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        description: initialData.description || "",
        tags: initialData.tags || [],
        slides: initialData.slides || [],
      })
    }
  }, [mode, initialData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (formData.slides.length === 0) {
      newErrors.slides = "At least one slide is required"
    }

    if (formData.slides.length > 30) {
      newErrors.slides = "Maximum 30 slides allowed"
    }

    if (formData.tags.length > 10) {
      newErrors.tags = "Maximum 10 tags allowed"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (action: "save" | "submit") => {
    if (mode === "edit" && initialData?.status === "published") {
      toast.error("Cannot edit published web stories")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const storyData = {
        ...formData,
        status: (action === "save" ? "draft" : "pending") as "draft" | "pending" | "rejected" | "published"
      }

      if (mode === "create") {
        await dispatch(createStory(storyData)).unwrap()
        toast.success(action === "save" ? "Web story saved as draft" : "Web story submitted for review")
        window.location.href = "/author/dashboard"
      } else {
        await dispatch(updateStory({ id: initialData.id, data: storyData })).unwrap()
        const message =
          initialData.status === "rejected"
            ? "Web story updated and resubmitted for review"
            : "Web story updated successfully"
        toast.success(message)
        window.location.href = "/author/dashboard"
      }
    } catch (error) {
      toast.error("Failed to save web story")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim()) && formData.tags.length < 10) {
      if (newTag.length >= 2 && newTag.length <= 30) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
        setNewTag("")
      } else {
        toast.error("Tags must be between 2-30 characters")
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  const addSlide = () => {
    if (formData.slides.length < 30) {
      const newSlide: StorySlide = {
        id: Date.now().toString(),
        image: "",
        title: "",
        description: "",
        duration: 5,
      }
      setFormData((prev) => ({ ...prev, slides: [...prev.slides, newSlide] }))
    }
  }

  const updateSlide = (slideId: string, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      slides: prev.slides.map((slide) => (slide.id === slideId ? { ...slide, [field]: value } : slide)),
    }))
  }

  const removeSlide = (slideId: string) => {
    setFormData((prev) => ({
      ...prev,
      slides: prev.slides.filter((slide) => slide.id !== slideId),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        {mode === "edit" && initialData?.status === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-sm text-red-800">
              <strong>Web story was rejected.</strong> Please review the feedback, make necessary changes, and resubmit
              for review.
            </p>
          </div>
        )}

        {mode === "edit" && initialData?.status === "published" && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
            <p className="text-sm text-green-800">
              <strong>This web story is published.</strong> You can view it but cannot make changes.
            </p>
          </div>
        )}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter web story title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Brief description of your web story"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Story Slides */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Story Slides</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Add up to 30 slides to create your web story</p>
            </div>
            <Button onClick={addSlide} disabled={formData.slides.length >= 30}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.slides.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No slides added yet</p>
              <Button onClick={addSlide} className="mt-2">
                Add Your First Slide
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.slides.map((slide, index) => (
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
            {formData.slides.length}/30 slides used. Each slide should have an image and can include text overlay.
          </p>
          {errors.slides && <p className="text-sm text-red-500">{errors.slides}</p>}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag (2-30 characters)"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            />
            <Button type="button" onClick={addTag} disabled={formData.tags.length >= 10}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {formData.tags.length}/10 tags used. Tags help readers discover your web stories.
          </p>
          {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => (window.location.href = "/author/dashboard")}>
          Cancel
        </Button>

        {mode === "edit" && initialData?.status === "published" ? (
          <Button type="button" disabled>
            Cannot Edit Published Story
          </Button>
        ) : (
          <>
            {(mode === "create" || initialData?.status !== "rejected") && (
              <Button type="button" variant="outline" onClick={() => handleSubmit("save")} disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            )}
            <Button type="button" onClick={() => handleSubmit("submit")} disabled={isSubmitting}>
              <Send className="h-4 w-4 mr-2" />
              {mode === "create"
                ? "Submit for Review"
                : initialData?.status === "rejected"
                  ? "Resubmit for Review"
                  : "Update & Submit"}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
