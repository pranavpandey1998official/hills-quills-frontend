import { apiClient } from "@/lib/api";
import { Article, ArticleSchema, ArticleStatus, ArticleViewWithAuthorSchema, ArticleViewWithAuthor } from "@/types/articles";

// To be used by only by admin
export async function fetchAllArticles(cursor: number, limit: number): Promise<Article[]> {
    const result = await apiClient.get<Article[]>(`/articles/all?cursor=${cursor}&limit=${limit}`);
    return result.data.map((item: any) => ArticleSchema.parse(item));
}

export async function createArticle(title: string, content: string, authorId: number, tags: string[], status: string,  category: string, region: string, image: string): Promise<Article> {
    const result = await apiClient.post<Article>('/articles', {
        title,
        content,
        authorId,
        status,
        category,
        tags,
        region,
        image
    });
    return ArticleSchema.parse(result.data);
}

// Update article status (admin only)
export async function updateArticleStatus(
    articleId: number, 
    status: ArticleStatus, 
    rejectionReason?: string | null
): Promise<Article> {
    const payload: any = { status };
    if (status === ArticleStatus.Rejected ) {
        if (rejectionReason) {
            payload.rejection_reason = rejectionReason;
        } else {
            throw new Error("Rejection reason is required");
        }
    }
    
    const result = await apiClient.patch<Article>(`/articles/${articleId}/status`, payload);
    return ArticleSchema.parse(result.data);
}

// Get single article by ID
export async function fetchArticleById(id: number): Promise<ArticleViewWithAuthor> {
    const result = await apiClient.get<ArticleViewWithAuthor>(`/articles/${id}`);
    return ArticleViewWithAuthorSchema.parse(result.data);
}


export async function fetchArticleByIdForView(id: number): Promise<ArticleViewWithAuthor> {
    const result = await apiClient.get<ArticleViewWithAuthor>(`/articles/view/${id}`);
    return ArticleViewWithAuthorSchema.parse(result.data);
}

// Update article content (admin/author)
export async function updateArticle(
    id: number,
    title?: string,
    content?: string,
    tags?: string[],
    category?: string,   
    region?: string,
    image?: string
): Promise<Article> {
    const result = await apiClient.put<Article>(`/articles/${id}`, {
        title,
        content,
        tags,
        category,
        region,
        image
    });
    return ArticleSchema.parse(result.data);
}

// Delete article (admin only)
export async function deleteArticle(id: number): Promise<Article> {
    const result = await apiClient.delete<Article>(`/articles/${id}`);
    return ArticleSchema.parse(result.data);
}

export async function fetchTagsForArticle(id: number): Promise<string[]> {
    const result = await apiClient.get<string[]>(`/articles/tags/${id}`);
    return result.data;
}