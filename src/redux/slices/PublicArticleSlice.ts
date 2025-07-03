import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Article, ArticleQueryParams, ArticleStatus } from "@/types/articles";
import { API_BASE_URL } from "@/types/constant";

// Define more specific state interfaces for public articles
interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

// Search specific parameters interface
interface SearchArticleParams {
  query: string;
  page?: number;
  limit?: number;
  category?: string;
  region?: string;
  tags?: string | string[];
}

// Search response interface
interface SearchArticlesResponse {
  data: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface PublicArticlesState {
  // General articles
  articles: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
  
  // Single article
  selectedArticle: {
    item: Article | null;
    isLoading: boolean;
    error: string | null;
    relatedArticles: Article[];
  };
  
  // Special article collections
  recent: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
  };
  
  trending: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
  };
  
  topNews: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
  };
  
  featured: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
  };
  
  // Category and region specific
  categoryArticles: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
    currentCategory: string | null;
    totalCount: number;
    currentPage: number;
  };
  
  regionArticles: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
    currentRegion: string | null;
    totalCount: number;
    currentPage: number;
  };
  
  // Search results
  search: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
    query: string;
    filters: {
      category?: string;
      region?: string;
      tags?: string;
    };
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    } | null;
  };
  
  // District articles
  districtArticles: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
    currentDistrict: string | null;
    totalCount: number;
    currentPage: number;
  };
  
  // Tag articles
  tagArticles: {
    items: Article[];
    isLoading: boolean;
    error: string | null;
    currentTags: string[];
    totalCount: number;
    currentPage: number;
  };
}

const initialState: PublicArticlesState = {
  articles: {
    items: [],
    isLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    totalPages: 0,
  },
  
  selectedArticle: {
    item: null,
    isLoading: false,
    error: null,
    relatedArticles: [],
  },
  
  recent: {
    items: [],
    isLoading: false,
    error: null,
  },
  
  trending: {
    items: [],
    isLoading: false,
    error: null,
  },
  
  topNews: {
    items: [],
    isLoading: false,
    error: null,
  },
  
  featured: {
    items: [],
    isLoading: false,
    error: null,
  },
  
  categoryArticles: {
    items: [],
    isLoading: false,
    error: null,
    currentCategory: null,
    totalCount: 0,
    currentPage: 1,
  },
  
  regionArticles: {
    items: [],
    isLoading: false,
    error: null,
    currentRegion: null,
    totalCount: 0,
    currentPage: 1,
  },
  
  search: {
    items: [],
    isLoading: false,
    error: null,
    query: "",
    filters: {},
    pagination: null,
  },
  
  districtArticles: {
    items: [],
    isLoading: false,
    error: null,
    currentDistrict: null,
    totalCount: 0,
    currentPage: 1,
  },
  
  tagArticles: {
    items: [],
    isLoading: false,
    error: null,
    currentTags: [],
    totalCount: 0,
    currentPage: 1,
  },
};

// Helper function to format query parameters
const formatQueryParams = (params: ArticleQueryParams): string => {
  const queryParts: string[] = [];
  
  if (params.page !== undefined) queryParts.push(`page=${params.page}`);
  if (params.limit !== undefined) queryParts.push(`limit=${params.limit}`);
  if (params.sortBy) queryParts.push(`sortBy=${params.sortBy}`);
  if (params.sortOrder) queryParts.push(`sortOrder=${params.sortOrder}`);
  
  return queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
};

// Async Thunks for all public routes

// 1. Get all approved articles with pagination
export const fetchPublicArticles = createAsyncThunk(
  'publicArticles/fetchAll',
  async (params: ArticleQueryParams = {}) => {
    
    // Use the correct endpoint for latest articles (similar to /top for top news)
    const { page = 1, limit = 5 } = params;
    const url = `${API_BASE_URL}/public/articles?page=${page}&limit=${limit}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        throw new Error(`API error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching public articles:', error);
      throw error;
    }
  }
);

// 2. Get a specific article by ID
export const fetchArticleById = createAsyncThunk(
  'publicArticles/fetchById',
  async (id: string | number) => {
    const response = await fetch(`${API_BASE_URL}/public/articles/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    
    return await response.json();
  }
);

// 3. Get recent articles
export const fetchRecentArticles = createAsyncThunk(
  'publicArticles/fetchRecent',
  async (limit: number = 10) => {
    const response = await fetch(`${API_BASE_URL}/public/articles/recent?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recent articles');
    }
    
    return await response.json();
  }
);

