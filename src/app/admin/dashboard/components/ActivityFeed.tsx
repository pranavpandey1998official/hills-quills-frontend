"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import type { RootState } from "@/redux/store"
import { ArticleStatus } from "@/types/articles"

export function ActivityFeed() {
  const articles = useSelector((state: RootState) => state.articles.items)

  // Mock recent activities - in real app, this would come from an activities API
  const recentActivities = articles.slice(0, 5).map((article) => ({
    id: article.id,
    action: article.status === ArticleStatus.Approved ? ArticleStatus.Approved : "Created",
    target: article.title,
    timestamp: article.created_at,
    type: article.status,
  }))

  const getActivityColor = (type: string) => {
    switch (type) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="relative mt-0.5">
                  <div className={`rounded-full p-1 ${getActivityColor(activity.type)}`}>
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.action}{" "}
                    <span className="font-semibold">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`${getActivityColor(activity.type)} border-0`}
                  >
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
