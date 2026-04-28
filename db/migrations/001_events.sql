-- 001_events — minimal cookie-less event log for design-study LPs
--
-- Run once against your ClickHouse Cloud (or self-hosted) instance:
--   clickhouse-client --query "$(cat db/migrations/001_events.sql)"
-- or via the ClickHouse Cloud SQL console: paste and execute.

CREATE DATABASE IF NOT EXISTS default;

CREATE TABLE IF NOT EXISTS default.events (
  timestamp   DateTime  DEFAULT now(),
  event       LowCardinality(String),
  session_id  String,
  path        String,
  referrer    String,
  props       String,                 -- JSON-encoded sub-properties
  ingested_at DateTime  DEFAULT now()
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (event, timestamp, session_id)
TTL timestamp + INTERVAL 180 DAY
SETTINGS index_granularity = 8192;

-- Helpful pre-built rollup view for daily event counts.
CREATE MATERIALIZED VIEW IF NOT EXISTS default.events_daily
ENGINE = SummingMergeTree
PARTITION BY toYYYYMM(day)
ORDER BY (day, event)
AS SELECT
  toDate(timestamp) AS day,
  event,
  count() AS hits,
  uniq(session_id) AS sessions
FROM default.events
GROUP BY day, event;
