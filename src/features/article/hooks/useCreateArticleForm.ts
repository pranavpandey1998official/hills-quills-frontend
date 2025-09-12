import { useState } from "react"
import { ArticleFormState } from "@/features/article/component/article-form"
import { createArticle } from "@/features/article/services"
import { Status } from "@/types/common"
import { useCreateArticle } from "@/features/article/hooks"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { PREVIEW_ARTICLE_IMAGE } from "@/types/common"


const ArticleFormStateInitial = {
    title: "",
    imageFile: PREVIEW_ARTICLE_IMAGE,
    tags: [] as string[],
    region: undefined,
    category: undefined,
    content: "",
} as ArticleFormState

export const useCreateArticleForm = () => {
    const [formData, setFormData] = useState<ArticleFormState>(ArticleFormStateInitial)
    const router = useRouter()

    const [createArticle, isCreating] = useCreateArticle();

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleReset = () => {
        setFormData(ArticleFormStateInitial)
    }

    const validateForm = () => {
        if (!formData.title) {
            toast.error("Title is required")
            return false
        }
        if (!formData.content) {
            toast.error("Content is required")
            return false
        }
        if (!formData.category) {
            toast.error("Category is required")
            return false
        }
        if (!formData.region) {
            toast.error("Region is required")
            return false
        }
        if (!formData.imageFile) {
            toast.error("Image is required")
            return false
        }
        return true
    }

    const handlePublish = async() => {
        if (!validateForm()) {
            return
        }
        try {
            await createArticle(formData.title, formData.content, 0, formData.tags, Status.Approved, formData.category! , formData.region!, formData.imageFile!)
            toast.success("Article published successfully")
            router.push("/admin/articles")
        } catch (error) {
            toast.error("Failed to publish article")
        }
    }

    const handleSaveDraft = async () => {
        if (!validateForm()) {
            return
        }
        try {
            await createArticle(formData.title, formData.content, 0, formData.tags, Status.Draft, formData.category!, formData.region!, formData.imageFile!)
            toast.success("Article saved as draft")
            router.push("/admin/articles")
        } catch (error) {
            toast.error("Failed to save article as draft")
        }
    }

    return { formData, handleChange, handleReset, handlePublish, handleSaveDraft, isCreating }
}