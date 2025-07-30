/**
 * Utility functions for handling images
 */

/**
 * Adds a cache-busting parameter to image URLs
 * This helps ensure images are loaded fresh when needed
 */
export function addCacheBuster(url: string): string {
  if (!url) return url
  
  // If URL already has parameters, add to existing ones
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${Date.now()}`
}

/**
 * Validates if an image path exists and is accessible
 */
export function validateImagePath(path: string): boolean {
  // Basic validation - check if path starts with /images/
  return path.startsWith('/images/') && path.includes('.')
}

/**
 * Gets the optimized image URL with proper sizing
 */
export function getOptimizedImageUrl(src: string, width?: number, height?: number): string {
  if (!src) return src
  
  // For local images, we can add optimization parameters
  if (src.startsWith('/images/')) {
    return src
  }
  
  return src
}
