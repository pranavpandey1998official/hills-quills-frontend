"use client"

import { useState, useEffect } from "react"
import { Search, X, Filter, ChevronDown } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
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
  SheetClose,
} from "@/components/ui/sheet"
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

interface InlineSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InlineSearch({ isOpen, onClose }: InlineSearchProps) {
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
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [popularTags, setPopularTags] = useState(["tourism", "uttarakhand", "travel", "nature", "adventure", "temple"])
  
  // Load initial state from Redux if available
  useEffect(() => {
    if (currentQuery) {
      setSearchQuery(currentQuery)
    }
    
    if (currentFilters) {
      setSelectedCategory(currentFilters.category || "all")
      setSelectedRegion(currentFilters.region || "all")
      setSelectedTags(currentFilters.tags?.split(",") || [])
    }
  }, [currentQuery, currentFilters])
  
  const handleSearch = () => {
    if (searchQuery.trim().length < 2) return
    
    // Build filter params
    const params = {
      query: searchQuery,
      page: 1,
      limit: 10
    } as any
    
    // Only add category/region if not set to "all"
    if (selectedCategory && selectedCategory !== "all") params.category = selectedCategory
    if (selectedRegion && selectedRegion !== "all") params.region = selectedRegion
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
    setSelectedCategory("all")
    setSelectedRegion("all")
    setSelectedTags([])
  }
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center">
      <div className="bg-white mt-16 max-w-3xl w-full mx-4 rounded-t-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Search Articles</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search input */}
          <div className="flex w-full items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
            <Button onClick={handleSearch} disabled={searchQuery.trim().length < 2}>
              Search
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="Region..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Tags</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Choose Tags</SheetTitle>
                  <SheetDescription>
                    Select tags to filter your search results
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <Label className="text-sm text-gray-700">Popular Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
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
                
                <div className="flex justify-end gap-2 mt-6">
                  <SheetClose asChild>
                    <Button variant="outline" size="sm">Cancel</Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button size="sm" onClick={handleSearch}>Apply</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            
            {(selectedCategory !== "all" || selectedRegion !== "all" || selectedTags.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearSearch}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear
              </Button>
            )}
            
            <Button onClick={handleSearch} variant="default" size="sm" className="ml-auto">
              Apply Filters
            </Button>
          </div>
        </div>
        
        {/* Active filters */}
        {(selectedCategory !== "all" || selectedRegion !== "all" || selectedTags.length > 0) && (
          <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-medium text-gray-700">Active filters:</span>
            
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("all")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {selectedRegion !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                Region: {selectedRegion}
                <button onClick={() => setSelectedRegion("all")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs">
                #{tag}
                <button onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        {/* Search results */}
        <div className="p-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              
              {pagination?.hasNext && (
                <div className="flex justify-center mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const params = {
                        query: searchQuery,
                        page: (pagination?.page || 1) + 1,
                        limit: pagination?.limit || 10
                      } as any;
                      
                      if (selectedCategory !== "all") params.category = selectedCategory;
                      if (selectedRegion !== "all") params.region = selectedRegion;
                      if (selectedTags.length > 0) params.tags = selectedTags.join(",");
                      
                      dispatch(fetchSearchArticles(params));
                    }}
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
    </div>
  )
}
