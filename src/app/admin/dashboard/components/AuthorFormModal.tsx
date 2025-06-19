"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchAuthorsByAdmin, toggleAuthorStatus, createAuthorByAdmin, updateAuthorByAdmin } from "@/redux/slices/authorsSlice"
import type { AppDispatch } from "@/redux/store"
import { toast } from "sonner"

interface AuthorFormModalProps {
  open: boolean
  onClose: () => void
  author?: any
}

export function AuthorFormModal({ open, onClose, author }: AuthorFormModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    bio: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || "",
        email: author.email || "",
        profession: author.profession || "",
        bio: author.bio || "",
        avatar: author.avatar || "",
        password: "",
        confirmPassword: "",
      })
    } else {
      setFormData({
        name: "",
        email: "",
        profession: "",
        bio: "",
        avatar: "",
        password: "",
        confirmPassword: "",
      })
    }
    setErrors({})
  }, [author, open])

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

    if (!author && !formData.password) {
      newErrors.password = "Password is required"
    }

    if (!author && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const submitData = {
      name: formData.name,
      email: formData.email,
      profession: formData.profession,
      bio: formData.bio,
      avatar: formData.avatar,
      ...(formData.password && { password: formData.password }),
    }

    if (author) {
      dispatch(updateAuthorByAdmin({ id: author.id, data: submitData }))
      toast.success("Author updated successfully")
    } else {
      dispatch(createAuthorByAdmin(submitData))
      toast.success("Author created successfully")
    }

    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{author ? "Edit Author" : "Add New Author"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
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
            <Select value={formData.profession} onValueChange={(value) => handleChange("profession", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="journalist">Journalist</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="blogger">Blogger</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={formData.bio} onChange={(e) => handleChange("bio", e.target.value)} rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Profile Photo URL</Label>
            <Input
              id="avatar"
              value={formData.avatar}
              onChange={(e) => handleChange("avatar", e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          {!author && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{author ? "Update Author" : "Create Author"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
