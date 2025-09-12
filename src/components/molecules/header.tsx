"use client"

import React from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Region } from "@/types/common"

export function Header() {
  
  return (
    <header className="bg-white my-4 border-y  border-gray-200">
      <div>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">Hills</span>
              <span className="text-secondary">Quills</span>
            </Link>
            <span className="ml-2 text-sm text-gray-500">Mountain Chronicles</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 font-medium relative group">
              Home
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link href="/top-news" className="text-gray-700 font-medium relative group">
              Top News
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link href="/kumaon" className="text-gray-700 font-medium relative group">
              Kumaon
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link href="/garhwal" className="text-gray-700 font-medium relative group">
              Garhwal
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            {/* <Link href="/web-stories" className="text-gray-700 font-medium relative group">
              Web Stories
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link> */}
          </nav>

          <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Region</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Object.values(Region).map((region) => (
                <Link href={`/region/${region}`} prefetch={false} key={region}>
                  <DropdownMenuItem key={region}>{region}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
