"use client"

import { LazyImage } from "./lazy-image"

interface SingleImageLayoutProps {
  images: string[]
  title: string
  aspectRatio: string
}

export function SingleImageLayout({ images, title, aspectRatio }: SingleImageLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        {images.map((img, idx) => (
          <div key={idx} className="mb-8 last:mb-0">
            <LazyImage
              src={img}
              alt={`${title} ${idx + 1}`}
              aspectRatio={aspectRatio}
              priority={idx === 0}
              className="mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
