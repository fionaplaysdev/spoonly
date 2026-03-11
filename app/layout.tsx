import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Serif_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const barlowCondensed = Barlow_Condensed({ 
  subsets: ["latin"],
  weight: ['700', '800', '900'],
  variable: '--font-display',
})
const dmSerifDisplay = DM_Serif_Display({ 
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-serif',
})
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Spoonly - Low-Effort Meal Ideas',
  description: 'Find easy meals based on ingredients you already have. Perfect for low-energy cooking moments.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} ${dmSerifDisplay.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
