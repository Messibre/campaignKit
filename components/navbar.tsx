'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

interface NavbarProps {
  onGenerateClick: () => void
}

export function Navbar({ onGenerateClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-4 group cursor-pointer transition-all duration-500">
            {/* Luxury logo badge */}
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <span className="text-xl font-bold text-primary">C</span>
              </div>
            </div>

            {/* Logo text */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground tracking-wide">Campaign</span>
              <span className="text-xs text-primary font-semibold tracking-widest uppercase">Kit Studio</span>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={onGenerateClick}
            className="luxury-button bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-2.5 rounded-full text-sm tracking-wide shadow-lg hover:shadow-xl hover:shadow-primary/30 active:scale-95"
          >
            Generate Now
          </Button>
        </div>
      </div>
    </nav>
  )
}
