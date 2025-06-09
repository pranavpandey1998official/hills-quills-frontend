"use client"

import ProtectedRoute from "@/components/auth/protectedroute"
import { useAuth } from "@/hooks/useAuth"

export default function AdminDashboardPage() {
    const { user, logout } = useAuth()
  return (
    <ProtectedRoute requiredRole="admin">
    <div>
      <h1>Admin Dashboard</h1>
    </div>
    </ProtectedRoute>
  )
}
