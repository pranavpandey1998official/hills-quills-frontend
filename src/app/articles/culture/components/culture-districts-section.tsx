"use client"

import { useEffect } from "react"
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
  const { 
    cultureHeritage: { items: cultureHeritageArticles, isLoading: cultureLoading, error: cultureError },
    articles: { items: publicArticles, isLoading: publicLoading, error: publicError }
  } = useSelector((state: RootState) => state.publicArticles)

  useEffect(() => {
    // Fetch culture & heritage articles for both sections
    dispatch(fetchCultureHeritageArticles({ limit: 10 }))
    // Fetch normal articles for district articles
    dispatch(fetchPublicArticles({ limit: 8 }))
  }, [dispatch])

  // Filter and organize articles
  const cultureArticlesData = Array.isArray(cultureHeritageArticles) ? cultureHeritageArticles : []
  const districtArticlesData = Array.isArray(publicArticles) ? publicArticles : []

  // Split articles for different sections
  const cultureArticles = cultureArticlesData.slice(0, 3) // First 3 for culture section
  const heritageArticles = districtArticlesData.slice(0, 4) // Normal articles for heritage section (4 articles)

  // Handle article click navigation
  const handleArticleClick = (article: Article) => {
    dispatch(fetchArticleById(article.id))
    router.push(`/articles/${article.id}`)
  }

  // Error state
  if (cultureError || publicError) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 text-lg font-semibold mb-2">Error Loading Articles</h3>
          <p className="text-red-700 mb-4">{cultureError || publicError}</p>
          <button 
            onClick={() => {
              dispatch(fetchCultureHeritageArticles({ limit: 10 }))
              dispatch(fetchPublicArticles({ limit: 8 }))
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Culture Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-navy-600 pb-2">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-3"></span>
              Culture & Traditions
            </h2>
            <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">View All</button>
          </div>

          <div className="space-y-6">
            {cultureArticles.length > 0 ? (
              <>
                {/* Large Culture Article */}
                <div className="group cursor-pointer" onClick={() => handleArticleClick(cultureArticles[0])}>
                  <div className="relative h-60 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={cultureArticles[0].image || "/placeholder.svg"}
                      alt={cultureArticles[0].title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-orange-600 transition-colors">
                      {cultureArticles[0].title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {cultureArticles[0].created_at ? new Date(cultureArticles[0].created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }) : "Recently published"}
                    </p>
                  </div>
                </div>

                {/* Smaller Culture Articles */}
                {cultureArticles.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cultureArticles.slice(1).map((article: Article) => (
                      <div key={article.id} className="group cursor-pointer" onClick={() => handleArticleClick(article)}>
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
                          <p className="text-sm text-gray-500">
                            {article.created_at ? new Date(article.created_at).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }) : "Recently published"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No culture articles available</p>
              </div>
            )}
          </div>
        </div>

        {/* Heritage Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-navy-600 pb-2">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-3"></span>
              Heritage Sites
            </h2>
            <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">View All</button>
          </div>

          <div>
            {heritageArticles.length > 0 ? heritageArticles.map((article: Article, index: number) => (
              <div key={article.id}>
                <div className="group cursor-pointer py-3" onClick={() => handleArticleClick(article)}>
                  <div className="flex space-x-4">
                    <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg leading-tight group-hover:text-orange-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {article.created_at ? new Date(article.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }) : "Recently published"}
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
                {index < heritageArticles.length - 1 && (
                  <div className="my-3">
                    <div className="h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No heritage articles available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
