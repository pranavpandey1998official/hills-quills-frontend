"use client"

import LoginForm from "@/features/auth/components/loginform"
import { ArrowLeft, Building2 } from "lucide-react"
import Link from "next/link"
import { useAdminLogin } from "./hooks"

export default function AdminLoginPage() {
  const { handleAdminLogin, isLoading } =  useAdminLogin()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link
            href="/login"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login options
          </Link>
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Admin Portal</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-10 animate-pulse delay-1000" />

          <LoginForm isAdmin handleLogin={handleAdminLogin} isLoading={isLoading}  />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">Need help? Contact your system administrator</p>
          </div>
        </div>
      </div>
    </div>
  )
}
