# I-FLEX THAILAND — MASTER BUILD DOCUMENTATION
**The complete story of building i-flexthailand.com from zero to production**
**Author:** Chairit Smittee | **Documented:** May 2026
**Repo:** github.com/Csmittee/i-flexthailand.com | **Live:** https://i-flexthailand.com

---

## WHY THIS DOCUMENT EXISTS

This is the reference for any future Claude chat, any future developer (AI or human),
or any future website built in this ecosystem. It captures every architectural decision,
every lesson paid for in debugging hours, and the full journey from Webflow export to
a production-grade, dashboard-managed, SEO-perfect, bilingual website.

Time to build v1 in Webflow (from zero coding experience): **3 weeks**
Time to migrate and fix all bugs in GitHub (with Claude): **2.5 days** (2 lost on DeepSeek quality)
Time it would take Claude alone from scratch today: **6 hours maximum**
Target for any future site using this system: **6 hours**

---

## PART 1 — THE ORIGIN STORY

### Why Webflow First
Webflow was the entry point. Zero coding experience. Its visual designer taught core
CSS concepts — flexbox, grid, spacing, animation — by letting you see changes instantly.
Three weeks to build the first I-Flex site from zero knowledge.

**What Webflow gave:**
- CSS intuition (the visual designer is a CSS teacher in disguise)
- A finished design theme with brand identity
- Understanding of component-based structure
- Exported HTML/CSS as a migration base

