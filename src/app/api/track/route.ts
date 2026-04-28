import { NextResponse } from "next/server";
import {
  getClickHouseClient,
  isClickHouseConfigured,
} from "@/lib/clickhouse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TrackPayload {
  event?: unknown;
  props?: unknown;
  session_id?: unknown;
  path?: unknown;
  referrer?: unknown;
  timestamp_ms?: unknown;
}

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

export async function POST(request: Request): Promise<NextResponse> {
  // If ClickHouse is not configured, accept the event silently and do
  // nothing. The template ships without credentials and must not 500.
  if (!isClickHouseConfigured()) {
    return new NextResponse(null, { status: 204 });
  }

  let body: TrackPayload;
  try {
    body = (await request.json()) as TrackPayload;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const event = asString(body.event);
  if (!event || event.length > 80) {
    return NextResponse.json({ error: "invalid event" }, { status: 400 });
  }

  const client = getClickHouseClient();
  if (!client) return new NextResponse(null, { status: 204 });

  const props =
    body.props && typeof body.props === "object" && !Array.isArray(body.props)
      ? (body.props as Record<string, unknown>)
      : {};

  try {
    await client.insert({
      table: process.env.CLICKHOUSE_EVENTS_TABLE ?? "events",
      values: [
        {
          event,
          session_id: asString(body.session_id),
          path: asString(body.path),
          referrer: asString(body.referrer, ""),
          props: JSON.stringify(props),
          timestamp:
            typeof body.timestamp_ms === "number"
              ? Math.floor(body.timestamp_ms / 1000)
              : Math.floor(Date.now() / 1000),
        },
      ],
      format: "JSONEachRow",
    });
  } catch (err) {
    // Don't expose ClickHouse error details to the client.
    console.error("[track] insert failed", err);
    return new NextResponse(null, { status: 204 });
  }

  return new NextResponse(null, { status: 204 });
}
