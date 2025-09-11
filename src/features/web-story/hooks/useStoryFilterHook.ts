import { useDeepCompareMemo } from 'use-deep-compare'
import { useState } from 'react'
import { Story } from '@/features/web-story/types'

export const useStoryFilterHook = (stories: Story[], ) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [regionFilter, setRegionFilter] = useState<string>("all")
    const filteredStories = useDeepCompareMemo(() => {
        let filtered = stories
    
        // Apply search filter
        if (searchTerm) {
          filtered = filtered.filter(story =>
            story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.region.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
    
        // Apply status filter
        if (statusFilter && statusFilter !== "all") {
          filtered = filtered.filter(article => article.status === statusFilter)
        }
    
        // Apply category filter
        if (categoryFilter && categoryFilter !== "all") {
          filtered = filtered.filter(article => article.category === categoryFilter)
        }
    
        // Apply region filter
        if (regionFilter && regionFilter !== "all") {
          filtered = filtered.filter(article => article.region === regionFilter)
        }
    
        return filtered
      }, [stories, searchTerm, statusFilter, categoryFilter, regionFilter])
  
    return { filteredStories, searchTerm, statusFilter, categoryFilter, regionFilter, setSearchTerm, setStatusFilter, setCategoryFilter, setRegionFilter }
  }