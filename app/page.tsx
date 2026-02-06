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
import { toast } from "sonner";

export default function Page() {
  const [formValues, setFormValues] = useState<CampaignFormValues | null>(null);
  const [campaignResult, setCampaignResult] = useState<CampaignResponse | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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
        return;
      }
      if (stage1Response.status === 401 || stage1Response.status === 403) {
        toast.error("Invalid or missing API key. Please add your Gemini key.");
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
        toast.info("Using demo data (add GEMINI_API_KEY for real generation).");
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
            "Invalid or missing API key. Please add your Gemini key.",
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
            "Emails/social used demo data (add GEMINI_API_KEY for real generation).",
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection onCtaClick={handleHeroCta} />
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
