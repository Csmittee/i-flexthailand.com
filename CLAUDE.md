# CLAUDE.md — i-flexthailand.com
> Version 1.0 — 2026-06-25
> Changes: Initial creation — governance seed
> Previous: NONE

Project: I-Flex Thailand — Professional Pilates equipment, bilingual EN/TH (BUS01)
Domain: i-flexthailand.com
BUS ID: BUS01

Governance: ALL rules at janishammer-central/RULES.md + .claude/rules/
Read janishammer-central CLAUDE.md before reading anything in this repo.

Injector:
  injector-config.js — STANDALONE LOCAL at /js/iflex-config.js (1193L ⚠️)
  injector-core.js   — STANDALONE LOCAL at /js/iflex-core.js (789L)
  NOTE: NOT using central injector from assets.janishammer.com

Local key files:
  js/iflex-config.js       — standalone brand config + all CSS (1193 lines — over limit)
  js/iflex-core.js         — standalone nav/footer/GA/language switcher
  scripts/generate_blog.py — Airtable → bilingual blog HTML
  scripts/generate_products.py — Airtable → bilingual product HTML
  index.html               — EN homepage (590L)

Critical constraint: This site uses a standalone injector fork — changes to
janishammer-central/js/ do NOT affect this site. Schema.org, hreflang, and
og:type on TH pages are missing — see RETROFIT_QUEUE items #1–#7.

Tech: Vanilla HTML/CSS/JS · Airtable · Python build · GitHub Actions · Cloudflare Pages
