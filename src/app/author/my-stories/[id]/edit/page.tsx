"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AuthorDashboardLayout } from "../../../dashboard/components/AuthorDashboardLayout"
import { StoryForm } from "@/components/StoryForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchStoryById } from "@/redux/slices/storiesSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { Button } from "@/components/ui/button"

export default function EditStoryPage() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { currentStory, isLoading } = useSelector((state: RootState) => state.stories)

  useEffect(() => {
    if (params.id) {
      dispatch(fetchStoryById(params.id as string))
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

  if (currentStory?.status === "published") {
    return (
      <AuthorDashboardLayout>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="text-center py-8">
              <div className="space-y-4">
                <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold">Web Story is Published</h2>
                  <p className="mt-2">This web story has been published. You cannot edit published web stories.</p>
                </div>
                <div className="flex justify-center space-x-2">
                  <Button asChild variant="outline">
                    <a href="/author/dashboard">Back to Dashboard</a>
                  </Button>
                  <Button asChild>
                    <a href={`/author/my-stories/${currentStory.id}`}>View Story</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AuthorDashboardLayout>
    )
  }

  if (!currentStory) {
    return (
      <AuthorDashboardLayout>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Web story not found</p>
        </div>
      </AuthorDashboardLayout>
    )
  }

  return (
    <AuthorDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Web Story</CardTitle>
            <p className="text-muted-foreground">Update your web story content and settings</p>
          </CardHeader>
          <CardContent>
            <StoryForm mode="edit" initialData={currentStory} />
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}
