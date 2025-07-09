"use client"

import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { fetchTrendingArticles, fetchPublicArticles, fetchArticleById } from "@/redux/slices/PublicArticleSlice"
import { RootState, AppDispatch } from "@/redux/store"
import { Article } from "@/types/articles"

export function FeaturedArticlesGrid() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  // Get data from Redux store
  const { items: trendingArticles, isLoading: trendingLoading } = useSelector(
    (state: RootState) => state.publicArticles.trending
  )
  const { items: publicArticles, isLoading: publicLoading } = useSelector(
    (state: RootState) => state.publicArticles.articles
  )

  useEffect(() => {
    // Fetch trending articles for left and middle columns
    dispatch(fetchTrendingArticles(20) as any)
    // Fetch more articles for right column (with is_top_news=1 filter)
    dispatch(fetchPublicArticles({ limit: 20, page: 1, is_top_news: 1 }) as any)
  }, [dispatch])

  // Filter trending articles that are top news
  const topTrendingArticles = useMemo(() => {
    const trendingArray = Array.isArray(trendingArticles) ? trendingArticles : []
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []
    
    // If trending articles exist, use them
    if (trendingArray.length > 0) {
      const topTrending = trendingArray.filter((article: Article) => Number(article.is_top_news) === 1)
      return topTrending.length > 0 ? topTrending : trendingArray.slice(0, 5)
    }
    
    // Fallback: Use public articles as "trending" when trending API fails
    const topPublicFiltered = publicArray.filter((article: Article) => Number(article.is_top_news) === 1)
    return topPublicFiltered.length > 0 ? topPublicFiltered.slice(0, 5) : publicArray.slice(0, 5)
  }, [trendingArticles, publicArticles])

  // Filter normal articles that are top news
  const topPublicArticles = useMemo(() => {
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []
 
    // Handle both number and string types for is_top_news
    const topPublic = publicArray.filter((article: Article) => Number(article.is_top_news) === 1)

    const result = topPublic.length > 0 ? topPublic : publicArray.slice(0, 5);

    return result;
  }, [publicArticles])

  // Get articles for each column
  const featuredArticle = topTrendingArticles[0] || null
  const secondaryArticles = topTrendingArticles.slice(1, 4) // Next 3 trending articles
  const moreArticles = topPublicArticles.slice(0, 7) // 7 articles for right column

  // Handle article click navigation
  const handleArticleClick = (article: Article) => {
    dispatch(fetchArticleById(article.id))
    router.push(`/articles/${article.id}`)
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
            <div className="group cursor-pointer" onClick={() => handleArticleClick(featuredArticle)}>
              {featuredArticle.image && (
                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-4 bg-gray-200">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-white border-gray-400 text-yellow-600 rounded-full">
                    {featuredArticle.region}
                  </Badge>
                  <Badge variant="outline" className="bg-white border-gray-400 text-yellow-600 rounded-full">
                    {featuredArticle.category}
                  </Badge>
                </div>
                <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-orange-600 transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">{featuredArticle.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(featuredArticle.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No featured article available
            </div>
          )}
        </div>

        {/* Middle Column - Secondary Articles (35%) */}
        <div className="lg:col-span-4">
          <div className="space-y-6">
            {secondaryArticles.length > 0 ? (
              secondaryArticles.map((article: Article) => (
                <div key={article.id} className="group cursor-pointer" onClick={() => handleArticleClick(article)}>
                  {article.image && (
                    <div className="relative h-40 overflow-hidden rounded-lg mb-3 bg-gray-200">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-semibold leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <Badge
                          variant="outline"
                          className="bg-white border-gray-400 text-yellow-600 rounded-full text-xs"
                        >
                          {article.region}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white border-gray-400 text-yellow-600 rounded-full text-xs"
                        >
                          {article.category}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(article.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No secondary articles available
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Articles (25%) */}
        <div className="lg:col-span-3">
          <div>
            {moreArticles.length > 0 ? moreArticles.map((article: Article, index: number) => (
              <div key={article.id}>
                <div className="group cursor-pointer py-3" onClick={() => handleArticleClick(article)}>
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
                <p className="text-gray-500 text-sm">No articles available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

