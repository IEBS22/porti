// import { notFound } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
// import { ArrowLeft } from "lucide-react"
// import { categories } from "@/lib/data"

// interface CategoryPageProps {
//   params: {
//     category: string
//   }
// }

// export function generateStaticParams() {
//   return categories.map((category) => ({
//     category: category.slug,
//   }))
// }

// export default function CategoryPage({ params }: CategoryPageProps) {
//   const category = categories.find((cat) => cat.slug === params.category)

//   if (!category) {
//     notFound()
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <div className="container mx-auto px-6 py-12">
//         {/* Back Navigation */}
//         <Link
//           href="/"
//           className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-8 group"
//         >
//           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//           <span className="text-sm font-light tracking-wide">Back to Overview</span>
//         </Link>

//         {/* Category Title */}
//         <div className="mb-12">
//           <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-4">{category.title}</h1>
//           <p className="text-neutral-600 font-light max-w-2xl">{category.description}</p>
//         </div>

//         {/* Photo Gallery */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
//           {category.images.map((image, index) => (
//             <div
//               key={index}
//               className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
//             >
//               <div className="relative w-full">
//                 <Image
//                   src={image || "/placeholder.svg"}
//                   alt={`${category.title} ${index + 1}`}
//                   layout="responsive"
//                   width={800}
//                   height={600}
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   loading={index < 6 ? "eager" : "lazy"}
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
// 
// app/[category]/page.tsx

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { categories } from "@/lib/data"
import { theaterSessions } from "@/lib/theater-data"
import { portraitSessions } from "@/lib/portrait-data"

interface CategoryPageProps {
  params: { category: string }
}

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const cat = categories.find((c) => c.slug === params.category)
  if (!cat) return notFound()

  // decide if this category has sessions or is a flat gallery
  const sessions =
    params.category === "commercial-theater"
      ? theaterSessions
      : params.category === "portraits"
      ? portraitSessions
      : []

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light">Back to Overview</span>
        </Link>

        {/* Title & Description */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-4">
            {cat.title}
          </h1>
          {cat.description && (
            <p className="text-neutral-600 font-light max-w-2xl">
              {cat.description}
            </p>
          )}
        </div>

        {/* If sessions exist, show cards; otherwise flat gallery */}
        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {sessions.map((s) => (
              <Link
                key={s.slug}
                href={`/${cat.slug}/${s.slug}`}
                className="group block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={s.coverImage || s.images[0]}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h2 className="mt-4 text-xl font-medium text-neutral-900 group-hover:text-neutral-700 transition">
                  {s.title}
                </h2>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {cat.images.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={img}
                    alt={`${cat.title} ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={i < 6 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
