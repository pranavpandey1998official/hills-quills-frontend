import { useState } from "react"
import { ArticleFormState } from "../articles/components/ArticleForm"
import { createArticle } from "@/services/article"
import { ArticleStatus } from "@/types/articles"
import { useCreateArticle } from "./article"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const ArticleFormStateInitial = {
    title: "",
    imageFile: undefined,
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
            await createArticle(formData.title, formData.content, 0, formData.tags, ArticleStatus.Approved, formData.category! , formData.region!, formData.imageFile!)
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
            await createArticle(formData.title, formData.content, 0, formData.tags, ArticleStatus.Draft, formData.category!, formData.region!, formData.imageFile!)
            toast.success("Article saved as draft")
            router.push("/admin/articles")
        } catch (error) {
            toast.error("Failed to save article as draft")
        }
    }

    return { formData, handleChange, handleReset, handlePublish, handleSaveDraft, isCreating }
}