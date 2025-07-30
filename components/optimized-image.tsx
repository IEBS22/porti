"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  aspectRatio: string
  priority?: boolean
  className?: string
  fallbackSrc?: string
}

export function OptimizedImage({ 
  src, 
  alt, 
  aspectRatio, 
  priority = false, 
  className = "",
  fallbackSrc = "/images/placeholder-logo.jpg"
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
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

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      console.warn(`Failed to load image: ${currentSrc}, trying fallback`)
      setCurrentSrc(fallbackSrc)
      setHasError(false) // Reset error state to try fallback
    } else {
      setHasError(true)
      console.error(`Failed to load image and fallback: ${src}`)
    }
  }

  return (
    <div
      ref={imgRef}
      className={`group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className={`relative w-full ${aspectRatio}`}>
        {/* Skeleton loader */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 animate-pulse" />
        )}

        {/* Image */}
        {isInView && !hasError && (
          <Image
            src={currentSrc}
            alt={alt}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        )}

        {/* Background for images that don't fill the container */}
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 -z-10" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Loading indicator */}
        {isInView && !isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <div className="text-center text-neutral-500 dark:text-neutral-400">
              <div className="w-12 h-12 mx-auto mb-2 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}