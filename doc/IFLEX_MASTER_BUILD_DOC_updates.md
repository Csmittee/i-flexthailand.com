# IFLEX_MASTER_BUILD_DOC.md — UPDATES FROM MAY 15, 2026
# Apply these updates to the master document. Section numbers match the original.

---

## UPDATE TO PART 3 — FILE OWNERSHIP

### Script-owned (add these lines — were missing):
```
generate_products.py    ← owns product-listing.html, th/product-listing.html, product/*.html, th/product/*.html
generate_blog.py        ← owns blog-listing.html, th/blog-listing.html, blog/*.html, th/blog/*.html
generate_gallery.py     ← owns gallery-data.json
generate_news.py        ← owns news-data.json
generate_testimonials.py ← owns testimonials-data.json
```

**New rule added:** Before editing any HTML file, grep the filename in generate_*.py.
If it appears as an output path, edit the generator — never the HTML file directly.

---

## UPDATE TO PART 6 — AIRTABLE PATTERNS

### New: Confirmed Table IDs (extracted from Airtable URLs May 15, 2026)

Base ID: `appMBjlfYyVd8I7ML` (unchanged)

| Table | Table ID | View ID |
|---|---|---|
| Products | (use "Export for github I flex injection" view) | confirmed working |
| Gallery | tblkq2Mti4MWH10lg | viwKiLPLIxOl1z7sr |
| News | tblBr2TlklL9GyJ9p | viwln8wr8i5QeBJb4 |
| Testimonials | tbleDs1qBP9uLZpYx | viwfJFIgzmHdD87fI |

---

## UPDATE TO PART 7 — DEPLOY PIPELINE

### Worker REPO_MAP (confirmed complete as of May 15, 2026)
```javascript
const REPO_MAP = {
  BUS01:              { repo: 'i-flexthailand.com', workflow: 'generate-products.yml'    },
  BUS01_BLOG:         { repo: 'i-flexthailand.com', workflow: 'generate-blog.yml'        },
  BUS01_NEWS:         { repo: 'i-flexthailand.com', workflow: 'generate-news.yml'        },
  BUS01_GALLERY:      { repo: 'i-flexthailand.com', workflow: 'generate-gallery.yml'     },
  BUS01_TESTIMONIALS: { repo: 'i-flexthailand.com', workflow: 'generate-testimonials.yml'},
  BUS02:              { repo: 'daje-queencatcher',   workflow: 'product_build.yml'        },
  BUS03:              { repo: 'jade-coffee',         workflow: 'generate-products.yml'    },
  BUS04:              { repo: 'janis-flow',          workflow: 'product_build.yml'        },
};
```
Status: BUS01_BLOG, BUS01_NEWS, BUS01_GALLERY, BUS01_TESTIMONIALS — wired in worker,
dashboard buttons pending (dashboard team task, brief delivered May 15 2026).

---

## UPDATE TO PART 9 — REPLICATION GUIDE

### New section: Generator architecture decision (add after Hour 3)

**HTML generator vs JSON generator — the decision rule:**

| Use full HTML generator when... | Use JSON generator when... |
|---|---|
| Content needs its own URL | Content is a section inside an existing page |
| Each item needs unique SEO (title, description, schema) | Page structure never changes, only data changes |
| Example: blog posts, product pages | Example: testimonials, news feed, gallery marquee |

**5-generator architecture:** One generator handles both EN and TH in one script.
For a standard business site, 5 generators cover everything:
`generate_products.py`, `generate_blog.py`, `generate_gallery.py`,
`generate_news.py`, `generate_testimonials.py`
Each pairs with one `.yml` workflow. Total: 5 scripts + 5 workflows = full CMS pipeline.

**Multi-site scaling:** Each new site adds one `bus_id` to Airtable and one entry
to the worker `REPO_MAP`. Generator scripts are reused unchanged — only the `bus_id`
filter differs. This is the correct architecture for managing multiple sites from
one dashboard.

---

## UPDATE TO PART 11 — KNOWN REMAINING ITEMS

Replace the existing table with:

| Item | Where | Priority |
|---|---|---|
| Hero LCP: CSS background → `<img>` tag | index.html + th/index.html | Medium (score 77→90+) |
| Font Awesome render-blocking | iflex-core.js | Low (Chat 4 scope) |
| Forced reflow from injector JS | iflex-core.js | Low (Chat 4 scope) |
| Injector merge/split decision | Chat 4 | Low (cleanup) |
| Testimonial horizontal scroll affordance | index.html + th/index.html | Low (right-edge card should peek) |
| Dashboard: 4 new deploy buttons wired | Dashboard team | In progress (brief delivered) |
| Customer self-submission testimonials | Future | Future |
| Dashboard: photo picker → Airtable URL → auto-deploy | Dashboard team | Future |

---

## UPDATE TO PART 12 — GLASS DESIGN SYSTEM

### Update the section background rules table:

| Class | Background | Reason |
|---|---|---|
| .section-container | rgba(0,0,0,0.08) + blur(16px) | Dark glass panel |
| .brand-section | rgba(0,0,0,0.08) + blur(16px) | Dark glass panel |
| .cta-section | rgba(0,0,0,0.08) + blur(16px) | Dark glass panel |
| .proven-section | transparent | Inside glass container |
| .equipment-section | transparent | Inside glass container |
| .compare-table | transparent | Inside glass container |
| .faq-item | rgba(0,0,0,0.35) + backdrop-blur(8px) | ← UPDATED: dark glass on photo bg |
| .faq-question | transparent | Inside faq-item |
| .faq-answer | transparent | Inside faq-item |
| .news-item | transparent | Inside glass container |
| .hero-section | background-image (Nok studio photo) | Intentional photo |
| .bottom-hero | background-image (bottom hero PNG) | Intentional photo |
| .section-container#faq | background-image (AI reformer full) | ← NEW: FAQ has own photo bg |
| .marquee-section | #fafafa | Photo strip needs contrast |
| .category-card | background-image per card + dark overlay | ← UPDATED: full bleed image cards |
| .navbar-fixed-wrapper | rgba(0,0,0,0.6) | Must be readable |
| .footer | rgba(0,0,0,0.85) | Must be readable |

### New rules added to "What future chats MUST NOT do":
7. Put `.faq-question` in the scroll-reveal IntersectionObserver animation —
   it will stay invisible inside the z-index overlay wrapper (L111)
8. Convert a `<div>` card to `<a>` without adding `text-decoration:none; color:inherit; display:block` (L112)
9. Use `aspect-ratio` on background-image cards — use fixed `height` instead (L113)
