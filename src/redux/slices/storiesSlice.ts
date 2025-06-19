import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface StorySlide {
  id: string
  image: string
  title: string
  description: string
  duration: number
}

interface Story {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  slides: StorySlide[]
  status: "draft" | "pending" | "published" | "rejected"
  views: number
  createdAt: string
  updatedAt: string
  isTrending: boolean
}

interface StoriesState {
  items: Story[]
  currentStory: Story | null
  isLoading: boolean
  error: string | null
  totalCount: number
  currentPage: number
}

const initialState: StoriesState = {
  items: [
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
  ],
  currentStory: null,
  isLoading: false,
  error: null,
  totalCount: 2,
  currentPage: 1,
}

export const fetchMyStories = createAsyncThunk(
  "stories/fetchMine",
  async (params: { page: number; limit: number; status: string; category?: string; search?: string }) => {
    try {
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
        status: params.status,
        ...(params.category && params.category !== "all" && { category: params.category }),
        ...(params.search && { search: params.search }),
      })

      const response = await fetch(`https://your-api-url.com/api/author/stories?${queryParams}`)

      if (!response.ok) {
        throw new Error("Failed to fetch stories")
      }

      const data = await response.json()
      return {
        stories: data.stories,
        totalCount: data.totalCount,
      }
    } catch (error) {
      console.error("Error fetching stories:", error)
      // Return mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        stories: initialState.items,
        totalCount: initialState.items.length,
      }
    }
  },
)

export const fetchStoryById = createAsyncThunk("stories/fetchById", async (id: string) => {
  try {
    const response = await fetch(`https://your-api-url.com/api/author/stories/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch story")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching story:", error)
    // Return mock data for now
    await new Promise((resolve) => setTimeout(resolve, 500))
    return initialState.items.find((item) => item.id === id) || null
  }
})

export const createStory = createAsyncThunk(
  "stories/create",
  async (data: Omit<Story, "id" | "createdAt" | "updatedAt" | "views" | "isTrending">) => {
    try {
      const response = await fetch("https://your-api-url.com/api/author/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create story")
      }

      return await response.json()
    } catch (error) {
      console.error("Error creating story:", error)
      // Return mock data for now
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        ...data,
        id: Date.now().toString(),
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isTrending: false,
      }
    }
  },
)

export const updateStory = createAsyncThunk(
  "stories/update",
  async ({ id, data }: { id: string; data: Partial<Story> }) => {
    try {
      const response = await fetch(`https://your-api-url.com/api/author/stories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update story")
      }

      return await response.json()
    } catch (error) {
      console.error("Error updating story:", error)
      // Return mock data for now
      await new Promise((resolve) => setTimeout(resolve, 800))
      return { id, data }
    }
  },
)

export const deleteStory = createAsyncThunk("stories/delete", async (id: string) => {
  try {
    const response = await fetch(`https://your-api-url.com/api/author/stories/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete story")
    }

    return id
  } catch (error) {
    console.error("Error deleting story:", error)
    // Return mock data for now
    await new Promise((resolve) => setTimeout(resolve, 500))
    return id
  }
})

export const resubmitStory = createAsyncThunk("stories/resubmit", async (id: string) => {
  try {
    const response = await fetch(`https://your-api-url.com/api/author/stories/${id}/resubmit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to resubmit story")
    }

    return id
  } catch (error) {
    console.error("Error resubmitting story:", error)
    // Return mock data for now
    await new Promise((resolve) => setTimeout(resolve, 500))
    return id
  }
})

export const publishStory = createAsyncThunk("stories/publish", async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

export const toggleTrending = createAsyncThunk("stories/toggleTrending", async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

// Admin actions for web stories
export const fetchWebStories = createAsyncThunk("stories/fetchAdmin", async () => {
  try {
    const response = await fetch("https://your-api-url.com/api/admin/stories")

    if (!response.ok) {
      throw new Error("Failed to fetch web stories")
    }

    const data = await response.json()
    return data.stories
  } catch (error) {
    console.error("Error fetching web stories:", error)
    throw error
  }
})

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyStories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchMyStories.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.stories
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchMyStories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch stories"
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.currentStory = action.payload
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.data }
        }
        if (state.currentStory?.id === action.payload.id) {
          state.currentStory = { ...state.currentStory, ...action.payload.data }
        }
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
      .addCase(resubmitStory.fulfilled, (state, action) => {
        const story = state.items.find((item) => item.id === action.payload)
        if (story) {
          story.status = "pending"
        }
      })
      .addCase(publishStory.fulfilled, (state, action) => {
        const story = state.items.find((item) => item.id === action.payload)
        if (story) {
          story.status = "published"
        }
      })
      .addCase(toggleTrending.fulfilled, (state, action) => {
        const story = state.items.find((item) => item.id === action.payload)
        if (story) {
          story.isTrending = !story.isTrending
        }
      })
      .addCase(fetchWebStories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchWebStories.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
  },
})

export default storiesSlice.reducer
