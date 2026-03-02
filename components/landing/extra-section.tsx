"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import posthog from "posthog-js"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ExtraSection() {
    return (
        <div id="extra" className="pt-6 sm:pt-10">
            <article className="forge-panel overflow-hidden rounded-3xl">
                <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="space-y-6 p-5 sm:p-7 lg:p-8">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Extra</p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Diagonal Wipe Icon</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                A single-file icon transition component for Compose Multiplatform. Built to emulate iOS-style wipe animations using two icons and a mask.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="https://bernaferrari.github.io/diagonal-wipe-icon/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-5")}
                                onClick={() => posthog.capture("extra_demo_clicked", { project: "Diagonal Wipe Icon" })}
                            >
                                Live Demo
                                <ArrowUpRight className="size-4" />
                            </Link>
                            <Link
                                href="https://github.com/bernaferrari/diagonal-wipe-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 gap-2 px-5")}
                                onClick={() => posthog.capture("extra_repo_clicked", { project: "Diagonal Wipe Icon" })}
                            >
                                <Github className="size-4" />
                                GitHub Repo
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-border/70 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20">
                            <Image
                                src="https://raw.githubusercontent.com/bernaferrari/diagonal-wipe-icon/main/assets/animated-icons.webp"
                                alt="Diagonal Wipe Icon Animation"
                                fill
                                className="object-contain p-2"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
