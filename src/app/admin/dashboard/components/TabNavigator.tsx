"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticlesTable } from "./ArticlesTable"
import { AuthorsTable } from "./AuthorsTable"
import { WebStoriesTable } from "./WebStoriesTable"

export function TabNavigator() {
  const [activeTab, setActiveTab] = useState("articles")

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Tabs 
          defaultValue="articles" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b px-6 py-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="authors">Authors</TabsTrigger>
              <TabsTrigger value="webstories">Web Stories</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="articles" className="m-0">
            <CardTitle className="p-6 pb-3">Articles Overview</CardTitle>
            <ArticlesTable />
          </TabsContent>
          <TabsContent value="authors" className="m-0">
            <CardTitle className="p-6 pb-3">Authors Overview</CardTitle>
            <AuthorsTable />
          </TabsContent>
          <TabsContent value="webstories" className="m-0">
            <CardTitle className="p-6 pb-3">Web Stories Overview</CardTitle>
            <WebStoriesTable />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}
