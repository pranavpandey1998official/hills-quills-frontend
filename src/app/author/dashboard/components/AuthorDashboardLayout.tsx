"use client"

import type React from "react"
import { useSelector } from "react-redux"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Plus, User, BarChart3, Settings, LogOut, ChevronUp, Home, Edit, Video } from "lucide-react"
import type { RootState } from "@/redux/store"

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/author/dashboard" },
  { title: "My Articles", icon: FileText, href: "/author/articles" },
  { title: "My Stories", icon: Video, href: "/author/stories" },
  { title: "Create Article", icon: Plus, href: "/author/create-news" },
  { title: "Create Story", icon: Plus, href: "/author/create-story" },
  { title: "Analytics", icon: BarChart3, href: "/author/analytics" },
  { title: "Profile", icon: User, href: "/author/dashboard/profile" },
  { title: "Settings", icon: Settings, href: "/author/settings" },
]

function AuthorSidebar() {
  // Get the current author's profile directly from the profile field
  const { profile } = useSelector((state: RootState) => state.authors)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Edit className="h-4 w-4" />
          </div>
          <span className="font-semibold">Author Panel</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={profile?.profile_photo_url || "/placeholder.svg"} />
                    <AvatarFallback>{profile?.name?.charAt(0).toUpperCase() || "A"}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{profile?.name || "Author"}</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

interface AuthorDashboardLayoutProps {
  children: React.ReactNode
}

export function AuthorDashboardLayout({ children }: AuthorDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AuthorSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Author Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}