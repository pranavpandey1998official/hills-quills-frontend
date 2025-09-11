import { useCallback, useState } from "react"
import { useTagsForArticle } from "@/features/article/hooks"
import { useUpdateArticle } from "@/features/article/hooks"
import { Article } from "@/features/article/types"
import { ArticleFormState } from "../component/article-form"
import { dequal } from 'dequal';
import { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare"
import { toast } from "sonner"
import { ArticleUpdates } from "@/features/article/types"
import { PREVIEW_ARTICLE_IMAGE } from "@/types/common"


export const useUpdateArticleFrom = (article?: Article) => {
  const [isLoading, setIsLoading] = useState(true)
  const { updateArticle, isLoading: isUpdating } = useUpdateArticle()
  const { tags: articleTags, isLoading: isLoadingTags } = useTagsForArticle(article?.id)

  const [formData, setFormData] = useState<ArticleFormState>({
    title: article?.title || "",
    imageFile: article?.image || PREVIEW_ARTICLE_IMAGE,
    tags: [],
    region: article?.region || undefined,
    category: article?.category || undefined,
    content: article?.content || "",
  })

  useDeepCompareEffect(() => {
    if (!article || isLoadingTags) {
      return
    }
    setFormData({
      title: article.title,
      imageFile: article.image,
      tags: articleTags,
      region: article.region,
      category: article.category,
      content: article.content,
    })
    setIsLoading(false)
  }, [article, articleTags])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    if (!article || isLoadingTags) {
      return
    }
    setFormData({
        title: article.title,
        imageFile: article.image,
        tags: articleTags,
        region: article.region,
        category: article.category,
        content: article.content,
    })
  }

  const hasChanges = useDeepCompareMemo(() => {
    if(article?.title !== formData.title) {
      return true
    }
    if(article?.content !== formData.content) {
      return true
    }
    if(article?.category !== formData.category) {
      return true
    }
    if(article?.region !== formData.region) {
      return true
    }
    if(article?.image.previewUrl !== formData.imageFile.previewUrl) {
      return true
    }
    if(!dequal(formData.tags, articleTags)) {
      return true
    }
    return false
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

    if (formData.imageFile.file && formData.imageFile.previewUrl !== article?.image.previewUrl) {
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