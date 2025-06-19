"use client"

import { AuthorDashboardLayout } from "../dashboard/components/AuthorDashboardLayout"
import { StoryForm } from "@/components/StoryForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateStoryPage() {
  return (
    <AuthorDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Web Story</CardTitle>
            <p className="text-muted-foreground">Create engaging visual stories to captivate your audience</p>
          </CardHeader>
          <CardContent>
            <StoryForm mode="create" />
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}
