"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import {
  CampaignForm,
  type CampaignFormValues,
} from "@/components/campaign-form";
import { ResultsPreview } from "@/components/results-preview";
import { Footer } from "@/components/footer";
import type { CampaignResponse } from "@/lib/campaign-types";
import { exampleCampaigns } from "@/lib/example-campaigns";
import { toast } from "sonner";

export default function Page() {
  const [formValues, setFormValues] = useState<CampaignFormValues | null>(null);
  const [campaignResult, setCampaignResult] = useState<CampaignResponse | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleFormSubmit = async (values: CampaignFormValues) => {
    setIsSubmitting(true);
    setFormValues(values);

    try {
      const stage1Response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, stage: "stage1" }),
      });

      const stage1UsingMock =
        stage1Response.headers.get("X-Mock-Data") === "true";

      if (stage1Response.status === 429) {
        toast.error("You have reached the rate limit. Please try again later.");
        setCampaignResult(null);
        return;
      }
      if (stage1Response.status === 401 || stage1Response.status === 403) {
        toast.error(
          "Invalid or missing API key. Please add your Gemini keys.",
        );
        setCampaignResult(null);
        return;
      }
      if (!stage1Response.ok) {
        const payload = await stage1Response.json().catch(() => null);
        const message =
          payload?.message ||
          "We could not generate the landing page. Please try again.";
        throw new Error(message);
      }

      const stage1Data = (await stage1Response.json()) as CampaignResponse;
      setCampaignResult(stage1Data);

      if (stage1UsingMock) {
        toast.info(
          "Using demo data (add GEMINI_API_KEY1/2/3 for real generation).",
        );
      } else {
        toast.success("Landing page ready.");
      }

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);

      try {
        const stage2Response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, stage: "stage2" }),
        });

        const stage2UsingMock =
          stage2Response.headers.get("X-Mock-Data") === "true";

        if (stage2Response.status === 429) {
          toast.error(
            "You have reached the rate limit. Please try again later.",
          );
          return;
        }
        if (stage2Response.status === 401 || stage2Response.status === 403) {
          toast.error(
            "Invalid or missing API key. Please add your Gemini keys.",
          );
          return;
        }
        if (!stage2Response.ok) {
          const payload = await stage2Response.json().catch(() => null);
          const message =
            payload?.message ||
            "We could not generate emails or social posts. Please try again.";
          throw new Error(message);
        }

        const stage2Data = (await stage2Response.json()) as CampaignResponse;
        setCampaignResult((prev) => ({ ...(prev ?? {}), ...stage2Data }));

        if (stage2UsingMock && !stage1UsingMock) {
          toast.info(
            "Emails/social used demo data (add GEMINI_API_KEY1/2/3 for real generation).",
          );
        } else if (!stage2UsingMock) {
          toast.success("Emails & social posts ready.");
        }
      } catch (stage2Error) {
        console.error(stage2Error);
        toast.error("Emails & social posts failed. Landing page is ready.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setCampaignResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHeroCta = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewExamples = () => {
    setShowExamples(true);
    setTimeout(() => {
      examplesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleExampleSelect = (exampleId: string) => {
    const example = exampleCampaigns.find((item) => item.id === exampleId);
    if (!example) {
      return;
    }
    setFormValues(example.formValues);
    setCampaignResult(example.campaign);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGenerateClick={handleHeroCta} />
      <HeroSection onCtaClick={handleHeroCta} onViewExamples={handleViewExamples} />
      {showExamples ? (
        <section ref={examplesRef} className="py-16 sm:py-24 bg-background border-b border-border/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-4xl sm:text-5xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Example Campaigns
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore full kits without adding your own details yet.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {exampleCampaigns.map((example) => (
                <div
                  key={example.id}
                  className="luxury-card p-6 flex flex-col gap-4 animate-fade-in-up"
                >
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      {example.formValues.campaignGoal}
                    </p>
                    <h3 className="text-2xl font-semibold text-foreground">
                      {example.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {example.formValues.productDescription}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="px-2.5 py-1 rounded-full border border-border/50">
                      {example.formValues.tones.join(", ")}
                    </span>
                    <span className="px-2.5 py-1 rounded-full border border-border/50">
                      {example.formValues.brandColors}
                    </span>
                    <span className="px-2.5 py-1 rounded-full border border-border/50">
                      Short & Punchy
                    </span>
                  </div>
                  <button
                    className="luxury-button bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full text-sm shadow-md hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    onClick={() => handleExampleSelect(example.id)}
                  >
                    View This Example
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CampaignForm
        formRef={formRef}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
      <ResultsPreview formValues={formValues} campaignResult={campaignResult} />
      <Footer />
    </div>
  );
}
