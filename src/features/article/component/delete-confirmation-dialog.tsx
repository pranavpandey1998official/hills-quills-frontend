"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, AlertTriangle, Calendar, User } from "lucide-react"
import { Article } from "@/features/article/types"
import { StatusBadge } from "../../../components/molecules/status-badge"
import { useDeleteArticle } from "@/features/article/hooks/"
import { toast } from "sonner"

interface DeleteConfirmationDialogProps {
  open: boolean
  article?: Article
  closeDialog: () => void
}

export function DeleteConfirmationDialog({
  open,
  article,
  closeDialog,
}: DeleteConfirmationDialogProps) {

  const { deleteArticle, isLoading, error } = useDeleteArticle()

  const handleConfirm = async () => {
    if (article) {  
      try {
        await deleteArticle(article.id)
        closeDialog()
      } catch (error: any) {
        toast.error("Failed to delete article", error?.message)
      }
    }
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

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-red-600">Delete Article</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {article && (
          <div className="space-y-4">
            {/* Warning Banner */}
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800">Permanent Deletion</h4>
                  <p className="text-sm text-red-700 mt-1">
                    This will permanently delete the article and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* Article Info */}
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <h4 className="font-medium text-lg">{article.title}</h4>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Article ID:</span>
                    <span className="font-mono">{article.id}</span>
                  </div>
                  
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
                    <span className="text-muted-foreground">Status:</span>
                    <StatusBadge status={article.status} />
                  </div>
                  
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

            {/* Content Preview */}
            {article.content && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <h5 className="font-medium text-sm mb-2">Content Preview:</h5>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.content.length > 200 
                    ? `${article.content.substring(0, 200)}...` 
                    : article.content
                  }
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={closeDialog} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Article
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
