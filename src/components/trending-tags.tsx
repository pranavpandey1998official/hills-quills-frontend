import { Badge } from "@/components/ui/badge"

const trendingTags = [
  "Trending",
  "Hill Farming",
  "Char Dham Yatra",
  "Dehradun Development",
  "Uttarakhand Elections",
  "Hill Farming",
  "Car Dham Yatra",
  "Dehradun Development",
  "Tourism Revival",
  "Mountain Wildlife",
  "Sustainable Development",
]

export function TrendingTags() {
  return (
    <div className="bg-gray-50 border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex animate-scroll">
          {/* First set of tags */}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            {trendingTags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer px-3 py-1 text-sm font-normal"
              >
                #{tag}
              </Badge>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-3 whitespace-nowrap ml-3">
            {trendingTags.map((tag, index) => (
              <Badge
                key={`duplicate-${index}`}
                variant="secondary"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer px-3 py-1 text-sm font-normal"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
