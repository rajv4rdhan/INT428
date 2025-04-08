"use client"

import { useState, useEffect } from "react"
import { Sparkles, Headphones, Zap, Wand2, Music, Heart } from "lucide-react"

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-purple-400" />,
    title: "AI-Powered Recommendations",
    description: "Our advanced algorithm learns your preferences and suggests new tracks you'll love.",
  },
  {
    icon: <Headphones className="h-6 w-6 text-purple-400" />,
    title: "Personalized Playlists",
    description: "Get custom playlists based on your mood, activity, or time of day.",
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-400" />,
    title: "Instant Discovery",
    description: "Find new artists and genres that match your unique taste profile.",
  },
  {
    icon: <Wand2 className="h-6 w-6 text-purple-400" />,
    title: "Mood Analysis",
    description: "Our AI detects the emotional tone of music to match your current mood.",
  },
  {
    icon: <Music className="h-6 w-6 text-purple-400" />,
    title: "Sound Quality",
    description: "Enjoy high-definition audio with adaptive streaming technology.",
  },
  {
    icon: <Heart className="h-6 w-6 text-purple-400" />,
    title: "Social Sharing",
    description: "Share your discoveries and connect with friends who have similar tastes.",
  },
]

export default function Features() {
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.dataset.index])
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".feature-item").forEach((item) => {
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Advanced AI
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our cutting-edge technology analyzes your listening habits to create a truly personalized music experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`feature-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-700 ${
                visibleItems.includes(index.toString()) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-purple-900/50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
    </section>
  )
}

