"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react"
import { fetchMyStories } from "@/redux/slices/storiesSlice"
import type { AppDispatch } from "@/redux/store"

export function AuthorStoriesFilters() {
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleSearch = () => {
    dispatch(
      fetchMyStories({
        page: 1,
        limit: 10,
        status: statusFilter,
        category: categoryFilter,
        search: searchTerm,
      }),
    )
  }

  const handleReset = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setCategoryFilter("all")
    dispatch(fetchMyStories({ page: 1, limit: 10, status: "all" }))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search web stories by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="health">Health</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Actions */}
        <div className="flex gap-2">
          <Button onClick={handleSearch} size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Apply
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            Reset
          </Button>
        </div>
      </div>

      {/* Create Story Button */}
      <Button asChild>
        <a href="/author/create-story">
          <Plus className="h-4 w-4 mr-2" />
          Create Web Story
        </a>
      </Button>
    </div>
  )
}
