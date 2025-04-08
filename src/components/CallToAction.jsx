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

    observer.observe(document.querySelector(".team-section"))
    return () => observer.disconnect()
  }, [])

  const teamMembers = [
    { name: "Lalit Singh", id: "12306434" },
    { name: "Rajvardhan Singh", id: "12303815" },
    { name: "Ankit Kumar", id: "12310082" },
  ]

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="team-section max-w-4xl mx-auto">
          <div
            className={`relative bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-20"></div>
            <div className="relative p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Meet Our Team</h2>
              <p className="text-gray-300 mb-8 text-center">
                The talented individuals behind this project, working together to deliver an exceptional experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold">{member.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-gray-300">ID: {member.id}</p>
                    </div>
                  </div>
                ))}
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

