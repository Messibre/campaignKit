import React from "react"
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

export const metadata: Metadata = {
  title: 'Campaign Kit AI - Generate Marketing Campaigns Instantly',
  description: 'Generate complete marketing campaign kits in seconds. Get landing pages, emails, social posts, and more from a simple product description.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
