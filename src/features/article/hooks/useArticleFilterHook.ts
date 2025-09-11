import { useDeepCompareMemo } from 'use-deep-compare'
import { useState } from 'react'
import { Article } from '@/features/article/types'

export const useArticleFilterHook = (articles: Article[]) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [regionFilter, setRegionFilter] = useState<string>("all")
    const filteredArticles = useDeepCompareMemo(() => {
        let filtered = articles
    
        // Apply search filter
        if (searchTerm) {
          filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.region.toLowerCase().includes(searchTerm.toLowerCase())
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
      }, [articles, searchTerm, statusFilter, categoryFilter, regionFilter])

    return { filteredArticles, searchTerm, statusFilter, categoryFilter, regionFilter, setSearchTerm, setStatusFilter, setCategoryFilter, setRegionFilter }

}