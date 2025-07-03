"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { fetchArticleById, fetchPublicArticles } from "@/redux/slices/PublicArticleSlice"
import { AppDispatch, RootState } from "@/redux/store"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  // Get article ID from params
  const articleId = params.id as string
  
  // Get article state from Redux
  const { item: article, isLoading: articleLoading, error: articleError } = useSelector(
    (state: RootState) => state.publicArticles.selectedArticle
  )
  const { items: articles, isLoading: articlesLoading } = useSelector(
    (state: RootState) => state.publicArticles.articles
  )
  
  // Determine if we're in a loading state
  const loading = articleLoading || articlesLoading

  useEffect(() => {
    // Fetch the article by ID
    dispatch(fetchArticleById(articleId))
    
    // If articles aren't loaded yet, fetch them too
    if (articles.length === 0) {
      dispatch(fetchPublicArticles({})) // Empty object as argument
    }
  }, [dispatch, articleId, articles.length])

  if (loading || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (articleError) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading article: {articleError}</p>
            <button
              onClick={() => dispatch(fetchArticleById(articleId))}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(article.publish_date || article.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              <div className="flex space-x-2">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">{article.description}</p>

          <div className="text-gray-800 leading-relaxed space-y-4">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-orange-50">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
