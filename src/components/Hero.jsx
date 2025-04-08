"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Headphones, Sparkles } from "lucide-react"

export default function Hero({isAuthenticated}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSignupClick = () => {
    // Redirect to the signup page
    window.location.href = "/signup";
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div
            className={`md:w-1/2 mb-12 md:mb-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-sm font-medium">AI-Powered Music Discovery</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Perfect
              </span>{" "}
              Sound
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              MeloMind uses advanced AI to understand your unique taste and recommend music you'll love. Personalized
              playlists that evolve with your mood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSignupClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {isAuthenticated ? "Start Listening" : "Get Started"}
                <ChevronRight size={18} />
              </button>
              <button className="border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                <Headphones size={18} />
                Watch Demo
              </button>
            </div>
          </div>
          <div
            className={`md:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-3xl p-2 border border-white/10">
                <img
                  src="https://ik.imagekit.io/qnfqoke5k/tuneloom/inh.jpg"
                  alt="MeloMind App Interface"
                  className="rounded-2xl w-full h-auto"
                />
                <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Headphones size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">Now Playing</h3>
                      <p className="text-sm text-gray-300">Cosmic Harmony - Stellar Waves</p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-8 w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
    </section>
  );
}

