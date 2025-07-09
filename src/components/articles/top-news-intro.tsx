import Image from "next/image"

interface TopNewsIntroProps {
  title: string
  description: string
  backgroundImage: string
}

export function TopNewsIntro({
  title,
  description,
  backgroundImage
}: TopNewsIntroProps) {
  return (
    <section aria-label="Top News Section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative h-64 md:h-80 overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={backgroundImage}
          alt="Top News Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={100}
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl px-8 md:px-12 lg:px-16">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
