import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { API_BASE_URL } from "@/types/constant"
import { ArticlesState ,ArticleStatus,CreateArticleInput, UpdateArticleInput, TimeframeType, ArticleQueryParams } from "@/types/articles"


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
      author_email: "mike@example.com",
      rejection_reason: "Article content is not relevant to the category"
    },
  ],
  isLoading: false,
  error: null,
  totalCount: 3,
  currentPage: 1,
  searchQuery: "",
  isSearchMode: false,
  trending: {
    items: [],
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    timeframe: "day"
  }
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

export const fetchAuthorArticles = createAsyncThunk(
  "articles/fetchByAuthor", 
  async (params: ArticleQueryParams = {}) => {
    try {
      // Build query string with all parameters
      const queryParams = new URLSearchParams();
      
      // Add pagination parameters
      queryParams.append("page", String(params.page || 1));
      queryParams.append("limit", String(params.limit || params.limit === 0 ? 0 : 10));
      
      // Add search parameter if provided
      if (params.search) {
        queryParams.append("search", params.search);
      }
      
      // Add filter parameters if they're not set to "all"
      if (params.status && params.status !== "all") {
        queryParams.append("status", params.status);
      }
      
      if (params.region && params.region !== "all") {
        queryParams.append("region", params.region);
      }
      
      if (params.category && params.category !== "all") {
        queryParams.append("category", params.category);
      }
      
      // Add tags if provided
      if (params.tags && params.tags.length > 0) {
        params.tags.forEach(tag => {
          queryParams.append("tags", tag);
        });
      }
      
      // Add top news filter if provided
      if (params.is_top_news !== undefined) {
        queryParams.append("is_top_news", String(params.is_top_news));
      }
      
      // Add sorting parameters if provided
      if (params.sortBy) {
        queryParams.append("sortBy", params.sortBy);
      }
      
      if (params.sortOrder) {
        queryParams.append("sortOrder", params.sortOrder);
      }
      
      const response = await fetch(
        `${API_BASE_URL}/articles?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch author articles");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch author articles");
      }

      return {
        articles: data.data,
        pagination: data.pagination,
      };
    } catch (error) {
      console.error("Error fetching author articles:", error);
      throw error;
    }
  }
);

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

export const rejectArticle = createAsyncThunk("articles/reject", async ({ id, reason }: { id: string, reason?: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/${id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ reason }),
    })

    if (!response.ok) {
      throw new Error("Failed to reject article")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to reject article")
    }
    
    return { id, reason }
  } catch (error) {
    console.error("Error rejecting article:", error)
    throw error
  }
})

export const deleteArticle = createAsyncThunk("articles/delete", async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
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

export const bulkRejectArticles = createAsyncThunk("articles/bulkReject", async ({ ids, reason }: { ids: string[], reason?: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/admin/bulk/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify({ ids, reason }),
    })

    if (!response.ok) {
      throw new Error("Failed to bulk reject articles")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to bulk reject articles")
    }
    
    return { ids, reason }
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

export const createAuthorArticle = createAsyncThunk(
  "articles/createByAuthor",
  async (articleData: CreateArticleInput) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to create article");
      }

      return data.data;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  }
);

export const updateAuthorArticle = createAsyncThunk(
  "articles/updateByAuthor",
  async (articleData: UpdateArticleInput) => {
    try {
      const { id, ...updateData } = articleData;
      
      const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to update article");
      }

      return data.data;
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  }
);

export const getArticleById = createAsyncThunk(
  "articles/getById",
  async (articleId: string | number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${articleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch article");
      }

      return data.data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }
);

export const fetchTrendingArticles = createAsyncThunk(
  "articles/fetchTrending",
  async (timeframe: TimeframeType = "day", { getState }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/trending?author_only=true&timeframe=${timeframe}&page=1&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trending articles");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch trending articles");
      }

      return {
        articles: data.data,
        pagination: data.pagination,
        timeframe
      };
    } catch (error) {
      console.error("Error fetching trending articles:", error);
      throw error;
    }
  }
);

export const resubmitArticle = createAsyncThunk("articles/resubmit", async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to resubmit article")
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message || "Failed to resubmit article")
    }
    
    return id
  } catch (error) {
    console.error("Error resubmitting article:", error)
    throw error
  }
})

export const submitForReview = createAsyncThunk(
  "articles/submitForReview", 
  async (id: string | number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit article for review");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to submit article for review");
      }

      return data.data;
    } catch (error) {
      console.error("Error submitting article for review:", error);
      throw error;
    }
  }
)

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.isSearchMode = !!action.payload; // Set search mode based on query
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.isSearchMode = false;
    }
  },
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
      .addCase(fetchAuthorArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthorArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.articles;
        state.totalCount = action.payload.pagination.total;
        state.currentPage = action.payload.pagination.page;
        if (!state.searchQuery) {
          state.isSearchMode = false;
        }
      })
      .addCase(fetchAuthorArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch author articles";
      })
      .addCase(approveArticle.fulfilled, (state, action) => {
        const article = state.items.find((item) => String(item.id) === action.payload)
        if (article) {
          article.status = ArticleStatus.Approved
        }
      })
      .addCase(rejectArticle.fulfilled, (state, action) => {
        const article = state.items.find((item) => String(item.id) === action.payload.id)
        if (article) {
          article.status = ArticleStatus.Rejected
          if (action.payload.reason) {
            article.rejection_reason = action.payload.reason
          }
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
        action.payload.ids.forEach((id) => {
          const article = state.items.find((item) => String(item.id) === id)
          if (article) {
            article.status = ArticleStatus.Rejected
            if (action.payload.reason) {
              article.rejection_reason = action.payload.reason
            }
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
      .addCase(resubmitArticle.fulfilled, (state, action) => {
        const article = state.items.find((item) => String(item.id) === action.payload)
        if (article) {
          article.status = ArticleStatus.Pending
        }
      })
      // Add cases for create article functionality
      .addCase(createAuthorArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAuthorArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload); // Add new article to the beginning of the array
        state.totalCount += 1;
      })
      .addCase(createAuthorArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create article";
      })
      // Add cases for update article functionality
      .addCase(updateAuthorArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAuthorArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        // Find and update the article in the state
        const index = state.items.findIndex(
          (item) => String(item.id) === String(action.payload.id)
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateAuthorArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update article";
      })
      // Add cases for getting article by ID
      .addCase(getArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        // Check if the article already exists in the state
        const index = state.items.findIndex(
          (item) => String(item.id) === String(action.payload.id)
        );
        // If it exists, update it; otherwise, add it to the array
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch article";
      })
      // Add cases for trending articles
      .addCase(fetchTrendingArticles.pending, (state) => {
        state.trending.isLoading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
        state.trending.isLoading = false;
        state.trending.items = action.payload.articles;
        state.trending.totalCount = action.payload.pagination.total;
        state.trending.currentPage = action.payload.pagination.page;
        state.trending.timeframe = action.payload.timeframe;
      })
      .addCase(fetchTrendingArticles.rejected, (state, action) => {
        state.trending.isLoading = false;
        state.trending.error = action.error.message || "Failed to fetch trending articles";
      })
      // Add cases for submit for review
      .addCase(submitForReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitForReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (article) => article.id === action.meta.arg
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            status: ArticleStatus.Pending,
            ...action.payload
          };
        }
      })
      .addCase(submitForReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to submit article for review";
      })
  },
})

export const { setSearchQuery, clearSearch } = articlesSlice.actions;

export default articlesSlice.reducer
