import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Photography Portfolio",
  description:
    "A modern minimalist photography portfolio showcasing various categories of professional photography work.",
  keywords: "photography, portfolio, traditional, concert, wedding, animated",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-800">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
