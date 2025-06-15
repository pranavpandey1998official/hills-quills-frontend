"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Check, X, Star, Loader2 } from "lucide-react"
import { approveArticle, rejectArticle, bulkApproveArticles, bulkRejectArticles, toggleTopNews, bulkToggleTopNews } from "@/redux/slices/articlesSlice"
import { toast } from "sonner"
import type { RootState, AppDispatch } from "@/redux/store"

export function ArticlesTable() {
  const { items: articles, isLoading } = useSelector((state: RootState) => state.articles)
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({})
  const dispatch = useDispatch<AppDispatch>()

  const toggleSelection = (id: string) => {
    setSelectedArticles((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    )
  }

  const toggleAllSelection = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(articles.map((article) => String(article.id)))
    }
  }

  const handleApprove = (id: string) => {
    dispatch(approveArticle(id));
  }

  const handleReject = (id: string) => {
    dispatch(rejectArticle(id));
  }

  const handleToggleTopNews = async (id: string, is_top_news: number) => {
    try {
      setActionLoading(prev => ({ ...prev, [id]: true }));
      const setAsTop = is_top_news === 0; // If current is 0, we want to set it to 1
      await dispatch(toggleTopNews({ id, setAsTop })).unwrap();
      toast.success(`Article ${setAsTop ? 'added to' : 'removed from'} top news.`);
    } catch (error) {
      toast.error("Failed to update top news status");
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  }

  const handleBulkApprove = () => {
    dispatch(bulkApproveArticles(selectedArticles));
    setSelectedArticles([]);
  }

  const handleBulkReject = () => {
    dispatch(bulkRejectArticles(selectedArticles));
    setSelectedArticles([]);
  }

  const handleBulkToggleTopNews = async (setAsTop: boolean) => {
    try {
      setActionLoading(prev => ({ ...prev, 'bulk': true }));
      await dispatch(bulkToggleTopNews({ ids: selectedArticles, setAsTop })).unwrap();
      toast.success(`Selected articles ${setAsTop ? 'added to' : 'removed from'} top news.`);
      setSelectedArticles([]);
    } catch (error) {
      toast.error("Failed to update top news status");
    } finally {
      setActionLoading(prev => ({ ...prev, 'bulk': false }));
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading articles...</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox 
                checked={selectedArticles.length === articles.length && articles.length > 0} 
                onCheckedChange={toggleAllSelection}
              />
            </TableHead>
            <TableHead className="min-w-[200px]">Title</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden md:table-cell">Region</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedArticles.includes(String(article.id))} 
                  onCheckedChange={() => toggleSelection(String(article.id))}
                />
              </TableCell>
              <TableCell className="font-medium">
                {article.title}
                {article.is_top_news === 1 && (
                  <Star className="inline-block ml-2 h-3 w-3 fill-yellow-500 text-yellow-500" />
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">{article.author_name}</TableCell>
              <TableCell className="hidden md:table-cell">{article.region}</TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(article.created_at), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>{getStatusBadge(article.status)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={article.status === "approved"}
                  className="h-8 w-8 text-green-500"
                  onClick={() => handleApprove(String(article.id))}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={article.status === "rejected"}
                  className="h-8 w-8 text-red-500"
                  onClick={() => handleReject(String(article.id))}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${article.is_top_news === 1 ? 'text-yellow-500' : 'text-muted-foreground'}`}
                  onClick={() => handleToggleTopNews(String(article.id), article.is_top_news)}
                  disabled={actionLoading[String(article.id)]}
                >
                  {actionLoading[String(article.id)] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Star className={`h-4 w-4 ${article.is_top_news === 1 ? 'fill-yellow-500' : ''}`} />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {articles.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No pending articles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedArticles.length > 0 && (
        <div className="flex items-center justify-end gap-2 py-4">
          <Button variant="outline" onClick={() => setSelectedArticles([])}>
            Cancel
          </Button>
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleBulkApprove}
          >
            Approve Selected ({selectedArticles.length})
          </Button>
          <Button 
            variant="destructive"
            onClick={handleBulkReject}
          >
            Reject Selected ({selectedArticles.length})
          </Button>
          <Button 
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-50 mr-2"
            onClick={() => handleBulkToggleTopNews(true)}
            disabled={actionLoading['bulk']}
          >
            {actionLoading['bulk'] ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4 fill-yellow-500" />
                Add to Top News
              </>
            )}
          </Button>
          <Button 
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-50"
            onClick={() => handleBulkToggleTopNews(false)}
            disabled={actionLoading['bulk']}
          >
            {actionLoading['bulk'] ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Remove from Top News
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
