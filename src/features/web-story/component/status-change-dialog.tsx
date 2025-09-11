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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertTriangle, XCircle } from "lucide-react"
import { Story } from "@/features/web-story/types"
import { Status } from "@/types/common"

interface StatusChangeDialogProps {
  open: boolean
  story?: Story
  newStatus?: Status
  onConfirm: (rejectionReason?: string) => void
  onCancel: () => void
}

export function StatusChangeDialog({
  open,
  story,
  newStatus,
  onConfirm,
  onCancel,
}: StatusChangeDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    
    if (newStatus === Status.Rejected) {
      if (!rejectionReason.trim()) {
        // Don't submit if rejection reason is empty for rejection
        setIsSubmitting(false)
        return
      }
      onConfirm(rejectionReason.trim())
    } else {
      onConfirm()
    }
    
    setIsSubmitting(false)
    setRejectionReason("")
  }

  const handleCancel = () => {
    setRejectionReason("")
    onCancel()
  }

  const getStatusInfo = () => {
    switch (newStatus) {
      case Status.Approved:
        return {
          title: "Approve Story",
          description: "This will make the story publicly visible to all users.",
          buttonText: "Approve Story",
          buttonClass: "bg-green-600 hover:bg-green-700",
          icon: null,
        }
      case Status.Pending:
        return {
          title: "Set Story to Pending",
          description: "This will change the story status to pending review.",
          buttonText: "Set Pending",
          buttonClass: "bg-yellow-600 hover:bg-yellow-700",
          icon: null,
        }
      case Status.Rejected:
        return {
          title: "Reject Story",
          description: "This will reject the story and notify the author. Please provide a reason for rejection.",
          buttonText: "Reject Story",
          buttonClass: "bg-red-600 hover:bg-red-700",
          icon: <XCircle className="h-5 w-5 text-red-500" />,
        }
      case Status.Draft:
        return {
          title: "Set Story to Draft",
          description: "This will change the story status to draft.",
          buttonText: "Set Draft",
          buttonClass: "bg-gray-600 hover:bg-gray-700",
          icon: null,
        }
      default:
        return {
          title: "Change Status",
          description: "Are you sure you want to change this story's status?",
          buttonText: "Confirm",
          buttonClass: "",
          icon: null,
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {statusInfo.icon}
            {statusInfo.title}
          </DialogTitle>
          <DialogDescription>
            {statusInfo.description}
          </DialogDescription>
        </DialogHeader>

        {story && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Story:</span> {story.title}</p>
              <p><span className="font-medium">Category:</span> {story.category}</p>
              <p><span className="font-medium">Current Status:</span> <span className="capitalize">{story.status}</span></p>
              <p><span className="font-medium">Created:</span> {new Date(story.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {newStatus === Status.Rejected && (
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">
              Rejection Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="rejection-reason"
              placeholder="Please provide a clear reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              This reason will be shared with the author to help them improve their story.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting || (newStatus === Status.Rejected && !rejectionReason.trim())}
            className={statusInfo.buttonClass}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Processing...
              </>
            ) : (
              statusInfo.buttonText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
