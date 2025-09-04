import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { API_BASE_URL } from "@/types/constant"
import {Author, AuthorsState} from "@/types/author"



const initialState: AuthorsState = {
  items: [],
  profile: null,  // Initialize profile as null
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
  perPage: 10
}

export const fetchAuthorMe = createAsyncThunk(
  "author/fetchMe",
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/author/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch author profile")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch author profile")
      }

      return data.data
    } catch (error) {
      console.error("Error fetching author profile:", error)
      throw error
    }
  }
)

export const fetchAuthorsByAdmin = createAsyncThunk(
  "authors/fetchByAdmin",
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/authors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch authors")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch authors")
      }
      
      // Transform authors to match our frontend model
      const authors = data.data.authors.map((author: any) => ({
        ...author,
        status: author.is_active ? "active" : "inactive",
      }))
      
      return {
        authors,
        pagination: data.data.pagination || {
          current_page: 1,
          total_pages: 1,
          total_count: authors.length,
          per_page: 10
        }
      }
    } catch (error) {
      console.error("Error fetching authors:", error)
      throw error
    }
  }
)

export const createAuthorByAdmin = createAsyncThunk(
  "authors/createByAdmin",
  async (authorData: Partial<Author>) => {
    try {
      // Transform frontend model to match backend expectations
      const apiData: any = { ...authorData }
      
      // Convert status to is_active if present
      if (apiData.status) {
        apiData.is_active = apiData.status === "active" ? 1 : 0
        delete apiData.status
      }
      
      const response = await fetch(`${API_BASE_URL}/admin/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        throw new Error("Failed to create author")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to create author")
      }
      
      // Transform returned author to match frontend model
      return {
        ...data.data,
        status: data.data.is_active ? "active" : "inactive"
      }
    } catch (error) {
      console.error("Error creating author:", error)
      throw error
    }
  }
)

export const updateAuthorMe = createAsyncThunk("author/updateMe", async (authorData: Partial<Author>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/authors/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(authorData),
      })

      if (!response.ok) {
        throw new Error("Failed to update author profile")
      }

      const responseData = await response.json()
      if (!responseData.success) {
        throw new Error(responseData.message || "Failed to update author profile")
      }

      return responseData.data
    } catch (error) {
      console.error("Error updating author profile:", error)
      throw error
    }
  }
)

export const updateAuthorByAdmin = createAsyncThunk(
  "authors/updateByAdmin",
  async ({ id, data }: { id: string | number; data: Partial<Author> }) => {
    try {
      // Transform frontend model to match backend expectations
      const apiData: any = { ...data }
      
      // Convert status to is_active if present
      if (apiData.status) {
        apiData.is_active = apiData.status === "active" ? 1 : 0
        delete apiData.status
      }
      
      const response = await fetch(`${API_BASE_URL}/admin/authors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        throw new Error("Failed to update author")
      }

      const responseData = await response.json()
      if (!responseData.success) {
        throw new Error(responseData.message || "Failed to update author")
      }
      
      return { id, ...data }
    } catch (error) {
      console.error("Error updating author:", error)
      throw error
    }
  }
)

export const toggleAuthorStatus = createAsyncThunk(
  "authors/toggleStatus",
  async ({ id, isActive }: { id: string | number; isActive: boolean }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/authors/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ is_active: isActive ? true : false }),
      })

      if (!response.ok) {
        throw new Error("Failed to toggle author status")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to toggle author status")
      }
      
      return { id, isActive }
    } catch (error) {
      console.error("Error toggling author status:", error)
      throw error
    }
  }
)

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorMe.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAuthorMe.fulfilled, (state, action) => {
        state.isLoading = false
        // Set the profile field for current author
        state.profile = action.payload
        // Also update in items array if needed
        const index = state.items.findIndex(item => String(item.id) === String(action.payload.id))
        if (index !== -1) {
          state.items[index] = action.payload
        } else {
          state.items.push(action.payload)
        }
      })
      .addCase(fetchAuthorMe.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch author profile"
      })
      .addCase(updateAuthorMe.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateAuthorMe.fulfilled, (state, action) => {
        state.isLoading = false
        // Update the profile field
        state.profile = action.payload
        // Also update in items array
        const index = state.items.findIndex(item => String(item.id) === String(action.payload.id))
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload }
        }
      })
      .addCase(updateAuthorMe.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to update author profile"
      })
      .addCase(fetchAuthorsByAdmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAuthorsByAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.authors
        state.totalCount = action.payload.pagination.total_count
        state.currentPage = action.payload.pagination.current_page
        state.totalPages = action.payload.pagination.total_pages
        state.perPage = action.payload.pagination.per_page
      })
      .addCase(fetchAuthorsByAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch authors"
      })
      .addCase(createAuthorByAdmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createAuthorByAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.items.push(action.payload)
        state.totalCount += 1
      })
      .addCase(createAuthorByAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to create author"
      })
      .addCase(updateAuthorByAdmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateAuthorByAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.items.findIndex(item => String(item.id) === String(action.payload.id))
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload }
        }
      })
      .addCase(updateAuthorByAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to update author"
      })
      .addCase(toggleAuthorStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(toggleAuthorStatus.fulfilled, (state, action) => {
        state.isLoading = false
        const author = state.items.find((item) => String(item.id) === String(action.payload.id))
        if (author) {
          // Update is_active field directly
          author.is_active = action.payload.isActive ? 1 : 0
          // Also update status if it exists (for backward compatibility)
        }
      })
      .addCase(toggleAuthorStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to toggle author status"
      })
  },
})

export default authorsSlice.reducer