"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, MoreHorizontal, Eye, Send, Video, TrendingUp, Play } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { deleteStory, resubmitStory } from "@/redux/slices/storiesSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { PaginationControls } from "@/components/pagination-controls"
import { toast } from "sonner"

export function AuthorStoriesTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: stories, isLoading, totalCount, currentPage } = useSelector((state: RootState) => state.stories)

  const [selectedStories, setSelectedStories] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStories(stories.map((story) => story.id))
    } else {
      setSelectedStories([])
    }
  }

  const handleSelectStory = (storyId: string, checked: boolean) => {
    if (checked) {
      setSelectedStories([...selectedStories, storyId])
    } else {
      setSelectedStories(selectedStories.filter((id) => id !== storyId))
    }
  }

  const handleEdit = (storyId: string, status: string) => {
    if (status === "published") {
      toast.error("Cannot edit published web stories")
      return
    }
    window.location.href = `/author/my-stories/${storyId}/edit`
  }

  const handleView = (storyId: string) => {
    window.location.href = `/author/my-stories/${storyId}`
  }

  const handleDelete = (storyId: string) => {
    setStoryToDelete(storyId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (storyToDelete) {
      dispatch(deleteStory(storyToDelete))
      toast.success("Web story deleted successfully")
      setDeleteDialogOpen(false)
      setStoryToDelete(null)
    }
  }

  const handleResubmit = (storyId: string) => {
    dispatch(resubmitStory(storyId))
    toast.success("Web story resubmitted for review")
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      published: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || variants.draft
  }

  const getCategoryBadge = (category: string) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
    ]
    const hash = category.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
    return colors[Math.abs(hash) % colors.length]
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedStories.length > 0 && (
        <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
          <span className="text-sm font-medium">{selectedStories.length} selected</span>
          <Button size="sm" variant="outline">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Selected
          </Button>
        </div>
      )}

      {/* Stories Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedStories.length === stories.length && stories.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center space-y-2">
                    <Video className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No web stories found</p>
                    <Button asChild size="sm">
                      <a href="/author/create-story">Create your first web story</a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              stories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStories.includes(story.id)}
                      onCheckedChange={(checked) => handleSelectStory(story.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <div className="flex items-center space-x-2">
                        <Play className="h-4 w-4 text-blue-500" />
                        <p className="font-medium truncate">{story.title}</p>
                        <div className="flex items-center space-x-1">
                          {story.status === "published" && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Published
                            </Badge>
                          )}
                          {story.isTrending && (
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{story.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadge(story.category)}>{story.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(story.status)}>{story.status}</Badge>
                  </TableCell>
                  <TableCell>{story.views?.toLocaleString() || 0}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(story.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        {story.status !== "published" && (
                          <DropdownMenuItem onClick={() => handleEdit(story.id, story.status)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {story.status === "rejected" && (
                          <DropdownMenuItem onClick={() => handleResubmit(story.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Resubmit
                          </DropdownMenuItem>
                        )}
                        {story.status !== "published" && (
                          <DropdownMenuItem onClick={() => handleDelete(story.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {stories.length > 0 && <PaginationControls totalCount={totalCount} currentPage={currentPage} pageSize={10} />}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your web story.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
