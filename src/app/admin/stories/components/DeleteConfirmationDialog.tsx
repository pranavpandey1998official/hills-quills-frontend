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
import { AlertTriangle, Trash2 } from "lucide-react"
import { Story } from "@/redux/slices/storiesSlice"

interface DeleteConfirmationDialogProps {
  open: boolean
  story?: Story
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmationDialog({
  open,
  story,
  onConfirm,
  onCancel,
}: DeleteConfirmationDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-500" />
            Delete Story
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the story and all its data.
          </DialogDescription>
        </DialogHeader>

        {story && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-800">
                  You are about to delete:
                </p>
                <div className="text-sm text-red-700 space-y-1">
                  <p><span className="font-medium">Story:</span> {story.title}</p>
                  <p><span className="font-medium">Category:</span> {story.category}</p>
                  <p><span className="font-medium">Slides:</span> {story.slides.length} slides</p>
                  <p><span className="font-medium">Views:</span> {story.views.toLocaleString()}</p>
                  <p><span className="font-medium">Status:</span> <span className="capitalize">{story.status}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">This will:</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>Permanently remove the story from the database</li>
                <li>Delete all associated slides and metadata</li>
                <li>Remove the story from public view (if published)</li>
                <li>Cannot be recovered once deleted</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Story
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
