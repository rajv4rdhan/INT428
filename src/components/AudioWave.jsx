"use client"

import { useEffect, useRef } from "react"

export default function AudioWave() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Set up wave parameters
    const waves = [
      { amplitude: 20, frequency: 0.02, speed: 0.05, color: "#9333ea", phase: 0 },
      { amplitude: 15, frequency: 0.03, speed: 0.03, color: "#db2777", phase: 2 },
      { amplitude: 10, frequency: 0.01, speed: 0.02, color: "#8b5cf6", phase: 4 },
    ]

    // Animation loop
    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      waves.forEach((wave) => {
        wave.phase += wave.speed
        drawWave(ctx, width, height, wave)
      })

      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Clean up
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Function to draw a single wave
  const drawWave = (ctx, width, height, wave) => {
    const { amplitude, frequency, color, phase } = wave
    const centerY = height / 2

    ctx.beginPath()
    ctx.moveTo(0, centerY)

    for (let x = 0; x < width; x++) {
      const y = centerY + amplitude * Math.sin(frequency * x + phase)
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return (
    <div className="relative h-32 w-full overflow-hidden my-12">
      <canvas ref={canvasRef} width={1200} height={128} className="absolute top-0 left-0 w-full h-full opacity-60" />
    </div>
  )
}

