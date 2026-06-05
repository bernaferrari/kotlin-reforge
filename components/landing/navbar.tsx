"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <a
          href="#"
          className={cn(
            "group inline-flex h-12 min-w-0 items-center gap-2.5 rounded-2xl border px-3 pr-4 transition-[background,border-color,box-shadow,backdrop-filter] duration-300 hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/45",
            scrolled
              ? "border-border/70 bg-background/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              : "border-border/35 bg-background/35 backdrop-blur-sm"
          )}
        >
          <span className="relative inline-flex size-6 shrink-0 items-center justify-center overflow-hidden">
            <img
              src="/icon.png"
              alt=""
              aria-hidden="true"
              className="size-full object-contain"
            />
          </span>
          <span className="truncate text-sm font-semibold tracking-tight sm:text-[15px]">
            Kotlin Reforge
          </span>
        </a>

        <div
          className={cn(
            "inline-flex h-12 shrink-0 items-center gap-1.5 rounded-2xl border p-1 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition-[background,border-color,box-shadow,backdrop-filter] duration-300",
            scrolled
              ? "border-border/70 bg-background/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              : "border-border/55 bg-card/55 backdrop-blur"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg"
            aria-label="Toggle theme"
            onClick={() => {
              const isDark =
                resolvedTheme === "dark" ||
                (!resolvedTheme && document.documentElement.classList.contains("dark"))
              const newTheme = isDark ? "light" : "dark"
              setTheme(newTheme)
              posthog.capture("theme_toggled", { theme: newTheme })
            }}
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <a
            href="https://github.com/bernaferrari/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-9 gap-2 px-3 sm:px-4")}
            onClick={() => posthog.capture("nav_github_clicked", { location: "navbar" })}
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
