import type { Metadata, Viewport } from 'next'
import { Sora, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kotlin-reforge.vercel.app'),
  title: 'Kotlin Reforge | Rebuilding Android Open Source in Kotlin',
  description:
    'Kotlin Reforge modernizes legacy Android infrastructure through full Kotlin rewrites, Material 3 Expressive design, and Kotlin Multiplatform architecture.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '650x650' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Kotlin Reforge',
    description:
      'Architectural rewrites of critical open-source Android apps with Kotlin, Compose, and KMP.',
    images: ['/social.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kotlin Reforge',
    description:
      'Architectural rewrites of critical open-source Android apps with Kotlin, Compose, and KMP.',
    images: ['/social.png'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1218' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
