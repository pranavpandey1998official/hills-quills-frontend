"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthorDashboardLayout } from "../components/AuthorDashboardLayout"
import { ProfileView } from "./components/ProfileView"
import { ProfileEditForm } from "./components/ProfileEditForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit } from "lucide-react"
import { fetchAuthorMe } from "@/redux/slices/authorsSlice"
import type { RootState, AppDispatch } from "@/redux/store"

// Card Skeleton Component
function ProfileCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <Skeleton className="h-9 w-24" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Profile Header Skeleton */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>

          {/* Profile Details Skeleton */}
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-5 w-5" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>

          {/* About Section Skeleton */}
          <div>
            <Skeleton className="h-6 w-16 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          {/* Security & Settings Section Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AuthorProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { profile, isLoading } = useSelector((state: RootState) => state.authors)
  const [isEditing, setIsEditing] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Always fetch profile data when component mounts
    dispatch(fetchAuthorMe())
  }, [dispatch])
  
  // Once the initial loading completes, mark initial load as done
  useEffect(() => {
    if (!isLoading && isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 500) // Small delay to ensure smooth transition
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, isInitialLoad])
  
  // Show skeleton during initial load or Redux loading state
  const showLoading = isLoading || isInitialLoad

  if (showLoading) {
    return (
      <AuthorDashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <ProfileCardSkeleton />
        </div>
      </AuthorDashboardLayout>
    )
  }

  return (
    <AuthorDashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>My Profile</CardTitle>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              {isEditing ? (
                <ProfileEditForm 
                  profile={profile} 
                  onSave={() => setIsEditing(false)}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <ProfileView profile={profile} isLoading={showLoading} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}