// 4. Search articles
export const fetchSearchArticles = createAsyncThunk(
  'publicArticles/search',
  async (params: SearchArticleParams, { getState }) => {
    const { query, page = 1, limit = 10, category, region, tags } = params;
    
    // Build the query parameters
    const queryParams = [
      `query=${encodeURIComponent(query)}`,
      `page=${page}`,
      `limit=${limit}`
    ];
    
    if (category) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }
    
    if (region) {
      queryParams.push(`region=${encodeURIComponent(region)}`);
    }
    
    if (tags) {
      // Handle tags whether it's a string or array
      const tagsParam = Array.isArray(tags) ? tags.join(',') : tags;
      queryParams.push(`tags=${encodeURIComponent(tagsParam)}`);
    }
    
    // Get the current state to determine if we're appending results
    const state = getState() as any;
    const currentSearch = state.publicArticles.search;
    const isAppending = page > 1 && currentSearch.query === query;
    
    const response = await fetch(`${API_BASE_URL}/public/articles/search?${queryParams.join('&')}`);
    
    if (!response.ok) {
      throw new Error('Failed to search articles');
    }
    
    const data = await response.json();
    
    // Create filters object to store the applied filters
    const filters = {
      category,
      region,
      tags: Array.isArray(tags) ? tags.join(',') : tags
    };
    
    return { 
      data: data.data,
      pagination: data.pagination,
      query,
      filters,
      isAppending
    };
  }
);

// 5. Get trending articles
export const fetchTrendingArticles = createAsyncThunk(
  'publicArticles/fetchTrending',
  async (limit: number = 10) => {
    const response = await fetch(`${API_BASE_URL}/public/articles/trending?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending articles');
    }
    
    return await response.json();
  }
);

// 6. Get top news articles
export const fetchTopNewsArticles = createAsyncThunk(
  'publicArticles/fetchTopNews',
  async (limit: number = 10) => {
    
    // Log the URL we're calling
    const url = `${API_BASE_URL}/public/articles/top?limit=${limit}`;

    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error in top news:', response.status, errorText);
        throw new Error(`API error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching top news:', error);
      throw error;
    }
  }
);
// 7. Get featured articles
export const fetchFeaturedArticles = createAsyncThunk(
  'publicArticles/fetchFeatured',
  async (limit: number = 6) => {
    
    const response = await fetch(`${API_BASE_URL}/public/articles/featured?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch featured articles');
    }
    
    return await response.json();
  }
);

// 8. Get articles by tags
export const fetchArticlesByTags = createAsyncThunk(
  'publicArticles/fetchByTags',
  async (params: { tags: string[], page?: number, limit?: number }) => {
    const { tags, page = 1, limit = 10 } = params;
    const tagsString = tags.join(',');

    const response = await fetch(`${API_BASE_URL}/public/articles/by-tags?tags=${encodeURIComponent(tagsString)}&page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles by tags');
    }
    
    const data = await response.json();
    
    return { ...data, tags };
  }
);

// 9. Get more stories (infinite scrolling)
export const fetchMoreStories = createAsyncThunk(
  'publicArticles/fetchMoreStories',
  async (params: { page: number, limit?: number, excludeIds?: (string | number)[] }) => {
    const { page, limit = 10, excludeIds = [] } = params;
    let url = `/public/articles/more-stories?page=${page}&limit=${limit}`;
    
    if (excludeIds.length > 0) {
      url += `&excludeIds=${excludeIds.join(',')}`;
    }
    const response = await fetch(`${API_BASE_URL}${url}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch more stories');
    }
    
    return await response.json();
  }
);

// 10. Get articles by category
export const fetchArticlesByCategory = createAsyncThunk(
  'publicArticles/fetchByCategory',
  async (params: { category: string, page?: number, limit?: number }) => {
    const { category, page = 1, limit = 10 } = params;

    const response = await fetch(`${API_BASE_URL}/public/articles/by-category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles by category');
    }
    
    const data = await response.json();
    
    return { ...data, category };
  }
);

// 11. Get culture and heritage articles
export const fetchCultureHeritageArticles = createAsyncThunk(
  'publicArticles/fetchCultureHeritage',
  async (params: { page?: number, limit?: number } = {}) => {
    const { page = 1, limit = 10 } = params;  
    const response = await fetch(`${API_BASE_URL}/public/articles/culture-heritage?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch culture and heritage articles');
    }
    
    return await response.json();
  }
);

// 12. Get articles by region
export const fetchArticlesByRegion = createAsyncThunk(
  'publicArticles/fetchByRegion',
  async (params: { region: string, page?: number, limit?: number }) => {
    const { region, page = 1, limit = 10 } = params;

    const response = await fetch(`${API_BASE_URL}/public/articles/from-region/${encodeURIComponent(region)}?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles by region');
    }
    
    const data = await response.json();
    
    return { ...data, region };
  }
);

