"use client"

import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { fetchCultureHeritageArticles, fetchPublicArticles, fetchArticleById } from "@/redux/slices/PublicArticleSlice"
import { RootState, AppDispatch } from "@/redux/store"
import { Article } from "@/types/articles"

export function CultureDistrictsSection() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  // Get data from Redux store
  const { items: cultureArticles, isLoading: cultureLoading } = useSelector(
    (state: RootState) => state.publicArticles.cultureHeritage
  )
  const { items: publicArticles, isLoading: publicLoading } = useSelector(
    (state: RootState) => state.publicArticles.articles
  )

  useEffect(() => {
    // Fetch culture and heritage articles with is_top_news=1
    dispatch(fetchCultureHeritageArticles({ limit: 10, page: 1, is_top_news: 1 }) as any)
    // Fetch normal articles for districts with is_top_news=1
    dispatch(fetchPublicArticles({ limit: 10, page: 1, is_top_news: 1 }) as any)
  }, [dispatch])

  // Filter culture heritage articles
  const topCultureArticles = useMemo(() => {
    
    const cultureArray = Array.isArray(cultureArticles) ? cultureArticles : []
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []

    // Since we're fetching with is_top_news=1, filter for top news articles to be safe
    if (cultureArray.length > 0) {
      // Double-check filtering by is_top_news=1 (in case API returns mixed results)
      const topCultureFiltered = cultureArray.filter((article: Article) => Number(article.is_top_news) === 1);
     
      const result = topCultureFiltered.length > 0 ? topCultureFiltered.slice(0, 3) : cultureArray.slice(0, 3);
      return result;
    }
    
    // Fallback: get culture articles from public articles
    const cultureFromPublic = publicArray.filter((article: Article) => 
      (article.category === "Culture & Heritage" || article.category?.toLowerCase().includes("culture")) &&
      Number(article.is_top_news) === 1
    )
    
    
    // If still no culture articles, use first 3 public articles
    const finalResult = cultureFromPublic.length > 0 ? cultureFromPublic.slice(0, 3) : publicArray.slice(0, 3);
    return finalResult;
  }, [cultureArticles, publicArticles])

  // Handle article click navigation
  const handleArticleClick = (article: Article) => {
    dispatch(fetchArticleById(article.id))
    router.push(`/articles/${article.id}`)
  }

  // Get district articles (public articles with is_top_news=1)
  const districtArticles = useMemo(() => {
    const publicArray = Array.isArray(publicArticles) ? publicArticles : []
    
    
    // Filter by is_top_news=1 (double-check in case API returns mixed results)
    const topPublicFiltered = publicArray.filter((article: Article) => Number(article.is_top_news) === 1);
    
    
    const result = topPublicFiltered.length > 0 ? topPublicFiltered.slice(0, 4) : publicArray.slice(0, 4);
    
    return result;
  }, [publicArticles])

 
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Culture Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-navy-600 pb-2">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-3"></span>
              Culture & Heritage
            </h2>
            <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">View All</button>
          </div>

          <div className="space-y-6">
            {topCultureArticles.length > 0 ? (
              <>
                {/* Large Culture Article */}
                <div className="group cursor-pointer" onClick={() => handleArticleClick(topCultureArticles[0])}>
                  <div className="relative h-60 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={topCultureArticles[0].image || "/placeholder.svg?height=240&width=400"}
                      alt={topCultureArticles[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-orange-600 transition-colors">
                      {topCultureArticles[0].title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(topCultureArticles[0].created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Smaller Culture Articles */}
                {topCultureArticles.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topCultureArticles.slice(1, 3).map((article: Article) => (
                      <div key={article.id} className="group cursor-pointer" onClick={() => handleArticleClick(article)}>
                        <div className="relative h-40 overflow-hidden rounded-lg mb-3">
                          <Image
                            src={article.image || "/placeholder.svg?height=160&width=200"}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 25vw, 20vw"
                            className="object-cover transition-all duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(article.created_at).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No culture articles available
              </div>
            )}
          </div>
        </div>

        {/* Districts Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-navy-600 pb-2">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-3"></span>
              Districts
            </h2>
            <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">View All</button>
          </div>

          <div>
            {districtArticles.length > 0 ? (
              districtArticles.map((article: Article, index: number) => (
                <div key={article.id}>
                  <div className="group cursor-pointer py-3" onClick={() => handleArticleClick(article)}>
                    <div className="flex space-x-4">
                      <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={article.image || "/placeholder.svg?height=96&width=128"}
                          alt={article.title}
                          fill
                          sizes="128px"
                          className="object-cover transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg leading-tight group-hover:text-orange-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(article.created_at).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex space-x-2">
                          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                            {article.region}
                          </span>
                          <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium">
                            {article.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Divider line with spacing after each article except the last one */}
                  {index < districtArticles.length - 1 && (
                    <div className="my-3">
                      <div className="h-0.5 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No district articles available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
