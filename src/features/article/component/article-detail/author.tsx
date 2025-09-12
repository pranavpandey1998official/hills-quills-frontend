import Image from "next/image"

interface AuthorCardProps {
  name: string
  profile_photo_url: string
  profession: string
  about: string
  role: string
}

export function AuthorCard({ name, profile_photo_url, profession, about, role }: AuthorCardProps) {
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
              src={"/images/author.png"}
              alt={name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-1">{name}</h4>
            <p className="text-sm text-gray-500 mb-3">{profession}</p>
            <p className="text-sm text-gray-700 leading-relaxed">{about}</p>
          </div>
        </div>
      </div>
    </div>
  )
}