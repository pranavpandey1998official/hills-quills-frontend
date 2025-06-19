"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthorDashboardLayout } from "../dashboard/components/AuthorDashboardLayout"
import { AuthorArticlesFilters } from "./components/AuthorArticlesFilters"
import { DetailedArticlesTable } from "./components/DetailedArticlesTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, BarChart3 } from "lucide-react"
import { fetchAuthorArticles } from "@/redux/slices/articlesSlice"
import type { RootState, AppDispatch } from "@/redux/store"

export default function AuthorArticlesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: articles, isLoading, totalCount } = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    dispatch(fetchAuthorArticles({ page: 1, limit: 20 }))
  }, [dispatch])

  const draftCount = articles.filter((article) => article.status === "draft").length
  const pendingCount = articles.filter((article) => article.status === "pending").length
  const approvedCount = articles.filter((article) => article.status === "approved").length
  const rejectedCount = articles.filter((article) => article.status === "rejected").length

  return (
    <AuthorDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Articles</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your articles</p>
          </div>
          <Button asChild size="lg">
            <a href="/author/create-news">
              <Plus className="h-5 w-5 mr-2" />
              Create New Article
            </a>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">Live articles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
              <p className="text-xs text-muted-foreground">Work in progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Articles Management */}
        <Card>
          <CardHeader>
            <CardTitle>Articles Management</CardTitle>
            <p className="text-sm text-muted-foreground">Search, filter, and manage all your articles in one place</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <AuthorArticlesFilters />
            <DetailedArticlesTable />
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}
