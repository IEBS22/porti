// Utility function to help you generate image arrays dynamically
export function generateImagePaths(folderName: string, imageNames: string[]): string[] {
  return imageNames.map((imageName) => `/images/${folderName}/${imageName}`)
}

// Simple hash function for cache-busting
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Cache-busting utility to prevent 304 status codes on images
 * 
 * This function adds a parameter to image URLs to ensure
 * browsers always request fresh images instead of using cached versions
 * that would return 304 (Not Modified) status codes.
 * 
 * @param url - The image URL to add cache-busting to
 * @param useTimestamp - If true, uses timestamp for unique URLs every time. If false, uses hash for consistent URLs.
 * @returns The URL with a cache-busting parameter added
 */
export function addCacheBuster(url: string, useTimestamp: boolean = true): string {
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) {
    return url
  }
  
  const separator = url.includes('?') ? '&' : '?'
  
  if (useTimestamp) {
    // Use timestamp for unique URLs every time (forces fresh loads)
    const timestamp = Date.now()
    return `${url}${separator}t=${timestamp}`
  } else {
    // Use hash for consistent URLs (better for caching but may still get 304s)
    const hash = simpleHash(url)
    return `${url}${separator}v=${hash}`
  }
}

// Example usage for your Art folder:
export const artImages = [
  "IMG_1403.jpeg",
  "IMG_1705.jpeg",
  "IMG_1849.jpeg",
  "IMG_3998.jpeg",
  "IMG_4106.jpeg",
  // Add all your image filenames here
]

export const automobileImages = [
  "2G8A0008.jpg",
  "2G8A0011.jpg",
  "2G8A0021.jpg",
  "2G8A0029.jpg",
  "2G8A0048.jpg",
  // Add all your image filenames here
]
