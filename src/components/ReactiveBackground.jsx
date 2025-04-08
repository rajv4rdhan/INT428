"use client"

import { useEffect, useRef } from "react"

function ReactiveBackground({ currentSong }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = window.innerHeight)

    // Set up particles
    const particles = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        active: currentSong ? 1 : 0.3,
      })
    }

    // Animation loop
    let animationId
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(10, 0, 20, 0.8)")
      gradient.addColorStop(1, "rgba(30, 0, 40, 0.8)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Adjust activity based on current song
        if (currentSong) {
          particle.active = Math.min(particle.active + 0.01, 1)
        } else {
          particle.active = Math.max(particle.active - 0.01, 0.3)
        }

        // Move particles
        particle.x += particle.speedX * particle.active * 2
        particle.y += particle.speedY * particle.active * 2

        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * particle.active, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw glow effects if song is playing
      if (currentSong) {
        const centerX = width / 2
        const centerY = height / 2
        const radius = Math.min(width, height) * 0.3

        // Create radial gradient
        const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
        glow.addColorStop(0, "rgba(147, 51, 234, 0.2)")
        glow.addColorStop(0.5, "rgba(219, 39, 119, 0.1)")
        glow.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }

      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [currentSong])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-70" />
}

export default ReactiveBackground

