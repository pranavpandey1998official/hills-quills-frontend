"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react"
import { Story } from "@/redux/slices/storiesSlice"
import { StoryCarousel } from "./StoryCarousel"
import { StatusChangeDialog } from "./StatusChangeDialog"
import { RejectionReasonDialog } from "./RejectionReasonDialog"
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog"
import { UpdateStoryDialog } from "./UpdateStoryDialog"
import { StatusBadge } from "./StatusBadge"

interface StoriesGridProps {
  stories: Story[]
  isLoading: boolean
  onStatusChange: (storyId: string, newStatus: "draft" | "pending" | "published" | "rejected", rejectionReason?: string) => void
  onEdit: (storyId: string) => void
  onDelete: (storyId: string) => void
  onUpdate: (updatedStory: Story) => void
}

export function StoriesGrid({
  stories,
  isLoading,
  onStatusChange,
  onEdit,
  onDelete,
  onUpdate,
}: StoriesGridProps) {
  const [statusChangeDialog, setStatusChangeDialog] = useState<{
    open: boolean
    story?: Story
    newStatus?: "draft" | "pending" | "published" | "rejected"
  }>({ open: false })

  const [rejectionReasonDialog, setRejectionReasonDialog] = useState<{
    open: boolean
    story?: Story
  }>({ open: false })

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    story?: Story
  }>({ open: false })

  const [updateDialog, setUpdateDialog] = useState<{
    open: boolean
    story?: Story
  }>({ open: false })

  const handleStatusChange = (story: Story, newStatus: "draft" | "pending" | "published" | "rejected") => {
    if (newStatus === "rejected") {
      setStatusChangeDialog({ open: true, story, newStatus })
    } else {
      onStatusChange(story.id, newStatus)
    }
  }

  const handleStatusChangeConfirm = (rejectionReason?: string) => {
    if (statusChangeDialog.story && statusChangeDialog.newStatus) {
      onStatusChange(
        statusChangeDialog.story.id,
        statusChangeDialog.newStatus,
        rejectionReason
      )
    }
    setStatusChangeDialog({ open: false })
  }

  const handleViewRejectionReason = (story: Story) => {
    setRejectionReasonDialog({ open: true, story })
  }

  const handleDeleteClick = (story: Story) => {
    setDeleteDialog({ open: true, story })
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.story) {
      onDelete(deleteDialog.story.id)
    }
    setDeleteDialog({ open: false })
  }

  const handleUpdateClick = (story: Story) => {
    setUpdateDialog({ open: true, story })
  }

  const handleUpdateConfirm = (updatedStory: Story) => {
    onUpdate(updatedStory)
    setUpdateDialog({ open: false })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-96 animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg" />
            <CardContent className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded" />
              <div className="h-3 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {stories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No stories found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new story</p>
          </div>
        ) : (
          stories.map((story) => (
            <Card key={story.id} className="m-0 p-0">
              <div className="flex h-40">
                {/* Story Carousel - Left Side */}
                <div className="relative w-24 flex-shrink-0 bg-muted">
                  <StoryCarousel slides={story.slides} autoPlay={false} className="h-full" />
                  

                  {/* Slides indicator */}
                  <div className="absolute bottom-1 left-1">
                    <Badge variant="secondary" className="text-[10px] px-1 py-0">
                      <Play className="h-2 w-2 mr-0.5" />
                      {story.slides.length}
                    </Badge>
                  </div>
                </div>

                {/* Content - Right Side */}
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  {/* Header with title and action menu */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm font-semibold leading-tight line-clamp-2 text-left">
                        {story.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground line-clamp-2 text-left mt-1">
                        {story.description}
                      </p>
                    </div>
                    
                    {/* Action Menu */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                          <DropdownMenuItem onClick={() => handleUpdateClick(story)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Story
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => window.open(`/stories/${story.id}`, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Story
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          
                          {/* Status Change Options */}
                          {story.status !== "published" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(story, "published")}
                            >
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          
                          {story.status !== "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(story, "pending")}
                            >
                              <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                              Set Pending
                            </DropdownMenuItem>
                          )}
                          
                          {story.status !== "rejected" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(story, "rejected")}
                            >
                              <XCircle className="h-4 w-4 mr-2 text-red-500" />
                              Reject
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(story)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Story
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Category and Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className="text-[10px] px-1 py-0">
                      {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                    </Badge>
                    {story.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-[10px] px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {story.tags.length > 2 && (
                      <Badge variant="secondary" className="text-[10px] px-1 py-0">
                        +{story.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <StatusBadge status={story.status} />
                      {story.status === "rejected" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewRejectionReason(story)}
                          className="h-5 w-5 p-0"
                        >
                          <AlertCircle className="h-3 w-3 text-red-500" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="text-right text-[10px] text-muted-foreground">
                      <div>{story.views.toLocaleString()} views</div>
                      <div>{new Date(story.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Dialogs */}
      <StatusChangeDialog
        open={statusChangeDialog.open}
        story={statusChangeDialog.story}
        newStatus={statusChangeDialog.newStatus}
        onConfirm={handleStatusChangeConfirm}
        onCancel={() => setStatusChangeDialog({ open: false })}
      />

      <RejectionReasonDialog
        open={rejectionReasonDialog.open}
        story={rejectionReasonDialog.story}
        onClose={() => setRejectionReasonDialog({ open: false })}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        story={deleteDialog.story}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ open: false })}
      />

      <UpdateStoryDialog
        open={updateDialog.open}
        story={updateDialog.story}
        onUpdate={handleUpdateConfirm}
        onCancel={() => setUpdateDialog({ open: false })}
      />
    </>
  )
}
