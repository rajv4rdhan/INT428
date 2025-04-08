"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import HowItWorks from "../components/HowItWorks"
import CallToAction from "../components/CallToAction"
import Footer from "../components/Footer"
import AudioWave from "../components/AudioWave"

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <div className="fixed inset-0 bg-[url('/images/noise.png')] opacity-[0.02] pointer-events-none z-0"></div>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <AudioWave />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

