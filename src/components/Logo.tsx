import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid h-6 w-6 place-items-center rounded-md bg-primary text-primary-foreground text-xs"
      >
        D
      </span>
      <span className="tracking-tight">DesignStudy</span>
    </div>
  );
}
