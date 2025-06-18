"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Menu, X } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Overview", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200/50">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-light tracking-wide transition-colors duration-200 ${
                  pathname === item.href ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-xl font-light tracking-[0.2em] text-rose-500 hover:text-rose-600 transition-colors">
              Abhilasha Shewale
            </h1>
          </Link>

          {/* Social Links */}
          <div className="hidden md:flex items-center">
            <Link
              href="https://instagram.com/khichik.10"
              target="khichik.10"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-neutral-600 hover:text-neutral-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-neutral-200">
            <div className="flex flex-col space-y-4 pt-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-light tracking-wide transition-colors duration-200 ${
                    pathname === item.href ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://instagram.com/khichik.10"
                target="khichik.10"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors pt-4"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-base font-light">Instagram</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
