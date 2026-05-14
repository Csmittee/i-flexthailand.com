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
    bgColor: "transparent",
    
    // Typography
    font: "'Montserrat', sans-serif",
    
    // Images
    bgImage: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773775103/I_flex_only.png",
    logo: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1774458871/Full_edge.png",
    favicon: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773768489/Original.png",
    
    // Social Links
    social: {
        facebook: "https://www.facebook.com/iflexthailand",
        instagram: "https://www.instagram.com/i_flexthai/",
        line: "https://line.me/R/ti/p/@iflexthailand"
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
            margin: 1.5rem auto;
            padding: 3rem 2rem;
            background: rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        }
        
        /* ===== HERO SECTION ===== */
        .hero-section {
            background-image: url('https://res.cloudinary.com/dfiomi0lb/image/upload/v1774380814/Nok_studio.png');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-color: transparent;
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
            background: rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
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
              /* ===== TESTIMONIALS ===== */
        .testimonials-section { padding: 4rem 2rem; overflow: hidden; }
        
        .testimonials-track {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 1rem;
          scrollbar-width: none;
        }
        .testimonials-track::-webkit-scrollbar { display: none; }
        
        .testimonial-card {
          position: relative;
          display: flex;
          flex-direction: row;
          min-width: 420px;
          max-width: 480px;
          min-height: 220px;
          flex-shrink: 0;
          scroll-snap-align: start;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: rgba(10,10,20,0.45);
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 36px rgba(0,0,0,0.28);
        }
        
        /* Photo — left half, fades right */
        .testimonial-photo-wrap {
          position: relative;
          width: 55%;
          flex-shrink: 0;
          overflow: hidden;
        }
        .testimonial-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .testimonial-photo-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 30%, rgba(10,10,20,0.45) 100%);
        }
        
        /* No-photo fallback — gold left accent bar */
        .testimonial-photo-placeholder {
          width: 6px;
          background: #FFD700;
          flex-shrink: 0;
        }
        
        /* Text side */
        .testimonial-content {
          flex: 1;
          padding: 1.5rem 1.5rem 1.5rem 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .testimonial-content::before {
          content: '"';
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          font-size: 3.5rem;
          color: #FFD700;
          opacity: 0.25;
          font-family: Georgia, serif;
          line-height: 1;
        }
        
        .testimonial-name {
          font-weight: 700;
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 0.15rem;
        }
        .testimonial-title-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
          font-style: italic;
          margin-bottom: 0.5rem;
        }
        .testimonial-stars {
          color: #FFD700;
          font-size: 0.85rem;
          letter-spacing: 2px;
          margin-bottom: 0.6rem;
          display: block;
        }
        .testimonial-quote {
          color: rgba(255,255,255,0.88);
          font-size: 0.85rem;
          line-height: 1.7;
          font-style: italic;
          margin-top: 0;
        }
        
        @media (max-width: 768px) {
          .testimonial-card {
            min-width: 92vw;
            flex-direction: column;
            min-height: unset;
          }
          .testimonial-photo-wrap {
            width: 100%;
            height: 220px;
          }
          .testimonial-photo-wrap::after {
            background: linear-gradient(to bottom, transparent 40%, rgba(10,10,20,0.55) 100%);
          }
          .testimonial-content {
            padding: 1.2rem;
            background: rgba(10,10,20,0.35);
            border-radius: 0 0 16px 16px;
          }
        }


        
        /* ===== PROVEN SECTION ===== */
        .proven-section {
            text-align: center;
            padding: 4rem 0;
        }
        
        /* ===== COMPARE TABLE ===== */
        .compare-table {
            background: transparent;
            border-radius: 12px;
            overflow-x: auto;
            margin: 2rem auto;
            max-width: 960px;
            box-shadow: none;
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

        /* ===== EQUIPMENT SPLIT LAYOUT (video left TikTok ratio + stacked cards right) ===== */
        .equipment-split {
            display: flex;
            flex-direction: row;
            gap: 2rem;
            align-items: flex-start;
            margin-top: 2rem;
        }
        /* Video column: fixed TikTok 9/16 ratio — same approach as .video-card video above */
        .equipment-split-video {
            flex: 0 0 auto;
            width: 38%;
            aspect-ratio: 9 / 16;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            background: #000;
            border: 1px solid rgba(255,255,255,0.15);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            cursor: pointer;
        }
        .equipment-split-video video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
        }
        .equipment-split-video .video-card-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 52px;
            height: 52px;
            background: rgba(255,215,0,0.88);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        .equipment-split-video:hover .video-card-overlay {
            opacity: 0.7;
        }
        .equipment-split-video .video-card-overlay svg {
            width: 20px;
            height: 20px;
            fill: #1a1a1a;
            margin-left: 4px;
        }
        /* Cards column: fills remaining width, 3 cards stretch equally to fill video height */
        .equipment-split-cards {
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            min-width: 0;
            align-self: stretch;
        }
        .equipment-split-cards .banner-card {
            flex: 1 1 0;
            min-height: 0;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.15);
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .equipment-split-cards .banner-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top,
                rgba(0,0,0,0.82) 0%,
                rgba(0,0,0,0.45) 45%,
                rgba(0,0,0,0.08) 100%);
            z-index: 1;
        }
        .equipment-split-cards .banner-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 28px rgba(0,0,0,0.4);
        }
        .equipment-split-cards .banner-text {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
            padding: 1rem 1.2rem 1.1rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        .banner-title {
            font-weight: 700;
            font-size: 1rem;
            color: #FFD700;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
            line-height: 1.2;
        }
        .banner-sub {
            font-size: 0.78rem;
            color: rgba(255,255,255,0.88);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            line-height: 1.4;
        }

        @media (max-width: 768px) {
            .equipment-split {
                flex-direction: column;
                align-items: center;
            }
            .equipment-split-video {
                width: 72%;
                max-width: 300px;
            }
            .equipment-split-cards {
                width: 100%;
                align-self: auto;
            }
            .equipment-split-cards .banner-card {
                min-height: 100px;
            }
            .equipment-split-cards .banner-card img {
                width: 38%;
                height: 100%;
            }
        }

        /* ===== CTA IMAGE SECTION (Starting a studio) ===== */
        /* Uses background-image pattern — same as .hero-section and .bottom-hero */
        .cta-image-section {
            background-image: url('https://res.cloudinary.com/dfiomi0lb/image/upload/v1778716975/Business/I-Flex%20Pilates/AI%20gen%20images/open_new_pilates_terfpj.png');
            background-size: cover;
            background-position: 60% center;
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        /* Dark gradient left to right — text readable on left, photo visible on right */
        .cta-image-section::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to right,
                rgba(0,0,0,0.78) 0%,
                rgba(0,0,0,0.55) 38%,
                rgba(0,0,0,0.18) 65%,
                rgba(0,0,0,0.0) 100%);
            border-radius: inherit;
            z-index: 1;
            pointer-events: none;
        }
        .cta-image-content {
            position: relative;
            z-index: 2;
            padding: 3rem 2.5rem;
            max-width: 480px;
            text-align: left;
        }
        .cta-image-content h2 {
            text-align: left !important;
            color: #FFD700;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
            margin-bottom: 0.75rem;
        }
        .cta-image-content p {
            color: rgba(255,255,255,0.92);
            text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
            margin-bottom: 0.5rem;
            font-size: 1rem;
            line-height: 1.6;
        }
        @media (max-width: 768px) {
            .cta-image-section {
                min-height: 340px;
                background-position: 70% center;
            }
            .cta-image-content {
                padding: 2rem 1.5rem;
                max-width: 85%;
            }
            .cta-image-content h2 {
                font-size: 1.5rem;
            }
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
            background: rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            margin: 2rem 0;
        }
        
    
       /* ===== BOTTOM HERO ===== */
        .bottom-hero {
            background-image: url('https://res.cloudinary.com/dfiomi0lb/image/upload/v1774470225/Bottom-hero-p-1600.png');
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            width: 100%;
            min-height: 400px;
            max-width: 100vw;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 0;
            padding: 4rem 2rem;
            border-radius: 0;
            color: white;
            box-sizing: border-box;
        }
        
        .bottom-hero .h2-large {
            color: #FFD700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .bottom-hero p {
            color: #333;
            text-shadow: none;
        }
        
       .faq-item {
            background: transparent;
            margin-bottom: 1rem;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .faq-question {
            width: 100%;
            text-align: left;
            padding: 1rem;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.15);
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
            background: transparent;
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


     /* ===== NEWS SECTION ===== */
        .news-section {
            max-width: 800px;
            margin: 2rem auto;
            padding: 1rem 2rem;
        }
       .news-item {
            border-left: 3px solid #FFD700;
            padding: 0.75rem 1rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
            background: transparent;
            border-radius: 0 8px 8px 0;
            transition: background 0.2s;
        }
        .news-item:hover { background: rgba(255,255,255,0.08); }
        .news-item-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .news-badge {
            background: #e53e3e;
            color: #fff;
            font-size: 0.65rem;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 3px;
            letter-spacing: 0.5px;
            flex-shrink: 0;
        }
        .news-badge.blink {
            animation: newsBlink 1s step-start infinite;
        }
        @keyframes newsBlink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
        }
        .news-item-title {
            font-weight: 600;
            flex: 1;
            font-size: 0.95rem;
        }
        .news-item-date {
            color: #888;
            font-size: 0.8rem;
            white-space: nowrap;
        }
       .news-body {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            padding: 0;
            color: #444;
            font-size: 0.9rem;
            line-height: 1.6;
            transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                        opacity 0.5s ease 0.1s,
                        padding 0.4s ease;
        }
        .news-body.open {
            max-height: 600px;
            opacity: 1;
            padding: 0.75rem 0 0.25rem 0;
        }
        .news-body a {
            color: #1a73e8;
            text-decoration: underline;
        }
        .news-gallery {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.75rem 0 0.25rem 0;
            scrollbar-width: thin;
            scrollbar-color: #FFD700 #f0f0f0;
        }
        .news-gallery::-webkit-scrollbar { height: 4px; }
        .news-gallery::-webkit-scrollbar-track { background: #f0f0f0; }
        .news-gallery::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 2px; }
        .news-gallery img {
            height: 80px;
            width: auto;
            border-radius: 6px;
            flex-shrink: 0;
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .news-gallery img:hover { transform: scale(1.05); }
        .news-expand-btn {
            background: none;
            border: 1px solid #ddd;
            padding: 0.5rem 1.5rem;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 0.5rem;
            font-size: 0.85rem;
            color: #666;
            display: block;
        }
        .news-expand-btn:hover { border-color: #FFD700; color: #333; }

        .news-gallery {
                    display: flex;
                    gap: 0.5rem;
                    overflow-x: auto;
                    padding: 0.75rem 0 0.25rem 0;
                    scrollbar-width: thin;
                    scrollbar-color: #FFD700 #f0f0f0;
                }
                .news-gallery::-webkit-scrollbar { height: 4px; }
                .news-gallery::-webkit-scrollbar-track { background: #f0f0f0; }
                .news-gallery::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 2px; }
                .news-gallery img {
                    height: 80px;
                    width: auto;
                    border-radius: 6px;
                    flex-shrink: 0;
                    object-fit: cover;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .news-gallery img:hover { transform: scale(1.05); }

        /* ===== VIDEO CARD + LIGHTBOX ===== */
        .video-card-row {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .video-card {
            flex: 1;
            min-width: 0;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            background: #000;
            border: 1px solid rgba(255,255,255,0.15);
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .video-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.45);
        }
        .video-card video {
            width: 100%;
            aspect-ratio: 9/16;
            object-fit: cover;
            display: block;
            pointer-events: none;
        }
        .video-card-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 52px;
            height: 52px;
            background: rgba(255,215,0,0.88);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        .video-card-overlay svg {
            width: 20px;
            height: 20px;
            fill: #1a1a1a;
            margin-left: 4px;
        }
        .video-card-label {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.75));
            color: #fff;
            font-size: 0.8rem;
            font-weight: 600;
            text-align: center;
            padding: 1.5rem 0.5rem 0.6rem;
            margin: 0;
        }
        /* Lightbox */
        .video-lightbox {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.92);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }
        .video-lightbox.open {
            display: flex;
        }
        .video-lightbox-inner {
            position: relative;
            width: 90vw;
            max-width: 960px;
        }
        .video-lightbox-inner video {
            width: 100%;
            border-radius: 12px;
            display: block;
        }
        .video-lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            line-height: 1;
            padding: 0;
        }
        .video-lightbox-close:hover { color: #FFD700; }
        
        /* ===== FEATURE CARD GRID ===== */
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .feature-card {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 14px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.25);
        }
        .feature-card-img {
            width: 100%;
            aspect-ratio: 4/3;
            object-fit: cover;
            display: block;
        }
        .feature-card-body {
            padding: 1rem 1.2rem 1.4rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            background: transparent;
        }
        .feature-card-title {
            font-size: 1rem;
            font-weight: 700;
            color: #FFD700;
            margin: 0;
        }
        .feature-card-spec {
            font-size: 0.85rem;
            color: #333333;
            margin: 0;
            line-height: 1.4;
        }
        .feature-card-compare {
            display: flex;
            gap: 1rem;
            margin-top: 0.5rem;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .feature-compare-us {
            color: #22c55e;
        }
        .feature-compare-other {
            color: #888888;
        }
        /* Structure card — 2 images side by side */
        .feature-card-img-pair {
            display: flex;
            width: 100%;
            aspect-ratio: 4/3;
        }
        .feature-card-img-pair img {
            width: 50%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        /* ===== MOBILE RESPONSIVE ===== */
        
        @media (max-width: 768px) {
            body {
                background-image: url('https://res.cloudinary.com/dfiomi0lb/image/upload/v1773775103/I_flex_only.png') !important;
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
            .feature-grid { grid-template-columns: 1fr; }
            .video-card-row { flex-direction: column; }
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
