// Mindblowing Deals Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Timer functionality
    function updateTimer() {
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement && hoursElement && minutesElement && secondsElement) {
            let days = parseInt(daysElement.textContent);
            let hours = parseInt(hoursElement.textContent);
            let minutes = parseInt(minutesElement.textContent);
            let seconds = parseInt(secondsElement.textContent);
            
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        hours = 23;
                        days--;
                        if (days < 0) {
                            // Reset timer or handle end of sale
                            days = 2;
                            hours = 23;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                }
            }
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // Start timer if elements exist
    if (document.getElementById('days')) {
        setInterval(updateTimer, 1000);
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBadge = document.getElementById('cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Animation effect
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.background = 'linear-gradient(135deg, #00b894, #009688)';
            
            // Update cart badge
            if (cartBadge) {
                const currentCount = parseInt(cartBadge.textContent);
                cartBadge.textContent = currentCount + 1;
                
                // Add animation to badge
                cartBadge.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    cartBadge.style.animation = '';
                }, 500);
            }
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        });
    });
    
    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist');
    const wishlistBadge = document.getElementById('wishlist-count');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = button.querySelector('i') || button;
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.style.color = '#ff6b6b';
                
                // Update wishlist badge
                if (wishlistBadge) {
                    const currentCount = parseInt(wishlistBadge.textContent);
                    wishlistBadge.textContent = currentCount + 1;
                    
                    // Add animation to badge
                    wishlistBadge.style.animation = 'pulse 0.5s';
                    setTimeout(() => {
                        wishlistBadge.style.animation = '';
                    }, 500);
                }
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                button.style.color = '';
                
                // Update wishlist badge
                if (wishlistBadge) {
                    const currentCount = parseInt(wishlistBadge.textContent);
                    wishlistBadge.textContent = currentCount - 1;
                }
            }
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this, 'rgba(255, 255, 255, 0.5)');
        });
    });
    
    // Add ripple effect to header icons
    const headerIcons = document.querySelectorAll('.icon-item');
    headerIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            createRipple(e, this, 'rgba(74, 109, 229, 0.3)');
        });
    });
    
    // Add 3D tilt effect to deal products
    const dealProducts = document.querySelectorAll('.deal-product');
    dealProducts.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const xAxis = (e.pageX - cardCenterX) / 25;
            const yAxis = (cardCenterY - e.pageY) / 25;
            
            card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        });
    });
    
    // Add floating animation to discount badges
    const discountBadges = document.querySelectorAll('.discount-badge');
    discountBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.animation = 'pulse 0.5s';
        });
        
        badge.addEventListener('animationend', () => {
            badge.style.animation = '';
        });
    });
});

// Function to create ripple effect
function createRipple(e, element, color) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${color};
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: -1;
    `;
    
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add custom animations to head
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(30);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);