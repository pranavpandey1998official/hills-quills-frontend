"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, FileText } from "lucide-react"

interface StatusBadgeProps {
  status: "draft" | "pending" | "published" | "rejected"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "published":
        return {
          variant: "default" as const,
          icon: CheckCircle,
          className: "bg-green-500 hover:bg-green-600 text-white",
          label: "Published"
        }
      case "pending":
        return {
          variant: "secondary" as const,
          icon: Clock,
          className: "bg-yellow-500 hover:bg-yellow-600 text-white",
          label: "Pending"
        }
      case "rejected":
        return {
          variant: "destructive" as const,
          icon: XCircle,
          className: "bg-red-500 hover:bg-red-600 text-white",
          label: "Rejected"
        }
      case "draft":
      default:
        return {
          variant: "outline" as const,
          icon: FileText,
          className: "text-muted-foreground border-muted-foreground",
          label: "Draft"
        }
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  )
}
