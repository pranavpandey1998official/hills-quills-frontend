import { deleteArticle, resubmitArticle, submitForReview, setSearchQuery, clearSearch, fetchAuthorArticles } from "@/redux/slices/articlesSlice";
import { toast } from "sonner";
import { Article } from "@/types/articles";
import { AppDispatch } from "@/redux/store";

//badge status for article table 
export const getStatusBadge = (status: string) => {
  const variants = {
    draft: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }
  return variants[status as keyof typeof variants] || variants.draft
}

export const getCategoryBadge = (category: string) => {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
  ]
  const hash = category.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  return colors[Math.abs(hash) % colors.length]
}

// Helper function to check if an article is trending
export const isArticleTrending = (articleId: string | number, trendingArticleIds: Set<string | number>) => {
  return trendingArticleIds.has(articleId)
}

// Article action helpers
export const handleArticleResubmit = (dispatch: AppDispatch, articleId: string | number) => {
  dispatch(resubmitArticle(String(articleId)));
  toast.success("Article resubmitted for review");
}

export const handleArticleSubmitForReview = (dispatch: AppDispatch, articleId: string | number) => {
  dispatch(submitForReview(articleId));
  toast.success("Article submitted for review");
}

export const viewArticle = (articleId: string | number) => {
  window.location.href = `/author/articles/${articleId}`;
}

export const editArticle = (articleId: string | number, status: string, isNews: boolean = true) => {
  if (status === "approved") {
    toast.error("Cannot edit approved articles");
    return;
  }
  
  // Handle different URL paths for news vs stories
  const basePath = isNews ? '/author/my-news/' : '/author/my-stories/';
  window.location.href = `${basePath}${articleId}/edit`;
}

// Selection helpers
export interface SelectionHelpers<T extends string | number> {
  handleSelectAll: (checked: boolean, articles: Article[], setSelectedArticles: (ids: T[]) => void) => void;
  handleSelectArticle: (articleId: T, checked: boolean, selectedArticles: T[], setSelectedArticles: (ids: T[]) => void) => void;
}

export const createSelectionHelpers = <T extends string | number>(convertId: (id: string | number) => T): SelectionHelpers<T> => {
  return {
    handleSelectAll: (checked, articles, setSelectedArticles) => {
      if (checked) {
        setSelectedArticles(articles.map(article => convertId(article.id)));
      } else {
        setSelectedArticles([]);
      }
    },
    handleSelectArticle: (articleId, checked, selectedArticles, setSelectedArticles) => {
      if (checked) {
        setSelectedArticles([...selectedArticles, articleId]);
      } else {
        setSelectedArticles(selectedArticles.filter(id => id !== articleId));
      }
    }
  };
}

// Delete helpers
export const handleDeleteArticle = (
  articleId: string | number, 
  setArticleToDelete: (id: string | number | null) => void, 
  setDeleteDialogOpen: (open: boolean) => void
) => {
  setArticleToDelete(articleId);
  setDeleteDialogOpen(true);
}

export const confirmDeleteArticle = (
  articleToDelete: string | number | null,
  dispatch: AppDispatch,
  setDeleteDialogOpen: (open: boolean) => void,
  setArticleToDelete: (id: string | number | null) => void
) => {
  if (articleToDelete) {
    dispatch(deleteArticle(String(articleToDelete)));
    toast.success("Article deleted successfully");
    setDeleteDialogOpen(false);
    setArticleToDelete(null);
  }
}

// Search helpers
export const handleArticleSearch = (
  searchText: string,
  dispatch: AppDispatch,
  handleClearSearch: () => void
) => {
  const trimmedQuery = searchText.trim();
  
  if (trimmedQuery) {
    // Save search query to Redux and perform search
    dispatch(setSearchQuery(trimmedQuery));
    dispatch(fetchAuthorArticles({ 
      search: trimmedQuery,
      page: 1,
      limit: 20 
    }));
  } else {
    // If empty search, clear search and fetch regular articles
    handleClearSearch();
  }
}

export const clearArticleSearch = (
  dispatch: AppDispatch,
  setSearchText: (text: string) => void
) => {
  setSearchText("");
  dispatch(clearSearch());
  dispatch(fetchAuthorArticles({ page: 1, limit: 20 }));
}

export const handleArticlePageChange = (
  page: number,
  savedSearchQuery: string | null,
  dispatch: AppDispatch
) => {
  if (savedSearchQuery) {
    // If in search mode, search with new page
    dispatch(fetchAuthorArticles({
      search: savedSearchQuery,
      page,
      limit: 20
    }));
  } else {
    // If not in search mode, fetch regular articles
    dispatch(fetchAuthorArticles({
      page,
      limit: 20
    }));
  }
}