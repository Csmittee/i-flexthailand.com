// ============================================
// I-FLEX STANDALONE CORE v1.0
// - Navbar, Footer, Mobile Menu
// - Language Switcher (EN/TH with /th/ structure)
// - Dark overlay and all global styling
// - No external CSS files needed
// ============================================

(function() {
    // ===== LOAD FONTS & ICONS =====
    function loadAssets() {
        const fonts = document.createElement('link');
        fonts.rel = 'stylesheet';
        fonts.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap';
        document.head.appendChild(fonts);
        
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // ===== GET CURRENT LANGUAGE =====
    function getCurrentLang() {
        return window.location.pathname.startsWith('/th/') ? 'th' : 'en';
    }

    // ===== BUILD NAVBAR =====
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
        
        return `
            <div class="navbar-fixed-wrapper">
                <nav class="navbar">
                    <div class="nav-container">
                        <div class="nav-left">
                            <a href="${prefix}index.html" class="logo-link">
                                <img src="${IFLEX_CONFIG.logo}" alt="${IFLEX_CONFIG.name}" class="logo-img">
                            </a>
                        </div>
                        
                        <div class="nav-center">
                            <ul class="nav-menu">
                                ${navLinks.map(link => `
                                    <li><a href="${link.href}" class="nav-link">${link.text}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="nav-right">
                            <div class="language-selector">
                                <span class="lang-option ${!isThai ? 'active' : ''}" data-lang="en">EN</span>
                                <span class="lang-sep">|</span>
                                <span class="lang-option ${isThai ? 'active' : ''}" data-lang="th">TH</span>
                            </div>
                            <div class="hamburger" id="iflexHamburger">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </nav>
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
        `;
    }

    // ===== BUILD FOOTER =====
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

    // ===== INJECT ALL STYLES =====
    function injectStyles() {
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
                background: ${DARK_OVERLAY};
                pointer-events: none;
                z-index: 0;
            }
            
            /* ===== NAVBAR ===== */
            .navbar-fixed-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1000;
            }
            
            .navbar {
                width: 100%;
                padding: 0.75rem 2rem;
                background: rgba(0, 0, 0, 0.75);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            
            .nav-container {
                max-width: 1280px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 2rem;
            }
            
            .logo-img {
                height: 45px;
                width: auto;
                transition: transform 0.3s ease;
            }
            
            .logo-img:hover {
                transform: scale(1.05);
            }
            
            .nav-menu {
                display: flex;
                list-style: none;
                gap: 2rem;
            }
            
            .nav-link {
                color: #ffffff;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;
            }
            
            .nav-link:hover {
                color: ${IFLEX_CONFIG.secondary};
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
            
            .hamburger {
                display: none;
                flex-direction: column;
                gap: 6px;
                cursor: pointer;
            }
            
            .hamburger span {
                width: 28px;
                height: 2px;
                background: white;
                transition: all 0.3s ease;
            }
            
            /* ===== MOBILE MENU ===== */
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
            
            /* ===== FOOTER ===== */
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
            }
            
            .footer-brand, .footer-links, .footer-contact {
                flex: 1;
                min-width: 200px;
            }
            
            .footer-logo {
                height: 50px;
                width: auto;
                margin-bottom: 1rem;
            }
            
            .footer-links ul {
                list-style: none;
                padding: 0;
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
            
            /* ===== UTILITY CLASSES ===== */
            .hero, .content, .footer {
                position: relative;
                z-index: 2;
            }
            
            /* ===== RESPONSIVE ===== */
            @media (max-width: 768px) {
                .nav-menu, .language-selector {
                    display: none;
                }
                .hamburger {
                    display: flex;
                }
                .footer-content {
                    flex-direction: column;
                    text-align: center;
                }
                .footer-social {
                    justify-content: center;
                }
                body {
                    padding-top: 70px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== MOBILE MENU TOGGLE =====
    function initMobileMenu() {
        setTimeout(() => {
            const hamburger = document.getElementById('iflexHamburger');
            const mobileMenu = document.getElementById('iflexMobileMenu');
            
            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                });
            }
        }, 100);
    }

    // ===== LANGUAGE SWITCHER =====
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
    }

    // ===== FAVICON =====
    function setFavicon() {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = IFLEX_CONFIG.favicon;
        document.head.appendChild(favicon);
        
        const appleIcon = document.createElement('link');
        appleIcon.rel = 'apple-touch-icon';
        appleIcon.href = IFLEX_CONFIG.favicon;
        document.head.appendChild(appleIcon);
    }

    // ===== INITIALIZE =====
    function init() {
        if (typeof IFLEX_CONFIG === 'undefined') {
            console.error('I-Flex: Config not loaded.');
            return;
        }
        
        loadAssets();
        injectStyles();
        setFavicon();
        document.body.insertAdjacentHTML('afterbegin', buildNavbar());
        document.body.insertAdjacentHTML('beforeend', buildFooter());
        initMobileMenu();
        initLanguageSwitcher();
        
        console.log(`✅ I-Flex Core loaded for ${IFLEX_CONFIG.name}`);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
