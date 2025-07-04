import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { theaterSessions } from "../../../lib/theater-data"
import { portraitSessions } from "../../../lib/portrait-data"
import { getGridConfig, getGridClasses } from "../../../lib/grid-config"
import { LazyImage } from "../../../components/lazy-image"
import { SingleImageLayout } from "../../../components/single-image-layout"
import { MasonryImage } from "../../../components/masonry-image"

interface SessionPageProps {
  params: {
    category: string
    session: string
  }
}

export function generateStaticParams() {
  const theater = theaterSessions.map((s) => ({
    category: "commercial-theater",
    session: s.slug,
  }))
  const portraits = portraitSessions.map((s) => ({
    category: "portraits",
    session: s.slug,
  }))
  return [...theater, ...portraits]
}

export default function SessionPage({ params }: SessionPageProps) {
  const { category, session: slug } = params

  // Pick the right data array
  const list = category === "commercial-theater" ? theaterSessions : category === "portraits" ? portraitSessions : []

  const sess = list.find((s) => s.slug === slug)
  if (!sess) return notFound()

  // Get grid configuration for this session
  const gridConfig = getGridConfig(category, slug)
  const gridClasses = getGridClasses(gridConfig.columns)

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          href={`/${category}`}
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light">
            Back to {category === "commercial-theater" ? "Commercial Theater" : "Portraits"}
          </span>
        </Link>

        {/* Title & Optional Description */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-neutral-900 mb-4">{sess.title}</h1>
          {sess.description && <p className="text-neutral-600 font-light max-w-2xl mb-4">{sess.description}</p>}

          {/* Grid info */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-500 text-sm font-light">
            <div>{sess.images.length} photos in this collection</div>
            <div>Grid: {gridConfig.columns} columns</div>
          </div>
        </div>

        {/* Dynamic Images Grid */}
        {gridConfig.columns === 1 ? (
          <SingleImageLayout images={sess.images} title={sess.title} aspectRatio={gridConfig.aspectRatio} />
        ) : gridConfig.layout === "masonry" ? (
          <div className={`${getGridClasses(gridConfig.columns, "masonry")} gap-6 md:gap-8`}>
            {sess.images.map((img, idx) => (
              <MasonryImage
                key={idx}
                src={img}
                alt={`${sess.title} ${idx + 1}`}
                priority={idx < gridConfig.columns * 2}
                className="mb-6 md:mb-8 break-inside-avoid"
              />
            ))}
          </div>
        ) : (
          <div className={`grid ${getGridClasses(gridConfig.columns, "fixed")} gap-6 md:gap-8`}>
            {sess.images.map((img, idx) => (
              <LazyImage
                key={idx}
                src={img}
                alt={`${sess.title} ${idx + 1}`}
                aspectRatio={gridConfig.aspectRatio}
                priority={idx < gridConfig.columns * 2}
              />
            ))}
          </div>
        )}

        {/* Grid configuration display for debugging */}
        <div className="mt-12 p-4 bg-neutral-100 rounded-lg text-sm text-neutral-600">
          {/* <p>
            <strong>Current Configuration:</strong>
          </p> */}
          {/* <p>Session: {slug}</p>
          <p>Columns: {gridConfig.columns}</p>
          <p>Layout: {gridConfig.layout}</p>
          <p>Aspect Ratio: {gridConfig.aspectRatio}</p> */}
        </div>
      </div>
    </div>
  )
}
