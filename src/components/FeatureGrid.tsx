import {
  Zap,
  Shield,
  Workflow,
  Layers,
  GitBranch,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Built for speed",
    body: "Lorem ipsum dolor sit amet — keyboard-first navigation and instant search across your workspace.",
  },
  {
    icon: Workflow,
    title: "Self-driving workflows",
    body: "Consectetur adipiscing — automate cycles, triage queues, and review handoffs without lifting a finger.",
  },
  {
    icon: GitBranch,
    title: "Source of truth",
    body: "Sed do eiusmod tempor — every spec, decision, and review lives next to the code that ships it.",
  },
  {
    icon: Layers,
    title: "Composable surfaces",
    body: "Ut labore et dolore — drop the views your team actually uses into a layout that fits your work.",
  },
  {
    icon: Shield,
    title: "Quietly secure",
    body: "Magna aliqua — SSO, audit logs, and granular permissions out of the box, no upgrade tier required.",
  },
  {
    icon: Sparkles,
    title: "Designed to last",
    body: "Ad minim veniam — built so your fifth-year of usage feels as fast and clean as the first.",
  },
];

export function FeatureGrid() {
  return (
    <section
      id="features"
      className="border-b border-border/60 px-6 py-32 sm:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">
            Why teams pick this
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight sm:text-5xl">
            A new species of product tool
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built for modern teams — placeholder copy describing the
            value proposition with calm confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-3 bg-background p-8 transition-colors hover:bg-card/40"
            >
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="text-base font-medium text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
