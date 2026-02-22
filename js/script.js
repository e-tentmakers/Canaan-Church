// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
const isMobileView = () => window.innerWidth <= 968;

// Mobile dropdown menu toggle and link handling
if (navMenu) {
    navMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) {
            return;
        }

        const dropdownItem = link.closest('.nav-item.dropdown');
        const isTopLevel = link.classList.contains('nav-link');

        if (isMobileView() && dropdownItem && isTopLevel) {
            const href = link.getAttribute('href') || '';
            if (href === '#' || href === '') {
                e.preventDefault();
                dropdownItem.classList.toggle('active');
                return;
            }
        }

        if (isMobileView()) {
            navMenu.classList.remove('active');
            dropdownItems.forEach(item => item.classList.remove('active'));
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        dropdownItems.forEach(item => item.classList.remove('active'));
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let heroIndex = 0;const setHeroSlide = (index) => {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    heroIndex = index;
};

if (heroSlides.length > 1) {
    heroDots.forEach((dot, i) => {
        dot.addEventListener('click', () => setHeroSlide(i));
    });

    setInterval(() => {
        const nextIndex = (heroIndex + 1) % heroSlides.length;
        setHeroSlide(nextIndex);
    }, 5000);
}

// Gallery lightbox (supports multiple gallery grids via event delegation)
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.addEventListener('click', (e) => {
        const img = e.target.closest('.gallery-grid img');
        if (!img) return;

        if (lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt || 'gallery image';
        }
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
}

// Collapsible gallery sections (event delegation for reliability)
function toggleGallerySection(title) {
    var section = title.closest('.gallery-section');
    var content = section && section.querySelector('.gallery-section-content');
    if (!section || !content) return;

    var isCollapsed = section.classList.contains('collapsed');
    section.classList.toggle('collapsed', !isCollapsed);
    title.classList.toggle('collapsed', !isCollapsed);
    content.classList.toggle('collapsed', !isCollapsed);
}

function initCollapsibleGallery() {
    document.addEventListener('click', function(e) {
        var title = e.target.closest('.gallery-section-title[data-collapsible]');
        if (!title) return;
        e.preventDefault();
        toggleGallerySection(title);
    });
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var title = e.target.closest('.gallery-section-title[data-collapsible]');
        if (!title) return;
        e.preventDefault();
        toggleGallerySection(title);
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollapsibleGallery);
} else {
    initCollapsibleGallery();
}
