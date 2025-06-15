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
}
  
export interface ArticlesState {
    items: Article[]
    isLoading: boolean
    error: string | null
    totalCount: number
    currentPage: number
}