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
import { Article } from "@/features/article/types"
import { StatusBadge } from "../../../components/molecules/status-badge"

interface ArticleRejectionReasonDialogProps {
  open: boolean
  article?: Article
  onConfirm: (rejectionReason?: string) => Promise<void>
  closeDialog: () => void
}

export function ArticleRejectionReasonDialog({
  open,
  article,
  onConfirm,
  closeDialog,
}: ArticleRejectionReasonDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    
    await onConfirm(rejectionReason.trim())
    
    setIsSubmitting(false)
    setRejectionReason("")
  }

  const handleCancel = () => {
    setRejectionReason("")
    closeDialog()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
          <XCircle className="h-6 w-6 text-red-500" />
            <div>
              <DialogTitle className="text-red-600">
                Change Article Status
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to Reject this article?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {article && (
          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <h4 className="font-medium">{article.title}</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Article ID: {article.id}</p>
              <p>Author ID: {article.author_id}</p>
              <p>Current Status: <StatusBadge status={article.status} /></p>
              <p>Category: {article.category}</p>
              <p>Region: {article.region}</p>
            </div>
          </div>
        )}
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Rejection Reason Required</h4>
                <p className="text-sm text-red-700 mt-1">
                  Please provide a clear reason for rejecting this article. This will help the author understand what needs to be improved.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">Rejection Reason</Label>
            <Textarea
              id="rejection-reason"
              placeholder="Explain why this article is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Be specific about what needs to be changed or improved.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              isSubmitting || !rejectionReason.trim()
            }
            variant="destructive"
          >
            {isSubmitting ? "Processing..." : `Confirm Rejection`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
