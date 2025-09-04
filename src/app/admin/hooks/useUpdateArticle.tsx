import { useCallback, useState } from "react"
import { useTagsForArticle } from "./article"
import { useUpdateArticle } from "./article"
import { Region } from "@/types/articles"
import { Category } from "@/types/articles"
import { Article } from "@/types/articles"
import { ArticleFormState } from "../articles/components/ArticleForm"
import { dequal } from 'dequal';
import { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare"
import { toast } from "sonner"
import { ArticleUpdates } from "@/types/articles"


export const useUpdateArticleFrom = (article?: Article) => {
  const [isLoading, setIsLoading] = useState(false)
  const { updateArticle, isLoading: isUpdating } = useUpdateArticle()
  const { tags: articleTags } = useTagsForArticle(article?.id)

  const [formData, setFormData] = useState<ArticleFormState>({
    title: article?.title || "",
    imageFile: undefined,
    tags: articleTags,
    region: article?.region || undefined,
    category: article?.category || undefined,
    content: article?.content || "",
  })

  useDeepCompareEffect(() => {
    if (!article) {
      return
    }
    setFormData({
      title: article.title,
      imageFile: undefined,
      tags: articleTags,
      region: article.region,
      category: article.category,
      content: article.content,
    })
  }, [article])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    if (!article) {
      return
    }
    setFormData({
        title: article.title,
        imageFile: undefined,
        tags: articleTags,
        region: article.region,
        category: article.category,
        content: article.content,
    })
  }

  const hasChanges = useDeepCompareMemo(() => {
    return !dequal(formData, article)
  }, [formData, article])

  const handleUpdate = useDeepCompareCallback(async () => {
    if (!article) return

    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }
    if (!formData.content.trim()) {
      toast.error("Content is required")
      return
    }
    if (!formData.category) {
      toast.error("Category is required")
      return
    }
    if (!formData.region) {
      toast.error("Region is required")
      return
    }
    const updatedArticle: ArticleUpdates = {}

    if (formData.imageFile) {
      updatedArticle.imageFile = formData.imageFile
    }
    if(!dequal(formData.tags, articleTags)) {
      updatedArticle.tags = formData.tags
    }
    if(formData.category !== article?.category) {
      updatedArticle.category = formData.category
    }
    if(formData.region !== article.region) {
      updatedArticle.region = formData.region
    }
    if(formData.title !== article.title) {
      updatedArticle.title = formData.title
    }
    if(formData.content !== article.content) {
      updatedArticle.content = formData.content
    }
    if(Object.keys(updatedArticle).length != 0) {
      try {
        await updateArticle(article.id, updatedArticle)
        toast.success("Article updated successfully")
      } catch (error: any) {
        toast.error("Failed to update article", error?.message)
      }
    }
  }, [article, formData])

  return { formData, handleChange, isLoading, isUpdating, handleUpdate, handleReset, hasChanges }
}