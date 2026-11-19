import type { Metadata, Viewport } from "next"
import { Sora, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { apps } from "@/lib/apps"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
})

const siteDescription = `${apps.length} free, open-source Android apps built with Kotlin.`
const appNames = new Intl.ListFormat("en", { type: "conjunction" }).format(
  apps.map((app) => app.name),
)

export const metadata: Metadata = {
  metadataBase: new URL("https://kotlin-reforge.vercel.app"),
  title: "Kotlin Reforge: old Android apps, rebuilt to feel new",
  description: `${siteDescription} ${appNames}.`,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "650x650" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Kotlin Reforge",
    description: siteDescription,
    images: ["/social.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kotlin Reforge",
    description: siteDescription,
    images: ["/social.png"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1218" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
