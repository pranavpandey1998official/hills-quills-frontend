"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { StoriesGrid } from "./components/StoriesGrid"
import { fetchAllStories, updateStoryStatus, deleteStory } from "@/services/story"
import { Story } from "@/redux/slices/storiesSlice"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type StoryStatus = "draft" | "pending" | "published" | "rejected"

export default function StoriesPage() {
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Fetch stories on component mount
  useEffect(() => {
    loadStories()
  }, [])

  // Apply filters whenever stories or filter states change
  useEffect(() => {
    applyFilters()
  }, [stories, searchTerm, statusFilter, categoryFilter])

  const loadStories = async () => {
    try {
      setIsLoading(true)
      const data = await fetchAllStories(1000, 1) // Fetch all stories
      setStories(data)
    } catch (error) {
      console.error("Failed to fetch stories:", error)
      toast.error("Failed to load stories")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = stories

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(story => story.status === statusFilter)
    }

    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter(story => story.category === categoryFilter)
    }

    setFilteredStories(filtered)
  }

  const handleStatusChange = async (storyId: string, newStatus: StoryStatus, rejectionReason?: string) => {
    try {
      const updatedStory = await updateStoryStatus(storyId, newStatus, rejectionReason)
      
      // Update the story in both arrays
      setStories(prev => prev.map(story => 
        story.id === storyId ? updatedStory : story
      ))
      
      toast.success(`Story status updated to ${newStatus}`)
    } catch (error) {
      console.error("Failed to update story status:", error)
      toast.error("Failed to update story status")
    }
  }

  const handleEdit = (storyId: string) => {
    router.push(`/admin/stories/update/${storyId}`)
  }

  const handleDelete = async (storyId: string) => {
    try {
      await deleteStory(storyId)
      setStories(prev => prev.filter(story => story.id !== storyId))
      toast.success("Story deleted successfully")
    } catch (error) {
      console.error("Failed to delete story:", error)
      toast.error("Failed to delete story")
    }
  }

  const handleUpdate = (updatedStory: Story) => {
    setStories(prev => prev.map(story => 
      story.id === updatedStory.id ? updatedStory : story
    ))
  }

  const handleCreateNew = () => {
    router.push("/admin/stories/create")
  }

  // Get unique values for filter dropdowns
  const uniqueCategories = [...new Set(stories.map(story => story.category))]

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Stories Management</h1>
            <p className="text-muted-foreground">
              Manage and review all web stories. Total: {filteredStories.length} stories
            </p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Story
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            Filters
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stories Grid */}
        <StoriesGrid
          stories={filteredStories}
          isLoading={isLoading}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
  )
}
