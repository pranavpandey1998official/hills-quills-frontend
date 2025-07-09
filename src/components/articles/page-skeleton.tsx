import React from 'react'

export function PageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Ad Banner Skeleton */}
      <div className="bg-gray-200 h-20 w-full mb-4"></div>

      {/* TopNewsIntro Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative bg-gray-200 h-64 md:h-80 overflow-hidden rounded-lg">
          <div className="h-full flex items-center px-8 md:px-12 lg:px-16">
            <div className="space-y-4 max-w-2xl">
              <div className="h-12 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FeaturedArticlesGrid Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Dividers Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-5">
            <div className="h-0.5 bg-gray-300"></div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-0.5 bg-gray-300"></div>
          </div>
          <div className="lg:col-span-3">
            <div className="h-0.5 bg-gray-300"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column Skeleton - Featured Article */}
          <div className="lg:col-span-5">
            <div className="h-64 md:h-80 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-4/5"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>

          {/* Middle Column Skeleton - Secondary Articles */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                        <div className="h-5 w-14 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-3 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-3">
            <div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i}>
                  <div className="py-3">
                    <div className="flex space-x-3">
                      <div className="bg-gray-200 w-16 h-16 rounded-lg"></div>
                      <div className="flex-1 space-y-1">
                        <div className="bg-gray-200 h-4 w-full rounded"></div>
                        <div className="bg-gray-200 h-3 w-16 rounded"></div>
                      </div>
                    </div>
                  </div>
                  {i < 8 && (
                    <div className="my-3">
                      <div className="h-0.5 bg-gray-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner Skeleton */}
      <div className="bg-gray-200 h-20 w-full mb-8"></div>

      {/* Web Stories Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-0.5 bg-gray-200 flex-1"></div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-200 h-80 w-60 flex-shrink-0 rounded-lg"></div>
          ))}
        </div>
      </section>

      {/* Culture & Districts Section Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-56"></div>
          <div className="h-0.5 bg-gray-200 flex-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="bg-gray-200 h-5 w-16 rounded-full"></div>
                  <div className="bg-gray-200 h-5 w-20 rounded-full"></div>
                </div>
                <div className="bg-gray-200 h-6 w-full rounded"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="bg-gray-200 h-4 w-20 rounded"></div>
                  <div className="bg-gray-200 h-4 w-16 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Banner Skeleton */}
      <div className="bg-gray-200 h-20 w-full mb-8"></div>
    </div>
  )
} 