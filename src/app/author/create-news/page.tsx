"use client"

import { AuthorDashboardLayout } from "../dashboard/components/AuthorDashboardLayout"
import { ArticleForm } from "@/components/ArticleForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateNewsPage() {
  return (
    <AuthorDashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Article</CardTitle>
            <p className="text-muted-foreground">Write and publish your story to reach your audience</p>
          </CardHeader>
          <CardContent>
            <ArticleForm mode="create" />
          </CardContent>
        </Card>
      </div>
    </AuthorDashboardLayout>
  )
}
