export enum ArticleStatus {
    Pending  = "pending",
    Approved = "approved",
    Rejected = "rejected",
    Draft    = "draft",
  }

export interface Article {
    id: number | string
    author_id: number
    title: string
    tags: string[]
    description: string
    content: string
    category: string
    region: string
    image: string
    status: ArticleStatus
    is_top_news: number // 0 or 1
    views_count: number
    publish_date: string | null
    created_at: string
    updated_at: string
    author_name: string
    author_email: string
    rejection_reason?: string // Added field for article rejection reason
}

export interface ArticlesState {
    items: Article[]
    isLoading: boolean
    error: string | null
    totalCount: number
    currentPage: number
    searchQuery: string  // Still useful to keep track of current search
    isSearchMode: boolean
    trending: {
        items: Article[]
        isLoading: boolean
        error: string | null
        totalCount: number
        currentPage: number
        timeframe: TimeframeType
    }
}

// New interface for consolidated article query parameters
export interface ArticleQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  region?: string;
  category?: string;
  search?: string;  // Changed from 'query' to 'search' to match backend
  tags?: string[];
  is_top_news?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface CreateArticleInput {
    title: string;
    description: string;
    content: string;
    category: string;
    region: string;
    tags: string[];
    image: string;
  }

  export interface UpdateArticleInput {
    id: string | number;
    title?: string;
    description?: string;
    content?: string;
    category?: string;
    region?: string;
    tags?: string[];
    image?: string;
  }

export type TimeframeType = "day" | "week" | "month";

export const UTTARAKHAND_REGIONS = [
    "Dehradun",
    "Haridwar",
    "Rishikesh",
    "Uttarakhand",
    "Mussoorie",
    "Nainital",
    "Almora",
    "Pithoragarh",
    "Chamoli",
    "Rudraprayag",
    "Tehri Garhwal",
    "Pauri Garhwal",
    "Uttarkashi",
    "Bageshwar",
    "Champawat",
    "Kumaon",
    "Garhwal",
    "Char Dham",
    "Valley of Flowers",
    "Jim Corbett",
    "Kedarnath",
    "Badrinath",
    "Gangotri",
    "Yamunotri",
  ] as const
  
  export const ARTICLE_CATEGORIES = [
    "Culture & Heritage",
    "Adventure Tourism",
    "Religious Tourism",
    "Hill Stations",
    "Wildlife & Nature",
    "Trekking & Hiking",
    "Pilgrimage",
    "Local Festivals",
    "Travel Guide",
    "Food & Cuisine",
    "Accommodation",
    "Transportation",
    "From Districts",
    "Breaking News",
    "Government Initiatives",
    "Seasonal Tourism",
  ] as const

  export interface ArticleFormProps {
    mode: "create" | "edit"
    initialData?: any
  }
  export interface PaginationControlsProps {
    totalCount: number
    currentPage: number
    pageSize: number
    onPageChange?: (page: number) => void
  }

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export type UploadType = 'article' | 'profile';

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  type?: UploadType;
  className?: string;
  label?: string;
  initialImageUrl?: string;
}
  
  export type UttarakhandRegion = (typeof UTTARAKHAND_REGIONS)[number]
  export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]