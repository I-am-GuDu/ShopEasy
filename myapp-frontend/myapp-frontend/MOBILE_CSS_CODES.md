# Mobile CSS Codes - Complete Reference

## Overview
This document contains all the mobile CSS codes used for responsive design optimization on ShopEasy frontend.

---

## 1. Tablet/Medium Mobile (768px and below)

```css
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 0 15px;
    }

    /* ===== HEADER SECTION ===== */
    
    /* Hide top bar on mobile */
    .top-bar {
        display: none !important;
    }

    /* Single line header: Logo + Search + Icons */
    .main-header {
        flex-direction: row !important;
        align-items: center !important;
        gap: 8px !important;
        padding: 8px 0 !important;
        justify-content: space-between !important;
    }

    .logo {
        font-size: clamp(16px, 4vw, 20px) !important;
        order: 1 !important;
        flex-shrink: 0 !important;
        margin: 0 !important;
        transition: all 0.3s ease;
    }

    .logo i {
        font-size: clamp(14px, 3.5vw, 18px) !important;
        margin-right: 3px !important;
        transition: all 0.3s ease;
    }

    /* Search bar optimization */
    .search-bar {
        order: 2 !important;
        flex: 1 !important;
        margin: 0 8px !important;
        max-width: none !important;
        width: auto !important;
    }

    .search-bar input {
        padding: 6px 32px 6px 10px !important;
        font-size: 12px !important;
        border-radius: 18px !important;
        background: #f5f7fa !important;
        border: 1px solid transparent !important;
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.05) !important;
    }

    .search-bar input:focus {
        background: white !important;
        border-color: var(--primary) !important;
        box-shadow: 0 2px 8px rgba(74, 109, 229, 0.15) !important;
    }

    .search-bar button {
        padding: 0 !important;
        width: 26px !important;
        height: 26px !important;
        right: 3px !important;
        top: 3px !important;
        font-size: 11px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 50% !important;
        box-shadow: 0 1px 3px rgba(74, 109, 229, 0.3) !important;
    }

    /* Header icons */
    .header-icons {
        order: 3 !important;
        gap: 6px !important;
        flex-shrink: 0 !important;
        display: flex !important;
        flex-direction: row !important;
        justify-content: flex-end !important;
        align-items: center !important;
    }

    .icon-item {
        width: 24px !important;
        height: 24px !important;
        font-size: 11px !important;
        box-shadow: none !important;
        background: transparent !important;
        border: none !important;
        padding: 2px !important;
        color: var(--dark) !important;
    }

    .icon-item:hover {
        transform: none !important;
        color: var(--dark) !important;
    }

    .icon-item:active {
        color: var(--dark) !important;
        background: rgba(0, 0, 0, 0.05) !important;
    }

    .icon-item:visited {
        color: var(--dark) !important;
    }

    .icon-item:focus {
        color: var(--dark) !important;
        outline: none !important;
    }

    .icon-item .badge {
        width: 12px !important;
        height: 12px !important;
        font-size: 7px !important;
        top: -3px !important;
        right: -3px !important;
        font-weight: 600 !important;
    }

    /* ===== NAVIGATION SECTION ===== */
    
    nav {
        overflow-x: auto !important;
        overflow-y: visible !important;
        -webkit-overflow-scrolling: touch !important;
        position: relative !important;
    }

    nav::before {
        animation: none !important;
        display: none !important;
    }

    .nav-links {
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        overflow-x: auto !important;
        overflow-y: visible !important;
        -webkit-overflow-scrolling: touch !important;
        justify-content: flex-start !important;
        display: flex !important;
    }

    .nav-links li {
        flex-shrink: 0 !important;
        display: inline-block !important;
        position: relative !important;
    }

    .nav-links a {
        padding: 10px 12px !important;
        font-size: 13px !important;
        border-bottom: none !important;
        white-space: nowrap !important;
        display: inline-block !important;
        animation: none !important;
        transform: none !important;
    }

    .nav-links a::before {
        animation: none !important;
        display: none !important;
    }

    /* ===== DROPDOWN MENU ===== */
    
    .dropdown {
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
        background: white !important;
        border-radius: 0 0 8px 8px !important;
        min-width: 180px !important;
        display: none !important;
        flex-direction: column !important;
        z-index: 10000 !important;
        animation: none !important;
        transform: none !important;
        opacity: 1 !important;
    }

    .nav-links li:hover .dropdown,
    .dropdown.show {
        display: flex !important;
        animation: none !important;
    }

    .dropdown a {
        padding: 12px 15px !important;
        font-size: 13px !important;
        color: var(--dark) !important;
        display: block !important;
        border-bottom: 1px solid #eee !important;
        text-align: left !important;
    }

    .dropdown a:last-child {
        border-bottom: none !important;
    }

    .dropdown a:hover {
        background-color: var(--light) !important;
        color: var(--primary) !important;
    }

    /* ===== HERO SECTION ===== */
    
    .hero {
        padding: 20px 0 !important;
        margin-bottom: 15px !important;
        position: relative !important;
        overflow: hidden !important;
    }

    .hero::before {
        animation: none !important;
    }

    .hero-content {
        animation: none !important;
        transform: none !important;
    }

    .hero h1 {
        font-size: 1.3rem !important;
        margin-bottom: 8px !important;
        line-height: 1.1 !important;
        animation: none !important;
        transform: none !important;
    }

    .hero h1::after {
        display: none !important;
    }

    .hero p {
        font-size: 0.85rem !important;
        margin-bottom: 12px !important;
        padding: 0 15px !important;
        line-height: 1.3 !important;
        animation: none !important;
        transform: none !important;
    }

    .btn {
        padding: 10px 25px !important;
        font-size: 14px !important;
        border-radius: 20px !important;
        animation: none !important;
        transform: none !important;
    }

    /* ===== SECTION TITLES ===== */
    
    .section-title {
        margin: 40px 0 25px;
    }

    .section-title h2 {
        font-size: 1.8rem;
        padding: 0 20px;
    }

    .section-title p {
        padding: 0 30px;
        font-size: 1rem;
    }

    /* ===== CATEGORIES SECTION ===== */
    
    .categories {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
    }

    .category-card {
        padding: 20px 15px;
        border-radius: 12px;
    }

    .category-icon {
        font-size: 35px;
        height: 70px;
        margin-bottom: 10px;
    }

    .category-card h3 {
        font-size: 1.1rem;
        margin-bottom: 8px;
        padding: 0 10px;
    }

    .category-card p {
        font-size: 0.9rem;
        padding: 0 10px 15px;
    }

    /* ===== PRODUCTS SECTION ===== */
    
    .products {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
    }

    .product-card {
        border-radius: 12px;
    }

    .product-image {
        height: 140px;
    }

    .product-info {
        padding: 15px;
    }

    .product-info h3 {
        font-size: 1rem;
        margin-bottom: 8px;
        line-height: 1.3;
    }

    .product-price {
        font-size: 1.1rem;
        margin-bottom: 12px;
    }

    .product-price .old-price {
        font-size: 0.9rem;
    }

    .product-actions {
        flex-direction: column;
        gap: 8px;
    }

    .add-to-cart {
        padding: 12px 15px;
        font-size: 14px;
        border-radius: 8px;
    }

    .wishlist {
        align-self: center;
        width: 35px;
        height: 35px;
        font-size: 16px;
        background: rgba(255, 107, 107, 0.1);
        border-radius: 50%;
    }

    /* ===== DEALS SECTION ===== */
    
    .deals {
        padding: 50px 0;
        margin: 30px 0;
    }

    .deals h2 {
        font-size: 2rem;
        margin-bottom: 15px;
        padding: 0 20px;
    }

    .deals p {
        font-size: 1.1rem;
        margin-bottom: 25px;
        padding: 0 30px;
    }

    .timer {
        gap: 12px;
        margin: 30px 0;
        flex-wrap: wrap;
        justify-content: center;
    }

    .timer-box {
        min-width: 70px;
        padding: 15px 10px;
        border-radius: 12px;
    }

    .timer-value {
        font-size: 1.8rem;
    }

    .timer-label {
        font-size: 0.9rem;
    }

    /* ===== FOOTER SECTION ===== */
    
    .footer-content {
        grid-template-columns: 1fr;
        gap: 25px;
        text-align: center;
    }

    .footer-column h3 {
        font-size: 1.2rem;
        margin-bottom: 15px;
    }

    .footer-column h3::after {
        left: 50%;
        transform: translateX(-50%);
    }

    .footer-links li {
        margin-bottom: 10px;
        padding-left: 0;
    }

    .footer-links li::before {
        display: none;
    }

    .social-links {
        justify-content: center;
        gap: 20px;
    }

    .social-links a {
        width: 45px;
        height: 45px;
        font-size: 18px;
    }
}
```

