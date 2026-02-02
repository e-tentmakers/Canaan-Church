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

