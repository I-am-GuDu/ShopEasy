// Mobile Enhancement JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle functionality
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768 && nav && navLinks) {
            // Create hamburger menu if it doesn't exist
            let hamburger = document.querySelector('.hamburger-menu');
            if (!hamburger) {
                hamburger = document.createElement('button');
                hamburger.className = 'hamburger-menu';
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                hamburger.setAttribute('aria-label', 'Toggle menu');
                nav.insertBefore(hamburger, navLinks);
                
                // Add hamburger styles
                hamburger.style.cssText = `
                    display: block;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    padding: 15px 20px;
                    cursor: pointer;
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1001;
                `;
            }
            
            // Hide nav links initially on mobile
            navLinks.style.display = 'none';
            
            // Toggle menu
            hamburger.addEventListener('click', function() {
                const isVisible = navLinks.style.display === 'flex';
                navLinks.style.display = isVisible ? 'none' : 'flex';
                hamburger.innerHTML = isVisible ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
            });
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
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
    }
    
    // Touch-friendly dropdown menus
    function initTouchDropdowns() {
        const dropdownTriggers = document.querySelectorAll('.nav-links li');
        
        dropdownTriggers.forEach(trigger => {
            const dropdown = trigger.querySelector('.dropdown');
            if (dropdown) {
                trigger.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdownTriggers.forEach(other => {
                        if (other !== trigger) {
                            const otherDropdown = other.querySelector('.dropdown');
                            if (otherDropdown) {
                                otherDropdown.style.display = 'none';
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    const isVisible = dropdown.style.display === 'block';
                    dropdown.style.display = isVisible ? 'none' : 'block';
                });
            }
        });
        
        // Close dropdowns when touching outside
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.nav-links li')) {
                dropdownTriggers.forEach(trigger => {
                    const dropdown = trigger.querySelector('.dropdown');
                    if (dropdown) {
                        dropdown.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Lazy loading for images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.classList.add('loading');
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    // Add to cart with feedback
    function initAddToCartFeedback() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Visual feedback
                const originalText = button.textContent;
                button.textContent = 'Added!';
                button.classList.add('success');
                
                // Haptic feedback on supported devices
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('success');
                }, 1500);
            });
        });
    }
    
    // Wishlist toggle with feedback
    function initWishlistFeedback() {
        const wishlistButtons = document.querySelectorAll('.wishlist');
        
        wishlistButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const icon = button.querySelector('i');
                const isLiked = icon.classList.contains('fas');
                
                if (isLiked) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    button.style.color = '#636e72';
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    button.style.color = '#ff6b6b';
                    
                    // Haptic feedback
                    if ('vibrate' in navigator) {
                        navigator.vibrate(30);
                    }
                }
            });
        });
    }
    
    // Search functionality enhancement
    function initSearchEnhancement() {
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        
        if (searchInput && searchButton) {
            // Auto-focus on desktop, avoid on mobile to prevent keyboard popup
            if (window.innerWidth > 768) {
                searchInput.focus();
            }
            
            // Search on enter key
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch(searchInput.value);
                }
            });
            
            // Search button click
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
                performSearch(searchInput.value);
            });
        }
        
        function performSearch(query) {
            if (query.trim()) {
                // Add loading state
                searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                // Simulate search (replace with actual search logic)
                setTimeout(() => {
                    searchButton.innerHTML = '<i class="fas fa-search"></i>';
                    console.log('Searching for:', query);
                }, 1000);
            }
        }
    }
    
    // Performance optimization: Debounced resize handler
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
    
    // Handle window resize
    const handleResize = debounce(() => {
        createMobileMenu();
        
        // Reset mobile menu on desktop
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger-menu');
            
            if (navLinks) navLinks.style.display = 'flex';
            if (hamburger) hamburger.remove();
        }
    }, 250);
    
    // Initialize all functionality
    createMobileMenu();
    initSmoothScrolling();
    initTouchDropdowns();
    initLazyLoading();
    initAddToCartFeedback();
    initWishlistFeedback();
    initSearchEnhancement();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add loading class to body when page loads
    document.body.classList.add('loaded');
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/static/js/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}