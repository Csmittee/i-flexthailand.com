// ============================================
// I-FLEX STANDALONE CONFIG v1.0
// - Independent site (no Janishammer dependency)
// - All brand colors, fonts, background
// - Cloudinary image assets
// ============================================

const IFLEX_CONFIG = {
    // Brand Identity
    name: "I-Flex Thailand",
    tagline: "A healthy lifestyle product and services",
    domain: "i-flexthailand.com",
    contactEmail: "info@i-flexthailand.com",
    
    // Colors
    primary: "#1A1A1A",      // Dark background
    secondary: "#FFD700",    // Gold accents
    accent: "#FFFFFF",       // White text highlights
    
    // Typography
    font: "'Montserrat', sans-serif",
    
    // Images (Cloudinary)
    bgImage: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773775103/I_flex_only.png",
    logo: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773768378/I-Flex_main_no_bg.svg",
    favicon: "https://res.cloudinary.com/dfiomi0lb/image/upload/v1773768489/Original.png",
    
    // Social Links (update when you have them)
    social: {
        facebook: "https://www.facebook.com/profile.php?id=61586061685340",
        instagram: "#",
        line: "#",
        whatsapp: "#"
    },
    
    // Contact Info
    contact: {
        name: "Chairit Smittee",
        phone: "089 5412121",
        email: "info@janishammer.com",
        lineQR: "/images/Line-qR.JPG",     // Will update with Cloudinary
        whatsappQR: "/images/Whatsapp-QR.JPG"
    }
};

// Dark overlay opacity (consistent with Janishammer ecosystem)
const DARK_OVERLAY = "rgba(0, 0, 0, 0.4)";
