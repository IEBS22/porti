"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-900 mb-6">Get in Touch</h1>
                <p className="text-neutral-600 font-light leading-relaxed">
                 I'd love to hear about your project and explore how we can collaborate to create something meaningful together. 
                 Whatever the vision, let's bring it to life
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-600 font-light">abhilashashewale96@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-600 font-light">+91 8698130285</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="w-5 h-5 text-neutral-500" />
                  <span className="text-neutral-600 font-light">@khichik.10</span>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-light text-neutral-900 mb-3">Response Time</h3>
                <p className="text-neutral-600 font-light text-sm">
                  I typically respond to inquiries within 24-48 hours. For urgent requests, please call directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-sm shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-neutral-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-light text-neutral-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light text-neutral-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-neutral-800 hover:bg-neutral-900 text-white font-light tracking-wide py-3"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
