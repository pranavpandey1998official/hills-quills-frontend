"use client"

// import ProtectedRoute from "@/components/auth/protectedroute"
// import { useAuth } from "@/hooks/useAuth"

// export default function AdminDashboardPage() {
//     const { user, logout } = useAuth()
//   return (
//     <ProtectedRoute requiredRole="admin">
//     <div>
//       <h1>Admin Dashboard</h1>
//     </div>
//     </ProtectedRoute>
//   )
// }

"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DashboardLayout } from "@/app/admin/dashboard/components/DashboardLayout"
import { StatsCards } from "@/app/admin/dashboard/components/StatsCards"
import { ActivityFeed } from "@/app/admin/dashboard/components/ActivityFeed"
import { TabNavigator } from "@/app/admin/dashboard/components/TabNavigator"
import  { fetchAdminArticles }  from "@/redux/slices/adminSlice"
import { fetchAuthors } from "@/redux/slices/authorsSlice"
import { fetchWebStories } from "@/redux/slices/storiesSlice"
import { fetchAdminMe } from "@/redux/slices/adminSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import ProtectedRoute from "@/components/auth/protectedroute"

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading } = useSelector((state: RootState) => state.articles)

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchAdminArticles({ page: 1, limit: 10, status: "all" }))
    dispatch(fetchAuthors())
    dispatch(fetchWebStories())
    dispatch(fetchAdminMe())
  }, [dispatch])

  return (
    <ProtectedRoute requiredRole="admin">
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCards />
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Tables */}
          <div className="lg:col-span-2">
            <TabNavigator />
          </div>

          {/* Right Column - Activity & Quick Stats */}
          <div className="space-y-6">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  )
}
