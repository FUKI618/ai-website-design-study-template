#!/usr/bin/env node

/**
 * Generates design-study command/skill files for all supported AI coding platforms.
 * Source of truth: .claude/skills/design-study/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_NAME = 'design-study';
const SOURCE = join(ROOT, '.claude', 'skills', SKILL_NAME, 'SKILL.md');
const SHORT_DESC =
  'Extract design patterns from a public website and build an inspired-by Next.js template (placeholder content only)';

// --- Cleanup legacy clone-website artifacts (one-time, safe to leave in) ---

const LEGACY_PATHS = [
  '.codex/skills/clone-website',
  '.github/skills/clone-website',
  '.cursor/commands/clone-website.md',
  '.windsurf/workflows/clone-website.md',
  '.gemini/commands/clone-website.toml',
  '.opencode/commands/clone-website.md',
  '.augment/commands/clone-website.md',
  '.continue/commands/clone-website.md',
  '.amazonq/cli-agents/clone-website.json',
];
LEGACY_PATHS.forEach((p) => {
  const full = join(ROOT, p);
  if (existsSync(full)) {
    rmSync(full, { recursive: true, force: true });
    console.log(`  - removed legacy: ${p}`);
  }
});

// --- Parse source skill ---

let raw;
try {
  raw = readFileSync(SOURCE, 'utf8').replace(/\r\n/g, '\n');
} catch {
  console.error(`Error: Source skill not found at .claude/skills/${SKILL_NAME}/SKILL.md`);
  process.exit(1);
}

const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) {
  console.error('Error: Could not parse SKILL.md frontmatter');
  process.exit(1);
}

const body = match[2];

// --- Helpers ---

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  \u2713 ${relPath}`);
}

const HEADER =
  `<!-- AUTO-GENERATED from .claude/skills/${SKILL_NAME}/SKILL.md \u2014 do not edit directly.\n` +
  '     Run `node scripts/sync-skills.mjs` to regenerate. -->\n\n';

const noArgs = (text) => text.replace(/\$ARGUMENTS/g, 'the target URL provided by the user');

// --- Generate ---

console.log(`Syncing ${SKILL_NAME} skill to all platforms...`);
console.log(`  Source: .claude/skills/${SKILL_NAME}/SKILL.md\n`);

// 1. Codex CLI — same SKILL.md format, same $ARGUMENTS syntax
write(`.codex/skills/${SKILL_NAME}/SKILL.md`, raw);

// 2. GitHub Copilot — same SKILL.md format
write(`.github/skills/${SKILL_NAME}/SKILL.md`, raw);

// 3. Cursor — plain markdown, no argument substitution support
write(`.cursor/commands/${SKILL_NAME}.md`, HEADER + noArgs(body));

// 4. Windsurf — markdown workflow
write(`.windsurf/workflows/${SKILL_NAME}.md`, HEADER + noArgs(body));

// 5. Gemini CLI — TOML format, {{args}} for arguments
const geminiBody = body.replace(/\$ARGUMENTS/g, '{{args}}');
write(
  `.gemini/commands/${SKILL_NAME}.toml`,
  `# AUTO-GENERATED from .claude/skills/${SKILL_NAME}/SKILL.md\n` +
    `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
    `description = "${SHORT_DESC}"\n\n` +
    `[prompt]\ntext = '''\n${geminiBody}\n'''\n`
);

// 6. OpenCode — markdown + YAML frontmatter, $ARGUMENTS works natively
write(
  `.opencode/commands/${SKILL_NAME}.md`,
  `---\ndescription: "${SHORT_DESC}"\n---\n${HEADER}${body}`
);

// 7. Augment Code — markdown + YAML frontmatter
write(
  `.augment/commands/${SKILL_NAME}.md`,
  `---\ndescription: "${SHORT_DESC}"\nargument-hint: "<url>"\n---\n${HEADER}${body}`
);

// 8. Continue — prompt file with invokable: true
write(
  `.continue/commands/${SKILL_NAME}.md`,
  `---\nname: ${SKILL_NAME}\ndescription: "${SHORT_DESC}"\ninvokable: true\n---\n${HEADER}${body}`
);

// 9. Amazon Q — JSON agent definition
write(
  `.amazonq/cli-agents/${SKILL_NAME}.json`,
  JSON.stringify(
    {
      name: SKILL_NAME,
      description: SHORT_DESC,
      prompt: noArgs(body),
      fileContext: ['AGENTS.md', 'LEGAL.md', 'docs/research/**'],
    },
    null,
    2
  ) + '\n'
);

console.log(`\nDone! 9 platform command files generated from source skill.`);
