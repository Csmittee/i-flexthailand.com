import csv
import os
import shutil
from pathlib import Path

# Configuration
CSV_PATH = Path('blog.csv')
LISTING_FILE = Path('blog-listing.html')
TH_LISTING_FILE = Path('th/blog-listing.html')

# Template for blog detail page
BLOG_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | I-Flex Pilates</title>
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
            <span><i class="far fa-clock"></i> {read_time}</span>
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

# Template for blog listing page
LISTING_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | I-Flex Pilates</title>
    <meta name="description" content="Practical advice for opening and growing your Pilates studio in Thailand. Equipment guides, space planning, and insider tips from experienced owners.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧘</text></svg>">
    <style>
        body {{ background: white; }}
        .blog-page {{ max-width: 1280px; margin: 0 auto; padding: 2rem; }}
        .page-header {{ text-align: center; padding: 2rem 0; }}
        .page-header h1 {{ font-size: 2.5rem; margin-bottom: 1rem; color: #FFD700; }}
        .filter-buttons {{ display: flex; justify-content: center; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }}
        .filter-btn {{ background: #f0f0f0; border: none; padding: 0.75rem 1.5rem; border-radius: 40px; cursor: pointer; font-weight: 600; transition: all 0.3s; }}
        .filter-btn:hover, .filter-btn.active {{ background: #FFD700; color: #1a1a1a; }}
        .blog-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem; }}
        .blog-card {{ background: #f9f9f9; border-radius: 16px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; text-decoration: none; color: inherit; display: block; }}
        .blog-card:hover {{ transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }}
        .blog-card img {{ width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }}
        .blog-card-info {{ padding: 1.5rem; }}
        .blog-card-info h3 {{ font-size: 1.2rem; margin-bottom: 0.5rem; }}
        .blog-card-meta {{ font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; display: flex; gap: 1rem; }}
        .blog-card-excerpt {{ font-size: 0.9rem; color: #666; line-height: 1.5; }}
        .blog-card-category {{
            display: inline-block;
            background: #FFD700;
            color: #1a1a1a;
            padding: 0.2rem 0.6rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }}
        @media (max-width: 768px) {{
            .blog-page {{ padding: 1rem; }}
            .blog-grid {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>

<div class="blog-page">
    <div class="page-header">
        <h1>Pilates for Real Life</h1>
        <p>Just someone who got hurt, found Pilates, and wants to help you choose equipment and move better. For home users and new teachers, figuring it out together.</p>
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
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            blogCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
</script>
</body>
</html>
'''

def parse_gallery(gallery_str):
    """Convert multi-line gallery URLs to HTML gallery grid"""
    if not gallery_str or gallery_str == 'nan':
        return ''
    urls = [line.strip() for line in str(gallery_str).split('\n') if line.strip() and line.strip() != 'nan']
    if not urls:
        return ''
    
    html = '<div class="blog-gallery"><h3>Gallery</h3><div class="gallery-grid">'
    for url in urls:
        html += f'<img src="{url}" class="gallery-image" onclick="openLightbox(this.src)">'
    html += '</div></div>'
    return html

def generate_blog_card(post, lang, prefix):
    """Generate blog card HTML for listing page"""
    if lang == 'en':
        title = post.get('title', '')
        slug = post.get('slug', '')
        excerpt = post.get('excerpt', '')
        category = post.get('category', '')
        date = post.get('date', '')
        read_time = post.get('read_time', '')
    else:
        title = post.get('title_th', post.get('title', ''))
        slug = post.get('slug_th', post.get('slug', ''))
        excerpt = post.get('excerpt_th', post.get('excerpt', ''))
        category = post.get('category_th', post.get('category', ''))
        date = post.get('date', '')
        read_time = post.get('read_time', '')
    
    featured_image = post.get('featured_image', '')
    
    return f'''
    <a href="{prefix}blog/{slug}.html" class="blog-card" data-category="{category}">
        <img src="{featured_image}" alt="{title}">
        <div class="blog-card-info">
            <div class="blog-card-category">{category}</div>
            <h3>{title}</h3>
            <div class="blog-card-meta">
                <span>{date}</span>
                <span>{read_time}</span>
            </div>
            <div class="blog-card-excerpt">{excerpt[:120]}...</div>
        </div>
    </a>
    '''

def generate_blog_page(post, all_posts, lang, prefix, back_link):
    """Generate individual blog post page with navigation and gallery"""
    if lang == 'en':
        title = post.get('title', '')
        slug = post.get('slug', '')
        excerpt = post.get('excerpt', '')
        content = post.get('content', '')
        category = post.get('category', '')
        date = post.get('date', '')
        read_time = post.get('read_time', '')
        author = post.get('author', 'I-Flex Team')
    else:
        title = post.get('title_th', post.get('title', ''))
        slug = post.get('slug_th', post.get('slug', ''))
        excerpt = post.get('excerpt_th', post.get('excerpt', ''))
        content = post.get('content_th', post.get('content', ''))
        category = post.get('category_th', post.get('category', ''))
        date = post.get('date', '')
        read_time = post.get('read_time', '')
        author = post.get('author', 'I-Flex Team')
    
    featured_image = post.get('featured_image', '')
    gallery_images = post.get('gallery_images', '')
    
    # Parse gallery images
    gallery_html = parse_gallery(gallery_images)
    
    # Find current index for prev/next navigation
    current_idx = next((i for i, p in enumerate(all_posts) if (p.get('slug') if lang == 'en' else p.get('slug_th')) == slug), 0)
    prev_post = all_posts[current_idx - 1] if current_idx > 0 else None
    next_post = all_posts[current_idx + 1] if current_idx < len(all_posts) - 1 else None
    
    if prev_post:
        prev_slug = prev_post.get('slug') if lang == 'en' else prev_post.get('slug_th')
        prev_link = f'/{prefix}{prev_slug}.html' if prev_slug else '#'
        prev_disabled = ''
    else:
        prev_link = '#'
        prev_disabled = 'disabled'
    
    if next_post:
        next_slug = next_post.get('slug') if lang == 'en' else next_post.get('slug_th')
        next_link = f'/{prefix}{next_slug}.html' if next_slug else '#'
        next_disabled = ''
    else:
        next_link = '#'
        next_disabled = 'disabled'
    
    html = BLOG_TEMPLATE.format(
        lang='th' if lang == 'th' else 'en',
        title=title,
        excerpt=excerpt[:160] if excerpt else '',
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
        <button class="filter-btn" data-filter="Exercise">Exercise</button>
        '''
    
    html = LISTING_TEMPLATE.format(
        lang='th' if lang == 'th' else 'en',
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
