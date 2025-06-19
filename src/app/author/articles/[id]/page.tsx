"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AuthorDashboardLayout } from "../../dashboard/components/AuthorDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Eye, Calendar, MapPin, Tag, TrendingUp, Star, Share2, BarChart3 } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { getArticleById } from "@/redux/slices/articlesSlice"
import type { RootState, AppDispatch } from "@/redux/store"

export default function ArticleDetailPage() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, items, error } = useSelector((state: RootState) => state.articles)
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false)
  
  // Fix the selector to properly convert both IDs to strings for comparison
  const currentArticle = useSelector((state: RootState) => 
    state.articles.items.find(article => String(article.id) === String(params.id))
  )

  useEffect(() => {
    // Only fetch if we don't already have the article and haven't attempted to fetch yet
    if (params.id && !currentArticle && !hasAttemptedFetch && !isLoading) {
      console.log("Fetching article with ID:", params.id)
      setHasAttemptedFetch(true)
      dispatch(getArticleById(params.id as string))
    }
  }, [dispatch, params.id, currentArticle, hasAttemptedFetch, isLoading])

  // Reset fetch attempt when params change
  useEffect(() => {
    setHasAttemptedFetch(false)
  }, [params.id])

  // Show loading only if we're currently fetching and don't have the article
  if (isLoading && !currentArticle) {
    return (
      <AuthorDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AuthorDashboardLayout>
    )
  }

  // Show error if there was an error and we attempted to fetch
  if (error && hasAttemptedFetch) {
    return (
      <AuthorDashboardLayout>
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">Error loading article</p>
          <p className="text-sm text-gray-500">{error}</p>
          <Button 
            onClick={() => {
              setHasAttemptedFetch(false)
              if (params.id) {
                dispatch(getArticleById(params.id as string))
              }
            }} 
            className="mt-4 mr-2"
          >
            Try Again
          </Button>
          <Button asChild variant="outline" className="mt-4">
            <a href="/author/articles">Back to Articles</a>
          </Button>
        </div>
      </AuthorDashboardLayout>
    )
  }

  // Show not found only if we've attempted to fetch and don't have the article
  if (!currentArticle && hasAttemptedFetch && !isLoading) {
    return (
      <AuthorDashboardLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Article not found</p>
          <p className="text-sm text-gray-500 mt-2">
            Looking for article ID: {params.id}
          </p>
          <Button asChild className="mt-4">
            <a href="/author/articles">Back to Articles</a>
          </Button>
        </div>
      </AuthorDashboardLayout>
    )
  }

  // If we have the article or are in initial state, continue with rendering
  if (!currentArticle) {
    // This handles the case where we haven't attempted to fetch yet
    return (
      <AuthorDashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AuthorDashboardLayout>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || variants.draft
  }

  const getCategoryBadge = (category: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
    ]
    const hash = category.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <AuthorDashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <a href="/author/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </a>
          </Button>
          <div className="flex items-center space-x-2">
            {currentArticle.status !== "approved" && (
              <Button asChild>
                <a href={`/author/articles/${currentArticle.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Article
                </a>
              </Button>
            )}
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Article Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getStatusBadge(currentArticle.status)}>{currentArticle.status}</Badge>
                  <Badge className={getCategoryBadge(currentArticle.category)}>{currentArticle.category}</Badge>
                  {currentArticle.is_top_news === 1 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Star className="h-3 w-3 mr-1" />
                      Top News
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl mb-2">{currentArticle.title}</CardTitle>
                <p className="text-muted-foreground text-lg">{currentArticle.description}</p>
              </div>
              <Avatar className="h-20 w-20 rounded-lg">
                <AvatarImage src={currentArticle.image || "/placeholder.svg"} className="object-cover" />
                <AvatarFallback className="rounded-lg">IMG</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
        </Card>

        {/* Article Meta */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentArticle.views_count?.toLocaleString() || 0}</div>
              <p className="text-xs text-muted-foreground">Total views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Created</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{format(new Date(currentArticle.created_at), "MMM dd, yyyy")}</div>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(currentArticle.created_at), { addSuffix: true })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Region</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{currentArticle.region}</div>
              <p className="text-xs text-muted-foreground">Target region</p>
            </CardContent>
          </Card>
        </div>

        {/* Article Content */}
        <Card>
          <CardHeader>
            <CardTitle>Article Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{currentArticle.content}</div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentArticle.tags?.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="secondary">
                  {tag}
                </Badge>
              )) || <p className="text-muted-foreground">No tags available</p>}
            </div>
          </CardContent>
        </Card>

        {/* Rejection Reason (if rejected) */}
        {currentArticle.status === "rejected" && currentArticle.rejection_reason && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Rejection Reason</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{currentArticle.rejection_reason}</p>
            </CardContent>
          </Card>
        )}

        {/* Performance Analytics */}
        {currentArticle.status === "approved" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Engagement Rate</span>
                    <span className="text-sm text-muted-foreground">4.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Read Time</span>
                    <span className="text-sm text-muted-foreground">3.5 min avg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Author Information */}
        <Card>
          <CardHeader>
            <CardTitle>Author Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>
                  {currentArticle.author_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AU'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentArticle.author_name || 'Unknown Author'}</p>
                <p className="text-sm text-muted-foreground">{currentArticle.author_email || 'No email provided'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}