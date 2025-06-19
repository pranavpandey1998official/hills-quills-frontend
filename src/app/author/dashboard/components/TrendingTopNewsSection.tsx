"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, Star, Eye, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { RootState } from "@/redux/store"

export function TrendingTopNewsSection() {
  const { items: articles, trending } = useSelector((state: RootState) => state.articles)

  // Get trending articles from the trending state (only approved ones)
  const trendingArticles = trending.items.filter((article) => article.status === "approved")
  
  // Get top news articles from regular articles (using === 1 for proper comparison)
  const topNewsArticles = articles.filter((article) => article.is_top_news === 1 && article.status === "approved")

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Trending Articles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Trending Articles
            </CardTitle>
            <Badge variant="secondary">{trendingArticles.length}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Your articles that are currently trending</p>
        </CardHeader>
        <CardContent>
          {trendingArticles.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No trending articles yet</p>
              <p className="text-sm text-muted-foreground mt-1">Keep creating great content to get featured!</p>
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {trendingArticles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{article.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views_count?.toLocaleString() || 0} views
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 ml-2">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Top News Articles */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Top News Articles
            </CardTitle>
            <Badge variant="secondary">{topNewsArticles.length}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Your articles featured as top news by admin</p>
        </CardHeader>
        <CardContent>
          {topNewsArticles.length === 0 ? (
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No top news articles yet</p>
              <p className="text-sm text-muted-foreground mt-1">Write exceptional content to get featured by admin!</p>
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {topNewsArticles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{article.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {article.views_count?.toLocaleString() || 0} views
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 ml-2">
                        <Star className="h-3 w-3 mr-1" />
                        Top News
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}