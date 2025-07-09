import Image from "next/image"

const webStories = [
  {
    id: "1",
    title: "A Day in the Life of Badrinath Temple Priests",
    image: "/placeholder.svg?height=300&width=200",
    region: "Uttarkashi",
    category: "Culture",
  },
  {
    id: "2",
    title: "The Vibrant Colors of Kumaoni Holi Festival",
    image: "/placeholder.svg?height=300&width=200",
    region: "Kumaon",
    category: "Festival",
  },
  {
    id: "3",
    title: "Trekking Through Valley of Flowers",
    image: "/placeholder.svg?height=300&width=200",
    region: "Chamoli",
    category: "Adventure",
  },
  {
    id: "4",
    title: "Sacred Rituals at Kedarnath Temple",
    image: "/placeholder.svg?height=300&width=200",
    region: "Uttarkashi",
    category: "Spirituality",
  },
  {
    id: "5",
    title: "Mountain Wildlife Conservation",
    image: "/placeholder.svg?height=300&width=200",
    region: "Garhwal",
    category: "Wildlife",
  },
]

export function WebStoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-navy-600 pb-2">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded mr-3"></span>
          Web Stories
        </h2>
        <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">View All</button>
      </div>

      <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
        {webStories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 w-56 h-80 relative rounded-2xl overflow-hidden cursor-pointer group"
          >
            <Image
              src={story.image || "/placeholder.svg"}
              alt={story.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-base leading-tight line-clamp-3">{story.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
