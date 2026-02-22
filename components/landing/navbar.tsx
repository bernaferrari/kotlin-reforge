"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "#projects", label: "Projects" },
  { href: "#approach", label: "Approach" },
  { href: "#impact", label: "Impact" },
  { href: "#suggest", label: "Contribute" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="forge-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-3 py-2 sm:px-4 sm:py-3">
        <a href="#" className="flex h-11 items-center gap-3 rounded-lg px-1">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_8px_28px_-16px_var(--color-primary)]">
            <Sparkles className="size-4" />
          </span>
          <span className="inline-flex h-9 items-center text-sm font-semibold leading-none tracking-tight sm:text-base">
            Kotlin Reforge
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="min-h-11 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted/70 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <a
            href="https://github.com/nickthecoder/kotlin-reforge"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
          >
            GitHub
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="forge-panel mx-auto mt-2 max-w-7xl rounded-2xl p-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
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
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <a
              href="https://github.com/nickthecoder/kotlin-reforge"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-11 flex-1")}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
