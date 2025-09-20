/**
 * Global Navigation Controller
 * Handles mobile menu and navigation interactions across all pages
 */

class NavigationController {
    constructor() {
        this.init();
        this.bindEvents();
    }

    init() {
        // Initialize navigation elements
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileMenuClose = document.querySelector('.mobile-menu-close');
        this.body = document.body;
        
        console.log('🧭 Navigation Controller initialized');
        console.log('📱 Mobile menu elements found:', {
            toggle: !!this.mobileMenuToggle,
            overlay: !!this.mobileMenuOverlay,
            close: !!this.mobileMenuClose
        });
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Mobile menu close button
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => this.closeMobileMenu());
        }

        // Close menu when clicking overlay
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === this.mobileMenuOverlay) {
                    this.closeMobileMenu();
                }
            });
        }

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    this.closeMobileMenu();
                }
            });
        });

        // Add active page indicator
        this.setActiveNavLink();
    }

    toggleMobileMenu() {
        console.log('📱 Toggle mobile menu clicked');
        
        if (!this.mobileMenuOverlay) {
            console.error('❌ Mobile menu overlay not found');
            return;
        }
        
        const isOpen = this.mobileMenuOverlay.classList.contains('active');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenuOverlay.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        this.body.classList.add('menu-open');
        
        // Prevent body scroll
        this.body.style.overflow = 'hidden';
        
        console.log('📱 Mobile menu opened');
    }

    closeMobileMenu() {
        this.mobileMenuOverlay.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        this.body.classList.remove('menu-open');
        
        // Restore body scroll
        this.body.style.overflow = '';
        
        console.log('📱 Mobile menu closed');
    }

    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'home.html';
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page links
        document.querySelectorAll(`a[href="${currentPage}"], a[href="./${currentPage}"]`).forEach(link => {
            link.classList.add('active');
        });

        // Handle default cases
        if (currentPage === '' || currentPage === 'index.html') {
            // If on game page, highlight game nav
            document.querySelectorAll('a[href="index.html"]').forEach(link => {
                link.classList.add('active');
            });
        } else if (currentPage === 'home.html' || currentPage === '/') {
            // If on home page, highlight home nav
            document.querySelectorAll('a[href="home.html"]').forEach(link => {
                link.classList.add('active');
            });
        }
    }

    // Utility method to highlight navigation based on scroll position
    highlightNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Method to add navigation animations
    addScrollNavigation() {
        const header = document.querySelector('.main-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header?.classList.add('hidden');
            } else {
                // Scrolling up
                header?.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
            
            // Highlight current section
            this.highlightNavOnScroll();
        }, { passive: true });
    }

    // Method to add page transition effects
    addPageTransitions() {
        // Add loading animation when navigating
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip external links and anchors
                if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) {
                    return;
                }
                
                // Add loading animation
                this.showPageTransition();
            });
        });
    }

    showPageTransition() {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-spinner"></div>
                <p>Đang tải...</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Remove overlay after navigation
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }

    // Method to add breadcrumb navigation
    updateBreadcrumb(items) {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (!breadcrumb) return;

        breadcrumb.innerHTML = items.map((item, index) => {
            const isLast = index === items.length - 1;
            return `
                <span class="breadcrumb-item ${isLast ? 'active' : ''}">
                    ${item.url && !isLast ? `<a href="${item.url}">${item.text}</a>` : item.text}
                </span>
                ${!isLast ? '<i class="fas fa-chevron-right breadcrumb-separator"></i>' : ''}
            `;
        }).join('');
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationController = new NavigationController();
    
    // Add scroll navigation if on homepage
    if (window.location.pathname.includes('home.html') || window.location.pathname === '/') {
        window.navigationController.addScrollNavigation();
    }
    
    // Add page transitions
    window.navigationController.addPageTransitions();
    
    console.log('🧭 Global navigation loaded');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationController;
}

console.log('✅ Navigation script loaded');

