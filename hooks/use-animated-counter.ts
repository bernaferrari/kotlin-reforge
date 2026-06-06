"use client"

import { useEffect, useState, useRef } from "react"

export function useAnimatedCounter(
  endValue: number,
  durationMs: number = 2000,
  decimals: number = 0,
) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(endValue)
      return
    }

    let startTime: number
    let animationFrame: number

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / durationMs, 1)

      const easeOutQuint = 1 - Math.pow(1 - progress, 5)
      const currentCount = endValue * easeOutQuint

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter)
      } else {
        setCount(endValue)
      }
    }

    animationFrame = requestAnimationFrame(updateCounter)

    return () => cancelAnimationFrame(animationFrame)
  }, [endValue, durationMs, inView])

  return { ref, count: count.toFixed(decimals) }
}
