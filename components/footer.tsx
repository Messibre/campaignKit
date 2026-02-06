export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-background py-10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            Campaign Kit AI
          </p>
          <p className="text-xs text-muted-foreground">
            Generate landing pages, emails, and social posts in minutes.
          </p>
          <p className="text-xs text-muted-foreground">
            2025. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <p className="text-xs text-muted-foreground">Contact me</p>
          <a
            href="https://www.linkedin.com/in/meseret-birhanu-nigus?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/MessiBre21"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
          <a
            href="mailto:messibre21@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/Messibre"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
