"use client"

import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Edit, Trash2, MoreHorizontal, Eye, Send, FileText, TrendingUp, Star } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { deleteArticle, resubmitArticle ,fetchTrendingArticles} from "@/redux/slices/articlesSlice"
import type { RootState, AppDispatch } from "@/redux/store"
import { PaginationControls } from "@/components/PaginationControls"
import { toast } from "sonner"
import type { Article } from "@/types/articles"

export function AuthorArticlesTable() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    items: articles,
    isLoading,
    totalCount,
    currentPage,
    trending,
  } = useSelector((state: RootState) => state.articles)

  const [selectedArticles, setSelectedArticles] = useState<(string | number)[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<string | number | null>(null)
  const [trendingArticleIds, setTrendingArticleIds] = useState<Set<string | number>>(new Set())

  useEffect(() => {
    dispatch(fetchTrendingArticles("week"))
  }, [dispatch])

  useEffect(() => {
    if (trending.items && trending.items.length > 0) {
      const trendingIds = new Set(trending.items.map(article => article.id))
      setTrendingArticleIds(trendingIds)
    }
  }, [trending.items])

  const isArticleTrending = (articleId: string | number) => {
    return trendingArticleIds.has(articleId)
  }
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArticles(articles.map((article) => article.id))
    } else {
      setSelectedArticles([])
    }
  }

  const handleSelectArticle = (articleId: string | number, checked: boolean) => {
    if (checked) {
      setSelectedArticles([...selectedArticles, articleId])
    } else {
      setSelectedArticles(selectedArticles.filter((id) => id !== articleId))
    }
  }

  const handleEdit = (articleId: string | number, status: string) => {
    if (status === "approved") {
      toast.error("Cannot edit approved articles")
      return
    }
    window.location.href = `/author/my-news/${articleId}/edit`
  }

  const handleView = (articleId: string | number) => {
    window.location.href = `/author/articles/${articleId}`
  }

  const handleDelete = (articleId: string | number) => {
    setArticleToDelete(articleId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (articleToDelete) {
      dispatch(deleteArticle(String(articleToDelete)))
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
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

      {/* Articles Table */}
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
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No articles found</p>
                    <Button asChild size="sm">
                      <a href="/author/create-news">Create your first article</a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article: Article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedArticles.includes(article.id)}
                      onCheckedChange={(checked) => handleSelectArticle(article.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium truncate">{article.title}</p>
                        <div className="flex items-center space-x-1">
                          {isArticleTrending(article.id) && (
                            <span title="Trending Article" className="inline-flex p-1 rounded-sm bg-purple-50 text-purple-700">
                              <TrendingUp className="h-3 w-3" />
                            </span>
                          )}
                          {article.is_top_news && (
                            <span title="Top News" className="inline-flex p-1 rounded-sm bg-yellow-50 text-yellow-700">
                              <Star className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{article.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadge(article.category)}>{article.category}</Badge>
                  </TableCell>
                  <TableCell>{article.region}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(article.status)}>{article.status}</Badge>
                  </TableCell>
                  <TableCell>{article.views_count?.toLocaleString() || 0}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(article.created_at), { addSuffix: true })}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(article.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
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
                            Resubmit
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
      {articles.length > 0 && <PaginationControls totalCount={totalCount} currentPage={currentPage} pageSize={10} />}

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