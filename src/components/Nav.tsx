import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

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
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button render={<a href="#" />} nativeButton={false} variant="ghost" size="sm">
            Sign in
          </Button>
          <Button render={<a href="#" />} nativeButton={false} size="sm">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
