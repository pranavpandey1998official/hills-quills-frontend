"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Eye, ArrowUpDown } from "lucide-react"

import type { RootState, AppDispatch } from "@/redux/store"

export function WebStoriesTable() {
  const { items: stories, isLoading } = useSelector((state: RootState) => state.stories)
  const dispatch = useDispatch<AppDispatch>()
  const [sortBy, setSortBy] = useState<"views" | "date">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const toggleSort = (field: "views" | "date") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const sortedStories = [...stories].sort((a, b) => {
    if (sortBy === "views") {
      return sortOrder === "asc" 
        ? (a.views_count || 0) - (b.views_count || 0) 
        : (b.views_count || 0) - (a.views_count || 0)
    } else {
      return sortOrder === "asc" 
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime() 
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archived</Badge>
      case "draft":
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Draft</Badge>
    }
  }

  const handleViewStory = (storyId: string | number) => {
    // You can implement navigation to the story view
    console.log(`View story ${storyId}`);
  }

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading web stories...</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[240px]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => toggleSort("views")}
            >
              <div className="flex items-center space-x-1">
                <span>Views</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => toggleSort("date")}
            >
              <div className="flex items-center space-x-1">
                <span>Created</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStories.map((story) => (
            <TableRow key={story.id}>
              <TableCell className="font-medium">{story.title}</TableCell>
              <TableCell>{story.author_name}</TableCell>
              <TableCell>{getStatusBadge(story.status)}</TableCell>
              <TableCell>{(story.views_count || 0).toLocaleString()}</TableCell>
              <TableCell>{format(new Date(story.created_at), "MMM dd, yyyy")}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center space-x-1"
                  onClick={() => handleViewStory(story.id)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  <span>View</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {stories.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No web stories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
