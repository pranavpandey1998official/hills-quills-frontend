"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InlineSearch } from "./search/inline-search"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  
  const openSearch = () => {
    setSearchOpen(true)
  }
  
  const closeSearch = () => {
    setSearchOpen(false)
  }
  
  return (
    <>
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-teal-600">Hills</span>
              <span className="text-orange-500">Quills</span>
            </Link>
            <span className="ml-2 text-sm text-gray-500">Mountain Chronicles</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 font-medium relative group">
              Home
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link href="/articles/top-news" className="text-gray-700 font-medium relative group">
              Top News
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link href="/articles/culture" className="text-gray-700 font-medium relative group">
              Culture
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link href="/web-stories" className="text-gray-700 font-medium relative group">
              Vibes
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden sm:flex items-center space-x-2 bg-white text-gray-700">
              <span>Select Region</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={openSearch}>
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
      
      {/* Inline search component */}
      {searchOpen && <InlineSearch isOpen={searchOpen} onClose={closeSearch} />}
    </>
  )
}
