"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sun, Moon, Menu, X, Github, Star } from "lucide-react"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-5 text-primary-foreground"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Kotlin Reforge
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <a
            href="#projects"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-200 ease-out hover:bg-primary/5 hover:text-foreground active:scale-95 will-change-transform"
          >
            Projects
          </a>
          <a
            href="#approach"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-200 ease-out hover:bg-primary/5 hover:text-foreground active:scale-95 will-change-transform"
          >
            Approach
          </a>
          <a
            href="#stats"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-200 ease-out hover:bg-primary/5 hover:text-foreground active:scale-95 will-change-transform"
          >
            Impact
          </a>
          <a
            href="#suggest"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-200 ease-out hover:bg-primary/5 hover:text-foreground active:scale-95 will-change-transform"
          >
            Suggest
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="transition-transform duration-200 ease-out active:scale-90 will-change-transform"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <a
            href="https://github.com/nickthecoder/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants(),
              "gap-2 transition-transform duration-200 ease-out active:scale-95 will-change-transform"
            )}
          >
            <Star className="size-4" />
            Star on GitHub
          </a>
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-4 pb-6 sm:px-6 md:hidden">
          <div className="flex flex-col gap-1 pt-4">
            <a
              href="#projects"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Projects
            </a>
            <a
              href="#approach"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Approach
            </a>
            <a
              href="#stats"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Impact
            </a>
            <a
              href="#suggest"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Suggest
            </a>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <a
              href="https://github.com/nickthecoder/kotlin-reforge"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "flex-1 gap-2"
              )}
            >
              <Star className="size-4" />
              Star on GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
