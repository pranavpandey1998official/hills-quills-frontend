"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { StoriesTable } from "../../../features/web-story/component/stories-table"
import { useStories } from "@/features/web-story/hooks"
import { useRouter } from "next/navigation"
import { useStoryFilterHook, } from "@/features/web-story/hooks/useStoryFilterHook"
import Filter from "../../../components/molecules/filter"


export default function StoriesPage() {
  const router = useRouter()
  const { stories, error, isLoading } = useStories()
  const { filteredStories, searchTerm, statusFilter, categoryFilter, regionFilter, setSearchTerm, setStatusFilter, setCategoryFilter, setRegionFilter } = useStoryFilterHook(stories)


  const handleCreateNew = () => {
    router.push("/admin/stories/create")
  }


  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Stories Management</h1>
            <p className="text-muted-foreground">
              Manage and review all web stories.
            </p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Story
          </Button>
        </div>

        {/* Filters */}
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
        />

        {/* Stories Table */}
        <StoriesTable
          stories={filteredStories}
          isLoading={isLoading}
        />
      </div>
  )
}
