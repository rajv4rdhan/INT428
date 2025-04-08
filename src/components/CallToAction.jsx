"use client"

import { useState, useEffect } from "react"
import { Download, Apple, Smartphone } from "lucide-react"

export default function CallToAction() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(document.querySelector(".cta-section"))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="download" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="cta-section max-w-4xl mx-auto">
          <div
            className={`relative bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-20"></div>
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Music Experience?</h2>
                <p className="text-gray-300 mb-6">
                  Download MeloMind now and discover music that speaks to your soul. Available on iOS and Android.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    <Apple size={20} />
                    App Store
                  </button>
                  <button className="bg-white text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    <Smartphone size={20} />
                    Google Play
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/20 transition-colors">
                    <Download size={20} />
                    Direct Download
                  </button>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-lg opacity-70"></div>
                  <img
                    src="/placeholder.svg?height=300&width=150"
                    alt="MeloMind App"
                    className="relative rounded-2xl border border-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
    </section>
  )
}

