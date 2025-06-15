import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface WebStory {
  id: string | number
  title: string
  author_id: number
  author_name: string
  status: "published" | "draft" | "archived"
  created_at: string
  updated_at: string
  views_count: number
  thumbnail: string | null
}

interface StoriesState {
  items: WebStory[]
  isLoading: boolean
  error: string | null
  totalCount: number
}

const initialState: StoriesState = {
  items: [
    {
      id: "1",
      title: "Best Summer Fashion Trends of 2024",
      author_id: 1,
      author_name: "Jane Smith",
      status: "published",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z",
      views_count: 1240,
      thumbnail: "/stories/fashion-thumbnail.jpg",
    },
    {
      id: "2",
      title: "5 Must-Visit Travel Destinations",
      author_id: 2,
      author_name: "John Doe",
      status: "published",
      created_at: "2024-01-13T14:45:00Z",
      updated_at: "2024-01-13T14:45:00Z",
      views_count: 980,
      thumbnail: "/stories/travel-thumbnail.jpg",
    },
    {
      id: "3",
      title: "Healthy Recipes for Busy Professionals",
      author_id: 3,
      author_name: "Mike Johnson",
      status: "draft",
      created_at: "2024-01-10T09:20:00Z",
      updated_at: "2024-01-10T09:20:00Z",
      views_count: 0,
      thumbnail: "/stories/food-thumbnail.jpg",
    },
  ],
  isLoading: false,
  error: null,
  totalCount: 3,
}

export const fetchWebStories = createAsyncThunk("stories/fetch", async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/web-stories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch web stories")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch web stories")
    }

    return {
      stories: data.data.stories || data.data,
      totalCount: data.data.total || data.data.length,
    }
  } catch (error) {
    console.error("Error fetching web stories:", error)
    throw error
  }
})

export const updateStoryStatus = createAsyncThunk(
  "stories/updateStatus", 
  async ({ id, status }: { id: string; status: WebStory['status'] }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/web-stories/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update story status")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to update story status")
      }

      return { id, status }
    } catch (error) {
      console.error("Error updating story status:", error)
      throw error
    }
  }
)

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebStories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWebStories.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.stories
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchWebStories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch stories"
      })
      .addCase(updateStoryStatus.fulfilled, (state, action) => {
        const story = state.items.find((item) => item.id === action.payload.id)
        if (story) {
          story.status = action.payload.status
        }
      })
  },
})

export default storiesSlice.reducer
