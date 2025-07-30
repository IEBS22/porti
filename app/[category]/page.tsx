import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { categories } from "../../lib/data"
import { theaterSessions } from "../../lib/theater-data"
import { portraitSessions } from "../../lib/portrait-data"
import { getGridConfig, getGridClasses } from "../../lib/grid-config"
import { LazyImage } from "../../components/lazy-image"
import { OptimizedImage } from "../../components/optimized-image"

interface CategoryPageProps {
  params: { category: string }
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = categories.find((c) => c.slug === params.category)
  if (!cat) return notFound()

  // Decide if this category has sessions or is a flat gallery
  const sessions =
    params.category === "commercial-theater" ? theaterSessions : params.category === "portraits" ? portraitSessions : []

  // Get grid configuration for this category
  const gridConfig = getGridConfig(params.category)
  const gridClasses = getGridClasses(gridConfig.columns)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light">Back to Overview</span>
        </Link>

        {/* Title & Description */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground mb-4">{cat.title}</h1>
          {cat.description && <p className="text-muted-foreground font-light max-w-2xl">{cat.description}</p>}
        </div>

        {/* If sessions exist, show cards; otherwise flat gallery */}
        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sessions.map((s) => (
              <Link
                key={s.slug}
                href={`/${cat.slug}/${s.slug}`}
                className="group block overflow-hidden rounded-lg shadow hover:shadow-lg transition bg-card"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={s.coverImage || s.images[0]}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-medium text-foreground group-hover:text-foreground transition">
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{s.images.length} photos</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`grid ${gridClasses} gap-6 md:gap-8`}>
            {cat.images.map((img, i) => (
              <OptimizedImage
                key={i}
                src={img}
                alt={`${cat.title} ${i + 1}`}
                aspectRatio={gridConfig.aspectRatio}
                priority={i < gridConfig.columns * 2} // Load first 2 rows eagerly
                fallbackSrc="/images/placeholder-logo.jpg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
