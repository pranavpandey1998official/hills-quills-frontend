import { useState } from "react"
import { StoryFormState } from "@/features/web-story/component/story-form"
import { Slide, SlideUpdates, Story } from "@/features/web-story/types"
import { useUpdateStory, useTagsForStory, useSlidesForStory, useDeleteSlidesForStory, useCreateSlidesForStory } from "@/features/web-story/hooks"
import { useDeepCompareCallback, useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare"
import { PREVIEW_STORY_IMAGE } from "@/types/common"
import { SlideForm } from "@/features/web-story/component/story-form"
import { dequal } from "dequal"
import { toast } from "sonner"
import { StoryUpdates } from "@/features/web-story/types"
import { apiClient } from "@/lib/api"
import { updateSlide } from "../services"


const slidesFormFromSlides = (slides: Slide[]) : SlideForm[] => {
    return slides.map((slide) => ({
        id: slide.id,
        slide_order: slide.slide_order,
        image: slide.image_url,
        caption: slide.caption,
        duration: slide.duration,
    }))
}

const findSlideDifference = (previousSlides: SlideForm[], newSlides: SlideForm[]) => {

const prevMap = new Map(previousSlides.map(item => [item.id, item]));
  const newMap = new Map(newSlides.map(item => [item.id, item]));

  const created: SlideForm[] = [];
  const deleted: SlideForm[] = [];
  const updated: SlideForm[] = [];

  // Find created + updated
    for (const curr of newSlides) {
        const prev = prevMap.get(curr.id);
        if (!prev) {
        created.push(curr);
        } else {
        // Check if something other than id differs
        const isDifferent =
            curr.caption !== prev.caption ||
            curr.duration !== prev.duration ||
            curr.slide_order !== prev.slide_order ||
            curr.image !== prev.image; // if ImageFile, adjust comparison
        if (isDifferent) {
            updated.push(curr);
        }
        }
    }

    // Find deleted
    for (const prev of previousSlides) {
        if (!newMap.has(prev.id)) {
        deleted.push(prev);
        }
    }

    return { created, deleted, updated };
    }

export const useUpdateStoryForm = (story?: Story) => {
    const [isLoading, setIsLoading] = useState(true)
    const { updateStory, isLoading: isUpdating } = useUpdateStory()
    const { tags: storyTags, isLoading: isLoadingTags } = useTagsForStory(story?.id)
    const { slides: storySlides, isLoading: isLoadingSlides } = useSlidesForStory(story?.id)
    const { deleteSlidesForStory, isLoading: isDeletingSlides } = useDeleteSlidesForStory()
    const { createSlidesForStory, isLoading: isCreatingSlides } = useCreateSlidesForStory()

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
        if(!formData.title.trim()) {
            toast.error("Title is required")
            return
        }
        if(!formData.category) {
            toast.error("Category is required")
            return
        }
        if(!formData.region) {
            toast.error("Region is required")
            return
        }

        const updatedStory: StoryUpdates = {}

        if(formData.cover_image.previewUrl !== story?.cover_image_url.previewUrl) {
            updatedStory.imageFile = formData.cover_image
        }
        if(formData.title !== story.title) {
            updatedStory.title = formData.title
        }
        if(formData.category !== story.category) {
            updatedStory.category = formData.category
        }
        if(formData.region !== story.region) {
            updatedStory.region = formData.region
        }
        if(!dequal(formData.tags, storyTags)) {
            updatedStory.tags = formData.tags
        }
        if(Object.keys(updatedStory).length != 0) {
            await updateStory(story.id, updatedStory)
            toast.success("Story updated successfully")
        }
        const { created, deleted, updated } = findSlideDifference(slidesFormFromSlides(storySlides), formData.slides)
        if(deleted.length > 0) {
            await deleteSlidesForStory({storyId: story.id, slides: deleted})
        }
        if(created.length > 0) {
            await createSlidesForStory({storyId: story.id, slides: created})
        }
        if(updated.length > 0) {
            for(const updatedSlide of updated) {
                const previousSlide = storySlides.find((slide) => slide.id === updatedSlide.id)
                if(!previousSlide) {
                    continue
                }
                await updateSlides( {
                    id: previousSlide.id,
                    slide_order: previousSlide.slide_order,
                    image: previousSlide.image_url,
                    caption: previousSlide.caption,
                    duration: previousSlide.duration,
                }, updatedSlide)
            }
        }
    }, [story, formData])

    return { formData, isLoading, isUpdating, handleChange, handleReset, hasChanges, handleUpdate }
}



const updateSlides = async (previousSlide: SlideForm, newSlide: SlideForm) => {
    const updatedSlide: SlideUpdates = {}
    if(previousSlide.image !== newSlide.image) {
        const uploadResponse = await apiClient.uploadImage(newSlide.image.file!);
        updatedSlide.image_url = uploadResponse.data.url;
    }
    if(previousSlide.caption !== newSlide.caption) {
        updatedSlide.caption = newSlide.caption;
    }
    if(previousSlide.duration !== newSlide.duration) {
            updatedSlide.duration = newSlide.duration;
    }
    if(previousSlide.slide_order !== newSlide.slide_order) {
        updatedSlide.slide_order = newSlide.slide_order;
    }
    if(Object.keys(updatedSlide).length > 0) {
        await updateSlide(previousSlide.id, updatedSlide)
    }
}