# Design Document: ShopEasy Frontend Migration to Next.js

## Overview

This design outlines the migration of the existing ShopEasy HTML/CSS/JS frontend to a modern Next.js 14+ application with React, TypeScript, and Tailwind CSS. The migration will preserve the exact visual design and user experience while restructuring the code into reusable React components with proper routing, state management, and TypeScript typing.

## Architecture

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Language**: TypeScript
- **Styling**: Existing CSS files + Tailwind CSS for utilities
- **Icons**: Font Awesome 6.4.0
- **State Management**: React hooks (useState, useEffect)

### Migration Strategy

**Approach**: Component-based conversion
1. Extract reusable components from HTML templates
2. Convert static HTML to JSX
3. Migrate CSS files to Next.js public/styles structure
4. Implement routing with Next.js App Router
5. Add TypeScript interfaces for data structures
6. Preserve exact visual appearance

## Components and Interfaces

### Project Structure

```
myapp-frontend/myapp-frontend/
├── app/
│   ├── layout.tsx                 # Root layout with Header/Footer
│   ├── page.tsx                   # Homepage
│   ├── electronics/
│   │   └── page.tsx              # Electronics category page
│   ├── clothing/
│   │   └── page.tsx              # Clothing category page
│   ├── kitchen/
│   │   └── page.tsx              # Kitchen category page
│   ├── beauty/
│   │   └── page.tsx              # Beauty category page
│   ├── sports/
│   │   └── page.tsx              # Sports category page
│   ├── deals/
│   │   └── page.tsx              # Deals page
│   ├── about/
│   │   └── page.tsx              # About page
│   └── contact/
│       └── page.tsx              # Contact page
├── components/
│   ├── Header.tsx                # Header with nav, search, icons
│   ├── Footer.tsx                # Footer with links
│   ├── ProductCard.tsx           # Individual product display
│   ├── CategoryCard.tsx          # Category tile
│   ├── Hero.tsx                  # Hero banner section
│   ├── FlashSaleTimer.tsx        # Countdown timer
│   └── Breadcrumb.tsx            # Breadcrumb navigation
├── public/
│   ├── css/
│   │   ├── home.css
│   │   ├── categories.css
│   │   ├── deals.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   └── mobile-optimizations.css
│   └── js/
│       └── (legacy JS if needed)
├── types/
│   ├── product.ts                # Product interface
│   └── category.ts               # Category interface
└── lib/
    └── data/
        ├── products.ts           # Mock product data
        └── categories.ts         # Mock category data
```

### Core Components

#### 1. Header Component

**File**: `components/Header.tsx`

**Props**: None (or active page for highlighting)

**Features**:
- Top bar with welcome message and contact info
- Logo with link to homepage
- Search bar (UI only for now)
- User, wishlist, cart icons with badges
- Navigation menu with dropdown for categories
- Active page highlighting

**Structure**:
```tsx
export default function Header() {
  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar">...</div>
      
      {/* Main Header */}
      <div className="main-header">
        <Logo />
        <SearchBar />
        <HeaderIcons />
      </div>
      
      {/* Navigation */}
      <nav>
        <NavigationLinks />
      </nav>
    </header>
  );
}
```

#### 2. Footer Component

**File**: `components/Footer.tsx`

**Props**: None

**Features**:
- Company info with social links
- Quick links section
- Categories section
- Contact information
- Copyright notice

#### 3. ProductCard Component

**File**: `components/ProductCard.tsx`

**Props**:
```typescript
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    alt: string;
  };
}
```

**Features**:
- Product image
- Product name
- Current price and old price (if on sale)
- Add to Cart button
- Wishlist button

#### 4. CategoryCard Component

**File**: `components/CategoryCard.tsx`

**Props**:
```typescript
interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    icon: string;
    link: string;
  };
}
```

**Features**:
- Category icon (Font Awesome)
- Category name
- Description
- Link to category page

#### 5. FlashSaleTimer Component

**File**: `components/FlashSaleTimer.tsx`

**Props**:
```typescript
interface FlashSaleTimerProps {
  targetDate: Date;
}
```

**Features**:
- Countdown timer with days, hours, minutes, seconds
- Updates every second using useEffect
- Displays in styled timer boxes

**Implementation**:
```typescript
'use client';

import { useState, useEffect } from 'react';

export default function FlashSaleTimer({ targetDate }: FlashSaleTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    // Calculate days, hours, minutes, seconds
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="timer">
      {/* Timer boxes */}
    </div>
  );
}
```

## Data Models

### TypeScript Interfaces

**types/product.ts**:
```typescript
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
}
```

**types/category.ts**:
```typescript
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  parentCategory: string;
  image: string;
}
```

### Mock Data

**lib/data/products.ts**:
```typescript
export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Smart Watch Series 5',
    price: 199.99,
    oldPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12...',
    category: 'electronics',
    inStock: true,
  },
  // ... more products
];
```

**lib/data/categories.ts**:
```typescript
export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and devices',
    icon: 'fa-laptop',
  },
  // ... more categories
];
```

## Page Implementations

### Homepage (app/page.tsx)

