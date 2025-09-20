/**
 * 🎨 Animation Manager
 * Handles all UI animations and transitions
 */

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.isAnimating = false;
        
        console.log('🎨 AnimationManager: Initialized');
    }

    /**
     * Fade in element
     */
    fadeIn(element, duration = 300) {
        return new Promise((resolve) => {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.opacity = progress;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * Fade out element
     */
    fadeOut(element, duration = 300) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const startOpacity = parseFloat(getComputedStyle(element).opacity);
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                element.style.opacity = startOpacity * (1 - progress);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * Slide in from top
     */
    slideInFromTop(element, duration = 300) {
        return new Promise((resolve) => {
            element.style.transform = 'translateY(-100%)';
            element.style.display = 'block';
            
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const translateY = -100 + (100 * progress);
                element.style.transform = `translateY(${translateY}%)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * Bounce animation
     */
    bounce(element, duration = 600) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Bounce effect using sine wave
                const bounce = Math.sin(progress * Math.PI * 4) * (1 - progress) * 20;
                element.style.transform = `translateY(${bounce}px)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = 'translateY(0)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * Pulse animation
     */
    pulse(element, duration = 1000) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.1;
                element.style.transform = `scale(${scale})`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = 'scale(1)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * Shake animation for wrong answers
     */
    shake(element, duration = 500) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const shake = Math.sin(progress * Math.PI * 10) * (1 - progress) * 10;
                element.style.transform = `translateX(${shake}px)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = 'translateX(0)';
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    /**
     * Stop all animations
     */
    stopAllAnimations() {
        this.animations.clear();
        this.isAnimating = false;
    }
}

// Make it globally available
window.AnimationManager = AnimationManager;

