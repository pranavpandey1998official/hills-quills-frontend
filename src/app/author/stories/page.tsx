"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthorDashboardLayout } from "../dashboard/components/AuthorDashboardLayout"
import { AuthorStoriesFilters } from "../dashboard/components/AuthorStoriesFilters"
import { DetailedStoriesTable } from "../dashboard/components/DetailedStoriesTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Video, BarChart3 } from "lucide-react"
import { fetchMyStories } from "@/redux/slices/storiesSlice"
import type { RootState, AppDispatch } from "@/redux/store"

export default function AuthorStoriesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: stories, isLoading, totalCount } = useSelector((state: RootState) => state.stories)

  useEffect(() => {
    dispatch(fetchMyStories({ page: 1, limit: 20, status: "all" }))
  }, [dispatch])

  const draftCount = stories.filter((story) => story.status === "draft").length
  const pendingCount = stories.filter((story) => story.status === "pending").length
  const publishedCount = stories.filter((story) => story.status === "published").length

  return (
    <AuthorDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Web Stories</h1>
            <p className="text-muted-foreground mt-1">Create and manage your visual stories</p>
          </div>
          <Button asChild size="lg">
            <a href="/author/create-story">
              <Plus className="h-5 w-5 mr-2" />
              Create New Story
            </a>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
              <Video className="h-4 w-4 text-blue-600" />
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
              <div className="text-2xl font-bold">{publishedCount}</div>
              <p className="text-xs text-muted-foreground">Live stories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Video className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Video className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
              <p className="text-xs text-muted-foreground">Work in progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Stories Management */}
        <Card>
          <CardHeader>
            <CardTitle>Web Stories Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Search, filter, and manage all your web stories in one place
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <AuthorStoriesFilters />
            <DetailedStoriesTable />
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}
