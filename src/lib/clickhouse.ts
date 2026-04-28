import { createClient, type ClickHouseClient } from "@clickhouse/client";

/**
 * Server-side ClickHouse client. Lazily constructed and cached.
 *
 * Returns null if the env vars are not configured — callers must handle
 * this and degrade gracefully (no-op rather than throw). This lets the
 * template ship without ClickHouse credentials and still build/run.
 */

let cached: ClickHouseClient | null = null;
let initialized = false;

export function getClickHouseClient(): ClickHouseClient | null {
  if (initialized) return cached;
  initialized = true;

  const url = process.env.CLICKHOUSE_URL;
  const username = process.env.CLICKHOUSE_USER;
  const password = process.env.CLICKHOUSE_PASSWORD;
  const database = process.env.CLICKHOUSE_DATABASE ?? "default";

  if (!url || !username || !password) {
    cached = null;
    return null;
  }

  cached = createClient({
    url,
    username,
    password,
    database,
    request_timeout: 5_000,
    keep_alive: { enabled: true },
  });
  return cached;
}

export function isClickHouseConfigured(): boolean {
  return Boolean(
    process.env.CLICKHOUSE_URL &&
      process.env.CLICKHOUSE_USER &&
      process.env.CLICKHOUSE_PASSWORD,
  );
}
