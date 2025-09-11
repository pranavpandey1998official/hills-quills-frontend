import { useState } from "react"
import { StoryFormState } from "../stories/components/StoryForm"
import { Slide, Story } from "@/features/web-story/types"
import { useUpdateStory } from "./story"
import { useTagsForStory } from "./story"
import { useSlidesForStory } from "./story"
import { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare"
import { PREVIEW_STORY_IMAGE } from "@/types/common"
import { SlideForm } from "../stories/components/StoryForm"
import { dequal } from "dequal"


const slidesFormFromSlides = (slides: Slide[]) : SlideForm[] => {
    return slides.map((slide) => ({
        id: slide.slide_order,
        image: slide.image_url,
        caption: slide.caption,
        duration: slide.duration,
    }))
}

export const useUpdateStoryForm = (story?: Story) => {
    const [isLoading, setIsLoading] = useState(true)
    const { updateStory, isLoading: isUpdating } = useUpdateStory()
    const { tags: storyTags, isLoading: isLoadingTags } = useTagsForStory(story?.id)
    const { slides: storySlides, isLoading: isLoadingSlides } = useSlidesForStory(story?.id)

    const [formData, setFormData] = useState<StoryFormState>({
        cover_image: story?.cover_image_url || PREVIEW_STORY_IMAGE,
        title: story?.title || "",
        category: story?.category || undefined,
        region: story?.region || undefined,
        slides: slidesFormFromSlides(storySlides),
        tags: storyTags,
    })

    useDeepCompareEffect(() => {
        if (!story || isLoadingTags || isLoadingSlides) {
            return
        }
        setFormData({
            cover_image: story?.cover_image_url || PREVIEW_STORY_IMAGE,
            title: story?.title || "",
            category: story?.category || undefined,
            region: story?.region || undefined,
            slides: slidesFormFromSlides(storySlides),
            tags: storyTags,
        })
        setIsLoading(false)
    }, [story, storyTags, storySlides])

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleReset = () => {
        if (!story || isLoadingTags || isLoadingSlides) {
            return
        }
        setFormData({
            cover_image: story?.cover_image_url || PREVIEW_STORY_IMAGE,
            title: story?.title || "",
            category: story?.category || undefined,
            region: story?.region || undefined,
            slides: slidesFormFromSlides(storySlides),
            tags: storyTags,
        })
    }

    const hasChanges = useDeepCompareMemo(() => {
        if(formData.cover_image.previewUrl !== story?.cover_image_url.previewUrl) {
            return true
        }
        if(formData.title !== story?.title) {
            return true
        }
        if(formData.category !== story?.category) {
            return true
        }
        if(formData.region !== story?.region) {
            return true
        }
        if(!dequal(formData.slides, slidesFormFromSlides(storySlides))) {
            return true
        }
        if(!dequal(formData.tags, storyTags)) {
            return true
        }
        return false
    }, [formData, story, storyTags, storySlides])

    const handleUpdate = useDeepCompareCallback(async () => {
        if (!story) {
            return
        }
        await updateStory(story.id, formData)
    }, [story, formData])

    return { formData, isLoading, isUpdating, handleChange, handleReset, hasChanges, handleUpdate }
}