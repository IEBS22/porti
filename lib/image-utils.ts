// Utility function to help you generate image arrays dynamically
export function generateImagePaths(folderName: string, imageNames: string[]): string[] {
  return imageNames.map((imageName) => `/images/${folderName}/${imageName}`)
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