**Structure**:
```tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import FlashSaleTimer from '@/components/FlashSaleTimer';
import { categories } from '@/lib/data/categories';
import { featuredProducts } from '@/lib/data/products';

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Categories Section */}
      <section className="container">
        <div className="section-title">
          <h2>Shop by Category</h2>
        </div>
        <div className="categories">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
        </div>
        <div className="products">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="deals">
        <div className="container deals-content">
          <h2>Flash Sale - Limited Time Offer!</h2>
          <p>Don't miss out on our biggest sale of the year.</p>
          <FlashSaleTimer targetDate={new Date('2024-12-31')} />
        </div>
      </section>
    </>
  );
}
```

### Category Page Template (app/electronics/page.tsx)

**Structure**:
```tsx
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/data/products';

export default function ElectronicsPage() {
  const products = getProductsByCategory('electronics');
  
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Electronics' }]} />
      
      {/* Category Banner */}
      <section className="category-banner">
        <div className="container">
          <h1>Electronics</h1>
          <p>Discover the latest gadgets and tech innovations</p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="container">
        {/* Subcategory grid */}
      </section>

      {/* Products */}
      <section className="container">
        <div className="section-title">
          <h2>Featured Electronics</h2>
        </div>
        <div className="products">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
```

### Root Layout (app/layout.tsx)

**Structure**:
```tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import '../public/css/home.css';
import '../public/css/categories.css';
// ... other CSS imports

export const metadata = {
  title: 'ShopEasy - Your Online Shopping Destination',
  description: 'Quality products at affordable prices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## CSS Migration Strategy

### Approach

1. **Copy existing CSS files** to `public/css/` directory
2. **Import CSS files** in layout.tsx or specific pages
3. **Keep class names identical** to preserve styling
4. **Add Tailwind utilities** only where needed for new features
5. **Maintain responsive design** from mobile-optimizations.css

### CSS File Organization

```
public/css/
├── home.css                    # Homepage specific styles
├── categories.css              # Category pages styles
├── deals.css                   # Deals page styles
├── about.css                   # About page styles
├── contact.css                 # Contact page styles
└── mobile-optimizations.css    # Responsive design
```

## Navigation and Routing

### Route Structure

| Original URL | Next.js Route | File Path |
|-------------|---------------|-----------|
| / | / | app/page.tsx |
| /home/ | / | app/page.tsx |
| /electronics/ | /electronics | app/electronics/page.tsx |
| /clothing/ | /clothing | app/clothing/page.tsx |
| /kitchen/ | /kitchen | app/kitchen/page.tsx |
| /beauty/ | /beauty | app/beauty/page.tsx |
| /sports/ | /sports | app/sports/page.tsx |
| /deals/ | /deals | app/deals/page.tsx |
| /about/ | /about | app/about/page.tsx |
| /contact/ | /contact | app/contact/page.tsx |

### Link Component Usage

Replace all `<a href="{% url 'name' %}">` with Next.js Link:

```tsx
import Link from 'next/link';

<Link href="/electronics" className="category-card">
  {/* Content */}
</Link>
```

## Client-Side Interactivity

### Components Requiring 'use client'

1. **FlashSaleTimer** - Uses useState and useEffect
2. **SearchBar** - If implementing search functionality
3. **MobileMenu** - If implementing mobile menu toggle
4. **AddToCart buttons** - When adding cart functionality

### Example:

```tsx
'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button><i className="fas fa-search"></i></button>
    </div>
  );
}
```

## Design Decisions and Rationales

### Keep Existing CSS vs Rewrite with Tailwind
**Decision**: Keep existing CSS files
**Rationale**:
- Preserves exact visual appearance
- Faster migration (no style rewriting needed)
- Can gradually introduce Tailwind for new features
- Reduces risk of visual regressions

### Component Granularity
**Decision**: Create moderately granular components
**Rationale**:
- Balance between reusability and simplicity
- ProductCard and CategoryCard are highly reusable
- Header/Footer are complex enough to be separate
- Avoid over-engineering with too many tiny components

### Mock Data Location
**Decision**: Store mock data in lib/data/ directory
**Rationale**:
- Centralized data management
- Easy to replace with API calls later
- TypeScript interfaces ensure data consistency
- Simulates real data structure

### App Router vs Pages Router
**Decision**: Use App Router
**Rationale**:
- Modern Next.js approach
- Better performance with Server Components
- Simpler layout system
- Future-proof for Next.js updates

## Testing Strategy

### Manual Testing Checklist

1. **Visual Comparison**
   - Compare each page side-by-side with original HTML version
   - Verify all styling matches exactly
   - Test responsive design at different screen sizes

2. **Navigation Testing**
   - Click all navigation links
   - Verify category dropdown works
   - Test breadcrumb navigation
   - Verify logo links to homepage

3. **Component Testing**
   - Verify all products display correctly
   - Test flash sale timer counts down
   - Check icons display properly
   - Verify badges show correct numbers

4. **Browser Testing**
   - Test in Chrome, Firefox, Safari
   - Test on mobile devices
   - Verify Font Awesome icons load

### Acceptance Criteria

- ✅ All pages render without errors
- ✅ Visual appearance matches original exactly
- ✅ Navigation works smoothly
- ✅ Responsive design works on mobile
- ✅ No console errors
- ✅ Flash sale timer updates every second
