import Link from 'next/link';

/**
 * Hero Component
 * 
 * Main hero banner section for the homepage.
 * Displays promotional content with call-to-action button.
 * 
 * Features:
 * - Full-width background image with overlay
 * - Animated entrance effects
 * - Call-to-action button linking to deals page
 * - Responsive text sizing
 * 
 * @returns {JSX.Element} The rendered hero section
 */
export default function Hero(): JSX.Element {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>Summer Sale is Live!</h1>
        <p>Up to 70% off on all products. Limited time offer. Shop now!</p>
        <Link href="/deals" className="btn">Shop Now</Link>
      </div>
    </section>
  );
}