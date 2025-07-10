"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AdBanner } from "@/components/articles/ad-banner"
import { ArticleCard } from "@/components/articles/article-card"
import { fetchPublicArticles } from "@/redux/slices/PublicArticleSlice"
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
              <ArticleCard
                key={story.id}
                article={story}
                showDescription={false}
                imageHeight="h-52"
                showBadgesOnHover={false}
                showRegionBadge={true}
                showCategoryBadge={true}
                showReadMoreBadge={false}
                enableComplexHoverEffects={false}
              />
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
