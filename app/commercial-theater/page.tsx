import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Calendar, Theater } from "lucide-react"
import { theaterSessions } from "../../lib/theater-data"

export default function CommercialTheaterPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light tracking-wide">Back to Overview</span>
        </Link>

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-4">Commercial Theater</h1>
          <p className="text-neutral-600 font-light max-w-2xl">
            Explore different theater productions and commercial events, each capturing the drama, emotion, and artistry
            of live performances.
          </p>
        </div>

        {/* Theater Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {theaterSessions.map((session) => (
          <Link key={session.slug} href={`/commercial-theater/${session.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-all duration-300">
              {/* Production Cover Image */}
              <div className="relative aspect-[4/5]">
                <Image
                  src={session.coverImage ? session.coverImage : "/images/placeholder-logo.jpg"}
                  alt={session.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white text-xl font-light tracking-wide mb-2">{session.title}</h3>
                      {/* <p className="text-white/80 text-sm font-light leading-relaxed mb-3">{session.description}</p> */}

                      {/* Production Details */}
                      {/* <div className="space-y-1 mb-3">
                        <div className="flex items-center space-x-2 text-white/70 text-xs">
                          <Theater className="w-3 h-3" />
                          <span>{session.production}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70 text-xs">
                          <MapPin className="w-3 h-3" />
                          <span>{session.venue}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{session.date}</span>
                        </div>
                      </div> */}

                      <div className="text-white/60 text-xs font-light">{session.images.length} photos</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
