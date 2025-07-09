"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { fetchCultureHeritageArticles, fetchPublicArticles } from "@/redux/slices/PublicArticleSlice"
import { RootState, AppDispatch } from "@/redux/store"
import { Article } from "@/types/articles"

export function FeaturedArticlesGrid() {
  const dispatch = useDispatch<AppDispatch>()
  
  // Get data from Redux store
  const { 
    cultureHeritage: { items: cultureHeritageArticles, isLoading: cultureLoading, error: cultureError },
    articles: { items: publicArticles, isLoading: publicLoading, error: publicError }
  } = useSelector((state: RootState) => state.publicArticles)

  useEffect(() => {
    // Fetch culture & heritage articles that are top news for left and middle columns
    dispatch(fetchCultureHeritageArticles({ limit: 6, is_top_news: 1 }))
    // Fetch more articles for right column to enable scrolling
    dispatch(fetchPublicArticles({ limit: 20 }))
  }, [dispatch])

  // Filter and organize articles
  const topCultureArticles = Array.isArray(cultureHeritageArticles) ? cultureHeritageArticles : []
  const normalArticles = Array.isArray(publicArticles) ? publicArticles : []

  // Split top culture articles for left and middle columns
  const featuredArticle = topCultureArticles.length > 0 ? topCultureArticles[0] : null
  const secondaryArticles = topCultureArticles.slice(1, 4) // Next 3 articles for middle column
  const moreArticles = normalArticles.slice(0, 7) // Show 8 articles in right column

  // Error state
  if (cultureError || publicError) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 text-lg font-semibold mb-2">Error Loading Articles</h3>
          <p className="text-red-700 mb-4">{cultureError || publicError}</p>
          <button 
            onClick={() => {
              dispatch(fetchCultureHeritageArticles({ limit: 6, is_top_news: 1 }))
              dispatch(fetchPublicArticles({ limit: 20 }))
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Dividers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5">
          <div className="h-0.5 bg-gray-300"></div>
        </div>
        <div className="lg:col-span-4">
          <div className="h-0.5 bg-gray-300"></div>
        </div>
        <div className="lg:col-span-3">
          <div className="h-0.5 bg-gray-300"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Featured Article (40%) */}
        <div className="lg:col-span-5">
          {featuredArticle ? (
            <div className="group cursor-pointer">
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-4">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  {featuredArticle.region && (
                    <Badge variant="outline" className="bg-white border-gray-400 text-yellow-600 rounded-full">
                      {featuredArticle.region}
                    </Badge>
                  )}
                  {featuredArticle.category && (
                    <Badge variant="outline" className="bg-white border-gray-400 text-yellow-600 rounded-full">
                      {featuredArticle.category}
                    </Badge>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-orange-600 transition-colors">
                  {featuredArticle.title}
                </h2>
                {featuredArticle.description && (
                  <p className="text-gray-600 line-clamp-2">{featuredArticle.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  {featuredArticle.created_at ? new Date(featuredArticle.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }) : "Recently published"}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No featured articles available</p>
            </div>
          )}
        </div>

        {/* Middle Column - Secondary Articles (35%) */}
        <div className="lg:col-span-4">
          <div className="space-y-6">
            {secondaryArticles.length > 0 ? secondaryArticles.map((article: Article) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="relative h-40 overflow-hidden rounded-lg mb-3">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      {article.region && (
                        <Badge
                          variant="outline"
                          className="bg-white border-gray-400 text-yellow-600 rounded-full text-xs"
                        >
                          {article.region}
                        </Badge>
                      )}
                      {article.category && (
                        <Badge
                          variant="outline"
                          className="bg-white border-gray-400 text-yellow-600 rounded-full text-xs"
                        >
                          {article.category}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {article.created_at ? new Date(article.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      }) : "Recently"}
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No secondary articles available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Articles (25%) */}
        <div className="lg:col-span-3">
          <div>
            {moreArticles.length > 0 ? moreArticles.map((article: Article, index: number) => (
              <div key={article.id}>
                <div className="group cursor-pointer py-3">
                  <div className="flex space-x-3">
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-medium leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center space-x-3">
                        {article.region && (
                          <Badge
                            variant="outline"
                            className="bg-white border-gray-400 text-yellow-600 rounded-full text-xs"
                          >
                            {article.region}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {article.created_at ? new Date(article.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          }) : "Recently"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Divider line with spacing after each article except the last one */}
                {index < moreArticles.length - 1 && (
                  <div className="my-3">
                    <div className="h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
            )) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">No more articles available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
