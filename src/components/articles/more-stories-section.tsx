"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AdBanner } from "@/components/articles/ad-banner"
import { fetchPublicArticles, fetchArticleById } from "@/redux/slices/PublicArticleSlice"
import { RootState, AppDispatch } from "@/redux/store"
import { Article } from "@/types/articles"

interface MoreStoriesSectionProps {
  title?: string
  showAdBanners?: boolean
  excludeIds?: (string | number)[] // IDs to exclude to avoid duplicates
}

export function MoreStoriesSection({ 
  title = "More Stories", 
  showAdBanners = true,
  excludeIds = []
}: MoreStoriesSectionProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [displayedStories, setDisplayedStories] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [usedIds, setUsedIds] = useState<Set<string | number>>(new Set(excludeIds))
  const [hasRestarted, setHasRestarted] = useState(false)

  // Get data from Redux store
  const { items: publicArticles, isLoading } = useSelector(
    (state: RootState) => state.publicArticles.articles
  )

  // Filter out articles that are already displayed elsewhere
  const availableArticles = useMemo(() => {
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []
    return publicArray.filter((article: Article) => 
      !usedIds.has(article.id)
    )
  }, [publicArticles, usedIds])

  useEffect(() => {
    // Initial fetch
    dispatch(fetchPublicArticles({ limit: 20, page: 1 }) as any)
  }, [dispatch])

  // Memoize the restart function to prevent unnecessary re-renders
  const restartFromBeginning = useCallback(() => {
    // Reset and start from the beginning, but keep initially excluded IDs
    setUsedIds(new Set(excludeIds))
    setCurrentPage(1)
    setHasRestarted(true)
    
    // Get fresh articles from the beginning
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []
    const freshArticles = publicArray.filter((article: Article) => 
      !excludeIds.includes(article.id)
    )
    
    if (freshArticles.length >= 6) {
      const nextStories = freshArticles.slice(0, 6)
      setDisplayedStories(prev => [...prev, ...nextStories])
      setUsedIds(prev => {
        const newSet = new Set(prev)
        nextStories.forEach(story => newSet.add(story.id))
        return newSet
      })
    }
  }, [excludeIds, publicArticles])

  // Memoize loadMoreStories to prevent infinite re-renders in scroll useEffect
  const loadMoreStories = useCallback(async () => {
    if (loading) return

    setLoading(true)

    try {
      // Check if we have available articles
      const availableArray = Array.isArray(availableArticles) ? availableArticles : []
      const unusedArticles = availableArray.filter(article => 
        !usedIds.has(article.id)
      )

      if (unusedArticles.length >= 6) {
        // We have enough unused articles
        const nextStories = unusedArticles.slice(0, 6)
        setDisplayedStories(prev => [...prev, ...nextStories])
        setUsedIds(prev => {
          const newSet = new Set(prev)
          nextStories.forEach(story => newSet.add(story.id))
          return newSet
        })
      } else {
        // We need to fetch more articles or restart
        if (!hasRestarted && unusedArticles.length < 6) {
          // Try fetching next page
          const nextPage = currentPage + 1
          await dispatch(fetchPublicArticles({ limit: 20, page: nextPage }) as any)
          setCurrentPage(nextPage)
          
          // Wait a bit for Redux to update, then try again
          setTimeout(() => {
            const newAvailableArray = Array.isArray(availableArticles) ? availableArticles : []
            const newUnusedArticles = newAvailableArray.filter(article => 
              !usedIds.has(article.id)
            )
            
            if (newUnusedArticles.length >= 6) {
              const nextStories = newUnusedArticles.slice(0, 6)
              setDisplayedStories(prev => [...prev, ...nextStories])
              setUsedIds(prev => {
                const newSet = new Set(prev)
                nextStories.forEach(story => newSet.add(story.id))
                return newSet
              })
            } else if (!hasRestarted) {
              // Restart from beginning if we've exhausted available articles
              restartFromBeginning()
            }
          }, 500)
        } else {
          // Restart from beginning
          restartFromBeginning()
        }
      }
    } catch (error) {
      console.error('Error loading more stories:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, availableArticles, usedIds, hasRestarted, currentPage, dispatch, restartFromBeginning])

  useEffect(() => {
    // Initialize with first batch when articles are loaded
    if (availableArticles.length > 0 && displayedStories.length === 0) {
      const initialStories = availableArticles.slice(0, 6)
      setDisplayedStories(initialStories)
      setUsedIds(prev => {
        const newSet = new Set(prev)
        initialStories.forEach(story => newSet.add(story.id))
        return newSet
      })
    }
  }, [availableArticles, displayedStories.length])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMoreStories()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMoreStories])

  // Handle article click navigation
  const handleArticleClick = (article: Article) => {
    dispatch(fetchArticleById(article.id))
    router.push(`/articles/${article.id}`)
  }

  // Split stories into groups of 6 for ad placement
  const storyGroups = []
  for (let i = 0; i < displayedStories.length; i += 6) {
    storyGroups.push(displayedStories.slice(i, i + 6))
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-navy-600 pb-2 mb-8">
        <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-3"></span>
        {title}
      </h2>

      {storyGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {group.map((story: Article) => (
              <div key={story.id} className="group cursor-pointer" onClick={() => handleArticleClick(story)}>
                <div className="relative h-52 overflow-hidden rounded-lg mb-4">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Both region and category badges on image */}
                  <div className="absolute top-2 left-2 flex space-x-2">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {story.region}
                    </span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(story.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add banner after each group except the last one */}
          {showAdBanners && groupIndex < storyGroups.length - 1 && <AdBanner />}
        </div>
      ))}

      {displayedStories.length === 0 && !loading && (
        <div className="text-center mt-8">
          <p className="text-gray-500">No stories available</p>
        </div>
      )}
    </section>
  )
}
