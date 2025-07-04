// Configuration for different grid layouts based on category/session
export const gridConfigurations = {
  // Main categories
  art: { columns: 4, aspectRatio: "aspect-square", layout: "fixed" },
  concert: { columns: 2, aspectRatio: "aspect-[3/2]", layout: "fixed" },

  // Commercial theater specific sessions
  "amar_photo_studio_Suggestion": { columns: 3, aspectRatio: "aspect-[4/3]", layout: "fixed" },
  "bhumika": { columns: 2, aspectRatio: "aspect-[4/3]", layout: "fixed" },
  "bombay": { columns: 3, aspectRatio: "aspect-[4/3]", layout: "fixed" },
  "kabuta-jajaja": { columns: 3, aspectRatio: "aspect-square", layout: "fixed" },
  "something-like-truth": { columns: 1, aspectRatio: "aspect-[4/3]", layout: "fixed" },
  "the-light-catcher": { columns: 2, aspectRatio: "aspect-[3/2]", layout: "fixed" },
  "tu-mhanshil-tasa": { columns: 2, aspectRatio: "aspect-[4/3]", layout: "fixed" },

  // Portraits specific sessions - using masonry to preserve original ratios
  "abhishek_expression": { columns: 5, aspectRatio: "aspect-square", layout: "fixed" },
  "shaila": { columns: 2, aspectRatio: "aspect-square", layout: "fixed" },
  "ranga": { columns: 2, aspectRatio: "aspect-[4/3]", layout: "fixed" },
   "model-session": { columns: 3, aspectRatio: "aspect-square", layout: "fixed" },
  "abhishek-classic": { columns: 2, aspectRatio: "aspect-[4/3]", layout: "fixed" },
//   rahul: { columns: 2, aspectRatio: "aspect-[4/3]", layout: "fixed" },
  "vaibhav": { columns: 2, aspectRatio: "aspect-[4/3]", layout: "fixed" },

  // Default fallback
  default: { columns: 3, aspectRatio: "aspect-[4/3]", layout: "fixed" },
}

export function getGridConfig(categorySlug: string, sessionSlug?: string) {
  // First check for session-specific config
  if (sessionSlug && gridConfigurations[sessionSlug as keyof typeof gridConfigurations]) {
    return gridConfigurations[sessionSlug as keyof typeof gridConfigurations]
  }

  // Then check for category config
  if (gridConfigurations[categorySlug as keyof typeof gridConfigurations]) {
    return gridConfigurations[categorySlug as keyof typeof gridConfigurations]
  }

  // Return default
  return gridConfigurations.default
}

export function getGridClasses(columns: number, layout = "fixed") {
  if (layout === "masonry") {
    // For masonry layout, use CSS columns
    const columnClasses = {
      1: "columns-1",
      2: "columns-1 md:columns-2",
      3: "columns-1 md:columns-2 lg:columns-3",
      4: "columns-1 md:columns-2 lg:columns-3 xl:columns-4",
      5: "columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5",
      6: "columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-6",
    }
    return columnClasses[columns as keyof typeof columnClasses] || columnClasses[3]
  }

  // Regular grid layout
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
  }

  return gridClasses[columns as keyof typeof gridClasses] || gridClasses[3]
}
