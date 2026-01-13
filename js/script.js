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

