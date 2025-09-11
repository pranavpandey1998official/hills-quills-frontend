import Image from "next/image"

export interface IntroProps {
  title: string
  description: string
  backgroundImage: string
}

export function Intro({
  title,
  description,
  backgroundImage
}: IntroProps) {
  return (
    <section aria-label="Intro Section" className="max-w-7xl mx-auto">
      <div className="relative h-48 overflow-hidden rounded-xl bg-gray-200">
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
          <div className="max-w-4xl px-12">
            <h1 className="sm:text-md text-xl md:text-2xl font-bold text-white mb-2">{title}</h1>
            <p className="sm:text-base text-sm font-light text-gray-200 max-w-2xl">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
