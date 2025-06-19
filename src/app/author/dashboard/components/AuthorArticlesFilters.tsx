"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react"
import { fetchAuthorArticles } from "@/redux/slices/articlesSlice"
import { UTTARAKHAND_REGIONS, ARTICLE_CATEGORIES } from "@/types/articles"
import type { AppDispatch } from "@/redux/store"

export function AuthorArticlesFilters() {
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleSearch = () => {
    dispatch(
      fetchAuthorArticles({
        page: 1,
        limit: 10,
        status: statusFilter,
        region: regionFilter,
        category: categoryFilter,
        search: searchTerm,
      }),
    )
  }

  const handleReset = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setRegionFilter("all")
    setCategoryFilter("all")
    dispatch(fetchAuthorArticles({ page: 1, limit: 10}))
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles by title..."
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
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {ARTICLE_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Region Filter */}
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {UTTARAKHAND_REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
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

      {/* Create Article Button */}
      <Button asChild>
        <a href="/author/create-news">
          <Plus className="h-4 w-4 mr-2" />
          Create Article
        </a>
      </Button>
    </div>
  )
}
