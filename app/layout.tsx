import type { Metadata, Viewport } from "next"
import { Sora, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
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

export const metadata: Metadata = {
  metadataBase: new URL("https://kotlin-reforge.vercel.app"),
  title: "Kotlin Reforge | Case studies of Android apps rebuilt in Kotlin",
  description:
    "Case studies of open-source Android ports modernized with Kotlin, Compose, and KMP. Source and live demos live in each app's own repository.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "650x650" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Kotlin Reforge",
    description:
      "A case-study index of Android modernization ports — Kotlin, Compose, and KMP. Source and live demos linked per app.",
    images: ["/social.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kotlin Reforge",
    description:
      "A case-study index of Android modernization ports — Kotlin, Compose, and KMP. Source and live demos linked per app.",
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
