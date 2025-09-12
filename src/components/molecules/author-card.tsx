import Image from "next/image"

interface AuthorCardProps {
  author: {
    name: string
    role: string
    image: string
    bio: string
  }
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Title Bar */}
      <div className="bg-primary text-white px-4 py-2">
        <h3 className="font-bold text-sm uppercase tracking-wide">About the Author</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={author.image || "/placeholder.svg"}
              alt={author.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-1">{author.name}</h4>
            <p className="text-sm text-gray-500 mb-3">{author.role}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{author.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
