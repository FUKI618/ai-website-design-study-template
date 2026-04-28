/**
 * Client-side analytics tracker.
 *
 * Fire-and-forget POST to /api/track. Failures are swallowed silently —
 * analytics must never break the user experience. If the server endpoint
 * has no ClickHouse credentials, it returns 204 immediately.
 *
 * Cookie-less by design: a session id is stored in sessionStorage (cleared
 * when the tab closes) so we can join page views to CTA clicks within a
 * single visit, but we do not track users across sessions.
 */

export type TrackProps = Record<string, string | number | boolean | null>;

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "design-study:session-id";
  let id = window.sessionStorage.getItem(KEY);
  if (!id) {
    id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.sessionStorage.setItem(KEY, id);
  }
  return id;
}

export async function track(event: string, props: TrackProps = {}): Promise<void> {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({
    event,
    props,
    session_id: getSessionId(),
    path: window.location.pathname,
    referrer: document.referrer || null,
    timestamp_ms: Date.now(),
  });
  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
      return;
    }
    await fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Swallow — analytics must never throw.
  }
}

export function trackPageView(): void {
  track("page_view");
}

export function trackCta(label: string, extra: TrackProps = {}): void {
  track("cta_click", { label, ...extra });
}
