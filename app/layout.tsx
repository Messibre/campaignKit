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
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/5399ccbd-a4b4-4119-9292-6ee6cb0b29f5', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: 'debug-session',
      runId: 'post-fix',
      hypothesisId: 'H1',
      location: 'app/layout.tsx:24',
      message: 'RootLayout rendered',
      data: {},
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

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
