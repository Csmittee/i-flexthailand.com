import csv
import shutil
from pathlib import Path

# Configuration
CSV_PATH = Path('data/blog.csv')
LISTING_FILE = Path('blog-listing.html')
TH_LISTING_FILE = Path('th/blog-listing.html')

BLOG_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | I-Flex Thailand</title>
    <meta name="description" content="{excerpt}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{excerpt}">
    <meta property="og:image" content="{featured_image}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧘</text></svg>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {{ background: white; }}
        .blog-detail-page {{ max-width: 1280px; margin: 0 auto; padding: 4rem 2rem; }}
        .blog-header {{
            text-align: center;
            margin-bottom: 3rem;
        }}
        .blog-header h1 {{
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #333;
        }}
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
        .blog-content h1, .blog-content h2, .blog-content h3 {{
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #333;
        }}
        .blog-content p {{
            margin-bottom: 1.5rem;
        }}
        .blog-content ul, .blog-content ol {{
            margin-bottom: 1.5rem;
            padding-left: 2rem;
        }}
        .blog-content img {{
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 1.5rem 0;
        }}
        .blog-gallery {{
            margin: 2rem 0;
        }}
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
        .gallery-image:hover {{
            transform: scale(1.02);
        }}
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
        .btn-back:hover, .btn-nav:hover {{
            background: #FFD700;
            color: #1a1a1a;
        }}
        .btn-nav.disabled {{
            opacity: 0.5;
            pointer-events: none;
            background: #e0e0e0;
        }}
        .blog-nav-buttons {{
            display: flex;
            gap: 1rem;
            flex: 1;
            justify-content: flex-end;
        }}
        .lightbox {{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }}
        .lightbox.active {{
            display: flex;
        }}
        .lightbox img {{
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
        }}
        .lightbox-close {{
            position: absolute;
            top: 20px;
            right: 40px;
            color: white;
            font-size: 40px;
            cursor: pointer;
        }}
        @media (max-width: 768px) {{
            .blog-detail-page {{ padding: 2rem 1rem; }}
            .blog-header h1 {{ font-size: 1.8rem; }}
            .blog-navigation {{
                flex-direction: column;
                align-items: stretch;
            }}
            .blog-nav-buttons {{
                justify-content: center;
            }}
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
            <span><i class="far fa-clock"></i> {read_time} min read</span>
            <span><i class="far fa-user"></i> {author}</span>
        </div>
    </div>
    
    <img src="{featured_image}" alt="{title}" class="blog-hero-image">
    
    <div class="blog-content">
        {content}
        {gallery_html}
    </div>
    
    <div class="blog-navigation">
        <a href="{back_link}blog-listing.html" class="btn-back">← Back to Blog</a>
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

<script src="/js/iflex-config.js"></script>
<script src="/js/iflex-core.js"></script>
<script>
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    
    function openLightbox(src) {
        if (lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
        }
    }
    
    lightboxClose?.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
</script>
</body>
</html>
'''

def generate_blog_page(post, all_posts, lang, prefix, back_link):
    """Generate individual blog post page with navigation and gallery"""
    title = post['title'] if lang == 'en' else post['title_th']
    slug = post['slug'] if lang == 'en' else post['slug_th']
    excerpt = post['excerpt'] if lang == 'en' else post['excerpt_th']
    content = post['content'] if lang == 'en' else post['content_th']
    category = post['category'] if lang == 'en' else post['category_th']
    featured_image = post['featured_image']
    gallery_images = post.get('gallery_images', '')
    author = post.get('author', 'I-Flex Team')
    date = post.get('date', '')
    read_time = post.get('read_time', '')
    
    # Parse gallery images
    gallery_html = parse_gallery(gallery_images)
    
    # Find current index for prev/next navigation
    current_idx = next((i for i, p in enumerate(all_posts) if (p['slug'] if lang == 'en' else p['slug_th']) == slug), 0)
    prev_post = all_posts[current_idx - 1] if current_idx > 0 else None
    next_post = all_posts[current_idx + 1] if current_idx < len(all_posts) - 1 else None
    
    prev_slug = prev_post['slug'] if lang == 'en' and prev_post else (prev_post['slug_th'] if prev_post else None)
    next_slug = next_post['slug'] if lang == 'en' and next_post else (next_post['slug_th'] if next_post else None)
    
    prev_link = f'/{prefix}{prev_slug}.html' if prev_slug else '#'
    next_link = f'/{prefix}{next_slug}.html' if next_slug else '#'
    prev_disabled = 'disabled' if not prev_slug else ''
    next_disabled = 'disabled' if not next_slug else ''
    
    html = BLOG_TEMPLATE.format(
        lang=lang,
        title=title,
        excerpt=excerpt[:160],
        featured_image=featured_image,
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
    
    output_path = Path(prefix) / f'{slug}.html'
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Generated: {output_path}')

def generate_listing_page(posts, lang, prefix, output_file):
    """Generate blog listing page with language-specific filters"""
    blog_cards = ''
    for post in posts:
        blog_cards += generate_blog_card(post, lang, prefix)
    
    # Filter buttons based on language
    if lang == 'th':
        filter_buttons = '''
        <button class="filter-btn active" data-filter="all">ทั้งหมด</button>
        <button class="filter-btn" data-filter="สุขภาพ">สุขภาพ</button>
        <button class="filter-btn" data-filter="อุปกรณ์">อุปกรณ์</button>
        <button class="filter-btn" data-filter="การออกกำลังกาย">การออกกำลังกาย</button>
        '''
    else:
        filter_buttons = '''
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="Wellness">Wellness</button>
        <button class="filter-btn" data-filter="Equipments">Equipment</button>
        <button class="filter-btn" data-filter="Excercise">Exercise</button>
        '''
    
    html = LISTING_TEMPLATE.format(
        lang=lang,
        filter_buttons=filter_buttons,
        blog_cards=blog_cards
    )
    
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Generated: {output_file}')

def main():
    print('📖 Reading blog.csv...')
    
    # Check if CSV exists
    if not CSV_PATH.exists():
        print(f'❌ Error: {CSV_PATH} not found!')
        return
    
    # Clean old folders
    blog_dir = Path('blog')
    th_blog_dir = Path('th/blog')
    
    if blog_dir.exists():
        shutil.rmtree(blog_dir)
        print('🗑️ Deleted old blog folder')
    
    if th_blog_dir.exists():
        shutil.rmtree(th_blog_dir)
        print('🗑️ Deleted old Thai blog folder')
    
    # Create fresh folders
    blog_dir.mkdir(exist_ok=True)
    th_blog_dir.mkdir(parents=True, exist_ok=True)
    print('📁 Created fresh blog folders')
    
    # Read CSV
    posts = []
    with open(CSV_PATH, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            posts.append(row)
    
    print(f'✅ Found {len(posts)} blog posts')
    
    # Sort by display_order
    posts.sort(key=lambda x: int(x.get('display_order', 999)))
    
    # Generate English pages
    print('\n📄 Generating English blog pages...')
    for post in posts:
        generate_blog_page(post, posts, 'en', 'blog/', '/')
    generate_listing_page(posts, 'en', '/', LISTING_FILE)
    
    # Generate Thai pages
    print('\n📄 Generating Thai blog pages...')
    for post in posts:
        generate_blog_page(post, posts, 'th', 'th/blog/', '/th/')
    generate_listing_page(posts, 'th', '/th/', TH_LISTING_FILE)
    
    print('\n✅ Done!')

if __name__ == '__main__':
    main()
