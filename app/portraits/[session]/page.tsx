import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { portraitSessions } from "../../../lib/portrait-data"

interface SessionPageProps {
  params: {
    session: string
  }
}

export function generateStaticParams() {
  return portraitSessions.map((session) => ({
    session: session.slug,
  }))
}

export default function SessionPage({ params }: SessionPageProps) {
  const session = portraitSessions.find((s) => s.slug === params.session)

  if (!session) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/portraits"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light tracking-wide">Back to Portrait Sessions</span>
        </Link>

        {/* Session Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-4">{session.title}</h1>
          <p className="text-neutral-600 font-light max-w-2xl">{session.description}</p>
          <div className="mt-2 text-neutral-500 text-sm font-light">{session.images.length} photos in this session</div>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {session.images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={image ? image : "/images/placeholder-logo.jpg"}
                  alt={`${session.title} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={index < 6 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
