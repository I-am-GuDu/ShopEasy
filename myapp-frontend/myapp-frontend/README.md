# ShopEasy - E-Commerce Frontend

A modern, responsive e-commerce frontend built with Next.js 16, React 19, and TypeScript. This project is a migration from a Django-based HTML/CSS/JS frontend to a modern React-based architecture while preserving the original design and user experience.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16 with App Router, React 19, TypeScript 5
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Type Safety**: 100% TypeScript coverage with explicit types throughout
- **Component-Based**: Reusable React components for maintainability
- **Smooth Animations**: CSS animations and transitions for enhanced UX
- **SEO Optimized**: Server-side rendering with Next.js
- **Fast Performance**: Optimized builds with Turbopack

## 📁 Project Structure

```
myapp-frontend/
├── components/          # Reusable React components
│   ├── Header.tsx      # Main navigation header
│   ├── Footer.tsx      # Footer with links and info
│   ├── Hero.tsx        # Hero banner section
│   ├── ProductCard.tsx # Product display card
│   ├── CategoryCard.tsx # Category tile
│   ├── FlashSaleTimer.tsx # Countdown timer
│   └── Breadcrumb.tsx  # Navigation breadcrumb
├── src/
│   └── app/            # Next.js App Router pages
│       ├── layout.tsx  # Root layout with Header/Footer
│       ├── page.tsx    # Homepage
│       ├── electronics/ # Electronics category
│       ├── clothing/   # Clothing category
│       ├── kitchen/    # Kitchen category
│       ├── beauty/     # Beauty category
│       ├── sports/     # Sports category
│       ├── deals/      # Deals page
│       ├── about/      # About page
│       └── contact/    # Contact page
├── types/              # TypeScript type definitions
│   ├── product.ts      # Product interfaces
│   └── category.ts     # Category interfaces
├── lib/
│   └── data/           # Mock data
│       ├── products.ts # Product data
│       └── categories.ts # Category data
└── public/
    └── css/            # Stylesheets
        ├── home.css
        ├── categories.css
        ├── deals.css
        ├── about.css
        └── contact.css
```

## 🛠️ Tech Stack

### Core
- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.x** - Type safety

### Styling
- **CSS3** - Custom stylesheets with animations
- **Tailwind CSS 4** - Utility-first CSS framework
- **Font Awesome 6.4.0** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd myapp-frontend/myapp-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Components

### Header
Main navigation component with:
- Top bar with contact information
- Logo and search bar
- User, wishlist, and cart icons with badges
- Dropdown navigation menu
- Active page highlighting

### Footer
Footer component with:
- Company information and social links
- Quick links to main pages
- Category navigation
- Contact details
- Dynamic copyright year

### ProductCard
Reusable product display card with:
- Product image with hover zoom
- Product name and description
- Current and old price display
- Add to Cart button
- Wishlist button

### CategoryCard
Category tile component with:
- Font Awesome icon
- Category name and description
- Link to category page
- Animated hover effects

### FlashSaleTimer
Countdown timer component with:
- Days, hours, minutes, seconds display
- Real-time updates every second
- Formatted time display
- Automatic cleanup

### Breadcrumb
Navigation breadcrumb with:
- Clickable parent page links
- Current page indicator
- Separator between items

### Hero
Hero banner component with:
- Full-width background image
- Promotional text
- Call-to-action button
- Animated entrance

## 📄 Pages

### Homepage (`/`)
- Hero banner with promotional content
- Category grid (5 categories)
- Featured products grid
- Flash sale section with countdown timer

### Category Pages
- `/electronics` - Electronics products
- `/clothing` - Clothing items
- `/kitchen` - Home & Kitchen products
- `/beauty` - Beauty products
- `/sports` - Sports equipment

Each category page includes:
- Breadcrumb navigation
- Category banner
- Subcategories grid
- Products grid

### Deals Page (`/deals`)
- Deal banner with gradient
- Flash sale countdown timer
- Special deal products grid
- Discount badges

### About Page (`/about`)
- Company story and mission
- Feature highlights
- Leadership team section
- Responsive layout

### Contact Page (`/contact`)
- Contact information cards
- Contact form with validation
- Map section placeholder
- 3D styling effects

## 🎯 Type Definitions

### Product
```typescript
interface Product {
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

### Category
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
}
```

### Subcategory
```typescript
interface Subcategory {
  id: string;
  name: string;
  parentCategory: string;
  image: string;
}
```

## 🎨 Styling

### CSS Variables
```css
:root {
  --primary: #4a6de5;      /* Primary blue */
  --secondary: #ff6b6b;    /* Accent red */
  --dark: #2d3436;         /* Dark text */
  --light: #f7f9fc;        /* Light background */
  --gray: #636e72;         /* Gray text */
  --success: #00b894;      /* Success green */
  --card-bg: rgba(255, 255, 255, 0.85); /* Card background */
}
```

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 576px - 767px
- **Small Mobile**: <576px

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/` for root)
- Full type coverage

### Next.js
- App Router enabled
- Turbopack for development
- Server-side rendering
- Automatic code splitting

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## 📊 Performance

- **Initial Load**: ~300-600ms
- **Cached Navigation**: <50ms
- **Animations**: 60fps
- **Bundle Size**: Optimized with code splitting

## 🧪 Testing

The project includes comprehensive testing documentation:
- Interactive elements testing
- Browser compatibility testing
- TypeScript type verification
- CSS styling verification

See test reports in the project root:
- `INTERACTIVE_ELEMENTS_TEST.md`
- `BROWSER_COMPATIBILITY_TEST.md`
- `TYPESCRIPT_IMPROVEMENTS.md`
- `CSS_VERIFICATION_REPORT.md`

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `.next` folder to your hosting platform
3. Ensure Node.js 18+ is available on the server

## 📝 Development Guidelines

### Component Creation
1. Create component in `components/` directory
2. Add TypeScript interfaces for props
3. Add JSDoc comments for documentation
4. Export as default function
5. Use explicit return types

### Adding New Pages
1. Create folder in `src/app/` with route name
2. Add `page.tsx` file
3. Import necessary components
4. Add proper TypeScript types
5. Update navigation if needed

### Styling
1. Use existing CSS classes when possible
2. Add new styles to appropriate CSS file
3. Follow BEM naming convention
4. Ensure responsive design
5. Test across breakpoints

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add JSDoc comments to all components
3. Ensure type safety (no `any` types)
4. Test responsive design
5. Verify browser compatibility

## 📄 License

This project is part of the ShopEasy e-commerce platform.

## 👥 Team

Developed as part of the ShopEasy frontend migration project.

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using Next.js and React**
