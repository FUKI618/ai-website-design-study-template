import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* Decorative violet gradient — generic geometric, not extracted from any target */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.55_0.20_290_/_0.25),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-32 text-center sm:pt-32 sm:pb-40">
        <span className="inline-flex items-center rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground">
          New · placeholder release line · v0.1
        </span>
        <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          The system for product
          <br />
          development teams
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Streamline
          how your team plans, builds, and ships with a single source of truth.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button render={<a href="#" />} nativeButton={false} size="lg">
            Start building
            <ArrowRight className="size-4" />
          </Button>
          <Button render={<a href="#" />} nativeButton={false} variant="outline" size="lg">
            Watch the tour
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Free for individuals · No credit card required
        </p>
      </div>

      {/* Mock product UI block — generic placeholder, not derived from any target */}
      <div className="mx-auto -mb-24 w-full max-w-5xl px-6">
        <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-primary/10">
          <div className="grid h-full grid-cols-[200px_1fr] divide-x divide-border/60">
            <aside className="flex flex-col gap-1 p-3 text-xs text-muted-foreground">
              <span className="font-mono uppercase tracking-wider">
                Workspace
              </span>
              {[
                "Inbox",
                "My issues",
                "Active",
                "Backlog",
                "Triage",
                "Projects",
                "Cycles",
              ].map((s) => (
                <div
                  key={s}
                  className="rounded-md px-2 py-1.5 hover:bg-muted/40"
                >
                  {s}
                </div>
              ))}
            </aside>
            <main className="flex flex-col gap-2 overflow-hidden p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground">
                  Active · 12 issues
                </h2>
                <div className="flex gap-1">
                  <div className="h-6 w-16 rounded-md bg-muted/40" />
                  <div className="h-6 w-16 rounded-md bg-muted/40" />
                </div>
              </div>
              {[
                ["DSN-128", "Refine onboarding empty state", "In review"],
                ["DSN-127", "Audit color contrast in dark mode", "In progress"],
                ["DSN-126", "Wire up keyboard shortcut layer", "In progress"],
                ["DSN-125", "Migrate notification preferences", "Todo"],
                ["DSN-124", "Refactor command-palette filtering", "Todo"],
                ["DSN-123", "Add per-project archive policy", "Backlog"],
              ].map(([id, title, status]) => (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-md border border-border/40 bg-background/40 px-3 py-2 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {id}
                  </span>
                  <span className="flex-1 truncate text-foreground">
                    {title}
                  </span>
                  <span className="text-xs text-primary">{status}</span>
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