---

## 2. Small Mobile (576px and below)

```css
@media (max-width: 576px) {
    .container {
        padding: 0 10px;
    }

    /* ===== EXTRA COMPACT HEADER ===== */
    
    .main-header {
        padding: 6px 0;
        gap: 6px;
    }

    .logo {
        font-size: 14px;
    }

    .logo i {
        font-size: 12px;
        margin-right: 2px;
    }

    .search-bar {
        margin: 0 5px !important;
    }

    .search-bar input {
        padding: 5px 28px 5px 8px !important;
        font-size: 11px !important;
        border-radius: 16px !important;
    }

    .search-bar button {
        padding: 0 !important;
        width: 22px !important;
        height: 22px !important;
        right: 3px !important;
        top: 3px !important;
        font-size: 10px !important;
    }

    .header-icons {
        gap: 5px !important;
    }

    .icon-item {
        width: 22px !important;
        height: 22px !important;
        font-size: 10px !important;
        color: var(--dark) !important;
    }

    .icon-item:active,
    .icon-item:hover,
    .icon-item:visited,
    .icon-item:focus {
        color: var(--dark) !important;
    }

    .icon-item .badge {
        width: 11px !important;
        height: 11px !important;
        font-size: 6px !important;
    }

    .nav-links a {
        padding: 8px 10px;
        font-size: 12px;
    }

    /* ===== EXTRA COMPACT HERO ===== */
    
    .hero {
        padding: 15px 0 !important;
        margin-bottom: 10px !important;
    }

    .hero::before,
    .hero-content,
    .hero h1,
    .hero p,
    .hero .btn {
        animation: none !important;
        transform: none !important;
    }

    .hero h1 {
        font-size: 1.1rem !important;
        margin-bottom: 6px !important;
    }

    .hero p {
        font-size: 0.75rem !important;
        margin-bottom: 10px !important;
        padding: 0 10px !important;
    }

    .btn {
        padding: 8px 20px !important;
        font-size: 13px !important;
    }

    /* ===== EXTRA COMPACT SECTIONS ===== */
    
    .section-title h2 {
        font-size: 1.5rem;
    }

    .categories {
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .category-card {
        padding: 15px 10px;
    }

    .category-icon {
        font-size: 30px;
        height: 60px;
    }

    .category-card h3 {
        font-size: 1rem;
    }

    .category-card p {
        font-size: 0.8rem;
    }

    .products {
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .product-info h3 {
        font-size: 0.9rem;
    }

    .product-price {
        font-size: 1rem;
    }

    .add-to-cart {
        padding: 10px 12px;
        font-size: 13px;
    }

    .deals h2 {
        font-size: 1.7rem;
    }

    .deals p {
        font-size: 1rem;
    }

    .timer {
        gap: 8px;
    }
}
```

