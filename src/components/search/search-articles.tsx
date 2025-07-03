"use client"

import { useState, useEffect } from "react"
import { Search, X, Filter, ChevronDown } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { fetchSearchArticles } from "@/redux/slices/PublicArticleSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { ArticleCard } from "../articles/article-card"

// Categories and regions for filter options
const CATEGORIES = [
  "Culture & Heritage",
  "Adventure Tourism",
  "Religious Tourism",
  "Wildlife Tourism",
  "Hill Stations",
  "News",
  "Local Stories",
  "Events"
]

const REGIONS = [
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Uttarkashi",
  "Chamoli",
  "Garhwal",
  "Kumaon"
]

export function SearchArticles() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  // Get search state from Redux
  const { 
    items: searchResults, 
    isLoading: searchLoading, 
    error: searchError,
    pagination,
    query: currentQuery,
    filters: currentFilters
  } = useSelector((state: RootState) => state.publicArticles.search)
  
  // Local search state
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [popularTags, setPopularTags] = useState(["tourism", "uttarakhand", "travel", "nature", "adventure", "temple"])
  
  // Load initial state from Redux if available
  useEffect(() => {
    if (currentQuery) {
      setSearchQuery(currentQuery)
      setShowFilters(true)
    }
    
    if (currentFilters) {
      setSelectedCategory(currentFilters.category || "")
      setSelectedRegion(currentFilters.region || "")
      setSelectedTags(currentFilters.tags?.split(",") || [])
    }
  }, [currentQuery, currentFilters])
  
  const handleSearch = () => {
    if (searchQuery.trim().length < 2) return
    
    // Show filters after search is initiated
    setShowFilters(true)
    
    // Build filter params
    const params = {
      query: searchQuery,
      page: 1,
      limit: 10
    } as any
    
    if (selectedCategory) params.category = selectedCategory
    if (selectedRegion) params.region = selectedRegion
    if (selectedTags.length > 0) params.tags = selectedTags.join(",")
    
    dispatch(fetchSearchArticles(params))
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  const clearSearch = () => {
    setSearchQuery("")
    setShowFilters(false)
    setSelectedCategory("")
    setSelectedRegion("")
    setSelectedTags([])
  }
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }
  
  const applyFilters = () => {
    handleSearch()
  }
  
  const loadMoreResults = () => {
    if (!pagination?.hasNext) return
    
    const params = {
      query: searchQuery,
      page: (pagination?.page || 1) + 1,
      limit: pagination?.limit || 10
    } as any
    
    if (selectedCategory) params.category = selectedCategory
    if (selectedRegion) params.region = selectedRegion
    if (selectedTags.length > 0) params.tags = selectedTags.join(",")
    
    dispatch(fetchSearchArticles(params))
  }
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-2 mb-6">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-10 flex items-center px-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 flex items-center px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-r-md"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
        
        {showFilters && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                <Filter className="h-4 w-4" />
                Filters
                {(selectedCategory || selectedRegion || selectedTags.length > 0) && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {(selectedCategory ? 1 : 0) + (selectedRegion ? 1 : 0) + (selectedTags.length > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your search results with these filters.
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-4 flex flex-col gap-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Region Filter */}
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Regions</SelectItem>
                      {REGIONS.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Tags Filter */}
                <div className="space-y-2">
                  <Label>Popular Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => {
                    setSelectedCategory("")
                    setSelectedRegion("")
                    setSelectedTags([])
                  }}>
                    Clear All
                  </Button>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      {/* Active Filters Display */}
      {showFilters && (selectedCategory || selectedRegion || selectedTags.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {selectedRegion && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Region: {selectedRegion}
              <button onClick={() => setSelectedRegion("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              #{tag}
              <button onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          <button 
            onClick={() => {
              setSelectedCategory("")
              setSelectedRegion("")
              setSelectedTags([])
            }}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {/* Search results */}
      <div className="space-y-6">
        {searchLoading && searchQuery && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching...</p>
            </div>
          </div>
        )}
        
        {searchError && searchQuery && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">Error searching articles: {searchError}</p>
            <button
              onClick={handleSearch}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Try again
            </button>
          </div>
        )}
        
        {!searchLoading && searchResults.length === 0 && searchQuery && !searchError && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
            <p className="text-lg font-medium mb-2">No results found</p>
            <p className="text-gray-600">Try different keywords or adjust your filters</p>
          </div>
        )}
        
        {!searchLoading && searchResults.length > 0 && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Found {pagination?.total || searchResults.length} results for "{currentQuery}"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {pagination?.hasNext && (
              <div className="flex justify-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={loadMoreResults}
                  disabled={searchLoading}
                  className="flex items-center gap-2"
                >
                  {searchLoading ? (
                    <div className="h-4 w-4 border-b-2 border-orange-500 rounded-full animate-spin"></div>
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  Load more results
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
