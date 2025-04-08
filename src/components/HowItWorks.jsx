"use client"

import { useState, useEffect } from "react"
import { Brain, Music, Headphones } from "lucide-react"

const steps = [
  {
    icon: <Music className="h-8 w-8" />,
    title: "Listen to Music",
    description:
      "Start by playing your favorite songs. Our AI begins learning your preferences from the very first track.",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI Analyzes Your Taste",
    description:
      "Our advanced algorithm identifies patterns in your listening habits, analyzing tempo, genre, mood, and more.",
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: "Discover New Music",
    description:
      "Receive personalized recommendations that evolve with your taste, introducing you to artists and songs you'll love.",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
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

    observer.observe(document.querySelector(".how-it-works"))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">MeloMind</span>{" "}
            Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our intelligent system evolves with your musical journey, creating a uniquely personal experience.
          </p>
        </div>

        <div className="how-it-works flex flex-col lg:flex-row items-center gap-12">
          <div
            className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex gap-6 items-start p-4 rounded-xl transition-all duration-500 ${
                      activeStep === index ? "bg-white/10" : ""
                    }`}
                  >
                    <div
                      className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeStep === index ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/10"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-full aspect-square overflow-hidden border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                    <div className="absolute inset-2 rounded-full bg-black"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="h-16 w-16 text-white" />
                    </div>

                    {/* Orbiting elements */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-full animate-spin"
                        style={{
                          animationDuration: `${10 + i * 5}s`,
                          animationDirection: i % 2 === 0 ? "normal" : "reverse",
                        }}
                      >
                        <div
                          className="absolute h-4 w-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                          style={{
                            top: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
    </section>
  )
}

