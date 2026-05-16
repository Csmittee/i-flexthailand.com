import csv
import shutil
import os
from pathlib import Path

SITE_URL = 'https://i-flexthailand.com'

# ── Airtable AI field unwrapper ────────────────────────────────────
def unwrap_ai(val):
    """Airtable AI fields return {'state':..,'value':..,'isStale':..} — extract value."""
    if isinstance(val, dict):
        return str(val.get('value', ''))
    if isinstance(val, list):
        first = val[0] if val else ''
        if isinstance(first, dict):
            return str(first.get('value', ''))
        return str(first)
    return str(val) if val else ''

# ── Airtable fetch (runs before main, overwrites CSV if token present) ─
def _fetch_airtable_to_csv():
    token   = os.environ.get('AIRTABLE_TOKEN', '')
    base_id = os.environ.get('AIRTABLE_BASE_ID', '')
    if not token or not base_id:
        return
    try:
        import urllib.request, urllib.parse, json as _json, csv as _csv

        FIELDS = [
            'title','title_th','slug','slug_th',
            'excerpt','excerpt_th','content','content_th',
            'category','category_th','featured_image','gallery_images',
            'author','date','read_time','display_order'
        ]

        # AI-generated fields that need unwrapping
        AI_FIELDS = {'title_th', 'excerpt_th', 'content_th', 'category_th'}

        formula = urllib.parse.quote("AND({web_published}=1)")
        base_url = (f'https://api.airtable.com/v0/{base_id}/Blogs'
                    f'?filterByFormula={formula}'
                    f'&sort%5B0%5D%5Bfield%5D=display_order'
                    f'&sort%5B0%5D%5Bdirection%5D=asc')

        all_records, offset = [], None
        while True:
            page_url = base_url + (f'&offset={urllib.parse.quote(str(offset))}' if offset else '')
            req = urllib.request.Request(page_url, headers={'Authorization': f'Bearer {token}'})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = _json.loads(r.read())
            all_records.extend(data.get('records', []))
            offset = data.get('offset')
            if not offset:
                break

        if not all_records:
            print('⚠️  Airtable returned 0 records — keeping existing CSV')
            return

        rows = []
        for rec in all_records:
            f = rec.get('fields', {})
            row = {}
            for col in FIELDS:
                val = f.get(col, '')
                if col in AI_FIELDS:
                    row[col] = unwrap_ai(val)
                elif isinstance(val, list):
                    row[col] = '\n'.join(str(v) for v in val)
                else:
                    row[col] = str(val) if val != '' else ''
            rows.append(row)

        Path('data').mkdir(exist_ok=True)
        with open('data/blog.csv', 'w', encoding='utf-8', newline='') as f:
            writer = _csv.DictWriter(f, fieldnames=FIELDS, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(rows)
        print(f'✅ Airtable → CSV: {len(rows)} blog posts written to data/blog.csv')

    except Exception as e:
        print(f'⚠️  Airtable fetch failed ({e}) — existing CSV will be used as fallback')

_fetch_airtable_to_csv()
# ── End Airtable fetch ─────────────────────────────────────────────────

# Configuration
CSV_PATH = Path('data/blog.csv')
ENGLISH_LISTING = Path('blog-listing.html')
THAI_LISTING = Path('th/blog-listing.html')
ENGLISH_POSTS_DIR = Path('blog')
THAI_POSTS_DIR = Path('th/blog')

# ===== POST TEMPLATE =====
# data-lang-en and data-lang-th on <html> tell the language switcher
# exactly where the counterpart page lives — no guessing from path strings
POST_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}" data-lang-en="{url_en}" data-lang-th="{url_th}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | I-Flex Pilates</title>
    <meta name="description" content="{excerpt}">

    <!-- Canonical -->
    <link rel="canonical" href="{canonical_url}">

    <!-- OG Tags -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="I-Flex Thailand">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{excerpt}">
    <meta property="og:image" content="{featured_image}">
    <meta property="og:url" content="{canonical_url}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{excerpt}">
    <meta name="twitter:image" content="{featured_image}">

    <!-- Article Schema -->
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "{title}",
        "description": "{excerpt}",
        "image": "{featured_image}",
        "datePublished": "{date}",
        "dateModified": "{date}",
        "url": "{canonical_url}",
        "author": {{
            "@type": "Person",
            "name": "{author}"
        }},
        "publisher": {{
            "@type": "Organization",
            "name": "I-Flex Thailand",
            "logo": {{
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773768378/I-Flex_main_no_bg.svg"
            }}
        }}
    }}
    </script>

    <!-- Google Fonts — preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-X4ZXYX21PF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-X4ZXYX21PF');
    </script>

    <!-- INJECTOR SCRIPTS -->
    <script src="/js/iflex-config.js"></script>
    <script src="/js/iflex-core.js"></script>
    
    <style>
        body {{ background: white; font-family: 'Montserrat', sans-serif; }}
        .blog-detail-page {{ max-width: 1280px; margin: 0 auto; padding: 4rem 2rem; }}
        .blog-header {{ text-align: center; margin-bottom: 3rem; }}
        .blog-header h1 {{ font-size: 2.5rem; margin-bottom: 1rem; color: #1A1A1A; }}
        .blog-meta {{
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }}
        .blog-category {{
            display: inline-block;
            background: #FFD700;
            color: #1a1a1a;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }}
        .blog-hero-image {{
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            border-radius: 16px;
            margin-bottom: 2rem;
        }}
        .blog-content {{
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.8;
            color: #444;
        }}
        .blog-content p {{ margin-bottom: 1.5rem; }}
        .blog-content img {{ max-width: 100%; height: auto; border-radius: 12px; margin: 1.5rem 0; }}
        .blog-gallery {{ margin: 2rem 0; }}
        .gallery-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }}
        .gallery-image {{
            width: 100%;
            aspect-ratio: 1 / 1;
            object-fit: cover;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.3s;
        }}
        .gallery-image:hover {{ transform: scale(1.02); }}
        .blog-navigation {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
            gap: 1rem;
            flex-wrap: wrap;
        }}
        .btn-back, .btn-nav {{
            display: inline-block;
            background: #f0f0f0;
            color: #333;
            padding: 0.5rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
            min-width: 110px;
            text-align: center;
        }}
        .btn-back:hover, .btn-nav:hover {{ background: #FFD700; color: #1a1a1a; }}
        .btn-nav.disabled {{ opacity: 0.5; pointer-events: none; background: #e0e0e0; }}
        .blog-nav-buttons {{ display: flex; gap: 1rem; flex: 1; justify-content: flex-end; }}
        .lightbox {{
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }}
        .lightbox.active {{ display: flex; }}
        .lightbox img {{ max-width: 90vw; max-height: 90vh; object-fit: contain; }}
        .lightbox-close {{
            position: absolute;
            top: 20px; right: 40px;
            color: white; font-size: 40px; cursor: pointer;
        }}
        @media (max-width: 768px) {{
            .blog-detail-page {{ padding: 2rem 1rem; }}
            .blog-header h1 {{ font-size: 1.8rem; }}
            .blog-navigation {{ flex-direction: column; align-items: stretch; }}
            .blog-nav-buttons {{ justify-content: center; }}
        }}
    </style>
</head>
<body>

<div class="blog-detail-page">
    <div class="blog-header">
        <span class="blog-category">{category}</span>
        <h1>{title}</h1>
        <div class="blog-meta">
            <span><i class="far fa-calendar-alt"></i> {date}</span>
            <span><i class="far fa-clock"></i> {read_time}</span>
            <span><i class="far fa-user"></i> {author}</span>
        </div>
    </div>
    
    <img src="{featured_image}" alt="{title}" class="blog-hero-image" width="1200" height="675" loading="lazy">
    
    <div class="blog-content">
        {content}
        {gallery_html}
    </div>
    
    <div class="blog-navigation">
        <a href="{back_link}" class="btn-back">← Back to Blog</a>
        <div class="blog-nav-buttons">
            <a href="{prev_link}" class="btn-nav {prev_disabled}">← Prev</a>
            <a href="{next_link}" class="btn-nav {next_disabled}">Next →</a>
        </div>
    </div>
</div>

<div class="lightbox" id="lightbox">
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Lightbox">
</div>

<script>
    function openLightbox(src) {{
        document.querySelector('#lightbox img').src = src;
        document.getElementById('lightbox').classList.add('active');
    }}
    document.querySelector('.lightbox-close').addEventListener('click', () => {{
        document.getElementById('lightbox').classList.remove('active');
    }});
    document.getElementById('lightbox').addEventListener('click', (e) => {{
        if (e.target === document.getElementById('lightbox'))
            document.getElementById('lightbox').classList.remove('active');
    }});
</script>
</body>
</html>'''

# ===== LISTING TEMPLATE =====
LISTING_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | I-Flex Pilates</title>
    <meta name="description" content="Pilates tips, equipment guides, and wellness insights from I-Flex Thailand.">

    <!-- Canonical -->
    <link rel="canonical" href="{canonical_url}">

    <!-- OG Tags -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="I-Flex Thailand">
    <meta property="og:title" content="Blog | I-Flex Pilates">
    <meta property="og:description" content="Pilates tips, equipment guides, and wellness insights from I-Flex Thailand.">
    <meta property="og:url" content="{canonical_url}">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-X4ZXYX21PF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-X4ZXYX21PF');
    </script>

    <!-- INJECTOR SCRIPTS -->
    <script src="/js/iflex-config.js"></script>
    <script src="/js/iflex-core.js"></script>

    <style>
        body {{ background: white; font-family: 'Montserrat', sans-serif; }}
        .blog-listing-page {{ max-width: 1280px; margin: 0 auto; padding: 2rem; }}
        .page-header {{ text-align: center; padding: 2rem 0; }}
        .page-header h1 {{ font-size: 2.5rem; margin-bottom: 1rem; color: #FFD700; }}
        .filter-buttons {{ display: flex; justify-content: center; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }}
        .filter-btn {{ background: #f0f0f0; border: none; padding: 0.75rem 1.5rem; border-radius: 40px; cursor: pointer; font-weight: 600; transition: all 0.3s; }}
        .filter-btn:hover, .filter-btn.active {{ background: #FFD700; color: #1a1a1a; }}
        .blog-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }}
        .blog-card {{ background: #f9f9f9; border-radius: 12px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; text-decoration: none; color: inherit; display: block; }}
        .blog-card:hover {{ transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }}
        .blog-card img {{ width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }}
        .blog-card-info {{ padding: 1.5rem; }}
        .blog-card-category {{ display: inline-block; background: #FFD700; color: #1a1a1a; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; }}
        .blog-card-info h3 {{ font-size: 1.1rem; margin-bottom: 0.5rem; }}
        .blog-card-meta {{ font-size: 0.8rem; color: #999; margin-bottom: 0.5rem; display: flex; gap: 1rem; }}
        .blog-card-excerpt {{ font-size: 0.85rem; color: #777; }}
        @media (max-width: 768px) {{
            .blog-listing-page {{ padding: 1rem; }}
            .filter-buttons {{ gap: 0.5rem; }}
            .filter-btn {{ padding: 0.5rem 1rem; font-size: 0.85rem; }}
        }}
    </style>
</head>
<body>

<div class="blog-listing-page">
    <div class="page-header">
        <h1>{page_title}</h1>
        <p>{page_subtitle}</p>
    </div>
    <div class="filter-buttons">
        {filter_buttons}
    </div>
    <div class="blog-grid" id="blogGrid">
        {blog_cards}
    </div>
</div>

<script>
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    filterBtns.forEach(btn => {{
        btn.addEventListener('click', () => {{
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            blogCards.forEach(card => {{
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {{
                    card.style.display = 'block';
                }} else {{
                    card.style.display = 'none';
                }}
            }});
        }});
    }});
</script>
</body>
</html>'''


def parse_gallery(gallery_str):
    if not gallery_str or gallery_str == 'nan':
        return ''
    urls = [u.strip() for u in str(gallery_str).split('\n') if u.strip() and u.strip() != 'nan']
    if not urls:
        return ''
    html = '<div class="blog-gallery"><h3>Gallery</h3><div class="gallery-grid">'
    for url in urls:
        html += f'<img src="{url}" class="gallery-image" loading="lazy" onclick="openLightbox(this.src)">'
    html += '</div></div>'
    return html

def get_field(post, lang, field_name, th_field_name):
    if lang == 'th':
        return post.get(th_field_name, post.get(field_name, ''))
    return post.get(field_name, '')

def generate_blog_card(post, lang):
    title    = get_field(post, lang, 'title', 'title_th')
    slug     = get_field(post, lang, 'slug', 'slug_th')
    excerpt  = get_field(post, lang, 'excerpt', 'excerpt_th')
    category = get_field(post, lang, 'category', 'category_th')
    featured_image = post.get('featured_image', '')
    date      = post.get('date', '')
    read_time = post.get('read_time', '')
    link = f'/th/blog/{slug}.html' if lang == 'th' else f'/blog/{slug}.html'
    return f'''
<a href="{link}" class="blog-card" data-category="{category}">
    <img src="{featured_image}" alt="{title}" loading="lazy">
    <div class="blog-card-info">
        <div class="blog-card-category">{category}</div>
        <h3>{title}</h3>
        <div class="blog-card-meta">
            <span>{date}</span>
            <span>{read_time}</span>
        </div>
        <div class="blog-card-excerpt">{excerpt[:120]}...</div>
    </div>
</a>'''

def generate_blog_page(post, all_posts, lang, posts_dir, back_link):
    title    = get_field(post, lang, 'title', 'title_th')
    slug     = get_field(post, lang, 'slug', 'slug_th')
    excerpt  = get_field(post, lang, 'excerpt', 'excerpt_th')
    content  = get_field(post, lang, 'content', 'content_th')
    category = get_field(post, lang, 'category', 'category_th')

    featured_image = post.get('featured_image', '')
    gallery_images = post.get('gallery_images', '')
    author    = post.get('author', 'I-Flex Team')
    date      = post.get('date', '')
    read_time = post.get('read_time', '')

    # Canonical for this page
    canonical_url = f'{SITE_URL}/th/blog/{slug}' if lang == 'th' else f'{SITE_URL}/blog/{slug}'

    # Both language URLs — baked into html tag so switcher uses them directly
    url_en = f'{SITE_URL}/blog/{post.get("slug", slug)}.html'
    url_th = f'{SITE_URL}/th/blog/{post.get("slug_th", slug)}.html'

    gallery_html = parse_gallery(gallery_images)

    # Prev/next navigation
    current_idx = next((i for i, p in enumerate(all_posts) if p.get('slug') == post.get('slug')), 0)
    prev_post = all_posts[current_idx - 1] if current_idx > 0 else None
    next_post = all_posts[current_idx + 1] if current_idx < len(all_posts) - 1 else None

    prev_slug     = get_field(prev_post, lang, 'slug', 'slug_th') if prev_post else None
    next_slug     = get_field(next_post, lang, 'slug', 'slug_th') if next_post else None
    prev_link     = f'{prev_slug}.html' if prev_slug else '#'
    next_link     = f'{next_slug}.html' if next_slug else '#'
    prev_disabled = '' if prev_slug else 'disabled'
    next_disabled = '' if next_slug else 'disabled'

    html = POST_TEMPLATE.format(
        lang='th' if lang == 'th' else 'en',
        url_en=url_en,
        url_th=url_th,
        title=title,
        excerpt=excerpt[:160],
        featured_image=featured_image,
        canonical_url=canonical_url,
        category=category,
        date=date,
        read_time=read_time,
        author=author,
        content=content,
        gallery_html=gallery_html,
        back_link=back_link,
        prev_link=prev_link,
        next_link=next_link,
        prev_disabled=prev_disabled,
        next_disabled=next_disabled
    )

    output_path = posts_dir / f'{slug}.html'
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Generated: {output_path}')

def generate_listing_page(posts, lang, output_file):
    blog_cards = ''
    for post in posts:
        blog_cards += generate_blog_card(post, lang)

    canonical_url = f'{SITE_URL}/th/blog-listing.html' if lang == 'th' else f'{SITE_URL}/blog-listing.html'

    if lang == 'th':
        filter_buttons = '''
        <button class="filter-btn active" data-filter="all">ทั้งหมด</button>
        <button class="filter-btn" data-filter="สุขภาพ">สุขภาพ</button>
        <button class="filter-btn" data-filter="อุปกรณ์">อุปกรณ์</button>
        <button class="filter-btn" data-filter="การออกกำลังกาย">การออกกำลังกาย</button>'''
        page_title    = "พิลาทิสเพื่อชีวิตจริง"
        page_subtitle = "แค่คนที่เคยเจ็บ เคยเจอพิลาทิส และอยากช่วยคุณเลือกอุปกรณ์และเคลื่อนไหวให้ดีขึ้น สำหรับผู้ใช้ที่บ้านและครูใหม่"
    else:
        filter_buttons = '''
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="Wellness">Wellness</button>
        <button class="filter-btn" data-filter="Equipments">Equipment</button>
        <button class="filter-btn" data-filter="Exercise">Exercise</button>'''
        page_title    = "Pilates for Real Life"
        page_subtitle = "Just someone who got hurt, found Pilates, and wants to help you choose equipment and move better. For home users and new teachers, figuring it out together."

    html = LISTING_TEMPLATE.format(
        lang='th' if lang == 'th' else 'en',
        canonical_url=canonical_url,
        page_title=page_title,
        page_subtitle=page_subtitle,
        filter_buttons=filter_buttons,
        blog_cards=blog_cards
    )
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'✅ Generated: {output_file}')

def main():
    print('📖 Reading blog.csv...')
    if not CSV_PATH.exists():
        print(f'❌ Error: {CSV_PATH} not found!')
        return

    for d in [ENGLISH_POSTS_DIR, THAI_POSTS_DIR]:
        if d.exists():
            shutil.rmtree(d)
            print(f'🗑️ Deleted old {d}')

    ENGLISH_POSTS_DIR.mkdir(exist_ok=True)
    THAI_POSTS_DIR.mkdir(parents=True, exist_ok=True)
    print('📁 Created fresh blog folders')

    posts = []
    with open(CSV_PATH, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            posts.append(row)

    print(f'✅ Found {len(posts)} blog posts')
    posts.sort(key=lambda x: int(x.get('display_order', 999)))

    print('\n📄 Generating English blog pages...')
    for post in posts:
        generate_blog_page(post, posts, 'en', ENGLISH_POSTS_DIR, '/blog-listing.html')
    generate_listing_page(posts, 'en', ENGLISH_LISTING)

    print('\n📄 Generating Thai blog pages...')
    for post in posts:
        generate_blog_page(post, posts, 'th', THAI_POSTS_DIR, '/th/blog-listing.html')
    generate_listing_page(posts, 'th', THAI_LISTING)

    print('\n✅ Blog generation complete!')

if __name__ == '__main__':
    main()
