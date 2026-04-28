import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="relative overflow-hidden px-6 py-32 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,oklch(0.55_0.20_290_/_0.18),transparent_70%)]"
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <h2 className="text-balance text-4xl font-medium tracking-tight sm:text-6xl">
          Built for the future.
          <br />
          <span className="text-primary">Available today.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Duis aute irure dolor in reprehenderit. Drop in a placeholder closing
          pitch that mirrors the cadence of the rest of the page.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <Button render={<a href="#" />} nativeButton={false} size="lg">
            Start building
            <ArrowRight className="size-4" />
          </Button>
          <Button render={<a href="#" />} nativeButton={false} variant="outline" size="lg">
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
}