**Why Webflow was left behind:**
- $29/month recurring cost with no added capability
- Cannot integrate AI-generated features (took Claude seconds to build things Webflow couldn't)
- CMS is walled — no direct API for dynamic injection patterns
- Cannot add backend logic, custom workers, or automation pipelines
- GitHub: free, version-controlled, AI-friendly, unlimited capability

**The right Webflow workflow for future sites:**
> Design in Webflow → export theme CSS as template → hand to Claude with design reference →
> Claude rebuilds in vanilla HTML/JS in GitHub → 6 hours, production-ready

### The Migration
- Webflow export → GitHub Pages attempt → Cloudflare Pages (chosen for speed + DNS + free)
- DeepSeek used for initial bug fix attempt → 2 days lost (low quality, compounding errors)
- Claude used for remaining bugs → half a day → everything resolved
- Lesson: Claude is the correct tool for this stack. Do not mix AI tools on one codebase.

---

## PART 2 — ARCHITECTURE DECISIONS (all locked, never revisit)

### Stack
| Layer | Choice | Reason |
|---|---|---|
| Hosting | Cloudflare Pages | Free, global CDN, auto-deploy on git push, DNS integrated |
| Database | Airtable | One source of truth, bilingual fields, AI field support, API accessible |
| Images | Cloudinary | Permanent URLs, transformation pipeline, cloud_name: dfiomi0lb |
| Scripts | Python (GitHub Actions) | Runs server-side at build time, no browser cost |
| Frontend | Vanilla HTML/JS | No framework = no dependency risk, Claude generates it perfectly |
| Secrets | GitHub Secrets + Cloudflare env vars | Never in code, never in repo |
| Deploy triggers | Cloudflare Workers | Keeps GitHub tokens off browser, routes by busId |

### What "No Backend" Means
There is no server. Every page is a static HTML file generated at build time.
API calls from browser are to Airtable directly (for dashboard only — not public pages).
Public pages read pre-generated JSON files committed by GitHub Actions.
This is intentional: zero hosting cost, zero server management, infinite scalability.

### The Two-Script Injector System
Every HTML page loads exactly two scripts in `<head>`, in this order:
```html
<script src="/js/iflex-config.js"></script>  <!-- brand data + all CSS -->
<script src="/js/iflex-core.js"></script>     <!-- navbar + footer + schema + favicon -->
```



**Why two scripts, not one:**
- `iflex-config.js` holds brand identity — colors, fonts, contact info, CSS. Changes per brand.
- `iflex-core.js` holds structural logic — navbar HTML, footer HTML, GA, schema injection.
- Separation means a color/CSS change never touches the navbar logic and vice versa.
- Future multi-brand sites change only `iflex-config.js` per brand.

**Rule:** Never add page-specific logic to the injectors. Injectors are shared infrastructure.

### Bilingual System
Every English page has a Thai mirror at `/th/` prefix.
Language is detected by `window.location.pathname.startsWith('/th/')`.
Content comes from paired fields in Airtable: `name` + `name_th`, `body` + `body_th`.
Canonical URLs, OG tags, and hreflang must all match the page's language exactly.
OG images are different per language — EN and TH have separate branded images.

### Dynamic Content Pattern (the core system)
```
Airtable (source of truth)
    ↓
GitHub Action (Python script runs on trigger)
    ↓
JSON file committed to repo (e.g. gallery-data.json)
    ↓
Cloudflare Pages auto-deploys (detects new commit)
    ↓
HTML page reads JSON at page load via fetch()
    ↓
Renders content dynamically — no hardcode in HTML
```

**Two trigger paths (both supported):**
1. Manual workflow_dispatch (GitHub Actions UI or dashboard button)
2. CSV file push to `/data/` folder (legacy — kept as fallback)

**Future third path (designed but not wired for all content types):**
3. Dashboard picks Cloudinary photo → writes URL to Airtable → clicks Deploy →
   Cloudflare Worker receives POST → triggers GitHub Action → page updates in ~2 min

---

## PART 3 — FILE OWNERSHIP (critical rule)

### Manually maintained — human decision required to change:
```
index.html              th/index.html
about-us.html           th/about-us.html
contact-us.html         th/contact-us.html
case-study.html         th/case-study.html
js/iflex-config.js
js/iflex-core.js
```

### Script-owned — regenerated automatically, never manually edit:
```
blog/*.html             th/blog/*.html
product/*.html          th/product/*.html
blog-listing.html       th/blog-listing.html
product-listing.html    th/product-listing.html
gallery-data.json
news-data.json
testimonials-data.json
```

**Rule:** Any manual edit to script-owned files is overwritten on next workflow run.
Any change to manually-maintained files requires deliberate human action.

---

## PART 4 — SEO IMPLEMENTATION (all complete as of May 2026)

### What was implemented
- Canonical tags on every page (EN and TH, correct URL per language)
- OG tags (type, title, description, image, url, site_name) on every page
- Twitter Card tags (card, title, description, image) on every page
- LocalBusiness JSON-LD schema in iflex-core.js (injected on every page)
- Article JSON-LD schema in generate_blog.py (on every blog post)
- Product JSON-LD schema in generate_products.py (on every product page)
- Google Analytics G-X4ZXYX21PF hardcoded in every page `<head>` (not via injector)
- robots.txt and _headers (Cloudflare security headers) in repo root
- Google Search Console verified and submitted

### Why GA is hardcoded, not injected
GA must fire even if the injector fails to load.
Measurement infrastructure belongs ON the page, not in decorative scripts.
Rule: anything that measures goes in `<head>` directly. Anything that decorates can be injected.

### OG Images (confirmed, never change without updating both)
- EN: `https://res.cloudinary.com/dfiomi0lb/image/upload/v1773341421/Eng_SEO_OG.png`
- TH: `https://res.cloudinary.com/dfiomi0lb/image/upload/v1773341421/Thai_SEO_OG.png`

### Scores achieved (May 2026, after performance chat)
| Page | Desktop | Mobile | Accessibility | SEO |
|---|---|---|---|---|
| Homepage EN | 77 | 71 | 98 | 100 |
| Homepage TH | — | 74 | 98 | 100 |
| Product listing | 97 | 56 | 98 | 100 |
| Blog listing | 91 | 71 | 98 | 100 |

**Why homepage is 77 not 90+:** Hero section uses CSS `background-image`.
Browser cannot `fetchpriority="high"` or preload a CSS background image.
Fix requires converting hero to `<img>` tag — design decision, flagged for future chat.

---

## PART 5 — PERFORMANCE PATTERNS

### Image rules (all applied)
- First visible image: `fetchpriority="high"` (no `loading="lazy"`)
- All other images: `loading="lazy"`
- All images: explicit `width` and `height` attributes (prevents layout shift)
- Format: Cloudinary serves optimized format automatically via URL

### Font loading
- Google Fonts: `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>`
- NOT loaded via JavaScript (was previously render-blocking via injector)
- Font Awesome: still loaded via injector (known render-blocking item — deferred to Chat 4)

### Marquee animation
- Uses `transform: translateX()` not `left` or `margin-left` (GPU-composited)
- `will-change: transform` on `.marquee-track`
- `transform: translate3d(0,0,0)` forces GPU layer
- Pauses on hover: `animation-play-state: paused`

### Accessibility (98 score)
- All interactive elements have `aria-label`
- Social icon links have descriptive `aria-label` (not just icon characters)
- Hamburger menu has `role="button"` + `aria-label`
- `<main>` landmark wraps all page content
- Semantic headings (h1 → h2 → h3 in correct order)

---

## PART 6 — AIRTABLE PATTERNS (never break these)

### Confirmed Base
- Base ID: `appMBjlfYyVd8I7ML`
- Base name: Janis Business db

### Critical field rules
```python
# Lookup fields return arrays — always unwrap
def safe_str(val):
    if not val: return ''
    if isinstance(val, list): return str(val[0]) if val else ''
    return str(val)

# Bus_id — always filter by this, never by linked Business ID field
filter = "AND({bus_id}='BUS01', {web_published}=1)"

# Checkbox fields — true/false in Python, not 1/0
filter = "AND({active}=TRUE(), {web_published}=TRUE())"
```

### AI text fields (read-only via API)
Fields typed as "AI text" in Airtable cannot be written via API.
Examples: Group_th, category_th, material_th.
These are computed by Airtable's own AI — use them as read-only outputs.

### Standard JSON pattern for all generate_*.py scripts
```python
import requests, json, os

BASE_ID = os.environ['AIRTABLE_BASE_ID']
TOKEN   = os.environ['AIRTABLE_TOKEN']
TABLE   = 'TableName'

url = f'https://api.airtable.com/v0/{BASE_ID}/{TABLE}'
headers = {'Authorization': f'Bearer {TOKEN}'}
params  = {
    'filterByFormula': "AND({active}=TRUE(),{bus_id}='BUS01')",
    'sort[0][field]': 'display_order',
    'sort[0][direction]': 'asc'
}

records = []
while True:
    r = requests.get(url, headers=headers, params=params).json()
    records.extend(r.get('records', []))
    offset = r.get('offset')
    if not offset: break
    params['offset'] = offset

data = [r['fields'] for r in records]
with open('output-data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
```

---

## PART 7 — DEPLOY PIPELINE

### How a content update flows from dashboard to live site

```
Owner clicks "Deploy" in dashboard
    ↓
Dashboard POSTs to Cloudflare Worker: { busId: 'BUS01' }
    ↓
Worker looks up REPO_MAP[busId] → finds repo + workflow
    ↓
Worker calls GitHub API: POST /dispatches (workflow_dispatch)
    ↓
GitHub Action triggers → Python script runs
    ↓
Script fetches Airtable → generates JSON or HTML files
    ↓
Script commits updated files to main branch
    ↓
Cloudflare Pages detects new commit → auto-redeploys (~60 seconds)
    ↓
Live site updated
```

### Worker REPO_MAP (current as of May 2026)
```javascript
const REPO_MAP = {
  BUS01:              { repo: 'i-flexthailand.com',  workflow: 'generate-products.yml' },
  BUS01_BLOG:         { repo: 'i-flexthailand.com',  workflow: 'generate-blog.yml' },
  BUS01_GALLERY:      { repo: 'i-flexthailand.com',  workflow: 'generate-gallery.yml' },
  BUS01_NEWS:         { repo: 'i-flexthailand.com',  workflow: 'generate-news.yml' },
  BUS01_TESTIMONIALS: { repo: 'i-flexthailand.com',  workflow: 'generate-testimonials.yml' },
  BUS02:              { repo: 'daje-queencatcher',   workflow: 'product_build.yml' },
  BUS03:              { repo: 'jade-coffee',         workflow: 'generate-products.yml' },
  BUS04:              { repo: 'janis-flow',          workflow: 'product_build.yml' },
};
```

### GitHub Secrets required (i-flexthailand.com repo)
- `AIRTABLE_TOKEN` — Airtable Personal Access Token
- `AIRTABLE_BASE_ID` — `appMBjlfYyVd8I7ML`

---

## PART 8 — NAMING CONVENTIONS

### File naming
- Static pages: `about-us.html`, `contact-us.html` (kebab-case)
- Thai mirrors: `th/about-us.html` (same name, `/th/` prefix)
- Scripts: `generate_blog.py`, `generate_products.py` (snake_case)
- Workflows: `generate-blog.yml`, `generate-products.yml` (kebab-case)
- Data output: `gallery-data.json`, `news-data.json` (kebab-case, `-data` suffix)
- CSS classes: kebab-case throughout (`.marquee-track`, `.news-item`)

### Airtable table naming
- Tables: PascalCase singular (`Gallery`, `News`, `Testimonials`, `Products`)
- Fields: snake_case (`image_url`, `display_order`, `bus_id`)
- Thai fields: suffix `_th` (`name_th`, `quote_th`, `body_th`)
- Control fields: `active` (checkbox), `web_published` (checkbox), `bus_id` (text)
- Sort field: `display_order` (integer, always present on ordered tables)

### IDs and slugs
- Product IDs: `IFP-012-Ref` (BUS_PREFIX + sequence + category code)
- Slugs: EN slug and TH slug stored separately (`slug`, `slug_th`)
- Bus prefix: BUS01=IFP, BUS02=DJ, BUS03=JDE, BUS04=OR

---

## PART 9 — REPLICATION GUIDE (how to build the next site in 6 hours)

### Hour 1 — Setup (30 min actual work)
1. Create GitHub repo under Csmittee account
2. Connect to Cloudflare Pages (auto-deploy on push)
3. Set custom domain in Cloudflare Pages → DNS auto-configured
4. Create Airtable tables: Products, Gallery, News, Testimonials (use prompts in Chat A/B/C seeds)
5. Add GitHub Secrets: AIRTABLE_TOKEN, AIRTABLE_BASE_ID

### Hour 2 — Core pages (Claude builds these)
Supply Claude with:
- Design reference (Webflow export CSS or screenshot)
- Brand colors, fonts, logo URLs
- iflex-config.js and iflex-core.js from i-flexthailand.com as templates
- Bilingual content for: hero, brand statement, compare table, FAQ, CTA

Claude delivers: index.html, th/index.html, about-us.html, th/about-us.html,
contact-us.html, th/contact-us.html with all OG/canonical/GA/schema correct.

### Hour 3 — Python scripts and workflows (Claude builds these)
Supply Claude with: generate_products.py from i-flexthailand.com as template
Claude delivers: generate_products.py, generate_blog.py, generate_gallery.py,
generate_news.py, generate_testimonials.py and all 5 matching .yml workflows.

### Hour 4 — Injector customization
Supply Claude with: iflex-config.js + iflex-core.js from i-flexthailand.com
Claude delivers: new brand versions of both files with updated colors, content, schema.

### Hour 5 — Worker update + dashboard wiring
Add new REPO_MAP entries to deploy-trigger worker.
Add deploy buttons to dashboard for new site's content types.
Test full pipeline: Airtable → Worker → GitHub Action → Cloudflare → live.

### Hour 6 — Validation and submission
Run all 4 validators (OG, Schema, Twitter Card, Lighthouse).
Submit to Google Search Console.
Verify bilingual redirect logic (Thai browser → /th/).
Site is live and production-ready.

---

## PART 10 — THE SKILL FILE CONCEPT

This document, the Chat seeds (A/B/C), and the PROJECT_MASTER.md together form
the "i-flex skill" — everything Claude needs to build a site like this from scratch.

**How to use for a new project:**
1. Paste PROJECT_MASTER.md into the new Claude project
2. Paste this document as the architecture reference
3. Paste the Chat A/B/C seeds for the dynamic content sections
4. Supply the new brand's colors, logo, and content
5. Claude has full context — no re-explanation needed

**What this replaces:**
- All the "how does the injector work" questions
- All the "what are the Airtable rules" questions
- All the "what files can I touch" questions
- All the bilingual system design decisions
- All the performance pattern decisions

The system is designed. It just needs to be stamped onto a new brand.

---

## PART 11 — KNOWN REMAINING ITEMS (as of May 2026)

| Item | Where | Priority |
|---|---|---|
| Hero LCP: CSS background → `<img>` tag | index.html + th/index.html | Medium (score 77→90+) |
| Font Awesome render-blocking | iflex-core.js | Low (Chat 4 scope) |
| Forced reflow from injector JS | iflex-core.js | Low (Chat 4 scope) |
| Injector merge/split decision | Chat 4 | Low (cleanup) |
| GA broken on central-injector sites (other brands) | janishammer-central | Low (not i-flex) |
| Customer self-submission testimonials | Future (when customer base grows) | Future |
| Dashboard: photo picker → Airtable URL → auto-deploy | Dashboard team | Future |


---

## PART 12 — GLASS DESIGN SYSTEM (locked May 13, 2026)

This section is the design contract for i-flexthailand.com.
No chat, no agent, no developer may change these rules without explicit owner decision.

### How the design works
- Body: fixed cat watermark background image tiling behind everything
- All content sections scroll as glass panels floating over the background
- The cat peeks out at the edges between sections — this is intentional design
- Bottom hero: full-width photo with transparent PNG layered over body background

### Section background rules

| Class | Background | Reason |
|---|---|---|
| .section-container | rgba(0,0,0,0.08) + blur(16px) | Dark glass panel |
| .brand-section | rgba(0,0,0,0.08) + blur(16px) | Dark glass panel |
| .cta-section | rgba(0,0,0,0.08) + blur(16px) | Dark glass panel |
| .proven-section | transparent | Inside glass container |
| .equipment-section | transparent | Inside glass container |
| .compare-table | transparent | Inside glass container |
| .faq-item | transparent | Inside glass container |
| .faq-question | transparent | Inside glass container |
| .faq-answer | transparent | Inside glass container |
| .news-item | transparent | Inside glass container |
| .hero-section | background-image (Nok studio photo) | Intentional photo |
| .bottom-hero | background-image (bottom hero PNG) | Intentional photo |
| .marquee-section | #fafafa | Photo strip needs contrast |
| .category-card | rgba(255,255,255,0.9) | Image cards need contrast |
| .navbar-fixed-wrapper | rgba(0,0,0,0.6) | Must be readable |
| .footer | rgba(0,0,0,0.85) | Must be readable |

### What future chats MUST NOT do
1. Add `background` to the FOUC style block in any HTML page
2. Add section CSS to `iflex-core.js` — config owns all section styles
3. Use `aspect-ratio` on `.bottom-hero` — use `min-height` instead
4. Set `bgColor: "white"` in iflex-config.js — must stay `"transparent"`
5. Add solid colour (`#fff`, `#f5f5f5`, `white`) to any section inside a container
6. Duplicate any class that already exists in iflex-config.js into iflex-core.js

### Testing rule
Always verify design in incognito window after any CSS change.
Browser cache will hide real state and cause false confidence.
