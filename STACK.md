# LP Stack: design-study + Exa + ClickHouse

This template is wired for a three-tier landing-page workflow. The pieces are independent — you can use any subset.

```
┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│   🔍  Exa MCP        │ →  │   🎨  design-study   │ →  │   📊  ClickHouse     │
│                      │    │   + Next.js          │    │                      │
│ Phase 0.5 research:  │    │ Phases 1-5:          │    │ Post-ship analytics: │
│ - category proof     │    │ - structural extract │    │ - cookie-less events │
│ - hook / copy        │    │ - hue-shift palette  │    │ - server-side ingest │
│   patterns           │    │ - placeholder copy   │    │ - 180d TTL retention │
│ - statistic ideas    │    │ - inspired-by build  │    │ - daily rollup view  │
└──────────────────────┘    └──────────────────────┘    └──────────────────────┘
       optional                  required               optional but recommended
```

The skill body lives in `.claude/skills/design-study/SKILL.md`. The Exa hook is **Phase 0.5**. The ClickHouse wiring lives in `src/lib/clickhouse.ts`, `src/lib/analytics.ts`, `src/app/api/track/route.ts`.

---

## Layer 1 — Exa research (`exa@claude-plugins-official`)

**What it adds:** turns Lorem ipsum into copy informed by category conventions. The agent runs 2–3 focused searches before extracting structural patterns from the target, then distills the results into `docs/research/<hostname>/EXA_RESEARCH.md`.

**How to install (once):**

```bash
claude plugin marketplace update claude-plugins-official
claude plugin install exa@claude-plugins-official
# then in any Claude Code session:
mcp__plugin_exa_exa__authenticate    # follow the prompts to add API key
```

**What the skill does with it:**
- Searches the *category* (not the target itself) for proof points, hook patterns, statistic ideas
- Saves *paraphrased* findings to `EXA_RESEARCH.md` — never verbatim quotes
- Uses the patterns to inform Phase 3 component "Content Schema" (the placeholder copy now reads like the category, not generic Latin)

**Hard rule:** even when Exa surfaces the target's own pages, those are out of scope and excluded. The skill enforces this.

---

## Layer 2 — design-study (this template)

The core. See [`README.md`](./README.md) and [`.claude/skills/design-study/SKILL.md`](./.claude/skills/design-study/SKILL.md).

---

## Layer 3 — ClickHouse analytics

**What it adds:** cookie-less, server-side event tracking on every shipped LP. Page views, CTA clicks, custom events all land in a single `events` table with 180-day retention and a pre-built daily rollup view. No third-party tracker, no GDPR cookie banner, no slowdown of the LP itself (sendBeacon-based fire-and-forget).

### Setup — ClickHouse Cloud (recommended, 5 min)

1. Sign up at [clickhouse.cloud](https://clickhouse.cloud) (free 1GB tier — fine for many LPs)
2. Create a "Production" service. Note the HTTPS endpoint, default user is `default`, the password is auto-generated.
3. Open the SQL console. Paste and run [`db/migrations/001_events.sql`](./db/migrations/001_events.sql).
4. In your project, copy `.env.example` to `.env.local` and fill in:
   ```
   CLICKHOUSE_URL=https://<your-service>.clickhouse.cloud:8443
   CLICKHOUSE_USER=default
   CLICKHOUSE_PASSWORD=<the auto-generated password>
   ```
5. Restart `npm run dev`. That's it.

### Setup — self-host (Docker)

```bash
docker run -d --name clickhouse \
  -p 8123:8123 -p 9000:9000 \
  clickhouse/clickhouse-server:latest
docker exec clickhouse clickhouse-client --multiquery < db/migrations/001_events.sql
```

Then:
```
CLICKHOUSE_URL=http://localhost:8123
CLICKHOUSE_USER=default
CLICKHOUSE_PASSWORD=
```

### Usage from components

```tsx
"use client";
import { useEffect } from "react";
import { trackPageView, trackCta } from "@/lib/analytics";

export function Hero() {
  useEffect(() => { trackPageView(); }, []);
  return (
    <button onClick={() => trackCta("hero_start_building")}>
      Start building
    </button>
  );
}
```

### Useful queries (paste in ClickHouse Cloud SQL console)

```sql
-- top events by day, last 7 days
SELECT day, event, hits, sessions
FROM default.events_daily
WHERE day >= today() - 7
ORDER BY day DESC, hits DESC;

-- conversion funnel for a single session
SELECT timestamp, event, props
FROM default.events
WHERE session_id = '<paste session id>'
ORDER BY timestamp;

-- CTA leaderboard
SELECT
  JSONExtractString(props, 'label') AS cta,
  count() AS clicks,
  uniq(session_id) AS unique_sessions
FROM default.events
WHERE event = 'cta_click'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY cta
ORDER BY clicks DESC;
```

### Graceful degradation

If `CLICKHOUSE_*` env vars are not set:
- `/api/track` returns `204 No Content` and drops the event
- `npm run build` still succeeds
- The LP still works exactly the same — you just have no analytics

This is intentional: **the template ships analytics-ready but credential-free**, so you can publish first and wire ClickHouse later without breaking anything.

---

## When to use this stack

✅ **Good fit**
- Building multiple LPs / micro-sites and want unified analytics across all of them
- Want cookie-less, GDPR-friendlier event tracking
- Comfortable with SQL for analysis instead of a dashboard product
- Need to keep raw event data for ad-hoc analysis

🟡 **Consider alternatives**
- If you need a polished dashboard out of the box → PostHog / Plausible
- If your LP is purely static and won't have any backend → skip ClickHouse, use a static-friendly tracker
- If you're shipping just one LP → may be overkill

---

## What's NOT in this stack (intentional)

- **No cookies / no fingerprinting.** Session IDs live in `sessionStorage` and die with the tab.
- **No third-party scripts.** All tracking goes through your own `/api/track` route.
- **No A/B test framework wired up.** Trivial to add — query `events` and split on a hash of `session_id`.
- **No realtime dashboard.** Use ClickHouse Cloud's built-in dashboard, Metabase, Grafana, or write your own page using the SQL above.
