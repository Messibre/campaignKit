"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Globe,
  Share2,
  FileText,
  Copy,
  Download,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CampaignFormValues } from "./campaign-form";
import type {
  CampaignResponse,
  CampaignEmail,
  SocialPost,
} from "@/lib/campaign-types";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "sonner";

interface ResultsPreviewProps {
  formValues: CampaignFormValues | null;
  campaignResult: CampaignResponse | null;
}

export function ResultsPreview({
  formValues,
  campaignResult,
}: ResultsPreviewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!formValues || !campaignResult?.landingPage) return null;

  const landingPage = campaignResult.landingPage!;

  const sanitizeHtml = (raw: string) => {
    if (!raw) return "";
    if (typeof DOMParser === "undefined") {
      return raw
        .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "")
        .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, "")
        .replace(/<\s*(object|embed|link|meta)[^>]*>/gi, "")
        .replace(/\son\w+="[^"]*"/gi, "")
        .replace(/\son\w+='[^']*'/gi, "")
        .replace(/\s(href|src)=["']\s*javascript:[^"']*["']/gi, "");
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "text/html");
    const blockedTags = ["script", "iframe", "object", "embed", "link", "meta"];
    blockedTags.forEach((tag) => {
      doc.querySelectorAll(tag).forEach((el) => el.remove());
    });
    doc.querySelectorAll("*").forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = attr.value.toLowerCase();
        if (name.startsWith("on")) {
          el.removeAttribute(attr.name);
        }
        if (
          (name === "href" || name === "src") &&
          value.startsWith("javascript:")
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });
    return doc.body.innerHTML;
  };

  const copyToClipboard = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const buildLandingHtml = () => {
    const html = sanitizeHtml(landingPage?.htmlPreview || "");
    return [
      "<!DOCTYPE html>",
      '<html lang="en">',
      "<head>",
      '  <meta charSet="utf-8" />',
      `  <title>${landingPage?.sectionHeading ?? "Landing Page"}</title>`,
      '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
      "</head>",
      "<body>",
      html,
      "</body>",
      "</html>",
    ].join("\n");
  };

  const handleExportAll = async () => {
    try {
      setIsExporting(true);
      const zip = new JSZip();

      if (landingPage) {
        zip.file("landing.html", buildLandingHtml());
      }

      campaignResult.emails?.forEach((email: CampaignEmail, index: number) => {
        const content = `# ${email.subject}\n\n> ${email.preview}\n\n${email.body}`;
        zip.file(`email-${index + 1}.md`, content);
      });

      campaignResult.socialPosts?.forEach((post: SocialPost, index: number) => {
        const platform = post.platform.toLowerCase();
        const content = `${post.text}\n\n${post.hashtags
          .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
          .join(" ")}`;
        zip.file(`social-${platform}-${index + 1}.txt`, content);
      });

      if (campaignResult.taglines?.length) {
        zip.file("taglines.txt", campaignResult.taglines.join("\n"));
      }

      if (campaignResult.imagePrompts?.length) {
        zip.file("image-prompts.txt", campaignResult.imagePrompts.join("\n\n"));
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "campaign-kit.zip");
      toast.success("Exported campaign kit ZIP");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export ZIP");
    } finally {
      setIsExporting(false);
    }
  };

  const primaryTone =
    formValues.tones && formValues.tones.length > 0
      ? formValues.tones[0]
      : "Default";
  const lengthLabel =
    formValues.desiredLength === 33
      ? "Short"
      : formValues.desiredLength === 66
        ? "Medium"
        : "Detailed";

  const tabs = [
    {
      id: "landing",
      icon: Globe,
      label: "Landing Page",
      render: () => (
        <div className="space-y-6">
          <h4
            className="text-3xl font-semibold text-foreground leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {landingPage.sectionHeading}
          </h4>
          {landingPage.introText ? (
            <p className="text-muted-foreground text-base leading-relaxed">
              {landingPage.introText}
            </p>
          ) : null}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h5 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                Key Benefits
              </h5>
              <ul className="space-y-2 text-foreground/90 text-sm leading-relaxed">
                {(landingPage.features ?? []).map((feature, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1 h-4 w-4 rounded-full border border-primary/40 flex items-center justify-center text-[10px]">
                      •
                    </span>
                    <div>
                      <div className="font-semibold text-foreground">
                        {(feature as any).heading ?? (feature as any)}
                      </div>
                      {((feature as any).body ||
                        (feature as any).toString()) && (
                        <div className="text-sm text-muted-foreground">
                          {(feature as any).body ?? ""}
                          {(feature as any).metric
                            ? ` — ${(feature as any).metric}`
                            : ""}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                Call to Action
              </h5>
              <p className="text-foreground/90 text-sm leading-relaxed">
                {landingPage.cta}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              HTML Preview
            </h5>
            <div className="bg-background/60 border border-border/30 rounded-lg p-6 min-h-40">
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(landingPage.htmlPreview),
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "emails",
      icon: Mail,
      label: "Emails",
      render: () => (
        <div className="space-y-6">
          {campaignResult.emails?.length ? (
            campaignResult.emails.map((email, index) => {
              const key = `email-${index}`;
              return (
                <div
                  key={key}
                  className="bg-background/60 border border-border/30 rounded-lg p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                        Email #{index + 1}
                      </p>
                      <h4 className="text-lg font-semibold text-foreground">
                        {email.subject}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {email.preview}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          key,
                          `${email.subject}\n\n${email.body}`,
                        )
                      }
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedKey === key ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-foreground/90 leading-relaxed font-sans bg-background/60 border border-border/30 rounded-lg p-4">
                    {email.body}
                  </pre>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">Generating emails…</p>
          )}
        </div>
      ),
    },
    {
      id: "social",
      icon: Share2,
      label: "Social Posts",
      render: () => (
        <div className="space-y-6">
          {campaignResult.socialPosts?.length ? (
            campaignResult.socialPosts.map((post, index) => {
              const key = `social-${index}`;
              const content = `${post.text}\n\n${post.hashtags
                .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
                .join(" ")}`;
              return (
                <div
                  key={key}
                  className="bg-background/60 border border-border/30 rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold"
                      >
                        {post.platform}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(key, content)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedKey === key ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {post.text}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.hashtags
                      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
                      .join(" ")}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">
              Generating social posts…
            </p>
          )}
        </div>
      ),
    },
    {
      id: "extras",
      icon: FileText,
      label: "Extras",
      render: () => (
        <div className="space-y-8">
          {campaignResult.taglines?.length ? (
            <div className="space-y-3">
              <h5 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
                Taglines
              </h5>
              <ul className="space-y-2 text-sm text-foreground/90">
                {campaignResult.taglines.map((tagline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-4 w-4 rounded-full border border-border flex items-center justify-center text-[10px]">
                      {index + 1}
                    </span>
                    <span>{tagline}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Generating taglines…
            </p>
          )}

          {campaignResult.imagePrompts?.length ? (
            <div className="space-y-3">
              <h5 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image Prompts
              </h5>
              <div className="space-y-3">
                {campaignResult.imagePrompts.map((prompt, index) => {
                  const key = `imagePrompt-${index}`;
                  return (
                    <div
                      key={key}
                      className="bg-background/60 border border-border/30 rounded-lg p-4 flex justify-between gap-4"
                    >
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {prompt}
                      </p>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard(key, prompt)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Generating image prompts…
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-background border-t border-border/20">
      {/* Luxury background accents */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10 opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl -z-10 opacity-30" />

        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                Campaign Generated
              </span>
            </div>
            <h2
              className="text-5xl sm:text-6xl font-bold text-foreground mb-4 text-pretty leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Campaign Kit is Ready
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Preview your complete, AI-generated marketing assets. Copy,
              refine, and deploy with confidence.
            </p>
          </div>

          {/* Campaign Overview */}
          <div className="luxury-card mb-12 animate-scale-in">
            <h3 className="text-lg font-semibold text-foreground mb-8 uppercase tracking-widest">
              Campaign Overview
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: "Product", value: formValues.productName },
                { label: "Goal", value: formValues.campaignGoal, badge: true },
                {
                  label: "Tones",
                  value: formValues.tones.length || "Multiple",
                },
                { label: "Length", value: lengthLabel },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`animate-fade-in-up stagger-${i + 1} opacity-0 space-y-2`}
                >
                  <p className="text-xs text-muted-foreground font-semibold tracking-widest uppercase">
                    {item.label}
                  </p>
                  {item.badge ? (
                    <Badge className="bg-primary text-primary-foreground w-fit font-semibold">
                      {item.value}
                    </Badge>
                  ) : (
                    <p className="text-lg font-semibold text-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Tabs */}
          <div className="luxury-card rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
            <Tabs defaultValue="landing" className="w-full">
              <TabsList className="w-full justify-start border-b border-border/30 bg-background/50 rounded-none px-0 h-auto gap-0">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="text-sm sm:text-base rounded-none border-r border-border/30 last:border-r-0 flex-1 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-b-primary py-4 transition-all duration-300 hover:bg-background/30"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline font-medium">
                        {tab.label}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="p-8 sm:p-10 animate-fade-in-up"
                >
                  {tab.render()}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center animate-fade-in-up">
            <p className="text-muted-foreground mb-8 text-lg font-light tracking-wide">
              Ready to launch your campaign?
            </p>
            <Button
              onClick={handleExportAll}
              disabled={isExporting}
              className="luxury-button bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-3.5 text-base rounded-full shadow-xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Preparing ZIP..." : "Export Full Campaign Kit"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
