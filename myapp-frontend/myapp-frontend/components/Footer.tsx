import Link from 'next/link';

/**
 * Footer Component
 * 
 * Main footer section for the ShopEasy application.
 * Contains company information, navigation links, and contact details.
 * 
 * Features:
 * - Four-column responsive layout
 * - Company info with social media links
 * - Quick links to main pages
 * - Category navigation
 * - Contact information
 * - Dynamic copyright year
 * 
 * @returns {JSX.Element} The rendered footer component
 */
export default function Footer(): JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>ShopEasy</h3>
            <p>Your one-stop destination for all your shopping needs. Quality products at affordable prices.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/deals">Deals</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><Link href="/electronics">Electronics</Link></li>
              <li><Link href="/clothing">Clothing</Link></li>
              <li><Link href="/kitchen">Home & Kitchen</Link></li>
              <li><Link href="/beauty">Beauty</Link></li>
              <li><Link href="/sports">Sports</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><i className="fas fa-map-marker-alt"></i> 123 Shopping Street, Retail City</li>
              <li><i className="fas fa-phone"></i> +1 234 567 890</li>
              <li><i className="fas fa-envelope"></i> info@shopeasy.com</li>
              <li><i className="fas fa-clock"></i> Mon-Sat: 9:00 AM - 8:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          &copy; {currentYear} ShopEasy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}