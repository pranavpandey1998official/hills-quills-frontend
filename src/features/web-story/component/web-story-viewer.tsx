"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useDeepCompareMemo } from "use-deep-compare"
import Image from "next/image"
import { X, Share2, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StoryView } from "@/features/web-story/types"


interface WebStoryViewerProps {
  story: StoryView
  onClose: () => void
}

export function WebStoryViewer({
  story,
  onClose,
}: WebStoryViewerProps) {
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const currentStory = useDeepCompareMemo(() => story.slides[currentSlideIndex], [currentSlideIndex, story.slides])

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0)
    setIsPaused(false)
  }, [currentSlideIndex])

  const handleNext = useCallback(() => {
    if (currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    } else {
      setCurrentSlideIndex(0)
    }
  }, [currentSlideIndex])

  const handlePrevious = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }, [setCurrentSlideIndex, currentSlideIndex])

  // Handle story advancement when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        handleNext()
      }, 100) // Small delay to prevent render cycle issues

      return () => clearTimeout(timer)
    }
  }, [progress, handleNext])

  // Progress timer
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100 // Don't exceed 100, let the other effect handle advancement
        }
        return prev + 2 // Increment by 2 for 5 second duration (50 * 2 = 100)
      })
    }, 100) // Update every 100ms for smoother animation

    return () => clearInterval(timer)
  }, [isPaused, currentSlideIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious()
          break
        case "ArrowRight":
          handleNext()
          break
        case " ":
          e.preventDefault()
          setIsPaused(!isPaused)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrevious, isPaused])

  const togglePause = useCallback(() => {
    setIsPaused(!isPaused)
  }, [isPaused])

  return (
    <div className="relative z-50 bg-black/90 flex items-center justify-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image 
          src={story.cover_image_url || "/placeholder.svg"} 
          alt="" 
          fill 
          sizes="100vw"
          className="object-cover blur-2xl opacity-100" 
        />
      </div>

      {/* Story Container - Increased size */}
      <div className="h-dvh w-full flex items-center justify-center">
        <div className="relative w-full max-w-md h-dvh  sm:h-[85dvh] bg-white rounded-2xl shadow-2xl">
          {/* Progress Bar */}
          <div className="absolute top-2 left-2 right-2 z-20">
            <div className="flex space-x-1">
              {story.slides.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{
                      width: index < currentSlideIndex ? "100%" : index === currentSlideIndex ? `${progress}%` : "0%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Header */}
          <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-lg px-3 py-1">
                <div className="text-xs font-bold">
                  <span className="text-teal-600">Hills</span>
                  <span className="text-orange-500">Quills</span>
                </div>
                <div className="text-xs text-gray-600">Stories</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={togglePause}
              >
                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: currentStory.caption,
                      url: window.location.href,
                    })
                  }
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Story Image */}
          <div className="relative w-full h-full overflow-hidden scrollbar-hide">
            <img
              src={currentStory.image_url || "/placeholder.svg"}
              alt={currentStory.caption}
              className="object-fill"
            />
            {/* Replaced full-screen gradients with a bottom gradient only for the text area */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t opacity-20 z-10`} />
          </div>

          {/* Pause Overlay - Clickable to resume */}
          {isPaused && (
            <div
              className="absolute inset-0 bg-black/20 flex items-center justify-center z-30 cursor-pointer"
              onClick={togglePause}
            >
              <div className="bg-white/50 rounded-full p-4">
                <Play className="h-8 w-8 text-black" />
              </div>
            </div>
          )}

          {/* Story Title */}
          <div className="absolute bottom-8  left-4 right-4 z-20 text-center">
            <h2 className="text-white text-2xl font-bold leading-tight">{currentStory.caption}</h2>
          </div>

          {/* Navigation Areas - Only active when not paused */}
          {!isPaused && (
            <>
              <button
                className="absolute left-0 top-0 bottom-0 w-1/3 h-full z-10 flex items-center justify-start pl-4"
                onClick={handlePrevious}
                disabled={currentSlideIndex === 0}
              >
                {currentSlideIndex > 0 && (
                  <div className="bg-white rounded-full p-2">
                    <ChevronLeft className="h-6 w-6 text-black" />
                  </div>
                )}
              </button>

              <button
                className="absolute right-0 top-0 bottom-0 w-1/3 h-full z-10 flex items-center justify-end pr-4"
                onClick={handleNext}
              >
                <div className="bg-white rounded-full p-2">
                  <ChevronRight className="h-6 w-6 text-black" />
                </div>
              </button>

              {/* Center tap area for pause on mobile */}
              <div className="absolute left-1/3 top-0 w-1/3 h-full z-10 md:hidden" onClick={togglePause} />

              {/* Tap Areas for Mobile Navigation */}
              <div className="absolute left-0 top-0 w-1/4 h-full z-10 md:hidden" onClick={handlePrevious} />
              <div className="absolute right-0 top-0 w-1/4 h-full z-10 md:hidden" onClick={handleNext} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
