import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Github } from "lucide-react"

export function Hero() {
  return (
    <section className="px-4 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Kotlin Reforge</p>
          <h1 className="forge-section-title mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Rebuilding legacy Android apps in modern Kotlin.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Different migration paths for different codebases: Java to Kotlin ports for some, Kotlin UI to Compose for others.
            Every app gets a full redesign.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://github.com/bernaferrari/kotlin-reforge"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
            >
              <Github className="size-4" />
              View Initiative
            </a>
            <a
              href="#projects"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 gap-2 px-6")}
            >
              Explore Ports
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="forge-panel overflow-hidden rounded-3xl animate-fade-up" style={{ animationDelay: "90ms" }}>
          <Image
            src="/images/rethinkdns-after-2.jpg"
            alt="Modernized Android app preview"
            width={1600}
            height={980}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
