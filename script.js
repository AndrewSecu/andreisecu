// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    const isExpanded = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections and cards
const revealElements = document.querySelectorAll('.glass-card, .timeline-item, .skill-category, .education-card, .contact-card');
revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(current));
        }
    }, 16);
}

function formatStatNumber(num) {
    // Keep the original text as is - don't animate these complex strings
    return num;
}

// Animate counters when they come into view
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const originalText = stat.textContent;
                stat.textContent = '0';
                
                setTimeout(() => {
                    stat.textContent = originalText;
                    stat.style.animation = 'fadeIn 0.5s ease-out';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for gradient orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth reveal animation for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Dynamic cursor effect (optional enhancement)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .glass-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// Typing effect for hero subtitle (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Skills Carousel - Manual control with arrows
function initSkillsCarousel() {
    const track = document.querySelector('.skills-track');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const cards = Array.from(track.children);
    let currentIndex = 0;
    
    function getCarouselSettings() {
        const width = window.innerWidth;
        if (width <= 576) {
            return { cardWidth: 280, gap: 24, visibleCards: 1 };
        } else if (width <= 768) {
            return { cardWidth: 280, gap: 24, visibleCards: 1 };
        } else if (width <= 1200) {
            return { cardWidth: 300, gap: 24, visibleCards: 2 };
        } else {
            return { cardWidth: 350, gap: 24, visibleCards: 3 };
        }
    }
    
    function updateCarousel() {
        const settings = getCarouselSettings();
        const slideWidth = settings.cardWidth + settings.gap;
        const offset = currentIndex * slideWidth;
        const maxIndex = Math.max(0, cards.length - settings.visibleCards);
        
        track.style.transform = `translateX(-${offset}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const settings = getCarouselSettings();
        const maxIndex = Math.max(0, cards.length - settings.visibleCards);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextBtn.click();
        } else if (touchEndX - touchStartX > 50) {
            prevBtn.click();
        }
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentIndex = 0; // Reset to first slide on resize
            updateCarousel();
        }, 250);
    });
    
    // Initial state
    updateCarousel();
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add entrance animations
    document.body.classList.add('loaded');
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Initialize skills carousel
    initSkillsCarousel();
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
        highlightNavigation();
    }, 250);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    highlightNavigation();
}, 100));

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add CSS for custom cursor
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    .toast-notification {
        position: fixed;
        top: 100px;
        right: -400px;
        min-width: 350px;
        max-width: 400px;
        background: rgba(20, 27, 52, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(0, 102, 255, 0.3);
        border-radius: 1rem;
        padding: 1.5rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 102, 255, 0.2);
        z-index: 10000;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .toast-notification.show {
        right: 20px;
    }
    
    .toast-notification.toast-success {
        border-color: rgba(34, 197, 94, 0.5);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(34, 197, 94, 0.2);
    }
    
    .toast-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        border-radius: 50%;
    }
    
    .toast-icon svg {
        width: 24px;
        height: 24px;
        color: white;
    }
    
    .toast-content {
        flex: 1;
    }
    
    .toast-content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.125rem;
        font-weight: 700;
        color: white;
    }
    
    .toast-content p {
        margin: 0;
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.5;
    }
    
    .toast-close {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .toast-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .toast-close svg {
        width: 16px;
        height: 16px;
        color: white;
    }
    
    @media (max-width: 576px) {
        .toast-notification {
            right: -100%;
            left: auto;
            min-width: auto;
            max-width: calc(100% - 40px);
        }
        
        .toast-notification.show {
            right: 20px;
        }
    }
`;
document.head.appendChild(style);

// Toast Notification Function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i data-feather="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
        </div>
        <div class="toast-content">
            <h4>${type === 'success' ? 'Thank You!' : 'Attention'}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close">
            <i data-feather="x"></i>
        </button>
    `;
    
    document.body.appendChild(toast);
    feather.replace();
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('form-status');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        // Get form values
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link as fallback
        const mailtoLink = `mailto:andrei.s3cu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show beautiful toast notification
        showToast('Your message has been sent! I will get back to you as soon as possible. 🚀', 'success');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-feather="send"></i><span>Send Message</span>';
            feather.replace();
        }, 1000);
    });
}

console.log('🚀 Portfolio loaded successfully!');
console.log('💡 Try the Konami code for a surprise!');
