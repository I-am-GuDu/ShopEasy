// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // Show success message with advanced animation
                const successMessage = document.createElement('div');
                successMessage.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <i class="fas fa-check-circle" style="font-size: 24px; color: #00b894;"></i>
                        <div>
                            <h3 style="margin: 0 0 5px; color: white;">Message Sent!</h3>
                            <p style="margin: 0; color: rgba(255,255,255,0.9);">Thank you, ${name}! We'll get back to you soon.</p>
                        </div>
                    </div>
                `;
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #4a6de5, #6a11cb);
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    z-index: 1000;
                    transform: translateX(100%);
                    animation: slideInRight 0.5s forwards, fadeOut 0.5s 4s forwards;
                    border-left: 4px solid #00b894;
                `;
                
                document.body.appendChild(successMessage);
                
                // Add floating animation to success message
                const floatAnimation = document.createElement('style');
                floatAnimation.textContent = `
                    @keyframes floatSuccess {
                        0% { transform: translateX(100%) translateY(0); }
                        50% { transform: translateX(100%) translateY(-10px); }
                        100% { transform: translateX(100%) translateY(0); }
                    }
                    #successMessage {
                        animation: floatSuccess 2s ease-in-out infinite;
                    }
                `;
                document.head.appendChild(floatAnimation);
                
                successMessage.id = 'successMessage';
                
                // Reset form
                contactForm.reset();
            } else {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.textContent = 'Please fill in all fields.';
                errorMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #ff6b6b;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 1000;
                    transform: translateX(100%);
                    animation: slideInRight 0.5s forwards, fadeOut 0.5s 3s forwards;
                `;
                
                document.body.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 3500);
            }
        });
    }
    
    // Add advanced animations to form elements
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'transform 0.3s ease';
            
            // Add glow effect
            input.style.boxShadow = '0 0 0 3px rgba(74, 109, 229, 0.3)';
        });
        
        // Remove focus effect
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
            input.style.boxShadow = '';
        });
        
        // Add typing effect
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderLeft = '3px solid #4a6de5';
            } else {
                this.style.borderLeft = '1px solid #ddd';
            }
        });
    });
    
    // Add advanced animation to submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
            submitBtn.style.transform = 'translateY(-3px)';
            submitBtn.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            submitBtn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            submitBtn.style.transform = 'translateY(0)';
            submitBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        submitBtn.addEventListener('mousedown', () => {
            submitBtn.style.transform = 'translateY(0) scale(0.98)';
        });
        
        submitBtn.addEventListener('mouseup', () => {
            submitBtn.style.transform = 'translateY(-3px) scale(1)';
        });
    }
    
    // Add advanced 3D animations to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        // Add staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
        
        // Add 3D tilt effect with advanced physics
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
    
    // Add ripple effect to form inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function(e) {
            createRipple(e, this, 'rgba(74, 109, 229, 0.3)');
        });
    });
    
    // Add ripple effect to submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            createRipple(e, this, 'rgba(255, 255, 255, 0.5)');
        });
    }
    
    // Add ripple effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add floating animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'floatLogo 2s ease-in-out infinite';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.animation = '';
        });
    }
    
    // Add floating animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title h2');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'floatTitle 3s ease-in-out infinite';
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.animation = '';
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
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes floatLogo {
        0% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0); }
    }
    
    @keyframes floatTitle {
        0% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);