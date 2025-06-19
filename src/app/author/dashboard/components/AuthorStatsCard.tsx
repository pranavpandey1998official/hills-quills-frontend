"use client"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, Eye, TrendingUp, Star } from "lucide-react"
import type { RootState } from "@/redux/store"

export function AuthorStatsCard() {
  const { items: articles, trending } = useSelector((state: RootState) => state.articles)
  const { items: stories } = useSelector((state: RootState) => state.stories)

  // Articles stats
  const draftArticles = articles.filter((article) => article.status === "draft").length
  const pendingArticles = articles.filter((article) => article.status === "pending").length
  const approvedArticles = articles.filter((article) => article.status === "approved").length
  const topNewsArticles = articles.filter((article) => article.is_top_news === 1).length

  // Stories stats
  const draftStories = stories.filter((story) => story.status === "draft").length
  const pendingStories = stories.filter((story) => story.status === "pending").length
  const approvedStories = stories.filter((story) => story.status === "published").length
  const trendingStories = stories.filter((story) => story.isTrending).length

  // Get trending articles count from the trending state
  const trendingArticlesCount = trending.items.length

  const totalViews =
    articles.reduce((sum, article) => sum + (article.views_count || 0), 0) +
    stories.reduce((sum, story) => sum + (story.views || 0), 0)

  const stats = [
    {
      title: "Draft Content",
      value: draftArticles + draftStories,
      icon: FileText,
      description: "Articles & Stories",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      title: "Pending Review",
      value: pendingArticles + pendingStories,
      icon: Clock,
      description: "Awaiting approval",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Published",
      value: approvedArticles + approvedStories,
      icon: CheckCircle,
      description: "Live content",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Trending",
      value: trendingArticlesCount + trendingStories,
      icon: TrendingUp,
      description: "Popular content",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Top News",
      value: topNewsArticles,
      icon: Star,
      description: "Featured articles",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      description: "All content views",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}