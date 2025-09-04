import z from "zod";

export enum ArticleStatus {
  Pending  = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Draft    = "draft",
}

export enum Category {
  Politics = "politics",
  Defence = "defence",
  Economy = "economy",
  Environment = "environment",
  Education = "education",
  Health = "health",
  Tourism = "tourism",
  Culture = "culture",
  unknown = "unknown",
}

export enum Region {
  Almora = "Almora",
  Bageshwar = "Bageshwar",
  Chamoli = "Chamoli",
  Champawat = "Champawat",
  Dehradun = "Dehradun",
  Haridwar = "Haridwar",
  Nainital = "Nainital",
  PauriGarhwal = "Pauri Garhwal",
  Pithoragarh = "Pithoragarh",
  Rudraprayag = "Rudraprayag",
  TehriGarhwal = "Tehri Garhwal",
  UdhamSinghNagar = "Udham Singh Nagar",
  Uttarkashi = "Uttarkashi",
}


// Zod schema
export const ArticleViewSchema = z.object({
  id: z.number(),
  author_id: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.enum(Category),
  region: z.enum(Region),
  image: z.string(),
  updated_at: z.string(),
  rejection_reason: z.string().optional().nullable(),
});

export const ArticleViewWithAuthorSchema = ArticleViewSchema.extend({
  tags: z.array(z.string()),
  author_name: z.string(),
  author_email: z.string(),
  author_profile_photo_url: z.string().optional(),
  author_about: z.string().optional(),
  author_profession: z.string().optional(),
});

export type ArticleViewWithAuthor = z.infer<typeof ArticleViewWithAuthorSchema>;

// Type inference (if you want Zod type instead of interface)
export type ArticleView = z.infer<typeof ArticleViewSchema>;

export const ArticleSchema = ArticleViewSchema.extend({
  publish_date: z.string().nullable(),
  created_at: z.string(),
  status: z.enum(ArticleStatus),
});

export type Article = z.infer<typeof ArticleSchema>;


export type ArticleUpdates = {
  title?: string;
  content?: string;
  category?: string;
  region?: string;
  imageFile?: File | undefined;
  tags?: string[];
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

