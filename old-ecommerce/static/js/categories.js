// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartBadge = document.getElementById('cart-count');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + 1;
        
        // Animation effect
        button.textContent = 'Added!';
        button.style.backgroundColor = '#00b894';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '';
        }, 2000);
    });
});

// Wishlist functionality
const wishlistButtons = document.querySelectorAll('.wishlist');
const wishlistBadge = document.getElementById('wishlist-count');

wishlistButtons.forEach(button => {
    button.addEventListener('click', () => {
        const icon = button.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.color = '#ff6b6b';
            
            const currentCount = parseInt(wishlistBadge.textContent);
            wishlistBadge.textContent = currentCount + 1;
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.color = '';
            
            const currentCount = parseInt(wishlistBadge.textContent);
            wishlistBadge.textContent = currentCount - 1;
        }
    });
});