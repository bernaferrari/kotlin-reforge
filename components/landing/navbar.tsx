"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react"
import posthog from "posthog-js"
import { GitHubIcon } from "@/components/icons/github-icon"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#approach", label: "Approach" },
  { href: "#suggest", label: "Contribute" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 transition-all duration-300",
          scrolled
            ? "border border-border/70 bg-background/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        )}
      >
        <a href="#" className="flex h-10 items-center gap-2.5 rounded-lg px-1">
          <span className="relative inline-flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-[0_8px_24px_-12px_var(--color-primary)]">
            <Sparkles className="size-4" />
            <span aria-hidden className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/15" />
          </span>
          <span className="inline-flex h-9 items-center text-sm font-semibold tracking-tight sm:text-[15px]">
            Kotlin Reforge
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex h-9 items-center rounded-md px-3 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
              onClick={() => posthog.capture("nav_item_clicked", { label: item.label, href: item.href })}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            aria-label="Toggle theme"
            onClick={() => {
              const newTheme = theme === "dark" ? "light" : "dark"
              setTheme(newTheme)
              posthog.capture("theme_toggled", { theme: newTheme })
            }}
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <a
            href="https://github.com/bernaferrari/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-9 gap-2 px-4")}
            onClick={() => posthog.capture("nav_github_clicked", { location: "navbar" })}
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background/60 backdrop-blur md:hidden"
          onClick={() => {
            const next = !open
            setOpen(next)
            posthog.capture("nav_mobile_menu_toggled", { action: next ? "open" : "close" })
          }}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="forge-panel mx-auto mt-2 max-w-6xl rounded-2xl p-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setOpen(false)
                  posthog.capture("nav_item_clicked", { label: item.label, href: item.href, location: "mobile" })
                }}
                className="inline-flex h-11 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-11"
              aria-label="Toggle theme"
              onClick={() => {
                const newTheme = theme === "dark" ? "light" : "dark"
                setTheme(newTheme)
                posthog.capture("theme_toggled", { theme: newTheme })
              }}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <a
              href="https://github.com/bernaferrari/kotlin-reforge"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-11 flex-1 gap-2")}
              onClick={() => posthog.capture("nav_github_clicked", { location: "mobile_nav" })}
            >
              <GitHubIcon className="size-5" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
