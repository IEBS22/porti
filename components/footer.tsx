import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-neutral-500 font-light">
            © {new Date().getFullYear()} Photography Portfolio. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://instagram.com/khichik.10"
              target="khichik.10"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="mailto:hello@photographer.com"
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
