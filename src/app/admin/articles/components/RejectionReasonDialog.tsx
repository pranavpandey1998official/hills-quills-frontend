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
import { Badge } from "@/components/ui/badge"
import { XCircle, Calendar, User } from "lucide-react"
import { Article } from "@/types/articles"

interface RejectionReasonDialogProps {
  open: boolean
  article?: Article
  closeDialog: () => void
}

export function RejectionReasonDialog({
  open,
  article,
  closeDialog,
}: RejectionReasonDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <XCircle className="h-6 w-6 text-red-500" />
            <div>
              <DialogTitle className="text-red-600">Article Rejection Details</DialogTitle>
              <DialogDescription>
                Review why this article was rejected and what needs to be improved.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {article && (
          <div className="space-y-4">
            {/* Article Info */}
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-lg">{article.title}</h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Author ID:</span>
                    <span>{article.author_id}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Created:</span>
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{article.category}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Region:</span>
                    <Badge variant="secondary">{article.region}</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Rejection Reason */}
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium text-red-800">Rejection Reason</h4>
                </div>
                
                {article.rejection_reason ? (
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                      {article.rejection_reason}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-muted-foreground italic">
                      No specific rejection reason was provided.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Info */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="space-y-2">
                <h4 className="font-medium text-blue-800">Next Steps</h4>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>The author can edit their article to address the concerns</li>
                  <li>Once updated, the article can be resubmitted for review</li>
                  <li>The article status can be changed back to "Pending" for re-evaluation</li>
                </ul>
              </div>
            </div>

            {article.updated_at !== article.created_at && (
              <div className="text-xs text-muted-foreground">
                Last updated: {formatDate(article.updated_at)}
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button onClick={closeDialog}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
