"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AuthorDashboardLayout } from "../../../dashboard/components/AuthorDashboardLayout"
import { ArticleForm } from "@/components/ArticleForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getArticleById } from "@/redux/slices/articlesSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"

export default function EditArticlePage() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  
  // Access the items array and loading state from articles slice
  const { items, isLoading } = useSelector((state: RootState) => state.articles)
  
  // Find the current article by ID from the items array
  const currentArticle = items.find(article => String(article.id) === String(params.id))

  useEffect(() => {
    if (params.id) {
      dispatch(getArticleById(params.id as string))
    }
  }, [dispatch, params.id])

  if (isLoading) {
    return (
      <AuthorDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AuthorDashboardLayout>
    )
  }

  if (currentArticle?.status === "approved") {
    return (
      <AuthorDashboardLayout>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="text-center py-8">
              <div className="space-y-4">
                <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold">Article is Published</h2>
                  <p className="mt-2">
                    This article has been approved and published. You cannot edit published articles.
                  </p>
                </div>
                <div className="flex justify-center space-x-2">
                  <Button asChild variant="outline">
                    <a href="/author/dashboard">Back to Dashboard</a>
                  </Button>
                  <Button asChild>
                    <a href={`/author/my-news/${currentArticle.id}`}>View Article</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AuthorDashboardLayout>
    )
  }

  if (!currentArticle) {
    return (
      <AuthorDashboardLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Article not found</p>
        </div>
      </AuthorDashboardLayout>
    )
  }

  return (
    <AuthorDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Article</CardTitle>
            <p className="text-muted-foreground">Update your article content and settings</p>
          </CardHeader>
          <CardContent>
            <ArticleForm mode="edit" initialData={currentArticle} />
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}
