// Helper functions to organize your images by subfolder
export const portraitSessions = {
  abhishekExpression: [
    "_MG_9737.JPG",
    "_MG_9738.JPG",
    "_MG_9739.JPG",
    "_MG_9741.JPG",
    "_MG_9742.JPG",
    "_MG_9743.JPG",
    "_MG_9744.JPG",
    "_MG_9745.JPG",
    "_MG_9746.JPG",
    "_MG_9747.JPG",
    "_MG_9748.JPG",
    "_MG_9749.JPG",
    "_MG_9750.JPG",
    "_MG_9751.JPG",
    "_MG_9752.JPG",
  ],
  abhishekOld: ["_MG_8523.JPG", "_MG_8554.JPG", "Cover photo.JPG", "IMG_9111.JPG"],
  model: ["_MG_8735.jpg", "_MG_8739.jpg", "_MG_8752.jpg", "Cover photo.jpg"],
  // Add rahulKulkarni array when you have the filenames
}

// Function to generate full paths
export function generatePortraitPaths(): string[] {
  const allImages: string[] = []

  // Abhishek expression
  portraitSessions.abhishekExpression.forEach((img) => {
    allImages.push(`/images/portraits/Abhishek expression/${img}`)
  })

  // Abhishek old
  portraitSessions.abhishekOld.forEach((img) => {
    allImages.push(`/images/portraits/Abhishek old/${img}`)
  })

  // Model
  portraitSessions.model.forEach((img) => {
    allImages.push(`/images/portraits/Model/${img}`)
  })

  return allImages
}
