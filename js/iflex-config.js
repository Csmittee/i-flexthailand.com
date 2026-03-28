// ============================================
// I-FLEX STANDALONE CONFIG v2.0
// - All page styles + brand data
// - No universal reset
// - Mobile optimized
// ============================================

const IFLEX_CONFIG = {
    // Brand Identity
    name: "I-Flex Thailand",
    tagline: "A healthy lifestyle product and services",
    domain: "i-flexthailand.com",
    contactEmail: "info@i-flexthailand.com",
    
    // Colors
    primary: "#1A1A1A",
    secondary: "#FFD700",
    accent: "#FFFFFF",
    bgColor: "white",
    
    // Typography
    font: "'Montserrat', sans-serif",
    
    // Images
    bgImage: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773775103/I_flex_only.png",
    logo: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1774458871/Full_edge.png",
    favicon: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773768489/Original.png",
    
    // Social Links
    social: {
        facebook: "https://www.facebook.com/profile.php?id=61586061685340",
        instagram: "#",
        line: "#"
    },
    
    // Contact Info
    contact: {
        name: "Chairit Smittee",
        phone: "089 5412121",
        email: "info@i-flexthailand.com"
    }
};

// ===== INJECT ALL PAGE STYLES =====
(function injectPageStyles() {
    // Prevent duplicate injection
    if (document.getElementById('iflex-page-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'iflex-page-styles';
    style.textContent = `
        /* ===== BASE ===== */
        body {
            background: white;
        }
        
        /* ===== HEADER CLASSES ===== */
        .h1-large {
            font-size: 3rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .h2-large {
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1rem;
            color: #FFD700;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            text-align: center;
        }
        
        .h2-medium {
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 1rem;
            color: #FFD700;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            text-align: center;
        }
        
        .h3-medium {
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1.4;
            margin-bottom: 0.75rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            text-align: center;
        }
        
        /* ===== SECTION CONTAINER ===== */
        .section-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        /* ===== HERO SECTION ===== */
        .hero-section {
            background-image: url('https://res.cloudinary.com/dfiomi0lb/image/upload/v1774380814/Nok_studio.png');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-color: white;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 6rem 2rem;
            aspect-ratio: 1920 / 800;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 70%, transparent 100%);
            pointer-events: none;
            z-index: 1;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            color: white;
            max-width: 800px;
            padding: 2rem;
        }
        
        /* Hero text animation */
        .hero-content h1,
        .hero-content .btn {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .hero-content h1.revealed,
        .hero-content .btn.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content .btn.revealed {
            transition-delay: 0.3s;
        }
        
        /* ===== BRAND SECTION ===== */
        .brand-section {
            text-align: center;
            padding: 3rem 2rem;
            background: linear-gradient(135deg, #f8f8f8 0%, #fff 100%);
            border-bottom: 1px solid #eee;
        }
        
        .brand-section .h2-medium {
            color: #FFD700;
            text-shadow: none;
            margin-bottom: 0.5rem;
        }
        
        .brand-section p {
            color: #666;
            font-size: 1rem;
            margin-top: 0.5rem;
        }
        
        /* ===== MARQUEE ===== */
        .marquee-section {
            max-width: 1280px;
            margin: 2rem auto;
            overflow: hidden;
            position: relative;
            background: #fafafa;
            padding: 2rem 0;
            border-radius: 16px;
        }
        
        .marquee-container {
            overflow: hidden;
            width: 100%;
            will-change: transform;
        }
        
        .marquee-track {
            display: flex;
            width: fit-content;
            animation: marquee 20s linear infinite;
            will-change: transform;
            transform: translate3d(0, 0, 0);
        }
        
        .marquee-track img {
            height: 120px;
            width: auto;
            margin: 0 12px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
            flex-shrink: 0;
            object-fit: cover;
        }
        
        .marquee-track img:hover {
            transform: scale(1.05);
        }
        
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        .marquee-container:hover .marquee-track {
            animation-play-state: paused;
        }
        
        /* ===== PROVEN SECTION ===== */
        .proven-section {
            text-align: center;
            padding: 4rem 0;
        }
        
        /* ===== COMPARE TABLE ===== */
        .compare-table {
            background: #f5f5f5;
            border-radius: 12px;
            overflow-x: auto;
            margin: 2rem auto;
            max-width: 960px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .compare-row {
            display: grid;
            grid-template-columns: 1fr 2fr 0.8fr 0.8fr;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .compare-header {
            background: #2c2c2c;
            font-weight: 700;
            color: #FFD700;
        }
        
        .compare-cell {
            padding: 1rem;
            color: #333;
        }
        
        .compare-cell:first-child {
            text-align: left;
            font-weight: 600;
        }
        
        .compare-cell:nth-child(2) {
            text-align: left;
        }
        
        .compare-cell:nth-child(3),
        .compare-cell:nth-child(4) {
            text-align: center;
        }
        
        .check-yes::before { content: "✓"; color: #10b981; font-size: 1.2rem; font-weight: bold; }
        .check-no::before { content: "✗"; color: #ef4444; font-size: 1.2rem; font-weight: bold; }
        .check-maybe::before { content: "?"; color: #f59e0b; font-size: 1.2rem; font-weight: bold; }
        
        /* ===== EQUIPMENT SECTION ===== */
        .equipment-section {
            text-align: center;
            padding: 2rem 0;
        }
        
        .banner-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .banner-card {
            flex: 1;
            min-width: 250px;
            text-align: center;
        }
        
        .banner-card img {
            width: 100%;
            max-width: 300px;
            border-radius: 12px;
        }
        
        .banner-text {
            margin-top: 1rem;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        /* ===== PRODUCT CARDS ===== */
        .category-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .category-card {
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-align: center;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        
        .category-card img {
            width: 100%;
            max-height: 200px;
            object-fit: contain;
            margin-bottom: 1rem;
        }
        
        .category-card h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: #FFD700;
            text-shadow: none;
        }
        
        /* ===== CTA SECTION ===== */
        .cta-section {
            text-align: center;
            padding: 3rem 2rem;
            background: #f9f9f9;
            border-radius: 16px;
            margin: 2rem 0;
        }
        
        /* ===== BOTTOM HERO ===== */
        .bottom-hero {
            background-image: url('https://res.cloudinary.com/dfiomi0lb/image/upload/v1774470225/Bottom-hero-p-1600.png');
            background-size: cover;
            background-position: right center;
            background-repeat: no-repeat;
            width: 100%;
            aspect-ratio: 1600 / 667;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 0;
            border-radius: 0;
            color: white;
        }
        
        .bottom-hero .h2-large {
            color: #FFD700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .bottom-hero p {
            color: #333;
            text-shadow: none;
        }
        
        /* ===== FAQ ===== */
        .faq-item {
            background: #f5f5f5;
            margin-bottom: 1rem;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .faq-question {
            width: 100%;
            text-align: left;
            padding: 1rem;
            background: #fff;
            border: 1px solid #e0e0e0;
            color: #333;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .faq-question::after {
            content: "+";
            font-size: 1.2rem;
            color: #FFD700;
        }
        
        .faq-question.active::after {
            content: "-";
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            padding: 0 1rem;
            background: #fff;
        }
        
        .faq-answer.active {
            max-height: 300px;
            padding: 1rem;
        }
        
        /* ===== SECTION HEADINGS ANIMATION ===== */
        .brand-section h2,
        .proven-section h2,
        .equipment-section h2,
        .cta-section h2,
        .category-card h3,
        .faq-question {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .brand-section h2.revealed,
        .proven-section h2.revealed,
        .equipment-section h2.revealed,
        .cta-section h2.revealed,
        .category-card h3.revealed,
        .faq-question.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* ===== BUTTONS (fallback) ===== */
        .btn {
            display: inline-block;
            background: #FFD700;
            color: #1a1a1a;
            padding: 0.75rem 2rem;
            border-radius: 40px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-top: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            background: #ffed4a;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        /* ===== MOBILE RESPONSIVE ===== */
        @media (max-width: 768px) {
            body {
                background-image: url('${IFLEX_CONFIG.bgImage}') !important;
                background-size: cover !important;
                background-position: center !important;
                background-attachment: scroll !important;
            }
            
            .h1-large { font-size: 2rem; }
            .h2-large { font-size: 1.8rem; }
            .h2-medium { font-size: 1.5rem; }
            .h3-medium { font-size: 1.2rem; }
            
            .compare-row {
                grid-template-columns: 1fr 1.5fr 0.8fr 0.8fr;
                font-size: 0.85rem;
            }
            .compare-cell { padding: 0.75rem 0.5rem; }
            .banner-grid { flex-direction: column; align-items: center; }
            .section-container { padding: 0 1rem; }
            .marquee-track img { height: 80px; }
            
            .hero-section {
                aspect-ratio: auto;
                padding: 1rem 1rem;
                background-size: cover;
                background-position: center;
            }
            
            .hero-content {
                margin-top: 20%;
                padding: 1rem;
            }
            
            .hero-content .btn {
                margin-top: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('🎨 Page styles injected');
})();
