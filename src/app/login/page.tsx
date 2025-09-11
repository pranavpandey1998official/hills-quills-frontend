import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, User, ArrowRight } from "lucide-react"

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back</h1>
            <p className="text-xl text-muted-foreground">Choose your portal to continue</p>
          </div>

          {/* Login Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Admin Login */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
                <CardDescription className="text-base">
                  Access administrative dashboard and system controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login/admin">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 group"
                >
                  Continue as Admin
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Author Login */}
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-200">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Author Portal</CardTitle>
                <CardDescription className="text-base">Manage your content, articles, and publications</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login/author">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 group"
                  size="lg"
                >
                  Continue as Author
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">Secure login powered by advanced authentication</p>
          </div>
        </div>
      </div>
    </div>
  )
}