// 13. Get articles by district
export const fetchArticlesByDistrict = createAsyncThunk(
  'publicArticles/fetchByDistrict',
  async (params: { district: string, page?: number, limit?: number }) => {
    const { district, page = 1, limit = 10 } = params;
    
    const response = await fetch(`${API_BASE_URL}/public/articles/from-districts/${encodeURIComponent(district)}?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles by district');
    }
    
    const data = await response.json();
    
    return { ...data, district };
  }
);

const publicArticlesSlice = createSlice({
  name: "publicArticles",
  initialState,
  reducers: {
    clearSelectedArticle(state) {
      state.selectedArticle.item = null;
      state.selectedArticle.error = null;
    },
    clearSearchResults(state) {
      state.search.items = [];
      state.search.error = null;
      state.search.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all public articles
      .addCase(fetchPublicArticles.pending, (state) => {
        state.articles.isLoading = true;
        state.articles.error = null;
      })
      .addCase(fetchPublicArticles.fulfilled, (state, action) => {
        state.articles.isLoading = false;
        
        // API returns: { success: true, message: "...", data: [...], pagination: {...} }
        if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          state.articles.items = action.payload.data;
          
          // Handle pagination data if available
          if (action.payload.pagination) {
            state.articles.totalCount = action.payload.pagination.total;
            state.articles.currentPage = action.payload.pagination.page;
            state.articles.totalPages = action.payload.pagination.totalPages;
          } else {
            state.articles.totalCount = action.payload.data.length;
            state.articles.currentPage = 1;
            state.articles.totalPages = 1;
          }
          
          console.log('Successfully extracted', action.payload.data.length, 'articles');
        } 
        // Fallback handlers for other formats
        else if (Array.isArray(action.payload)) {
          state.articles.items = action.payload;
          state.articles.totalCount = action.payload.length;
          state.articles.currentPage = 1;
          state.articles.totalPages = 1;
        }
        else if (action.payload && action.payload.items && Array.isArray(action.payload.items)) {
          state.articles.items = action.payload.items;
          state.articles.totalCount = action.payload.totalCount || action.payload.items.length;
          state.articles.currentPage = action.payload.currentPage || 1;
          state.articles.totalPages = action.payload.totalPages || 1;
        }
        else {
          console.warn('Unexpected response format in fetchPublicArticles:', action.payload);
          state.articles.items = [];
          state.articles.totalCount = 0;
          state.articles.currentPage = 1;
          state.articles.totalPages = 1;
        }
      })
      .addCase(fetchPublicArticles.rejected, (state, action) => {
        state.articles.isLoading = false;
        state.articles.error = action.error.message || "Failed to fetch articles";
      })
      
      // Fetch article by ID
      .addCase(fetchArticleById.pending, (state) => {
        state.selectedArticle.isLoading = true;
        state.selectedArticle.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.selectedArticle.isLoading = false;
        
        // Handle different response formats for article by ID
        if (action.payload && typeof action.payload === 'object') {
          if (action.payload.data) {
            // Format: { data: {...} }
            state.selectedArticle.item = action.payload.data;
          } else {
            // Format: Direct object
            state.selectedArticle.item = action.payload;
          }
        } else {
          console.warn('Unexpected response format in fetchArticleById:', action.payload);
          state.selectedArticle.item = null;
        }
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.selectedArticle.isLoading = false;
        state.selectedArticle.error = action.error.message || "Failed to fetch article";
      })
      
      // Fetch recent articles
      .addCase(fetchRecentArticles.pending, (state) => {
        state.recent.isLoading = true;
        state.recent.error = null;
      })
      .addCase(fetchRecentArticles.fulfilled, (state, action) => {
        state.recent.isLoading = false;
        state.recent.items = action.payload;
      })
      .addCase(fetchRecentArticles.rejected, (state, action) => {
        state.recent.isLoading = false;
        state.recent.error = action.error.message || "Failed to fetch recent articles";
      })

      // Search articles
      .addCase(fetchSearchArticles.pending, (state) => {
        state.search.isLoading = true;
        state.search.error = null;
      })
      .addCase(fetchSearchArticles.fulfilled, (state, action) => {
        const { data, pagination, query, filters, isAppending } = action.payload;
        
        state.search.isLoading = false;
        state.search.items = isAppending 
          ? [...state.search.items, ...data] 
          : data;
        state.search.pagination = pagination;
        state.search.query = query;
        state.search.filters = filters;
      })
      .addCase(fetchSearchArticles.rejected, (state, action) => {
        state.search.isLoading = false;
        state.search.error = action.error.message || "Failed to search articles";
      })
      
      // Fetch trending articles
      .addCase(fetchTrendingArticles.pending, (state) => {
        state.trending.isLoading = true;
        state.trending.error = null;
      })
      .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
        state.trending.isLoading = false;
        state.trending.items = action.payload;
      })
      .addCase(fetchTrendingArticles.rejected, (state, action) => {
        state.trending.isLoading = false;
        state.trending.error = action.error.message || "Failed to fetch trending articles";
      })
      
      // Fetch top news
      .addCase(fetchTopNewsArticles.pending, (state) => {
        state.topNews.isLoading = true;
        state.topNews.error = null;
      })
      .addCase(fetchTopNewsArticles.fulfilled, (state, action) => {
        state.topNews.isLoading = false;
        
        // Handle the specific response format we're getting from the API
        if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
          // API returns { success: true, message: '...', data: [...] }
          state.topNews.items = action.payload.data;
        } 
        else if (Array.isArray(action.payload)) {
          // Handle direct array response
          state.topNews.items = action.payload;
        }
        else if (action.payload && action.payload.items && Array.isArray(action.payload.items)) {
          // Handle { items: [...] } format
          state.topNews.items = action.payload.items;
        }
        else {
          console.warn('Unexpected response format in fetchTopNewsArticles:', action.payload);
          state.topNews.items = [];
        }
      })
      .addCase(fetchTopNewsArticles.rejected, (state, action) => {
        state.topNews.isLoading = false;
        state.topNews.error = action.error.message || "Failed to fetch top news";
      })
      
      // Fetch featured articles
      .addCase(fetchFeaturedArticles.pending, (state) => {
        state.featured.isLoading = true;
        state.featured.error = null;
      })
      .addCase(fetchFeaturedArticles.fulfilled, (state, action) => {
        state.featured.isLoading = false;
        state.featured.items = action.payload;
      })
      .addCase(fetchFeaturedArticles.rejected, (state, action) => {
        state.featured.isLoading = false;
        state.featured.error = action.error.message || "Failed to fetch featured articles";
      })
      
      // Fetch articles by tags
      .addCase(fetchArticlesByTags.pending, (state) => {
        state.tagArticles.isLoading = true;
        state.tagArticles.error = null;
      })
      .addCase(fetchArticlesByTags.fulfilled, (state, action) => {
        state.tagArticles.isLoading = false;
        state.tagArticles.items = action.payload.items;
        state.tagArticles.totalCount = action.payload.totalCount;
        state.tagArticles.currentPage = action.payload.currentPage;
        state.tagArticles.currentTags = action.payload.tags;
      })
      .addCase(fetchArticlesByTags.rejected, (state, action) => {
        state.tagArticles.isLoading = false;
        state.tagArticles.error = action.error.message || "Failed to fetch articles by tags";
      })
      
      // Fetch articles by category
      .addCase(fetchArticlesByCategory.pending, (state) => {
        state.categoryArticles.isLoading = true;
        state.categoryArticles.error = null;
      })
      .addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
        state.categoryArticles.isLoading = false;
        state.categoryArticles.items = action.payload.items;
        state.categoryArticles.totalCount = action.payload.totalCount;
        state.categoryArticles.currentPage = action.payload.currentPage;
        state.categoryArticles.currentCategory = action.payload.category;
      })
      .addCase(fetchArticlesByCategory.rejected, (state, action) => {
        state.categoryArticles.isLoading = false;
        state.categoryArticles.error = action.error.message || "Failed to fetch articles by category";
      })
      
      // Fetch articles by region
      .addCase(fetchArticlesByRegion.pending, (state) => {
        state.regionArticles.isLoading = true;
        state.regionArticles.error = null;
      })
      .addCase(fetchArticlesByRegion.fulfilled, (state, action) => {
        state.regionArticles.isLoading = false;
        state.regionArticles.items = action.payload.items;
        state.regionArticles.totalCount = action.payload.totalCount;
        state.regionArticles.currentPage = action.payload.currentPage;
        state.regionArticles.currentRegion = action.payload.region;
      })
      .addCase(fetchArticlesByRegion.rejected, (state, action) => {
        state.regionArticles.isLoading = false;
        state.regionArticles.error = action.error.message || "Failed to fetch articles by region";
      })
      
      // Fetch articles by district
      .addCase(fetchArticlesByDistrict.pending, (state) => {
        state.districtArticles.isLoading = true;
        state.districtArticles.error = null;
      })
      .addCase(fetchArticlesByDistrict.fulfilled, (state, action) => {
        state.districtArticles.isLoading = false;
        state.districtArticles.items = action.payload.items;
        state.districtArticles.totalCount = action.payload.totalCount;
        state.districtArticles.currentPage = action.payload.currentPage;
        state.districtArticles.currentDistrict = action.payload.district;
      })
      .addCase(fetchArticlesByDistrict.rejected, (state, action) => {
        state.districtArticles.isLoading = false;
        state.districtArticles.error = action.error.message || "Failed to fetch articles by district";
      });
  },
});

export const { clearSelectedArticle, clearSearchResults } = publicArticlesSlice.actions;
export default publicArticlesSlice.reducer;
