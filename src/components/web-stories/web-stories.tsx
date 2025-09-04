// WebStories.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { WebStoryViewer } from "./web-story-viewer"

export type Story = {
  id: string
  title: string
  category: string
  region: string
  image: string
  gradient: string
}

const defaultStories: Story[] = [
  {
    id: "1",
    title: "A Day in the Life of Badrinath Temple Priests",
    category: "Culture",
    region: "Uttarakhand",
    image:  "/images/temple-story.jpg",
    gradient: "from-orange-400 to-orange-600",
  },
  {
    id: "2",
    title: "The Vibrant Colors of Kumaoni Holi Festival",
    category: "Festivals",
    region: "Kumaon",
    image:  "/images/temple-story.jpg",
    gradient: "from-green-400 to-blue-500",
  },
  {
    id: "3",
    title: "Trekking Through Valley of Flowers: A Visual Journey",
    category: "Travel",
    region: "Chamoli",
    image: "/images/temple-story.jpg",
    gradient: "from-blue-400 to-blue-600",
  },
]

export function WebStories({ stories = defaultStories }: { stories?: Story[] }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  const openStoryViewer = (index: number) => {
    setCurrentStoryIndex(index)
    setIsViewerOpen(true)
  }

  const closeStoryViewer = () => {
    setIsViewerOpen(false)
  }

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
    } else {
      closeStoryViewer()
    }
  }

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
    }
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 section-heading">
            <span className="section-bullet"></span>
            Web Stories
          </h2>
          <button className="text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center">
            View All
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-48 h-96 relative rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openStoryViewer(index)}
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 640px) 50vw, 192px"
                className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-125"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-5 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-serif text-base leading-tight line-clamp-2">{story.title}</h3>
                <p className="text-white/70 text-xs font-sans mt-1">{story.category} • {story.region}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WebStoryViewer
        stories={stories}
        currentStoryIndex={currentStoryIndex}
        isOpen={isViewerOpen}
        onClose={closeStoryViewer}
        onNext={nextStory}
        onPrevious={previousStory}
      />
    </>
  )
}
