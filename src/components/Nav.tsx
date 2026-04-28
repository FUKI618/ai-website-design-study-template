"use client";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { trackCta } from "@/lib/analytics";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Changelog", href: "#changelog" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-foreground"
                onClick={() => trackCta("nav_link", { label: l.label })}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button
            render={<a href="#" />}
            nativeButton={false}
            variant="ghost"
            size="sm"
            onClick={() => trackCta("nav_signin")}
          >
            Sign in
          </Button>
          <Button
            render={<a href="#" />}
            nativeButton={false}
            size="sm"
            onClick={() => trackCta("nav_get_started")}
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
