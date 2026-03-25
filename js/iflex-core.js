// ============================================
// I-FLEX STANDALONE CORE v1.3
// - Larger navbar logo (80px)
// - Larger footer logo (200px, adjust as needed)
// - Buttons with depth, shadow, better hover
// ============================================

(function() {
    console.log('🔧 I-Flex Core: Initializing...');

    function loadAssets() {
        console.log('📦 Loading fonts and icons...');
        const fonts = document.createElement('link');
        fonts.rel = 'stylesheet';
        fonts.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap';
        document.head.appendChild(fonts);
        
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    function getCurrentLang() {
        return window.location.pathname.startsWith('/th/') ? 'th' : 'en';
    }

  function buildNavbar() {
    const isThai = getCurrentLang() === 'th';
    const prefix = isThai ? '/th/' : '/';
    
    const navLinks = isThai ? [
        { href: prefix + 'about-us.html', text: 'เกี่ยวกับเรา' },
        { href: prefix + 'case-study.html', text: 'กรณีศึกษา' },
        { href: prefix + 'product-listing.html', text: 'สินค้า' },
        { href: prefix + 'blog-listing.html', text: 'บล็อก' },
        { href: prefix + 'contact-us.html', text: 'ติดต่อเรา' }
    ] : [
        { href: prefix + 'about-us.html', text: 'About Us' },
        { href: prefix + 'case-study.html', text: 'Case Study' },
        { href: prefix + 'product-listing.html', text: 'Products' },
        { href: prefix + 'blog-listing.html', text: 'Blog' },
        { href: prefix + 'contact-us.html', text: 'Contact' }
    ];
    
    console.log(`🌐 Building navbar for language: ${isThai ? 'TH' : 'EN'}`);
    
    return `
        <div class="navbar-fixed-wrapper">
            <div class="navbar">
                <div class="nav-container">
                    <div class="brand-wrapper">
                        <a href="${prefix}index.html" class="logo-link">
                            <img src="${IFLEX_CONFIG.logo}" alt="${IFLEX_CONFIG.name}" class="logo-img">
                        </a>
                    </div>
                    <div class="nav-menu-wrap">
                        <ul class="nav-menu">
                            ${navLinks.map(link => `
                                <li><a href="${link.href}" class="nav-link">${link.text}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="ham-wrapper">
                        <div class="hamburger" id="iflexHamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div class="lang-sel-wrapper">
                    <div class="language-selector">
                        <span class="lang-option ${!isThai ? 'active' : ''}" data-lang="en">EN</span>
                        <span class="lang-sep">|</span>
                        <span class="lang-option ${isThai ? 'active' : ''}" data-lang="th">TH</span>
                    </div>
                </div>
            </div>
            
            <div class="mobile-menu" id="iflexMobileMenu">
                <ul class="mobile-menu-list">
                    ${navLinks.map(link => `
                        <li><a href="${link.href}" class="mobile-menu-link">${link.text}</a></li>
                    `).join('')}
                    <li class="mobile-language-selector">
                        <div class="mobile-language-options">
                            <span class="mobile-lang-option ${!isThai ? 'active' : ''}" data-lang="en">EN</span>
                            <span class="mobile-lang-sep">|</span>
                            <span class="mobile-lang-option ${isThai ? 'active' : ''}" data-lang="th">TH</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      `;
    }
            
            <div class="mobile-menu" id="iflexMobileMenu">
                <ul class="mobile-menu-list">
                    ${navLinks.map(link => `
                        <li><a href="${link.href}" class="mobile-menu-link">${link.text}</a></li>
                    `).join('')}
                    <li class="mobile-language-selector">
                        <div class="mobile-language-options">
                            <span class="mobile-lang-option ${!isThai ? 'active' : ''}" data-lang="en">EN</span>
                            <span class="mobile-lang-sep">|</span>
                            <span class="mobile-lang-option ${isThai ? 'active' : ''}" data-lang="th">TH</span>
                        </div>
                    </li>
                </ul>
            </div>
        `;
    }

    function buildFooter() {
        const isThai = getCurrentLang() === 'th';
        const prefix = isThai ? '/th/' : '/';
        const year = new Date().getFullYear();
        
        const footerLinks = isThai ? {
            supports: [
                { href: prefix + 'index.html#faq', text: 'FAQ' },
                { href: prefix + 'index.html#faq', text: 'การรับประกัน' },
                { href: prefix + 'index.html#faq', text: 'คู่มือ' },
                { href: prefix + 'index.html#faq', text: 'การจัดส่ง' },
                { href: prefix + 'contact-us.html', text: 'ติดต่อเรา' }
            ],
            equipment: [
                { href: prefix + 'product-listing.html', text: 'รีฟอร์มเมอร์' },
                { href: prefix + 'product-listing.html', text: 'คาดิลแลค' },
                { href: prefix + 'product-listing.html', text: 'บาร์เรล' },
                { href: prefix + 'product-listing.html', text: 'วันด้าเชียร์' }
            ],
            contactText: `ติดต่อเราได้ที่นี่<br><br>${IFLEX_CONFIG.contact.name}<br>${IFLEX_CONFIG.contact.phone}<br>${IFLEX_CONFIG.contact.email}`,
            rights: `© ${year} ${IFLEX_CONFIG.name}. All rights reserved.`
        } : {
            supports: [
                { href: prefix + 'index.html#faq', text: 'FAQ' },
                { href: prefix + 'index.html#faq', text: 'Warranty' },
                { href: prefix + 'index.html#faq', text: 'Manual' },
                { href: prefix + 'index.html#faq', text: 'Shipping' },
                { href: prefix + 'contact-us.html', text: 'Contact' }
            ],
            equipment: [
                { href: prefix + 'product-listing.html', text: 'Reformer' },
                { href: prefix + 'product-listing.html', text: 'Cadillac' },
                { href: prefix + 'product-listing.html', text: 'Barrel Ladder' },
                { href: prefix + 'product-listing.html', text: 'Wunda Chair' }
            ],
            contactText: `Contact us at<br><br>${IFLEX_CONFIG.contact.name}<br>${IFLEX_CONFIG.contact.phone}<br>${IFLEX_CONFIG.contact.email}`,
            rights: `© ${year} ${IFLEX_CONFIG.name}. All rights reserved.`
        };
        
        console.log(`📋 Building footer for language: ${isThai ? 'TH' : 'EN'}`);
        
        return `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-brand">
                            <img src="${IFLEX_CONFIG.logo}" alt="${IFLEX_CONFIG.name}" class="footer-logo">
                            <p>${IFLEX_CONFIG.tagline}</p>
                            <p>✔️ Full 3-Year Warranty</p>
                            <div class="footer-social">
                                <a href="${IFLEX_CONFIG.social.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                <a href="${IFLEX_CONFIG.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                                <a href="${IFLEX_CONFIG.social.line}" target="_blank"><i class="fab fa-line"></i></a>
                            </div>
                        </div>
                        <div class="footer-links">
                            <h4>Supports</h4>
                            <ul>
                                ${footerLinks.supports.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('')}
                            </ul>
                            <h4>Equipment</h4>
                            <ul>
                                ${footerLinks.equipment.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('')}
                            </ul>
                        </div>
                        <div class="footer-contact">
                            <h4>Get in touch</h4>
                            <p>${footerLinks.contactText}</p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>${footerLinks.rights}</p>
                    </div>
                </div>
            </footer>
        `;
    }

    function injectStyles() {
        console.log('🎨 Injecting styles...');
        const style = document.createElement('style');
        style.id = 'iflex-core-styles';
        style.textContent = `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
                font-family: ${IFLEX_CONFIG.font};
                background-image: url('${IFLEX_CONFIG.bgImage}');
                background-attachment: fixed;
                background-size: cover;
                background-position: center;
                min-height: 100vh;
                padding-top: 80px;
                position: relative;
            }
            
            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.2);
                pointer-events: none;
                z-index: 0;
            }
            
           /* Fixed wrapper */
            .navbar-fixed-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1000;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            
            /* Navbar inner container */
            .navbar {
                max-width: 1280px;
                margin: 0 auto;
                padding: 0 2rem;
                position: relative;
            }
            
            /* Grid container for logo, nav, hamburger */
            .nav-container {
                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                min-height: 70px;
            }
            
            /* Logo wrapper */
            .brand-wrapper {
                grid-column: 1;
                display: flex;
                align-items: center;
                height: 100%;
            }
            
            .logo-link {
                display: block;
                line-height: 0;
                height: 100%;
            }
            
            .logo-img {
                height: 100%;
                width: auto;
                max-height: 60px;
                transition: transform 0.3s ease;
            }
            
            .logo-img:hover {
                transform: scale(1.05);
            }
            
            /* Nav menu wrapper */
            .nav-menu-wrap {
                grid-column: 2;
                display: flex;
                justify-content: center;
            }
            
            .nav-menu {
                display: flex;
                list-style: none;
                gap: 2rem;
                margin: 0;
                padding: 0;
            }
            
            .nav-link {
                color: #ffffff;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            
            .nav-link:hover {
                color: ${IFLEX_CONFIG.secondary};
            }
            
            /* Hamburger wrapper */
            .ham-wrapper {
                grid-column: 3;
                display: flex;
                justify-content: flex-end;
            }
            
            .hamburger {
                display: none;
                flex-direction: column;
                gap: 6px;
                cursor: pointer;
                padding: 10px;
            }
            
            .hamburger span {
                width: 28px;
                height: 2px;
                background: white;
                transition: all 0.3s ease;
            }
            
            /* Language selector - positioned absolutely on desktop */
            .lang-sel-wrapper {
                position: absolute;
                right: 2rem;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .language-selector {
                display: flex;
                gap: 0.5rem;
                color: #ffffff;
            }
            
            .lang-option {
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .lang-option.active {
                background: ${IFLEX_CONFIG.secondary};
                color: #000000;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-weight: 600;
            }
            
            .lang-option:hover:not(.active) {
                transform: scale(1.1);
                color: ${IFLEX_CONFIG.secondary};
            }
            .mobile-menu {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(15px);
                z-index: 999;
                padding: 5rem 2rem;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .mobile-menu.active {
                display: block !important;
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-menu-list {
                list-style: none;
            }
            
            .mobile-menu-link {
                color: white;
                text-decoration: none;
                font-size: 1.5rem;
                display: block;
                padding: 0.75rem 0;
            }
            
            .mobile-language-selector {
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid rgba(255,255,255,0.2);
                text-align: center;
            }
            
            .mobile-language-options {
                display: inline-flex;
                gap: 1rem;
                font-size: 1.2rem;
                color: white;
            }
            
            .mobile-lang-option {
                cursor: pointer;
            }
            
            .mobile-lang-option.active {
                background: ${IFLEX_CONFIG.secondary};
                color: #000;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            /* FOOTER */
            .footer {
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(10px);
                color: white;
                padding: 3rem 2rem 1.5rem;
                margin-top: 4rem;
            }
            
            .footer-container {
                max-width: 1280px;
                margin: 0 auto;
            }
            
            .footer-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                gap: 2rem;
                margin-bottom: 3rem;
                text-align: center;
            }
            
            .footer-brand, .footer-links, .footer-contact {
                flex: 1;
                min-width: 200px;
                text-align: center;
            }
            
            /* FIX 2: Footer logo much larger */
            .footer-logo {
                width: 200px;
                height: auto;
                margin-bottom: 1rem;
            }
            
            .footer-links ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .footer-links li {
                margin-bottom: 0.5rem;
            }
            
            .footer-links a, .footer-contact p {
                color: rgba(255,255,255,0.8);
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .footer-links a:hover {
                color: ${IFLEX_CONFIG.secondary};
            }
            
            .footer-social {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
                justify-content: center;
            }
            
            .footer-social a {
                color: rgba(255,255,255,0.8);
                font-size: 1.2rem;
                transition: all 0.3s ease;
            }
            
            .footer-social a:hover {
                color: ${IFLEX_CONFIG.secondary};
                transform: translateY(-2px);
            }
            
            .footer-bottom {
                text-align: center;
                padding-top: 2rem;
                border-top: 1px solid rgba(255,255,255,0.2);
            }
            
            /* FIX 3: Buttons with depth and shadow */
            .btn, .common-button, a.common-button, button.common-button, [class*="btn"] {
                display: inline-block;
                background: ${IFLEX_CONFIG.secondary};
                color: #1a1a1a;
                padding: 0.75rem 2rem;
                border-radius: 40px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                border: none;
                cursor: pointer;
            }
            
            .btn:hover, .common-button:hover, [class*="btn"]:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 18px rgba(0,0,0,0.4);
                background: #ffed4a;
            }
            
            .btn:active, .common-button:active {
                transform: translateY(1px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
            
            .hero, .content, .footer {
                position: relative;
                z-index: 2;
            }
            
            @media (max-width: 768px) {
            .nav-menu-wrap {
                display: none;
            }
            
            .hamburger {
                display: flex;
            }
            
            .lang-sel-wrapper {
                display: none;
            }
            
            body {
                padding-top: 70px;
            }
            
            .nav-container {
                min-height: 60px;
            }
            
            .logo-img {
                max-height: 45px;
            }
            
            .footer-content {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .footer-brand, .footer-links, .footer-contact {
                text-align: center;
            }
            
            .footer-social {
                justify-content: center;
            }
        }
        `;
        document.head.appendChild(style);
    }

    function initMobileMenu() {
        setTimeout(() => {
            const hamburger = document.getElementById('iflexHamburger');
            const mobileMenu = document.getElementById('iflexMobileMenu');
            
            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                });
                console.log('📱 Mobile menu initialized');
            }
        }, 100);
    }

    function initLanguageSwitcher() {
        const currentPath = window.location.pathname;
        const isThai = getCurrentLang() === 'th';
        
        function switchTo(lang) {
            let newPath;
            if (lang === 'en') {
                newPath = currentPath.replace(/^\/th\//, '/');
                if (newPath === '/') newPath = '/index.html';
                if (!newPath.includes('.')) newPath += '.html';
            } else {
                newPath = '/th' + currentPath;
                if (newPath === '/th') newPath = '/th/index.html';
                if (!newPath.includes('.')) newPath += '.html';
            }
            console.log(`🔄 Switching to ${lang}: ${newPath}`);
            window.location.href = newPath;
        }
        
        document.querySelectorAll('.lang-option, .mobile-lang-option').forEach(el => {
            el.addEventListener('click', () => {
                const lang = el.getAttribute('data-lang');
                if (lang && lang !== (isThai ? 'th' : 'en')) {
                    switchTo(lang);
                }
            });
        });
        console.log(`🌍 Language switcher initialized. Current: ${isThai ? 'TH' : 'EN'}`);
    }

    function setFavicon() {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/svg+xml';
        favicon.href = IFLEX_CONFIG.logo;
        document.head.appendChild(favicon);
        
        const appleIcon = document.createElement('link');
        appleIcon.rel = 'apple-touch-icon';
        appleIcon.href = IFLEX_CONFIG.logo;
        document.head.appendChild(appleIcon);
        console.log('⭐ Favicon set');
    }

    function init() {
        if (typeof IFLEX_CONFIG === 'undefined') {
            console.error('❌ I-Flex: Config not loaded! Check if iflex-config.js is loaded first.');
            return;
        }
        
        console.log('✅ Config loaded:', IFLEX_CONFIG.name);
        
        loadAssets();
        injectStyles();
        setFavicon();
        document.body.insertAdjacentHTML('afterbegin', buildNavbar());
        document.body.insertAdjacentHTML('beforeend', buildFooter());
        initMobileMenu();
        initLanguageSwitcher();
        
        console.log(`🎉 I-Flex Core v1.3 loaded successfully for ${IFLEX_CONFIG.name}`);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
