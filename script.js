// ============================================
// GIS & Remote Sensing Portfolio
// Interactive JavaScript
// ============================================

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" (logo link)
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for backdrop effect
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animatable elements
const animateOnScroll = document.querySelectorAll(
    '.section-header, .about-text, .about-stats, .project-card, .skill-category, .contact-link'
);

animateOnScroll.forEach(el => observer.observe(el));

// Staggered animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 150}ms`;
});

// Staggered animation for skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 200}ms`;
});

// Staggered animation for contact links
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach((link, index) => {
    link.style.transitionDelay = `${index * 150}ms`;
});

// Dynamic coordinate display (simulating location)
const coordinatesElement = document.getElementById('coordinates');
if (coordinatesElement) {
    const coordinates = [
        '40.7128° N, 74.0060° W',  // New York
        '51.5074° N, 0.1278° W',   // London
        '35.6762° N, 139.6503° E', // Tokyo
        '48.8566° N, 2.3522° E',   // Paris
        '37.7749° N, 122.4194° W'  // San Francisco
    ];

    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % coordinates.length;
        coordinatesElement.style.opacity = '0';

        setTimeout(() => {
            coordinatesElement.textContent = coordinates[currentIndex];
            coordinatesElement.style.opacity = '1';
        }, 400);
    }, 4000);

    coordinatesElement.style.transition = 'opacity 0.8s ease';
}

// Parallax effect for hero background
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Subtle parallax for sections
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth number counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[\d\s]/g, '');

            if (!isNaN(numericValue)) {
                let currentValue = 0;
                const increment = numericValue / 50;
                const duration = 1200;
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue) + suffix;
                    }
                }, stepTime);

                statsObserver.unobserve(target);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Add subtle hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
    });
});

// Cursor trail effect (subtle, academic)
let cursorTrail = [];
const trailLength = 5;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// Log page load for analytics (placeholder)
console.log('%c🗺️ GIS Portfolio Loaded', 'color: #5FB3B3; font-size: 16px; font-weight: bold;');
console.log('%cMapping the world through data...', 'color: #99C794; font-style: italic;');

// Preload optimization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Accessibility: Respect reduced motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}
