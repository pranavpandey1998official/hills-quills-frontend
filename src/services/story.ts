import { apiClient } from "@/lib/api";
import { Story } from "@/redux/slices/storiesSlice";

// Admin function to fetch all stories
export async function fetchAllStories(cursor: number, limit: number): Promise<Story[]> {
    try {
        const result = await apiClient.get<Story[]>(`/stories/all?cursor=${cursor}&limit=${limit}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching stories:", error);
        // Return mock data for now (from the slice)
        return [
            {
                id: "1",
                title: "10 Amazing Travel Destinations for 2024",
                category: "travel",
                description: "Discover breathtaking places to visit this year",
                tags: ["Travel", "Adventure", "2024"],
                slides: [
                    {
                        id: "1",
                        image: "/placeholder.svg?height=400&width=300",
                        title: "Bali, Indonesia",
                        description: "Paradise on Earth",
                        duration: 5,
                    },
                    {
                        id: "2",
                        image: "/placeholder.svg?height=400&width=300",
                        title: "Santorini, Greece",
                        description: "Stunning sunsets",
                        duration: 5,
                    },
                ],
                status: "published",
                views: 2500,
                createdAt: "2024-01-15T10:00:00Z",
                updatedAt: "2024-01-15T10:00:00Z",
                isTrending: true,
            },
            {
                id: "2",
                title: "Healthy Breakfast Ideas",
                category: "food",
                description: "Start your day with nutritious meals",
                tags: ["Health", "Food", "Breakfast"],
                slides: [
                    {
                        id: "1",
                        image: "/placeholder.svg?height=400&width=300",
                        title: "Avocado Toast",
                        description: "Rich in healthy fats",
                        duration: 5,
                    },
                ],
                status: "draft",
                views: 0,
                createdAt: "2024-01-14T15:30:00Z",
                updatedAt: "2024-01-14T15:30:00Z",
                isTrending: false,
            },
            {
                id: "3",
                title: "Best Fashion Trends 2024",
                category: "fashion",
                description: "Stay updated with the latest fashion trends",
                tags: ["Fashion", "Style", "2024"],
                slides: [
                    {
                        id: "1",
                        image: "/placeholder.svg?height=400&width=300",
                        title: "Spring Collection",
                        description: "Fresh and vibrant colors",
                        duration: 6,
                    },
                    {
                        id: "2",
                        image: "/placeholder.svg?height=400&width=300",
                        title: "Summer Trends",
                        description: "Light and breezy fabrics",
                        duration: 5,
                    },
                    {
                        id: "3",
                        image: "/placeholder.svg?height=400&width=300",
                        title: "Accessories",
                        description: "Complete your look",
                        duration: 4,
                    },
                ],
                status: "pending",
                views: 150,
                createdAt: "2024-01-13T09:15:00Z",
                updatedAt: "2024-01-13T09:15:00Z",
                isTrending: false,
            },
            {
                id: "4",
                title: "Tech Innovations of 2024",
                category: "technology",
                description: "Explore the cutting-edge technology trends",
                tags: ["Technology", "Innovation", "AI"],
                slides: [
                    {
                        id: "1",
                        image: "/placeholder.svg?height=400&width=300",
                        title: "Artificial Intelligence",
                        description: "The future is here",
                        duration: 7,
                    },
                ],
                status: "rejected",
                views: 50,
                createdAt: "2024-01-12T14:20:00Z",
                updatedAt: "2024-01-12T14:20:00Z",
                isTrending: false,
            },
        ];
    }
}

// Update story status (admin only)
export async function updateStoryStatus(
    storyId: string, 
    status: "draft" | "pending" | "published" | "rejected", 
    rejectionReason?: string
): Promise<Story> {
    try {
        const payload: any = { status };
        
        if (status === "rejected" && rejectionReason) {
            payload.rejection_reason = rejectionReason;
        }
        
        const result = await apiClient.patch<Story>(`/stories/${storyId}/status`, payload);
        return result.data;
    } catch (error) {
        console.error("Error updating story status:", error);
        // Return mock updated story for now
        throw new Error("Failed to update story status");
    }
}

// Get single story by ID
export async function fetchStoryById(id: string): Promise<Story> {
    try {
        const result = await apiClient.get<Story>(`/stories/${id}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching story:", error);
        throw new Error("Failed to fetch story");
    }
}

// Update story content (admin/author)
export async function updateStory(
    id: string,
    updates: {
        title?: string;
        description?: string;
        category?: string;
        tags?: string[];
        slides?: any[];
    }
): Promise<Story> {
    try {
        const result = await apiClient.patch<Story>(`/stories/${id}`, updates);
        return result.data;
    } catch (error) {
        console.error("Error updating story:", error);
        throw new Error("Failed to update story");
    }
}

// Delete story (admin only)
export async function deleteStory(id: string): Promise<void> {
    try {
        await apiClient.delete(`/stories/${id}`);
    } catch (error) {
        console.error("Error deleting story:", error);
        throw new Error("Failed to delete story");
    }
}

// Toggle trending status (admin only)
export async function toggleStoryTrending(id: string): Promise<Story> {
    try {
        const result = await apiClient.patch<Story>(`/stories/${id}/trending`, { status: true });
        return result.data;
    } catch (error) {
        console.error("Error toggling story trending:", error);
        throw new Error("Failed to toggle story trending");
    }
}
