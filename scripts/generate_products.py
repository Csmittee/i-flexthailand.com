import csv
import json
import shutil
from pathlib import Path

# Configuration
CSV_PATH = Path('data/products.csv')
LISTING_FILE = Path('product-listing.html')
TH_LISTING_FILE = Path('th/product-listing.html')

# Template for product detail page
PRODUCT_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{name} | I-Flex Thailand</title>
    <meta name="description" content="{meta_description}">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧘</text></svg>">
    <style>
        body {{ background: white; }}
        .product-detail-page {{ max-width: 1280px; margin: 0 auto; padding: 4rem 2rem; }}
        .product-detail-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }}
        .product-gallery {{ position: relative; }}
        .main-image {{ width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: contain; background: #f5f5f5; border-radius: 12px; cursor: pointer; }}
        .thumbnail-grid {{ display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; }}
        .thumbnail {{ width: 80px; height: 80px; object-fit: contain; background: #f5f5f5; border-radius: 8px; cursor: pointer; opacity: 0.6; transition: opacity 0.3s; }}
        .thumbnail:hover, .thumbnail.active {{ opacity: 1; }}
        .product-info h1 {{ font-size: 2rem; margin-bottom: 1rem; }}
        .price {{ font-size: 1.5rem; font-weight: 700; color: #FFD700; margin-bottom: 1rem; }}
        .material, .category {{ margin-bottom: 0.5rem; color: #666; }}
        .description, .features {{ margin-top: 1.5rem; }}
        .features ul {{ list-style: none; padding: 0; }}
        .features li {{ padding: 0.5rem 0; padding-left: 1.5rem; position: relative; }}
        .features li::before {{ content: "✓"; color: #FFD700; position: absolute; left: 0; }}
        .btn {{ display: inline-block; background: #FFD700; color: #1a1a1a; padding: 0.75rem 2rem; border-radius: 40px; text-decoration: none; font-weight: 600; transition: all 0.3s; margin-top: 1rem; }}
        .btn:hover {{ transform: translateY(-2px); background: #ffed4a; }}
        .product-navigation {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
            gap: 1rem;
            flex-wrap: wrap;
        }}
       .btn-back, .btn-nav {{
            display: inline-block;
            background: #f0f0f0;
            color: #333;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
            min-width: 100px;
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
        .lightbox {{ display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 1000; justify-content: center; align-items: center; }}
        .lightbox.active {{ display: flex; }}
        .lightbox img {{ max-width: 90vw; max-height: 90vh; object-fit: contain; }}
        .lightbox-close {{ position: absolute; top: 20px; right: 40px; color: white; font-size: 40px; cursor: pointer; }}
        @media (max-width: 768px) {{
            .product-detail-grid {{ grid-template-columns: 1fr; gap: 2rem; }}
            .product-detail-page {{ padding: 2rem 1rem; }}
            .product-navigation {{
                flex-direction: column;
                align-items: stretch;
            }}
            .product-nav-buttons {{
                display: flex;
                gap: 1rem;
            }}
        }}
    </style>
</head>
<body>

<div class="product-detail-page">
    <div class="product-detail-grid">
        <div class="product-gallery">
            <img src="{main_image}" alt="{name}" class="main-image" id="mainImage">
            <div class="thumbnail-grid" id="thumbnailGrid">
                {thumbnails}
            </div>
        </div>
        <div class="product-info">
            <h1>{name}</h1>
            <div class="price">฿{price:,.0f}</div>
            <div class="material"><strong>Material:</strong> {material}</div>
            <div class="category"><strong>Category:</strong> {sub_category}</div>
            <div class="description">
                <h3>Description</h3>
                <p>{description}</p>
            </div>
            <div class="features">
                <h3>Features</h3>
                {features_html}
            </div>
            <a href="/{lang}/contact-us.html" class="btn">Request Quote</a>
            
            <div class="product-navigation">
                <a href="{back_link}product-listing.html" class="btn-back">← Back to Products</a>
                <div class="product-nav-buttons">
                    <a href="{prev_link}" class="btn-nav {prev_disabled}">← Prev</a>
                    <a href="{next_link}" class="btn-nav {next_disabled}">Next →</a>
                </div>
            </div>
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
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    thumbnails.forEach(thumb => {{
        thumb.addEventListener('click', () => {{
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        }});
    }});
    
    mainImage.addEventListener('click', () => {{
        lightboxImg.src = mainImage.src;
        lightbox.classList.add('active');
    }});
    
    lightboxClose.addEventListener('click', () => {{
        lightbox.classList.remove('active');
    }});
    
    lightbox.addEventListener('click', (e) => {{
        if (e.target === lightbox) lightbox.classList.remove('active');
    }});
</script>
</body>
</html>
'''

# Template for product listing page
LISTING_TEMPLATE = '''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products | I-Flex Pilates Equipment</title>
    <meta name="description" content="Explore I-Flex Pilates equipment: Reformers, Cadillacs, Wunda Chairs, and Ladder Barrels. Proven 5+ years in studios.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧘</text></svg>">
    <style>
        body {{ background: white; }}
        .products-page {{ max-width: 1280px; margin: 0 auto; padding: 2rem; }}
        .page-header {{ text-align: center; padding: 2rem 0; }}
        .page-header h1 {{ font-size: 2.5rem; margin-bottom: 1rem; color: #FFD700; }}
        .filter-buttons {{ display: flex; justify-content: center; gap: 1rem; margin: 2rem 0; flex-wrap: wrap; }}
        .filter-btn {{ background: #f0f0f0; border: none; padding: 0.75rem 1.5rem; border-radius: 40px; cursor: pointer; font-weight: 600; transition: all 0.3s; }}
        .filter-btn:hover, .filter-btn.active {{ background: #FFD700; color: #1a1a1a; }}
        .product-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }}
        .product-card {{ background: #f9f9f9; border-radius: 12px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; text-decoration: none; color: inherit; display: block; }}
        .product-card:hover {{ transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }}
        .product-card img {{ width: 100%; height: auto; aspect-ratio: 1 / 1; object-fit: contain; background: #f5f5f5; display: block; }}
        .product-card-info {{ padding: 1.5rem; }}
        .product-card-info h3 {{ font-size: 1.2rem; margin-bottom: 0.5rem; }}
        .product-card-price {{ font-size: 1.3rem; font-weight: 700; color: #FFD700; margin-bottom: 0.5rem; }}
        .product-card-material {{ color: #666; margin-bottom: 0.5rem; }}
        .product-card-desc {{ font-size: 0.9rem; color: #777; }}
        @media (max-width: 768px) {{
            .products-page {{ padding: 1rem; }}
            .filter-buttons {{ gap: 0.5rem; }}
            .filter-btn {{ padding: 0.5rem 1rem; font-size: 0.85rem; }}
        }}
    </style>
</head>
<body>

<div class="products-page">
    <div class="page-header">
        <h1>Our Pilates Equipment</h1>
        <p>Engineered for movement with world-class materials and quality</p>
    </div>
    
    <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="Reformers">Reformers</button>
        <button class="filter-btn" data-filter="Cadillac">Cadillac</button>
        <button class="filter-btn" data-filter="Wunda chair">Wunda Chairs</button>
        <button class="filter-btn" data-filter="Barrel ladder">Barrel Ladders</button>
    </div>
    
    <div class="product-grid" id="productGrid">
        {product_cards}
    </div>
</div>

<script src="/js/iflex-config.js"></script>
<script src="/js/iflex-core.js"></script>
<script>
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {{
        btn.addEventListener('click', () => {{
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            productCards.forEach(card => {{
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
</html>
'''

def parse_gallery(gallery_str):
    """Convert multi-line gallery URLs to HTML thumbnails"""
    if not gallery_str or gallery_str == 'nan':
        return ''
    urls = [line.strip() for line in str(gallery_str).split('\n') if line.strip() and line.strip() != 'nan']
    html = ''
    for i, url in enumerate(urls):
        active_class = 'active' if i == 0 else ''
        html += f'<img src="{url}" class="thumbnail {active_class}" data-index="{i}">\n'
    return html

def parse_features(features_str):
    """Convert multi-line features to HTML list"""
    if not features_str or features_str == 'nan':
        return '<ul><li>No features listed</li></ul>'
    lines = [line.strip() for line in str(features_str).split('\n') if line.strip() and line.strip() != 'nan']
    html = '<ul>\n'
    for line in lines:
        html += f'<li>{line}</li>\n'
    html += '</ul>\n'
    return html

def generate_product_card(product, lang, prefix):
    """Generate product card HTML for listing page"""
    name = product['name'] if lang == 'en' else product['name_th']
    slug = product['Slug']
    price = float(product['price'])
    material = product['material'] if lang == 'en' else product.get('material_th', product['material'])
    desc = product['full_description'] if lang == 'en' else product['full_description_th']
    sub_category = product['sub_category']
    main_image = product['main_image']
    
    return f'''
    <a href="{prefix}product/{slug}.html" class="product-card" data-category="{sub_category}">
        <img src="{main_image}" alt="{name}">
        <div class="product-card-info">
            <h3>{name}</h3>
            <div class="product-card-price">฿{price:,.0f}</div>
            <div class="product-card-material">{material}</div>
            <div class="product-card-desc">{desc[:100]}...</div>
        </div>
    </a>
    '''

def generate_product_page(product, all_products, lang, prefix, back_link):
    """Generate individual product detail page with navigation"""
    name = product['name'] if lang == 'en' else product['name_th']
    slug = product['Slug']
    price = float(product['price'])
    material = product['material'] if lang == 'en' else product.get('material_th', product['material'])
    sub_category = product['sub_category']
    description = product['full_description'] if lang == 'en' else product['full_description_th']
    features = product['feature_details'] if lang == 'en' else product.get('feature_details_th', product['feature_details'])
    main_image = product['main_image']
    gallery_images = product.get('gallery_images', '')
    
    # Find current index for prev/next navigation
    current_idx = next((i for i, p in enumerate(all_products) if p['Slug'] == slug), 0)
    prev_slug = all_products[current_idx - 1]['Slug'] if current_idx > 0 else None
    next_slug = all_products[current_idx + 1]['Slug'] if current_idx < len(all_products) - 1 else None
    
    prev_link = f'/{prefix}{prev_slug}.html' if prev_slug else '#'
    next_link = f'/{prefix}{next_slug}.html' if next_slug else '#'
    prev_disabled = 'disabled' if not prev_slug else ''
    next_disabled = 'disabled' if not next_slug else ''
    
    thumbnails = parse_gallery(gallery_images)
    features_html = parse_features(features)
    
    html = PRODUCT_TEMPLATE.format(
        lang=lang,
        name=name,
        meta_description=description[:160] if description else name,
        main_image=main_image,
        price=price,
        material=material,
        sub_category=sub_category,
        description=description,
        features_html=features_html,
        thumbnails=thumbnails,
        prev_link=prev_link,
        next_link=next_link,
        prev_disabled=prev_disabled,
        next_disabled=next_disabled,
        back_link=back_link
    )
    
    output_path = Path(prefix) / f'{slug}.html'
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Generated: {output_path}')

def generate_listing_page(products, lang, prefix, output_file):
    """Generate product listing page"""
    product_cards = ''
    for product in products:
        product_cards += generate_product_card(product, lang, prefix)
    
    html = LISTING_TEMPLATE.format(
        lang=lang,
        product_cards=product_cards
    )
    
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Generated: {output_file}')

def generate_products_json(products):
    """Generate products.json for main page dynamic loading"""
    json_data = []
    for p in products:
        json_data.append({
            'id': p.get('id', p['Slug']),
            'name': p['name'],
            'name_th': p.get('name_th', p['name']),
            'price': float(p['price']),
            'main_image': p['main_image'],
            'category': p['sub_category'],
            'material': p['material'],
            'material_th': p.get('material_th', p['material']),
            'slug': p['Slug'],
            'description': p['full_description'][:120] + '...' if len(p['full_description']) > 120 else p['full_description'],
            'description_th': p.get('full_description_th', p['full_description'])[:120] + '...' if len(p.get('full_description_th', p['full_description'])) > 120 else p.get('full_description_th', p['full_description'])
        })
    
    with open('products.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    print('✅ Generated products.json')

def main():
    print('📦 Reading products.csv...')
    
    # Check if CSV exists
    if not CSV_PATH.exists():
        print(f'❌ Error: {CSV_PATH} not found!')
        return
    
    # ===== CLEAN OLD FOLDERS =====
    product_dir = Path('product')
    th_product_dir = Path('th/product')
    
    if product_dir.exists():
        shutil.rmtree(product_dir)
        print('🗑️ Deleted old product folder')
    
    if th_product_dir.exists():
        shutil.rmtree(th_product_dir)
        print('🗑️ Deleted old Thai product folder')
    
    # Create fresh folders
    product_dir.mkdir(exist_ok=True)
    th_product_dir.mkdir(parents=True, exist_ok=True)
    print('📁 Created fresh product folders')
    # ===== END CLEAN =====
    
    # Read CSV
    products = []
    with open(CSV_PATH, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            products.append(row)
    
    print(f'✅ Found {len(products)} products')
    
    # Sort by display_order
    products.sort(key=lambda x: int(x.get('display_order', 999)))
    
    # ===== GENERATE products.json =====
    generate_products_json(products)
    # ===== END GENERATE =====
    
    # Generate English pages
    print('\n📄 Generating English product pages...')
    for product in products:
        generate_product_page(product, products, 'en', 'product/', '/')
    generate_listing_page(products, 'en', '/', LISTING_FILE)
    
    # Generate Thai pages
    print('\n📄 Generating Thai product pages...')
    for product in products:
        generate_product_page(product, products, 'th', 'th/product/', '/th/')
    generate_listing_page(products, 'th', '/th/', TH_LISTING_FILE)
    
    print('\n✅ Done!')

if __name__ == '__main__':
    main()
