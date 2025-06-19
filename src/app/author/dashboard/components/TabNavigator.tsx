"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthorArticlesTable } from "./AuthorArticlesTable"
import { AuthorStoriesTable } from "./AuthorStoriesTable"
import { AuthorArticlesFilters } from "./AuthorArticlesFilters"
import { AuthorStoriesFilters } from "./AuthorStoriesFilters"

export function TabNavigator() {
  const [activeTab, setActiveTab] = useState("articles")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="articles">Articles</TabsTrigger>
        <TabsTrigger value="stories">Web Stories</TabsTrigger>
      </TabsList>

      <TabsContent value="articles" className="space-y-4">
        <AuthorArticlesFilters />
        <AuthorArticlesTable />
      </TabsContent>

      <TabsContent value="stories" className="space-y-4">
        <AuthorStoriesFilters />
        <AuthorStoriesTable />
      </TabsContent>
    </Tabs>
  )
}
