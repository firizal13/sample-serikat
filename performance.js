// Performance optimizations for Core Web Vitals

// Preload critical images when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Preload next section images when user scrolls
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    // Observe all lazy-loaded images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
});

// Optimize font loading
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('normal 1em XLSMARTSans-Regular'),
        document.fonts.load('600 1em XLSMARTSans-SemiBold')
    ]).then(() => {
        document.body.classList.add('fonts-loaded');
    });
}

// Reduce layout shifts by setting image dimensions
function setImageDimensions() {
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach(img => {
        img.addEventListener('load', function () {
            if (!this.width || !this.height) {
                this.width = this.naturalWidth;
                this.height = this.naturalHeight;
            }
        });
    });
}

// Initialize performance optimizations
setImageDimensions();

// Web Vitals reporting (optional - for monitoring)
function reportWebVitals() {
    if ('web-vital' in window) {
        // Report Core Web Vitals to analytics
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
    }
}

// Service Worker registration for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}