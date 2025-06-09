"use client"

import ProtectedRoute from "@/components/auth/protectedroute"
import { useAuth } from "@/hooks/useAuth"

export default function AuthorDashboardPage() {
    const { user, logout } = useAuth()
  return (
    <ProtectedRoute requiredRole="author">
    <div>
      <h1>Author Dashboard</h1>
    </div>
    </ProtectedRoute>
  )
}
