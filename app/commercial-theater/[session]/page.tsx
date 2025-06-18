// import { notFound } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
// import { ArrowLeft, MapPin, Calendar, Theater } from "lucide-react"
// import { theaterSessions } from "@/lib/theater-data"

// interface TheaterSessionPageProps {
//   params: {
//     session: string
//   }
// }

// export function generateStaticParams() {
//   return theaterSessions.map((session) => ({
//     session: session.slug,
//   }))
// }

// export default function TheaterSessionPage({ params }: TheaterSessionPageProps) {
//   const session = theaterSessions.find((s) => s.slug === params.session)

//   if (!session) {
//     notFound()
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <div className="container mx-auto px-6 py-12">
//         {/* Back Navigation */}
//         <Link
//           href="/commercial-theater"
//           className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-8 group"
//         >
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//           <span className="text-sm font-light tracking-wide">Back to Theater Productions</span>
//         </Link>

//         {/* Production Title */}
//         <div className="mb-12">
//           <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-4">{session.title}</h1>
//           {/* <p className="text-neutral-600 font-light max-w-2xl mb-4">{session.description}</p> */}

//           {/* Production Details */}
//           <div className="flex flex-wrap items-center gap-6 text-neutral-500 text-sm font-light">
//             {/* <div className="flex items-center space-x-2">
//               <Theater className="w-4 h-4" />
//               <span>{session.production}</span>
//             </div> */}
//             {/* <div className="flex items-center space-x-2">
//               <MapPin className="w-4 h-4" />
//               <span>{session.venue}</span> */}
//             </div>
//             {/* <div className="flex items-center space-x-2">
//               <Calendar className="w-4 h-4" />
//               <span>{session.date}</span>
//             </div> */}
//             <div>{session.images.length} photos in this production</div>
//           </div>
//         </div>

//         {/* Photo Gallery */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
//           {session.images.map((image, index) => (
//             <div
//               key={index}
//               className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
//             >
//               <div className="relative aspect-square">
//                 <Image
//                   src={image || "/placeholder.svg"}
//                   alt={`${session.title} ${index + 1}`}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   loading={index < 6 ? "eager" : "lazy"}
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//   )
// }

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { theaterSessions } from "../../../lib/theater-data"

interface TheaterSessionPageProps {
  params: {
    session: string
  }
}

export function generateStaticParams() {
  return theaterSessions.map((session) => ({
    session: session.slug,
  }))
}

export default function TheaterSessionPage({ params }: TheaterSessionPageProps) {
  const session = theaterSessions.find((s) => s.slug === params.session)

  if (!session) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/commercial-theater"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light tracking-wide">Back to Theater Productions</span>
        </Link>

        {/* Production Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-4">{session.title}</h1>

          {/* Production Details */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-500 text-sm font-light">
            <div>{session.images.length} photos in this production</div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 grid-cols-2  gap-28">
          {session.images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${session.title} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={index < 6 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
