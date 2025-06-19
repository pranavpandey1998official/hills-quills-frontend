"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toggleAuthorStatus, fetchAuthorsByAdmin } from "@/redux/slices/authorsSlice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import type { RootState, AppDispatch } from "@/redux/store"

export function AuthorsTable() {
  const dispatch = useDispatch<AppDispatch>()
  const { items: authors, isLoading } = useSelector((state: RootState) => state.authors)
  const [toggleLoading, setToggleLoading] = useState<Record<string | number, boolean>>({})

  useEffect(() => {
    dispatch(fetchAuthorsByAdmin())
  }, [dispatch])

  const getStatusBadge = (is_active: number) => {
    return is_active === 1 
      ? <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      : <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>
  }

  const handleToggleStatus = async (authorId: string | number, is_active: number) => {
    try {
      // Set loading state for this specific button
      setToggleLoading(prev => ({ ...prev, [authorId]: true }))
      
      // Toggle the status - if active (1), deactivate (0). If inactive (0), activate (1)
      const isActive = is_active === 0
      await dispatch(toggleAuthorStatus({ id: authorId, isActive })).unwrap()
      
      // Show success toast
      toast.success(`Author has been ${isActive ? 'activated' : 'deactivated'} successfully.`)
    } catch (error) {
      // Show error toast
      toast.error("Failed to update author status. Please try again.")
    } finally {
      // Clear loading state
      setToggleLoading(prev => ({ ...prev, [authorId]: false }))
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading authors...</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Articles</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {author.profile_photo_url && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={author.profile_photo_url} alt={author.name} />
                      <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  {author.name}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{author.email}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center space-x-1">
                  <FileText className="h-3 w-3" />
                  <span>{author.article_count}</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(author.is_active)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={author.is_active === 1 ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleStatus(author.id, author.is_active)}
                  className={author.is_active === 1 ? "" : "bg-primary hover:bg-primary/90"}
                  disabled={toggleLoading[author.id]}
                >
                  {toggleLoading[author.id] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    author.is_active === 1 ? "Deactivate" : "Activate"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {authors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No authors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
