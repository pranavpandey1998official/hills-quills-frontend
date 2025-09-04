"use client"

import LoginForm from "@/components/auth/loginform"
import { ArrowLeft, PenTool } from "lucide-react"
import Link from "next/link"
import { useAuthorLogin } from "./hook"

export default function AuthorLoginPage() {
  const { handleAuthor, isLoading, error } =  useAuthorLogin()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
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
            <PenTool className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-gray-900">Author Portal</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Floating Elements */}
          <div className="absolute top-20 right-10 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-500" />
          <div className="absolute bottom-32 left-10 w-16 h-16 bg-green-300 rounded-full opacity-15 animate-pulse delay-1500" />

          <LoginForm isAdmin={false} handleLogin={handleAuthor} isLoading={isLoading} error={error} />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">New author? Contact your editor for account setup</p>
          </div>
        </div>
      </div>
    </div>
  )
}
