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

// Mobile dropdown menu toggle
if (window.innerWidth <= 968) {
    document.querySelectorAll('.nav-item.dropdown').forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('active');
            });
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        document.querySelectorAll('.nav-item.dropdown').forEach(item => {
            item.classList.remove('active');
        });
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    } else {
        // Re-attach mobile dropdown handlers
        document.querySelectorAll('.nav-item.dropdown').forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    item.classList.toggle('active');
                });
            }
        });
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

// Parallax scrolling effect for worship image section
window.addEventListener('scroll', () => {
    const parallaxSection = document.querySelector('.parallax-section');
    if (parallaxSection) {
        const scrolled = window.pageYOffset;
        const parallaxImage = parallaxSection.querySelector('.parallax-image');
        const parallaxContent = parallaxSection.querySelector('.parallax-content');
        
        if (parallaxImage && parallaxContent) {
            const sectionTop = parallaxSection.offsetTop;
            const sectionHeight = parallaxSection.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if section is in viewport
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const scrollProgress = (scrolled - sectionTop + windowHeight) / (sectionHeight + windowHeight);
                const translateY = scrollProgress * 100;
                
                // Move image slower (parallax effect)
                parallaxImage.style.transform = `translateY(${translateY * 0.5}px) scale(1.1)`;
                
                // Move text content
                parallaxContent.style.transform = `translateY(${translateY * 0.3}px)`;
            }
        }
    }
});
