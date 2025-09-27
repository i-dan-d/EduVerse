/**
 * Homepage Interactive Features
 * Handles animations, mobile menu, and interactive elements
 */

class Homepage {
    constructor() {
        this.init();
        this.bindEvents();
        this.startAnimations();
    }

    init() {
        // Initialize elements
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileMenuClose = document.querySelector('.mobile-menu-close');
        this.featureCards = document.querySelectorAll('.feature-card');
        this.subjectCards = document.querySelectorAll('.subject-card');
        
        console.log('📱 Homepage initialized');
    }

    bindEvents() {
        // Mobile menu events
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => this.closeMobileMenu());
        }
        
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === this.mobileMenuOverlay) {
                    this.closeMobileMenu();
                }
            });
        }

        // Feature card interactions
        this.featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateFeatureCard(card, 'enter'));
            card.addEventListener('mouseleave', () => this.animateFeatureCard(card, 'leave'));
        });

        // Subject card interactions
        this.subjectCards.forEach(card => {
            card.addEventListener('click', () => this.handleSubjectClick(card));
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for animations
        this.observeElements();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate hamburger menu
        this.mobileMenuToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        this.mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        this.mobileMenuToggle.classList.remove('active');
    }

    animateFeatureCard(card, action) {
        const icon = card.querySelector('.feature-icon');
        const content = card.querySelector('.feature-content');
        
        if (action === 'enter') {
            icon.style.transform = 'scale(1.1) rotateY(10deg)';
            content.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
        } else {
            icon.style.transform = 'scale(1) rotateY(0deg)';
            content.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    }

    handleSubjectClick(card) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        card.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Show subject info (could be expanded)
        const subject = card.classList.contains('math') ? 'math' : 
                       card.classList.contains('physics') ? 'physics' : 'chemistry';
        
        console.log(`🎓 Subject selected: ${subject}`);
        
        // Could navigate to specific subject section in game
        // For now, just go to main game
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 300);
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe sections for scroll animations
        document.querySelectorAll('.features, .subjects, .why-choose, .cta').forEach(section => {
            observer.observe(section);
        });

        // Observe cards for staggered animations
        document.querySelectorAll('.feature-card, .subject-card, .benefit-item').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    startAnimations() {
        // Animate hero elements
        this.animateHero();
        
        // Animate floating icons
        this.animateFloatingIcons();
        
        // Animate progress ring
        this.animateProgressRing();
        
        // Start counter animations when visible
        this.animateCounters();
    }

    animateHero() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroStats = document.querySelector('.hero-stats');
        
        // Staggered animation
        setTimeout(() => heroTitle?.classList.add('animate-in'), 100);
        setTimeout(() => heroSubtitle?.classList.add('animate-in'), 300);
        setTimeout(() => heroStats?.classList.add('animate-in'), 500);
        setTimeout(() => heroButtons?.classList.add('animate-in'), 700);
    }

    animateFloatingIcons() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            // Random positioning
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            
            icon.style.left = `${randomX}%`;
            icon.style.top = `${randomY}%`;
            
            // Start floating animation
            setTimeout(() => {
                icon.classList.add('floating');
            }, index * 200);
        });
    }

    animateProgressRing() {
        const progressRing = document.querySelector('.progress-ring circle:last-child');
        const progressNumber = document.querySelector('.progress-number');
        
        if (progressRing && progressNumber) {
            // Animate progress from 0 to 70%
            let progress = 0;
            const targetProgress = 70;
            const circumference = 2 * Math.PI * 54; // radius = 54
            
            const animateProgress = () => {
                if (progress <= targetProgress) {
                    const offset = circumference - (progress / 100) * circumference;
                    progressRing.style.strokeDashoffset = offset;
                    progressNumber.textContent = `${Math.round(progress)}%`;
                    progress += 1;
                    requestAnimationFrame(animateProgress);
                }
            };
            
            // Start animation after delay
            setTimeout(animateProgress, 1000);
        }
    }

    animateCounters() {
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe stat numbers
        document.querySelectorAll('.stat-number').forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateNumber(element) {
        const finalValue = element.textContent.trim();
        
        // Handle infinity symbol
        if (finalValue === '∞') {
            element.style.animation = 'pulse 2s infinite';
            return;
        }
        
        // Handle numbers with +
        const isPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 50; // 50 steps
        
        const countUp = () => {
            if (currentValue < numericValue) {
                currentValue += increment;
                element.textContent = Math.round(currentValue) + (isPlus ? '+' : '');
                requestAnimationFrame(countUp);
            } else {
                element.textContent = finalValue;
            }
        };
        
        countUp();
    }

    // Utility methods
    addRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.className = 'ripple-effect';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Smooth reveal animations
    revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homepage = new Homepage();
    console.log('🏠 Homepage loaded successfully');
});

// Handle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Throttle scroll events
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            // Add scroll-based effects here
            scrollTimeout = null;
        }, 16); // ~60fps
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Recalculate positions if needed
    if (window.homepage && window.innerWidth > 768) {
        window.homepage.closeMobileMenu();
    }
});

console.log('✅ Homepage script loaded');






