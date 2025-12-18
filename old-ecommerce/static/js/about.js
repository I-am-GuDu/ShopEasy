// Mindblowing About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Add 3D tilt effect to feature cards
    const featureCards = document.querySelectorAll('.feature');
    featureCards.forEach(card => {
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
    
    // Add 3D tilt effect to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mousemove', (e) => {
            const memberRect = member.getBoundingClientRect();
            const memberCenterX = memberRect.left + memberRect.width / 2;
            const memberCenterY = memberRect.top + memberRect.height / 2;
            
            const xAxis = (e.pageX - memberCenterX) / 30;
            const yAxis = (memberCenterY - e.pageY) / 30;
            
            member.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(30px)`;
        });
        
        member.addEventListener('mouseenter', () => {
            member.style.transition = 'none';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            member.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        });
    });
    
    // Add animation to about content sections
    const aboutSections = document.querySelectorAll('.about-content > *');
    aboutSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    // Add animation to features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    // Add animation to team members
    const teamMemberCards = document.querySelectorAll('.team-member');
    teamMemberCards.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
        }, 300 * index);
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
    
    @keyframes moveCube {
        0% { transform: translateX(0) rotate(45deg); }
        25% { transform: translateX(20px) rotate(45deg); }
        50% { transform: translateX(0) rotate(45deg); }
        75% { transform: translateX(-20px) rotate(45deg); }
        100% { transform: translateX(0) rotate(45deg); }
    }
    
    @keyframes moveDot {
        0% { transform: translateX(0); }
        25% { transform: translateX(20px); }
        50% { transform: translateX(0); }
        75% { transform: translateX(-20px); }
        100% { transform: translateX(0); }
    }
    
    @keyframes glow {
        0% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #4a6de5, 0 0 40px #4a6de5; }
        100% { text-shadow: 0 0 20px #fff, 0 0 30px #6a11cb, 0 0 40px #6a11cb, 0 0 50px #6a11cb; }
    }
`;
document.head.appendChild(style);