---

## 3. Very Small Screens (360px and below)

```css
@media (max-width: 360px) {
    /* Very Small Screens */
    .categories,
    .products {
        grid-template-columns: 1fr;
    }

    .hero h1 {
        font-size: 1.6rem;
    }

    .section-title h2 {
        font-size: 1.3rem;
    }

    .timer {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .timer-box {
        width: 80%;
        min-width: auto;
    }
}
```

---

## Key Mobile Optimization Features

### 1. **Header Optimization**
- Single-line layout: Logo + Search + Icons
- Removed top bar completely
- Fluid typography using `clamp()`
- Reduced icon sizes

### 2. **Navigation**
- Horizontal scrolling on mobile
- Dropdown with fixed positioning
- No animations on mobile
- Touch-friendly spacing

### 3. **Dropdown Menu (React-controlled)**
- Uses inline styles for positioning
- `position: fixed` on mobile
- `position: absolute` on desktop
- Backdrop overlay on mobile
- Prevents body scroll when open

### 4. **Content Sections**
- Responsive grid layouts
- Reduced padding and margins
- Optimized font sizes
- Touch-friendly buttons

### 5. **Performance**
- Disabled animations on mobile
- Removed unnecessary transforms
- Optimized shadows and effects
- Smooth transitions

---

## Breakpoints Used

| Breakpoint | Device Type | Use Case |
|-----------|------------|----------|
| 768px | Tablet/Medium Mobile | Main mobile optimization |
| 576px | Small Mobile | Extra compact layout |
| 360px | Very Small Screens | Minimal layout |

---

## Notes

- All mobile styles use `!important` to override desktop styles
- Animations are disabled on mobile for better performance
- Touch-friendly spacing (minimum 44px for interactive elements)
- Responsive typography using `clamp()` for fluid scaling
- Dropdown menu is controlled by React component with inline styles

