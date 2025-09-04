"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TrendingTags } from "@/components/trending-tags"
import { FeaturedArticle } from "@/components/articles/featured-article"
import { TopStories } from "@/components/articles/top-stories"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicArticles, fetchTrendingArticles } from "@/redux/slices/PublicArticleSlice"
import { WebStories } from "@/components/web-stories/web-stories"
import { Footer } from "@/components/footer"
import { RootState, AppDispatch } from "@/redux/store"

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const [isLoading, setIsLoading] = useState(true) // Added loading state
  
  const { 
    articles: { items: articles, isLoading: articlesLoading, error: articlesError },
    trending: { items: trendingArticles, isLoading: trendingLoading, error: trendingError }
  } = useSelector((state: RootState) => state.publicArticles)
  
  const loading = articlesLoading || trendingLoading || isLoading
  const error = articlesError || trendingError

  useEffect(() => {
    // Guaranteed minimum loading time of 1.5 seconds to ensure skeleton displays
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    // Request more articles to ensure we have at least 5 for top stories
    dispatch(fetchPublicArticles({ limit: 10 }))
    dispatch(fetchTrendingArticles(5))
    
    return () => clearTimeout(timer) // Clean up timeout
  }, [dispatch])
  
  // Skeleton UI components
  const skeletonUI = (
    <div className="animate-pulse">
      {/* Trending tags skeleton */}
      <div className="bg-gray-100 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-8 rounded-full px-6 flex-shrink-0"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured article skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="bg-gray-200 h-[450px] md:h-[600px] w-full rounded-xl border border-gray-100"></div>
        <div className="mt-4 space-y-2">
          <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
          <div className="bg-gray-200 h-6 w-1/2 rounded"></div>
          <div className="flex gap-2">
            <div className="bg-gray-200 h-6 w-24 rounded"></div>
            <div className="bg-gray-200 h-6 w-24 rounded"></div>
          </div>
        </div>
      </div>

      {/* Top stories skeleton with navy blue underline styling */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="section-bullet bg-gray-300 h-6 w-6 rounded"></div>
          <div className="section-heading bg-gray-300 h-10 w-48 rounded relative">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-navy-blue rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-200 h-48 w-full"></div>
              <div className="p-4 space-y-2">
                <div className="bg-gray-200 h-5 w-1/2 rounded"></div>
                <div className="bg-gray-300 h-7 w-full rounded"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="bg-gray-200 h-5 w-20 rounded"></div>
                  <div className="bg-gray-200 h-5 w-16 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Web stories skeleton with navy blue underline styling */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="section-bullet bg-gray-300 h-6 w-6 rounded"></div>
          <div className="section-heading bg-gray-300 h-10 w-48 rounded relative">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-navy-blue rounded"></div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-80 w-64 flex-shrink-0 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 text-xl font-semibold mb-2">Error Loading Content</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => {
                setIsLoading(true) // Reset loading state
                dispatch(fetchPublicArticles({ limit: 10 }))
                dispatch(fetchTrendingArticles(5))
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
          {/* Show skeleton UI behind the error to indicate what content is trying to load */}
          <div className="opacity-30 pointer-events-none">
            {skeletonUI}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const featuredArticle = trendingArticles && trendingArticles.length > 0 ? trendingArticles[0] : null
  
  // Filter out the featured article from the articles array to prevent duplicate keys
  const filteredArticles = featuredArticle 
    ? articles.filter(article => article.id !== featuredArticle.id)
    : articles

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {loading ? skeletonUI : (
        <>
          <TrendingTags />
          {featuredArticle && <FeaturedArticle article={featuredArticle} />}
          <TopStories articles={filteredArticles} />
          <WebStories />
        </>
      )}

      <Footer />
    </div>
  )
}