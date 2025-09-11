"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Lock, User, Shield } from "lucide-react"
import { LoginFormProps } from "@/types/auth"


export default function LoginForm({ isAdmin, handleLogin, isLoading  }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleLogin(email, password)
  }


  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className={`p-3 rounded-full ${isAdmin ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>
            {isAdmin ? <Shield className="h-6 w-6" /> : <User className="h-6 w-6" />}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">{isAdmin ? "Admin Portal" : "Author Portal"}</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          {isAdmin ? "Access your administrative dashboard" : "Sign in to manage your content"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isAdmin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              `Sign in as ${isAdmin ? "Admin" : "Author"}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
