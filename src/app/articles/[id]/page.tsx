"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleDetailView } from "@/components/articles/article-detail-view"
import { AdBanner } from "@/components/articles/ad-banner"
import { useDispatch, useSelector } from "react-redux"
import { fetchArticleById } from "@/redux/slices/PublicArticleSlice"
import { RootState, AppDispatch } from "@/redux/store"

export default function ArticleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  // Get the selected article from Redux
  const { item: article, isLoading: loading, error } = useSelector((state: RootState) => state.publicArticles.selectedArticle)

  const articleId = params.id as string

  useEffect(() => {
    // Always fetch the article by ID
    dispatch(fetchArticleById(articleId))
  }, [dispatch, articleId])

  if (loading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button 
              onClick={() => router.push("/")}
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Go back to home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Article not found</p>
            <button 
              onClick={() => router.push("/")}
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Go back to home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AdBanner />
      <ArticleDetailView article={article} />
      <Footer />
    </div>
  )
}
