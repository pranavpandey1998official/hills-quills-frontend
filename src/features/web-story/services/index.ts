import { apiClient } from "@/lib/api";
import { StorySchema, Story, SlideSchema, Slide, StoryView } from "@/features/web-story/types";
import { Status } from "@/types/common";
import { Region } from "@/types/common";
import { Category } from "@/types/common";
import { StoryViewSchema } from "@/features/web-story/types";
import { SlideForm } from "@/features/web-story/component/story-form";

// Admin function to fetch all stories
export async function fetchAllStories(cursor: number, limit: number): Promise<Story[]> {
    const result = await apiClient.get<Story[]>(`/web_stories/all?cursor=${cursor}&limit=${limit}`);
    return result.data.map((item: any) => StorySchema.parse(item));
}

export type SlideRequest = {
    slide_order: number;
    image_url: string;
    caption: string;
    duration: number;
}

export async function createStory(authorId: number, title: string, region: Region, category: Category, tags: string[], slides: SlideRequest[], cover_image_url: string, status: Status): Promise<Story> {
    const result = await apiClient.post<Story>('/web_stories', {
        authorId,
        title,
        region,
        category,
        status,
        tags,
        slides,
        cover_image_url,
    });
    return StorySchema.parse(result.data);
}

export async function updateStoryStatus(id: number, status: Status, rejectionReason?: string): Promise<Story> {
    const result = await apiClient.put<Story>(`/web_stories/${id}/status`, {
        status,
        rejection_reason: rejectionReason,
    });
    return StorySchema.parse(result.data);
}

export async function deleteStory(id: number): Promise<Story> {
    const result =await apiClient.delete(`/web_stories/${id}`);
    return StorySchema.parse(result.data);
}

export async function fetchTagsForStory(id: number): Promise<string[]> {
    const result = await apiClient.get<string[]>(`/web_stories/tags/${id}`);
    return result.data;
}

export async function fetchSlidesForStory(id: number): Promise<Slide[]> {
    const result = await apiClient.get<Slide[]>(`/web_stories/slides/${id}`);
    return result.data.map((item: any) => SlideSchema.parse(item));
}

export async function fetchStoryById(id: number): Promise<StoryView> {
    const result = await apiClient.get<StoryView>(`/web_stories/${id}`);
    return StoryViewSchema.parse(result.data);  
}


export async function fetchLatestWebStories(cursor: number, limit: number): Promise<Story[]> {
    const result = await apiClient.get<Story[]>(`/web_stories/approved/latest?cursor=${cursor}&limit=${limit}`);
    return result.data.map((item: any) => StorySchema.parse(item));
}