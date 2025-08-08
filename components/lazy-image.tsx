"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { addCacheBuster } from "../lib/image-utils"

interface LazyImageProps {
  src: string
  alt: string
  aspectRatio: string
  priority?: boolean
  className?: string
}

function getAspectRatioValue(aspectRatio: string): string {
  const ratioMap: { [key: string]: string } = {
    "aspect-square": "1",
    "aspect-[3/2]": "3/2", 
    "aspect-[4/3]": "4/3",
    "aspect-[16/9]": "16/9",
    "aspect-video": "16/9"
  }
  return ratioMap[aspectRatio] || "4/3"
}

export function LazyImage({ src, alt, aspectRatio, priority = false, className = "" }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
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

  return (
    <div
      ref={imgRef}
      className={`group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="relative w-full" style={{ aspectRatio: getAspectRatioValue(aspectRatio) }}>
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
            className={`object-contain group-hover:scale-105 transition-transform duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
            onLoad={() => setIsLoaded(true)}
          />
        )}

        {/* Background for images that don't fill the container */}
        <div className="absolute inset-0 bg-neutral-900 -z-10" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Loading indicator */}
        {isInView && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
