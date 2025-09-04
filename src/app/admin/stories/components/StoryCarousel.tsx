"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface StorySlide {
  id: string
  image: string
  title: string
  description: string
  duration: number
}

interface StoryCarouselProps {
  slides: StorySlide[]
  autoPlay?: boolean
  className?: string
}

export function StoryCarousel({ slides, autoPlay = false, className }: StoryCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, (slides[currentSlide]?.duration || 5) * 1000)

    return () => clearInterval(interval)
  }, [isPlaying, currentSlide, slides, nextSlide])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (slides.length === 0) {
    return (
      <div className={cn("relative w-full h-full bg-muted flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center mb-2 mx-auto">
            <Play className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No slides</p>
        </div>
      </div>
    )
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className={cn("relative w-full h-full group", className)}>
      {/* Main slide */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={currentSlideData?.image || "/placeholder.svg?height=400&width=300"}
          alt={currentSlideData?.title || "Story slide"}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="96px"
        />

      </div>

      {/* Controls - show on hover */}
      {slides.length > 1 && (
        <>
          {/* Navigation arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={prevSlide}
              className="h-6 w-6 p-0 rounded-full bg-black/50 hover:bg-black/70 border-none"
            >
              <ChevronLeft className="h-3 w-3 text-white" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={nextSlide}
              className="h-6 w-6 p-0 rounded-full bg-black/50 hover:bg-black/70 border-none"
            >
              <ChevronRight className="h-3 w-3 text-white" />
            </Button>
          </div>

          {/* Play/Pause button */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={togglePlayPause}
              className="h-6 w-6 p-0 rounded-full bg-black/50 hover:bg-black/70 border-none"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3 text-white" />
              ) : (
                <Play className="h-3 w-3 text-white" />
              )}
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-200",
                  index === currentSlide 
                    ? "bg-white" 
                    : "bg-white/50 hover:bg-white/70"
                )}
              />
            ))}
          </div>

          {/* Progress bar for current slide */}
          {isPlaying && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: `${((Date.now() % ((currentSlideData?.duration || 5) * 1000)) / ((currentSlideData?.duration || 5) * 1000)) * 100}%`
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Slide counter */}
      <div className="absolute top-1 right-1 text-xs text-white bg-black/50 px-1.5 py-0.5 rounded">
        {currentSlide + 1}/{slides.length}
      </div>
    </div>
  )
}
