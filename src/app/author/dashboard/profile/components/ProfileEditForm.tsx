"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateAuthorMe } from "@/redux/slices/authorsSlice"
import type { AppDispatch } from "@/redux/store"
import { toast } from "sonner"
import { Author } from "@/types/author"

interface ProfileEditFormProps {
  profile: Author | null
  onSave: () => void
  onCancel: () => void  // Added this prop
}

export function ProfileEditForm({ profile, onSave, onCancel }: ProfileEditFormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    profession: profile?.profession || "",
    about: profile?.about || "",
    profile_photo_url: profile?.profile_photo_url || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showCustomProfession, setShowCustomProfession] = useState(
    profile?.profession && !["journalist", "blogger", "freelance-writer", "content-creator", "editor"].includes(profile.profession)
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    dispatch(updateAuthorMe(formData))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully")
        onSave() // Call onSave after successful update
      })
      .catch((error) => {
        toast.error(`Failed to update profile: ${error.message || "Unknown error"}`)
      })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleProfessionChange = (value: string) => {
    if (value === "other") {
      setShowCustomProfession(true)
      setFormData((prev) => ({ ...prev, profession: "" }))
    } else {
      setShowCustomProfession(false)
      handleChange("profession", value)
    }
  }

  const getCurrentProfessionValue = () => {
    if (showCustomProfession) {
      return "other"
    }
    return formData.profession
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">Profession</Label>
        <Select value={getCurrentProfessionValue()} onValueChange={handleProfessionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select profession" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="journalist">Journalist</SelectItem>
            <SelectItem value="blogger">Blogger</SelectItem>
            <SelectItem value="freelance-writer">Freelance Writer</SelectItem>
            <SelectItem value="content-creator">Content Creator</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        
        {showCustomProfession && (
          <Input
            placeholder="Enter your profession"
            value={formData.profession}
            onChange={(e) => handleChange("profession", e.target.value)}
            className="mt-2"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile_photo_url">Profile Image URL</Label>
        <Input
          id="profile_photo_url"
          value={formData.profile_photo_url}
          onChange={(e) => handleChange("profile_photo_url", e.target.value)}
          placeholder="https://example.com/your-photo.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          value={formData.about}
          onChange={(e) => handleChange("about", e.target.value)}
          rows={4}
          placeholder="Tell us about yourself, your experience, and what you write about..."
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}