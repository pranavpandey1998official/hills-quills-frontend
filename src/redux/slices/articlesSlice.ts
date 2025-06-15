import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { API_BASE_URL } from "@/types/constant"
import { ArticlesState ,ArticleStatus } from "@/types/articles"


const initialState: ArticlesState = {
  items: [
    {
      id: "1",
      author_id: 1,
      title: "Breaking News: Major Development in Tech Industry",
      tags: ["tech", "innovation", "breaking"],
      description: "A major development has occurred in the tech industry.",
      content: "Content of the article about tech development.",
      category: "Technology",
      region: "Global",
      image: "/images/tech.jpg",
      status: ArticleStatus.Pending,
      is_top_news: 0,
      views_count: 120,
      publish_date: null,
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
      author_name: "John Doe",
      author_email: "john@example.com"
    },
    {
      id: "2",
      author_id: 2,
      title: "Local Elections Show Surprising Results",
      tags: ["politics", "elections", "local"],
      description: "The local elections have shown surprising results.",
      content: "Content of the article about local elections.",
      category: "Politics",
      region: "US",
      image: "/images/politics.jpg",
      status: ArticleStatus.Approved,
      is_top_news: 1,
      views_count: 150,
      publish_date: "2024-01-14T15:30:00Z",
      created_at: "2024-01-14T15:30:00Z",
      updated_at: "2024-01-14T15:30:00Z",
      author_name: "Jane Smith",
      author_email: "jane@example.com"
    },
    {
      id: "3",
      author_id: 3,
      title: "Climate Change Impact on Agriculture",
      tags: ["climate", "agriculture", "environment"],
      description: "Climate change is having a significant impact on agriculture.",
      content: "Content of the article about climate change and agriculture.",
      category: "Environment",
      region: "Europe",
      image: "/images/climate.jpg",
      status: ArticleStatus.Rejected,
      is_top_news: 0,
      views_count: 100,
      publish_date: null,
      created_at: "2024-01-13T09:15:00Z",
      updated_at: "2024-01-13T09:15:00Z",
      author_name: "Mike Johnson",
      author_email: "mike@example.com"
    },
  ],
  isLoading: false,
  error: null,
  totalCount: 3,
  currentPage: 1,
}

export const fetchAdminArticles = createAsyncThunk("admin/fetchArticles", async (params: { page: number; limit: number; status: string }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/pending?page=${params.page}&limit=${params.limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
  
      if (!response.ok) {
        throw new Error("Failed to fetch articles")
      }
  
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch articles")
      }
      
      return {
        articles: data.data.articles || data.data,
        totalCount: data.data.total || data.data.length,
      }
    } catch (error) {
      console.error("Error fetching admin articles:", error)
      throw error
    }
})

export const approveArticle = createAsyncThunk("articles/approve", async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/${id}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to approve article")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to approve article")
    }
    
    return id
  } catch (error) {
    console.error("Error approving article:", error)
    throw error
  }
})

export const rejectArticle = createAsyncThunk("articles/reject", async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to reject article")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to reject article")
    }
    
    return id
  } catch (error) {
    console.error("Error rejecting article:", error)
    throw error
  }
})

export const deleteArticle = createAsyncThunk("articles/delete", async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete article")
    }
    
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to delete article")
    }

    return id
  } catch (error) {
    console.error("Error deleting article:", error)
    throw error
  }
})

export const toggleTopNews = createAsyncThunk("articles/toggleTopNews", async ({ id, setAsTop }: { id: string, setAsTop: boolean }) => {
  try {
    const method = setAsTop ? "POST" : "DELETE";
    const response = await fetch(`${API_BASE_URL}/articles/admin/${id}/top`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to toggle top news status")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to toggle top news status")
    }
    
    return id
  } catch (error) {
    console.error("Error toggling top news status:", error)
    throw error
  }
})

export const bulkApproveArticles = createAsyncThunk("articles/bulkApprove", async (ids: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/bulk/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ ids }),
    })

    if (!response.ok) {
      throw new Error("Failed to bulk approve articles")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to bulk approve articles")
    }
    
    return ids
  } catch (error) {
    console.error("Error bulk approving articles:", error)
    throw error
  }
})

export const bulkRejectArticles = createAsyncThunk("articles/bulkReject", async (ids: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/bulk/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ ids }),
    })

    if (!response.ok) {
      throw new Error("Failed to bulk reject articles")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to bulk reject articles")
    }
    
    return ids
  } catch (error) {
    console.error("Error bulk rejecting articles:", error)
    throw error
  }
})

export const bulkDeleteArticles = createAsyncThunk("articles/bulkDelete", async (ids: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/bulk/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ ids }),
    })

    if (!response.ok) {
      throw new Error("Failed to bulk delete articles")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to bulk delete articles")
    }
    
    return ids
  } catch (error) {
    console.error("Error bulk deleting articles:", error)
    throw error
  }
})

export const bulkToggleTopNews = createAsyncThunk(
  "articles/bulkToggleTop", 
  async ({ ids, setAsTop }: { ids: string[], setAsTop: boolean }) => {
    try {
      const method = setAsTop ? "POST" : "DELETE";
      const response = await fetch(`${API_BASE_URL}/articles/admin/bulk/top`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ ids }),
      })

      if (!response.ok) {
        throw new Error("Failed to bulk toggle top news status")
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to bulk toggle top news status")
      }
      
      return ids
    } catch (error) {
      console.error("Error bulk toggling top news status:", error)
      throw error
    }
  }
)

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminArticles.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.articles
        state.totalCount = action.payload.totalCount
      })
      .addCase(fetchAdminArticles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch articles"
      })
      .addCase(approveArticle.fulfilled, (state, action) => {
        const article = state.items.find((item) => String(item.id) === action.payload)
        if (article) {
          article.status = ArticleStatus.Approved
        }
      })
      .addCase(rejectArticle.fulfilled, (state, action) => {
        const article = state.items.find((item) => String(item.id) === action.payload)
        if (article) {
          article.status = ArticleStatus.Rejected
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => String(item.id) !== action.payload)
      })
      .addCase(toggleTopNews.fulfilled, (state, action) => {
        const article = state.items.find((item) => String(item.id) === action.payload)
        if (article) {
          article.is_top_news = article.is_top_news === 1 ? 0 : 1
        }
      })
      .addCase(bulkApproveArticles.fulfilled, (state, action) => {
        action.payload.forEach((id) => {
          const article = state.items.find((item) => String(item.id) === id)
          if (article) {
            article.status = ArticleStatus.Approved
          }
        })
      })
      .addCase(bulkRejectArticles.fulfilled, (state, action) => {
        action.payload.forEach((id) => {
          const article = state.items.find((item) => String(item.id) === id)
          if (article) {
            article.status = ArticleStatus.Rejected
          }
        })
      })
      .addCase(bulkDeleteArticles.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => !action.payload.includes(String(item.id)))
      })
      .addCase(bulkToggleTopNews.fulfilled, (state, action) => {
        action.payload.forEach((id) => {
          const article = state.items.find((item) => String(item.id) === id)
          if (article) {
            article.is_top_news = article.is_top_news === 1 ? 0 : 1
          }
        })
      })
  },
})

export default articlesSlice.reducer
