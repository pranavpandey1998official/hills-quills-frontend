"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, UserCheck, Video, TrendingUp } from "lucide-react"
import type { RootState } from "@/redux/store"

export function StatsCards() {
  const articles = useSelector((state: RootState) => state.articles.items)
  const authors = useSelector((state: RootState) => state.authors.items)
  const webStories = useSelector((state: RootState) => state.stories.items)
  
  // Calculate statistics
  const totalArticles = articles.length
  const pendingApproval = articles.filter(article => article.status === "pending").length
  const totalAuthors = authors.length
  const activeAuthors = authors.filter(author => author.status === "active").length
  const totalStories = webStories.length
  const publishedStories = webStories.filter(story => story.status === "published").length
  
  // Most viewed article (would come from API with actual view counts)
  const topNews = articles.filter(article => article.is_top_news).length

  const stats = [
    {
      title: "Total Articles",
      value: totalArticles,
      description: `${pendingApproval} pending approval`,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Authors",
      value: activeAuthors,
      description: `out of ${totalAuthors} total`,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Published Stories",
      value: publishedStories,
      description: `out of ${totalStories} total`,
      icon: Video,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Top News",
      value: topNews,
      description: "Featured articles",
      icon: TrendingUp,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} ${stat.color} p-2 rounded-full`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
