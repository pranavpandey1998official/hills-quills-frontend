"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Story } from "@/redux/slices/storiesSlice"

interface RejectionReasonDialogProps {
  open: boolean
  story?: Story
  onClose: () => void
}

export function RejectionReasonDialog({
  open,
  story,
  onClose,
}: RejectionReasonDialogProps) {
  // Note: In a real implementation, you'd have a rejection_reason field in the Story type
  // For now, we'll use a placeholder
  const rejectionReason = "Content quality issues: The story needs better image resolution and more engaging content structure."

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Rejection Reason
          </DialogTitle>
          <DialogDescription>
            View why this story was rejected.
          </DialogDescription>
        </DialogHeader>

        {story && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Story:</span> {story.title}</p>
              <p><span className="font-medium">Category:</span> {story.category}</p>
              <p><span className="font-medium">Status:</span> <span className="capitalize text-red-600">{story.status}</span></p>
              <p><span className="font-medium">Created:</span> {new Date(story.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Rejection Reason:</h4>
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-800">
              {rejectionReason}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            The author has been notified of this rejection reason and can make improvements before resubmitting.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
