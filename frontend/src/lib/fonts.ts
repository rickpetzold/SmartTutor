import { Geist, Geist_Mono } from 'next/font/google'

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Sirivennela is not available via next/font/google; it is loaded via <link> in layout and referenced by --font-display in globals.css.
