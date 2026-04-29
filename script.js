// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scroll for Navigation Links
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

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-card, .stat-item, .gallery-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Initialize counters when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const counters = entry.target.querySelectorAll('.stat-item h3');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    animateCounter(counter, number);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !phone || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Create email content
        const emailSubject = `New Contact Form Submission from ${name}`;
        const emailBody = `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

---
Submitted from Green O Wave Website
        `;
        
        // Create mailto link with multiple recipients
        const mailtoLink = `mailto:info@greenowave.com,info@greenowave.in?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show notification
        showNotification('Opening your email client to send message...', 'info');
        
        // Reset form after a delay
        setTimeout(() => {
            contactForm.reset();
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00d4aa, #0099cc)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingCar = document.querySelector('.floating-car');
    
    if (hero && heroContent && floatingCar) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        floatingCar.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// Gallery Lightbox Effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        createLightbox(item);
    });
});

function createLightbox(item) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = item.querySelector('.gallery-placeholder').cloneNode(true);
    content.style.cssText = `
        font-size: 5rem;
        color: white;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    lightbox.appendChild(content);
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close on click
    lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            width: 0;
            height: 0;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations here
}, 10));

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Countdown Timer for Patna Expo
function updateCountdown() {
    const eventDate = new Date('May 1, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h3>Event has started!</h3>';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Initialize countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Add click event to all gallery images
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const imageSrc = this.src;
            const imageAlt = this.alt;
            
            lightboxImage.src = imageSrc;
            lightboxImage.alt = imageAlt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox when clicking close button
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// PDF Download fallback
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('a[href="./brochure.pdf"]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fetch('./brochure.pdf')
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'GREENOWAVEINDIA_BROCHURE.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => {
                    console.error('Download failed:', error);
                    // Fallback to direct link
                    window.open('./brochure.pdf', '_blank');
                });
        });
    }
});


// Enhanced animations for Patna Expo section
const patnaExpoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const featureCards = entry.target.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
            
            const countdownItems = entry.target.querySelectorAll('.countdown-item');
            countdownItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

const patnaExpoSection = document.querySelector('.patna-expo');
if (patnaExpoSection) {
    // Set initial states for animations
    const featureCards = patnaExpoSection.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const countdownItems = patnaExpoSection.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    patnaExpoObserver.observe(patnaExpoSection);
}

// Interactive feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 0;
            height: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: rippleExpand 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleExpand {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Dynamic floating elements animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        const randomRotation = Math.random() * 360;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
    });
}

// Animate floating elements periodically
setInterval(animateFloatingElements, 5000);

// Register button interactions
document.querySelectorAll('.register-buttons .btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Download Brochure')) {
            e.preventDefault();
            showNotification('Brochure download started! Check your downloads folder.', 'success');
        } else if (this.textContent.includes('Book Your Spot')) {
            showNotification('Redirecting to registration form...', 'info');
        }
    });
});

// Parallax effect for Patna Expo section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const patnaSection = document.querySelector('.patna-expo');
    
    if (patnaSection) {
        const rect = patnaSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            const floatingElements = patnaSection.querySelectorAll('.floating-element');
            floatingElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }
});

// Green EV Click Animation System
function createEVClickEffect(x, y) {
    // Create main effect container
    const effect = document.createElement('div');
    effect.className = 'ev-click-effect';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    
    // Create core pulse effect
    const core = document.createElement('div');
    core.className = 'ev-click-core';
    
    // Create expanding ring
    const ring = document.createElement('div');
    ring.className = 'ev-click-ring';
    
    // Create electric bolt icon
    const bolt = document.createElement('div');
    bolt.className = 'ev-click-bolt';
    bolt.innerHTML = '⚡';
    
    // Add elements to effect container
    effect.appendChild(core);
    effect.appendChild(ring);
    effect.appendChild(bolt);
    
    // Create spark particles
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.className = 'ev-click-spark';
        
        // Random direction for each spark
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 50 + Math.random() * 50;
        const sparkX = Math.cos(angle) * distance;
        const sparkY = Math.sin(angle) * distance;
        
        spark.style.setProperty('--spark-x', sparkX + 'px');
        spark.style.setProperty('--spark-y', sparkY + 'px');
        
        effect.appendChild(spark);
    }
    
    // Add to page
    document.body.appendChild(effect);
    
    // Remove after animation completes
    setTimeout(() => {
        if (document.body.contains(effect)) {
            document.body.removeChild(effect);
        }
    }, 1000);
}

// Create particle trail on mouse move (subtle effect)
let mouseTimer;
function createParticleTrail(x, y) {
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'ev-particle-trail';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 400);
    }, 50);
}

// Enhanced click event listener
document.addEventListener('click', function(e) {
    // Don't trigger on buttons, links, or form elements
    if (e.target.closest('button, a, input, textarea, select')) {
        return;
    }
    
    createEVClickEffect(e.clientX, e.clientY);
    
    // Optional: Add haptic feedback simulation
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
});

// Subtle particle trail on mouse move (throttled)
let lastTrailTime = 0;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastTrailTime > 100) { // Throttle to every 100ms
        createParticleTrail(e.clientX, e.clientY);
        lastTrailTime = now;
    }
});

// Add special effects for specific sections
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Hero section gets enhanced effects
    if (target.closest('.hero')) {
        createEVClickEffect(e.clientX, e.clientY);
        // Add extra burst effect
        setTimeout(() => {
            createEVClickEffect(e.clientX + 20, e.clientY + 20);
        }, 100);
    }
    
    // Gallery section gets photo-like effects
    if (target.closest('.gallery-item')) {
        // Already handled by lightbox, but we can add extra effects
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        createEVClickEffect(centerX, centerY);
    }
});

console.log('Green O Wave Website Loaded Successfully! 🌊⚡');
console.log('Patna 2nd Term Expo - May 1-3, 2026 🚗⚡');
console.log('EV Click Effects Enabled! ⚡🌱');
