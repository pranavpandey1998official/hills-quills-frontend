"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Story } from "@/features/web-story/types"
import { Save, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import StoryForm from "./story-form"
import { useUpdateStoryForm } from "../../hooks/useUpdateStoryForm"

interface UpdateStoryDialogProps {
  open: boolean
  story?: Story
  onUpdate: () => void
  onCancel: () => void
}

export function UpdateStoryDialog({
  open,
  story,
  onUpdate,
  onCancel,
}: UpdateStoryDialogProps) {
  const { formData, handleChange, isLoading, isUpdating, handleUpdate, handleReset, hasChanges } = useUpdateStoryForm(story!)

  

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]" >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Update Story
          </DialogTitle>
          <DialogDescription>
            Update story functionality is under development.
          </DialogDescription>
        </DialogHeader>

        {story && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Story ID:</span> {story.id}</p>
              <p><span className="font-medium">Title:</span> {story.title}</p>
              <p><span className="font-medium">Current Status:</span> <span className="capitalize">{story.status}</span></p>
              <p><span className="font-medium">Category:</span> {story.category}</p>
              <p><span className="font-medium">Region:</span> {story.region}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(story.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <ScrollArea className="max-h-[50vh] pr-4">
          <StoryForm formData={formData} handleChange={handleChange} />
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isUpdating}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Close
          </Button>

          <Button
            onClick={handleUpdate}
            disabled={true}
            className="flex items-center gap-2"
          >
            {isUpdating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Update COMING SOON
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
