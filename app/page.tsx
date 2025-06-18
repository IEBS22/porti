import Link from "next/link"
import { categories } from "../lib/data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-neutral-900 mb-4">
              Photography Portfolio
            </h1>
            <p className="text-neutral-600 font-light text-lg">Select a category to view the collection</p>
          </div>

          <div className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="block py-6 px-8 border-b border-neutral-200 last:border-b-0 group hover:bg-neutral-100/50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-light text-neutral-800 group-hover:text-neutral-900 tracking-wide transition-colors">
                    {category.title}
                  </h3>
                  <div className="text-neutral-400 group-hover:text-neutral-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
