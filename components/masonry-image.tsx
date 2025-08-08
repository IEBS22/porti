"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { addCacheBuster } from "../lib/image-utils"

interface MasonryImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export function MasonryImage({ src, alt, priority = false, className = "" }: MasonryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    })
    setIsLoaded(true)
  }

  return (
    <div
      ref={imgRef}
      className={`group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      {imageDimensions && (
        <div
          className="relative w-full"
          style={{ aspectRatio: `${imageDimensions.width} / ${imageDimensions.height}` }}
        >
          {/* Skeleton loader */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse" />
          )}

          {/* Image */}
          {isInView && (
            <Image
              src={addCacheBuster(src || "/images/placeholder-logo.jpg")}
              alt={alt}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading={priority ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
              onLoad={handleImageLoad}
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Loading indicator */}
          {isInView && !isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}

      {/* Fallback while dimensions are loading */}
      {!imageDimensions && isInView && (
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={addCacheBuster(src || "/images/placeholder-logo.jpg")}
            alt={alt}
            fill
            className="object-contain opacity-0"
            loading={priority ? "eager" : "lazy"}
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse" />
        </div>
      )}
    </div>
  )
}
