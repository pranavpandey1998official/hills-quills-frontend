"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Article } from "@/types/articles"
import ArticleForm from "./ArticleForm"
import { RotateCcw, Save, X } from "lucide-react"
import { useUpdateArticleFrom } from "../../hooks/useUpdateArticle"

interface UpdateArticleDialogProps {
  open: boolean
  article?: Article
  closeDialog: () => void
}

export function UpdateArticleDialog({
  open,
  article,
  closeDialog,
}: UpdateArticleDialogProps) {
  // Form state
  const { formData, handleChange, isLoading, isUpdating, handleUpdate, handleReset, hasChanges } = useUpdateArticleFrom(article!)

  const updateArticleAndDone = async () => {
    await handleUpdate()
    closeDialog()
  }

  if(isLoading) {
    return (
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              Loading...
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Update Article
          </DialogTitle>
          <DialogDescription>
            Make changes to the article content and metadata. You can reset to original values at any time.
          </DialogDescription>
        </DialogHeader>

        {article && (
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Article ID:</span> {article.id}</p>
              <p><span className="font-medium">Author ID:</span> {article.author_id}</p>
              <p><span className="font-medium">Current Status:</span> <span className="capitalize">{article.status}</span></p>
              <p><span className="font-medium">Last Updated:</span> {new Date(article.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-6">
            <ArticleForm
              data={formData}
              onChange={handleChange}
            />
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={isUpdating || !hasChanges}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            
            <Button 
              variant="outline" 
              onClick={closeDialog}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>

          <Button
            onClick={updateArticleAndDone}
            disabled={isUpdating || !hasChanges}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Update Article
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
