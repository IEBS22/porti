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
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { categories } from "../../lib/data"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((cat) => cat.slug === params.category)

  if (!category) {
    notFound()
  }

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

        {/* Category Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-4">{category.title}</h1>
          <p className="text-neutral-600 font-light max-w-2xl">{category.description}</p>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {category.images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${category.title} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={index < 6 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
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
