"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, MoreHorizontal, Eye, Send, FileText, TrendingUp, Star, MapPin, Search, X } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { 
  deleteArticle, 
  resubmitArticle, 
  fetchAuthorArticles,
  submitForReview,
  fetchTrendingArticles,
  setSearchQuery,
  clearSearch,
} from "@/redux/slices/articlesSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { PaginationControls } from "@/components/PaginationControls"
import { toast } from "sonner"

export function DetailedArticlesTable() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    items: articles,
    isLoading,
    totalCount,
    currentPage,
    trending,
    searchQuery: savedSearchQuery,
    isSearchMode,
  } = useSelector((state: RootState) => state.articles)

  const [selectedArticles, setSelectedArticles] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)
  const [trendingArticleIds, setTrendingArticleIds] = useState<Set<string | number>>(new Set())
  const [searchText, setSearchText] = useState("")
   
  useEffect(() => {
    // Only fetch articles if not in search mode
    if (!savedSearchQuery) {
      dispatch(fetchAuthorArticles({ page: 1, limit: 20 }))
    }
  }, [dispatch, savedSearchQuery])

  // Initialize search input with any saved search query
  useEffect(() => {
    if (savedSearchQuery) {
      setSearchText(savedSearchQuery)
    }
  }, [savedSearchQuery])

  useEffect(() => {
    dispatch(fetchTrendingArticles("week"))
  }, [dispatch])

  useEffect(() => {
    if (trending.items && trending.items.length > 0) {
      const trendingIds = new Set(trending.items.map(article => article.id))
      setTrendingArticleIds(trendingIds)
    }
  }, [trending.items])
  
  // Helper function to check if article is trending
  const isArticleTrending = (articleId: string | number) => {
    return trendingArticleIds.has(articleId)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArticles(articles.map((article) => String(article.id)))
    } else {
      setSelectedArticles([])
    }
  }

  const handleSelectArticle = (articleId: string | number, checked: boolean) => {
    const stringId = String(articleId)
    if (checked) {
      setSelectedArticles([...selectedArticles, stringId])
    } else {
      setSelectedArticles(selectedArticles.filter((id) => id !== stringId))
    }
  }

  const handleView = (articleId: string | number) => {
    window.location.href = `/author/articles/${articleId}`
  }

  const handleEdit = (articleId: string | number, status: string) => {
    if (status === "approved") {
      toast.error("Cannot edit approved articles")
      return
    }
    window.location.href = `/author/articles/${articleId}/edit`
  }

  const handleDelete = (articleId: string | number) => {
    setArticleToDelete(String(articleId))
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (articleToDelete) {
      dispatch(deleteArticle(articleToDelete))
      toast.success("Article deleted successfully")
      setDeleteDialogOpen(false)
      setArticleToDelete(null)
    }
  }

  const handleResubmit = (articleId: string | number) => {
    dispatch(resubmitArticle(String(articleId)))
    toast.success("Article resubmitted for review")
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || variants.draft
  }

  const getCategoryBadge = (category: string) => {
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

  const handleSubmitForReview = (articleId: string | number) => {
    // Submit draft article for review
    dispatch(submitForReview(articleId))
    toast.success("Article submitted for review")
  }

  // Handle search function
  const handleSearch = () => {
    const trimmedQuery = searchText.trim()
    
    if (trimmedQuery) {
      // Save search query to Redux and perform search
      dispatch(setSearchQuery(trimmedQuery))
      dispatch(fetchAuthorArticles({ 
        search: trimmedQuery,
        page: 1,
        limit: 20 
      }))
    } else {
      // If empty search, clear search and fetch regular articles
      handleClearSearch()
    }
  }
  
  // Clear search function
  const handleClearSearch = () => {
    setSearchText("")
    dispatch(clearSearch())
    dispatch(fetchAuthorArticles({ page: 1, limit: 20 }))
  }

  // Handle pagination for search results
  const handlePageChange = (page: number) => {
    if (savedSearchQuery) {
      // If in search mode, search with new page
      dispatch(fetchAuthorArticles({
        search: savedSearchQuery,
        page,
        limit: 20
      }))
    } else {
      // If not in search mode, fetch regular articles
      dispatch(fetchAuthorArticles({
        page,
        limit: 20
      }))
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="Search articles..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="pr-10"
            />
            <Button 
              type="button"
              variant="ghost" 
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSearch}
            disabled={isLoading}
          >
            Search
          </Button>
          {(searchText || savedSearchQuery) && (
            <Button 
              variant="ghost" 
              onClick={handleClearSearch}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {savedSearchQuery && (
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md border">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              Search results for: <strong>"{savedSearchQuery}"</strong>
            </span>
            <Badge variant="secondary" className="text-xs">
              {totalCount} {totalCount === 1 ? 'result' : 'results'}
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearSearch}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Search
          </Button>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedArticles.length > 0 && (
        <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
          <span className="text-sm font-medium">{selectedArticles.length} selected</span>
          <Button size="sm" variant="outline">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Selected
          </Button>
        </div>
      )}

      {/* Detailed Articles Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedArticles.length === articles.length && articles.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-16">#</TableHead>
              <TableHead className="w-[300px]">Article</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {savedSearchQuery ? 'No articles found for your search' : 'No articles found'}
                    </p>
                    {!savedSearchQuery && (
                      <Button asChild size="sm">
                        <a href="/author/create-news">Create your first article</a>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article, index) => (
                <TableRow key={String(article.id)} className="cursor-pointer hover:bg-muted/50">
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedArticles.includes(String(article.id))}
                      onCheckedChange={(checked) => handleSelectArticle(article.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell onClick={() => handleView(article.id)} className="font-mono text-sm">
                    #{(currentPage - 1) * 20 + index + 1}
                  </TableCell>
                  <TableCell onClick={() => handleView(article.id)}>
                    <div className="flex items-center space-x-2">
                      {article.is_top_news === 1 && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                      )}
                      <h3 className="font-medium truncate">{article.title}</h3>
                      {isArticleTrending(article.id) && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 flex-shrink-0">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell onClick={() => handleView(article.id)}>
                    <Badge className={getCategoryBadge(article.category)}>{article.category}</Badge>
                  </TableCell>
                  <TableCell onClick={() => handleView(article.id)}>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{article.region}</span>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => handleView(article.id)}>
                    <Badge className={getStatusBadge(article.status)}>{article.status}</Badge>
                  </TableCell>
                  <TableCell onClick={() => handleView(article.id)}>
                    <div className="text-sm">
                      <div className="font-medium">{article.views_count?.toLocaleString() || 0} views</div>
                      <div className="text-muted-foreground">
                        {article.status === "approved" ? "Published" : "Not published"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => handleView(article.id)}>
                    <div className="text-sm">
                      {article.status === "approved" ? (
                        <div>
                          <div className="font-medium">{format(new Date(article.updated_at), "MMM dd, yyyy")}</div>
                          <div className="text-muted-foreground">
                            {formatDistanceToNow(new Date(article.updated_at), { addSuffix: true })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground">Not published</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(article.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {article.status !== "approved" && (
                          <DropdownMenuItem onClick={() => handleEdit(article.id, article.status)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {article.status === "rejected" && (
                          <DropdownMenuItem onClick={() => handleResubmit(article.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Resubmit for Approval
                          </DropdownMenuItem>
                        )}
                        {article.status === "draft" && (
                          <DropdownMenuItem onClick={() => handleSubmitForReview(article.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Submit for Review
                          </DropdownMenuItem>
                        )}
                        {article.status !== "approved" && (
                          <DropdownMenuItem onClick={() => handleDelete(article.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {articles.length > 0 && (
        <PaginationControls 
          totalCount={totalCount} 
          currentPage={currentPage} 
          pageSize={20}
          onPageChange={handlePageChange}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}