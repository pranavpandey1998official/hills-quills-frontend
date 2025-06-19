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
import { X, Plus, Save, Send } from "lucide-react"
import { 
  createAuthorArticle, 
  updateAuthorArticle, 
  submitForReview, 
  resubmitArticle 
} from "@/redux/slices/articlesSlice"
import { UTTARAKHAND_REGIONS, ARTICLE_CATEGORIES } from "@/types/articles"
import type { AppDispatch } from "@/redux/store"
import { toast } from "sonner"

interface ArticleFormProps {
  mode: "create" | "edit"
  initialData?: any
}

export function ArticleForm({ mode, initialData }: ArticleFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    region: "",
    image: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        content: initialData.content || "",
        category: initialData.category || "",
        region: initialData.region || "",
        image: initialData.image || "",
        tags: initialData.tags || [],
      })
    }
  }, [mode, initialData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.region) {
      newErrors.region = "Region is required"
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required"
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required"
    }

    if (formData.tags.length > 10) {
      newErrors.tags = "Maximum 10 tags allowed"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (mode === "edit" && initialData?.status === "approved") {
      toast.error("Cannot edit approved articles")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (mode === "create") {
        // Create new article as draft
        const articleData = {
          title: formData.title,
          description: formData.description,
          content: formData.content,
          category: formData.category,
          region: formData.region,
          tags: formData.tags,
          image: formData.image,
        }
        
        await dispatch(createAuthorArticle(articleData)).unwrap()
        toast.success("Article saved as draft")
      } else {
        // Update existing article
        const updateData = {
          id: initialData.id,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          category: formData.category,
          region: formData.region,
          tags: formData.tags,
          image: formData.image,
        }
        
        await dispatch(updateAuthorArticle(updateData)).unwrap()
        toast.success("Article updated successfully")
      }
      
      window.location.href = "/author/dashboard"
    } catch (error) {
      toast.error("Failed to save article")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    if (mode === "edit" && initialData?.status === "approved") {
      toast.error("Cannot edit approved articles")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (mode === "create") {
        // Create new article first
        const articleData = {
          title: formData.title,
          description: formData.description,
          content: formData.content,
          category: formData.category,
          region: formData.region,
          tags: formData.tags,
          image: formData.image,
        }
        
        const createdArticle = await dispatch(createAuthorArticle(articleData)).unwrap()
        
        // Then submit for review
        await dispatch(submitForReview(createdArticle.id)).unwrap()
        toast.success("Article created and submitted for review")
      } else {
        // Update existing article first
        const updateData = {
          id: initialData.id,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          category: formData.category,
          region: formData.region,
          tags: formData.tags,
          image: formData.image,
        }
        
        await dispatch(updateAuthorArticle(updateData)).unwrap()
        
        // Then submit for review
        await dispatch(submitForReview(initialData.id)).unwrap()
        toast.success("Article updated and submitted for review")
      }
      
      window.location.href = "/author/dashboard"
    } catch (error) {
      toast.error("Failed to submit article")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Update the article first
      const updateData = {
        id: initialData.id,
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        region: formData.region,
        tags: formData.tags,
        image: formData.image,
      }
      
      await dispatch(updateAuthorArticle(updateData)).unwrap()
      
      // Then resubmit for review
      await dispatch(resubmitArticle(initialData.id)).unwrap()
      toast.success("Article updated and resubmitted for review")
      
      window.location.href = "/author/dashboard"
    } catch (error) {
      toast.error("Failed to resubmit article")
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

  // Determine if article is approved
  const isApproved = mode === "edit" && initialData?.status === "approved"
  
  // Determine if article is rejected
  const isRejected = mode === "edit" && initialData?.status === "rejected"
  
  // Determine if article is draft
  const isDraft = mode === "edit" && initialData?.status === "draft"

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Article Information</CardTitle>
        </CardHeader>
        {isRejected && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 mx-6">
            <p className="text-sm text-red-800">
              <strong>Article was rejected. Rejection reason:</strong> {initialData.rejection_reason}
            </p>
          </div>
        )}

        {isApproved && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 mx-6">
            <p className="text-sm text-green-800">
              <strong>This article is published.</strong> You can view it but cannot make changes.
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
              placeholder="Enter article title"
              className={errors.title ? "border-red-500" : ""}
              disabled={isApproved}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Brief description of your article"
              rows={3}
              className={errors.description ? "border-red-500" : ""}
              disabled={isApproved}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleChange("category", value)}
                disabled={isApproved}
              >
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
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
                onValueChange={(value) => handleChange("region", value)}
                disabled={isApproved}
              >
                <SelectTrigger className={errors.region ? "border-red-500" : ""}>
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

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image URL *</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={errors.image ? "border-red-500" : ""}
              disabled={isApproved}
            />
            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Write your article content here..."
              rows={12}
              className={errors.content ? "border-red-500" : ""}
              disabled={isApproved}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
            <p className="text-sm text-muted-foreground">
              Write detailed content about your topic. Include relevant information that will be valuable to readers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags *</CardTitle>
          <p className="text-sm text-muted-foreground">Add relevant tags to help readers discover your content</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isApproved && (
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag (2-30 characters)"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className={errors.tags && formData.tags.length === 0 ? "border-red-500" : ""}
              />
              <Button type="button" onClick={addTag} disabled={formData.tags.length >= 10}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                {!isApproved && (
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {formData.tags.length}/10 tags used. At least one tag is required.
          </p>
          {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => (window.location.href = "/author/dashboard")}>
          Cancel
        </Button>

        {isApproved ? (
          <Button type="button" disabled>
            Cannot Edit Published Article
          </Button>
        ) : (
          <>
            {/* Save Draft Button - Show for create mode and draft articles */}
            {(mode === "create" || isDraft) && (
              <Button type="button" variant="outline" onClick={handleSave} disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            )}

            {/* Submit/Resubmit Button */}
            {isRejected ? (
              <Button type="button" onClick={handleResubmit} disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                Resubmit for Review
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {mode === "create" ? "Submit for Review" : "Update & Submit"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}