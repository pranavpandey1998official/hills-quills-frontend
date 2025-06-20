"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthorDashboardLayout } from "./components/AuthorDashboardLayout"
import { AuthorStatsCard } from "./components/AuthorStatsCard"
import { TabNavigator } from "./components/TabNavigator"
import { fetchAuthorArticles } from "@/redux/slices/articlesSlice"
import { fetchMyStories } from "@/redux/slices/storiesSlice"
import { fetchAuthorMe } from "@/redux/slices/authorsSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { TrendingTopNewsSection } from "./components/TrendingTopNewsSection"
import ProtectedRoute from "@/components/auth/protectedroute"

export default function AuthorDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useSelector((state: RootState) => state.articles)
  const { profile } = useSelector((state: RootState) => state.authors)

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchAuthorArticles({ page: 1, limit: 10, status: "all" }))
    dispatch(fetchMyStories({ page: 1, limit: 10, status: "all" }))
    dispatch(fetchAuthorMe())
  }, [dispatch])

  return (
    <ProtectedRoute requiredRole="author">
    <AuthorDashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold">Welcome back, {profile?.name || "Author"}!</h1>
          <p className="text-blue-100 mt-2">Manage your articles and web stories, track your publishing journey</p>
        </div>

        {/* Stats Overview */}
        <AuthorStatsCard />

        {/* Trending & Top News Section */}
        <TrendingTopNewsSection />

        {/* Content Management */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">My Content</h2>
            <p className="text-gray-600 mt-1">Manage and track all your articles and web stories</p>
          </div>

          <div className="p-6">
            <TabNavigator />
          </div>
        </div>
      </div>
    </AuthorDashboardLayout>
    </ProtectedRoute>
  )
}
