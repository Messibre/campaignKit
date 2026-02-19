"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroSectionProps {
  onCtaClick: () => void;
  onViewExamples: () => void;
}

export function HeroSection({ onCtaClick, onViewExamples }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-40 lg:py-48 border-b border-border/20">
      {/* Luxury background accents */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl -z-10 opacity-30" />

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in-left">
            {/* Luxury badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 w-fit">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                AI-Powered Marketing
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-tight text-pretty"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.02em",
              }}
            >
              Your Marketing
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Campaign Kit
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl">
              Generate complete marketing campaigns in seconds. Landing pages,
              emails, social posts, and ad copy - all powered by cutting-edge
              AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={onCtaClick}
                className="luxury-button bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-3.5 rounded-full text-base tracking-wide shadow-xl hover:shadow-2xl hover:shadow-primary/40"
              >
                Create Campaign
              </Button>
              <Button
                variant="outline"
                className="luxury-button border-border/50 text-foreground hover:bg-secondary/30 font-semibold px-10 py-3.5 rounded-full text-base tracking-wide bg-transparent"
                onClick={onViewExamples}
              >
                View Examples
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-fade-in-right">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-2xl">
              {/* Logo overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-wide bg-gradient-to-r from-primary via-[#e6c46a] to-primary/70 bg-clip-text text-transparent drop-shadow-md"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Campaign Kit AI
                </span>
              </div>
              <Image
                src="/photo.jpg"
                alt="Premium marketing campaign kit"
                width={600}
                height={600}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-border/20">
          {[
            { label: "Seconds to Generate", value: "<30" },
            { label: "Campaign Components", value: "5+" },
            { label: "AI Models", value: "Latest" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`animate-fade-in-up stagger-${i + 1} opacity-0`}
            >
              <p className="text-xs text-muted-foreground font-semibold tracking-widest uppercase mb-2">
                {stat.label}
              </p>
              <p className="text-3xl sm:text-4xl font-semibold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
