"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  aspectRatio: string
  priority?: boolean
  className?: string
}

export function LazyImage({ src, alt, aspectRatio, priority = false, className = "" }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Add cache-busting timestamp to prevent 304 responses
  const cacheBustingSrc = src ? `${src}?t=${Date.now()}` : "/images/placeholder-logo.jpg"

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
      <div className={`relative w-full ${aspectRatio}`}>
        {/* Skeleton loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 animate-pulse" />
        )}

        {/* Image */}
        {isInView && (
          <Image
            src={cacheBustingSrc}
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
        <div className="absolute inset-0 bg-neutral-100 -z-10" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Loading indicator */}
        {isInView && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}
