"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { fetchTrendingTags } from "@/redux/slices/PublicArticleSlice"
import { RootState, AppDispatch } from "@/redux/store"

export function TrendingTags() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: trendingTags, isLoading } = useSelector(
    (state: RootState) => state.publicArticles.trendingTags
  )
  const [showComingSoon, setShowComingSoon] = useState(false)

  // Fetch trending tags on component mount
  useEffect(() => {
    dispatch(fetchTrendingTags('week'))
  }, [dispatch])

  const handleTagClick = (tag: string) => {
    // Show coming soon message for now
    setShowComingSoon(true)
    setTimeout(() => setShowComingSoon(false), 2000)
  }

  // Fallback tags if API doesn't return any
  const fallbackTags = [
    "Hill Farming",
    "Char Dham Yatra", 
    "Dehradun Development",
    "Tourism Revival",
    "Mountain Wildlife",
    "Sustainable Development",
    "Uttarakhand Elections",
    "Culture Heritage"
  ]

  const displayTags = trendingTags.length > 0 ? trendingTags : fallbackTags

  return (
    <div className="bg-gray-50 border-b border-gray-200 overflow-hidden relative">
      {/* Coming Soon Notification */}
      {showComingSoon && (
        <div className="absolute top-2 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium z-20 shadow-lg">
          Coming Soon!
        </div>
      )}
      
      <div className="relative py-3">
        {/* Trending Label with Arrow - Positioned more to the left, completely square */}
        <div className="absolute left-0 sm:left-1 lg:left-0 top-1/2 transform -translate-y-1/2 z-20 flex items-center text-red-500 bg-gray-50 px-4 py-2 shadow-md">
          <TrendingUp className="h-10 w-4 mr-1" />
          <span className="text-sm font-large">Trending:</span>
        </div>
        
        {/* Full Width Scrolling Tags Container - Tags start from behind the trending label */}
        <div className="w-full overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of tags - starts from very beginning to go behind trending label */}
            <div className="flex items-center space-x-3 whitespace-nowrap ml-2">
              {displayTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  onClick={() => handleTagClick(tag)}
                  className="bg-gray-200 text-gray-700 hover:bg-orange-100 cursor-pointer px-3 py-1 text-sm font-normal transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center space-x-3 whitespace-nowrap ml-3">
              {displayTags.map((tag, index) => (
                <Badge
                  key={`duplicate-${index}`}
                  variant="secondary"
                  onClick={() => handleTagClick(tag)}
                  className="bg-gray-200 text-gray-700 hover:bg-orange-100 cursor-pointer px-3 py-1 text-sm font-normal transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
