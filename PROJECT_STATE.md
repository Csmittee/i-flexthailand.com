# PROJECT_STATE.md — i-flexthailand.com
> Version 1.0 — 2026-06-25
> Changes: Initial creation — bootstrap scan
> Previous: NONE

## Status: LIVE
## Domain: https://i-flexthailand.com
## Last observed state: Full bilingual site live. 5 GitHub Action workflows active. Blog (5 EN/5 TH posts) and products (9 EN/9 TH) generated from Airtable. Gallery, news, testimonials also generated.
## Tech stack: Vanilla HTML/CSS/JS · Airtable (appMBjlfYyVd8I7ML) · Python build · GitHub Actions · Cloudflare Pages
## Injector version: STANDALONE — not using central injector. Local js/iflex-config.js (v2.0) + js/iflex-core.js

## Folder structure:
  Compliant: NO
  Issues: All HTML files at repo root (index.html, about-us.html, contact-us.html, case-study.html, product-listing.html, blog-listing.html). No /public/ folder. th/ subfolder exists for TH mirrors. blog/ and product/ subdirectories used for generated posts.

## SEO status (from scan):
  OG tags:   present on EN index.html. Partial or missing on TH pages and inner pages.
  Canonical: present on EN index.html and th/index.html. Status unknown on inner pages.
  Schema:    missing — no schema.org markup found on any page
  Hreflang:  missing — EN/TH pages not linked via hreflang

## Security status (from scan):
  No issues found. All Airtable credentials in GitHub Secrets. Python scripts use os.environ.get(). No keys in any client-side file.

## Open issues observed:
  - js/iflex-config.js: 1193 lines — over 800 limit
  - js/iflex-core.js: 789 lines — at limit
  - schema.org missing on all pages (homepage, blog, products)
  - hreflang missing on all bilingual pages
  - TH pages missing complete OG block (og:type, og:title, og:description, og:image, og:url)
  - Twitter cards missing on TH pages
  - Site uses standalone injector — diverged from central injector

## Session log (newest first):
### 2026-06-25 — Bootstrap scan
Seed CLAUDE.md, CC_CHAT_LOG.md, PROJECT_STATE.md created. No source files touched.
