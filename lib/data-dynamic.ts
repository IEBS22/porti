// Alternative approach: Dynamic data structure
import { generateImagePaths, artImages, automobileImages } from "./image-utils"

export const categories = [
  {
    title: "Art",
    slug: "art",
    description: "Creative and artistic photography exploring visual storytelling.",
    coverImage: "/images/art/IMG_1403.jpeg",
    images: generateImagePaths("art", artImages),
  },
  {
    title: "Automobile",
    slug: "automobile",
    description: "Automotive photography showcasing vehicles in their finest form.",
    coverImage: "/images/automobile/2G8A0008.jpg",
    images: generateImagePaths("automobile", automobileImages),
  },
  // Add other categories as needed...
]
