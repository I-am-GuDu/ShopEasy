'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

/**
 * Header Component
 * 
 * Main navigation header for the ShopEasy application.
 * Includes top bar, logo, search functionality, user icons, and navigation menu.
 * 
 * Features:
 * - Sticky header with backdrop blur effect
 * - Active page highlighting
 * - Dropdown navigation for categories
 * - Search bar with state management
 * - Cart and wishlist badges
 * - Responsive mobile layout
 * 
 * @returns The rendered header component
 */
export default function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
      console.log('📱 Window width:', width, '→ isMobile:', mobile);
      setIsMobile(mobile);
    };
    
    // Set initial value
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (path: string): boolean => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const isCategoryActive = (): boolean => {
    const categoryPages: string[] = ['/electronics', '/clothing', '/kitchen', '/beauty', '/sports'];
    return categoryPages.some((category: string) => pathname.startsWith(category));
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMouseEnter = (): void => {
    if (!isMobile) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = (): void => {
    if (!isMobile) {
      setIsDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Debug: Log when component renders
  console.log('🔄 Header render - isMobile:', isMobile, 'isDropdownOpen:', isDropdownOpen);

  return (
    <>
      {/* Mobile Dropdown - Rendered outside header for proper z-index */}
      {isMobile && isDropdownOpen && (
        <div 
          className="dropdown show"
          style={{
            display: 'flex',
            position: 'fixed',
            top: '60px',
            left: '10px',
            right: '10px',
            zIndex: 999999,
            backgroundColor: 'red',
            minWidth: 'auto',
            maxWidth: 'calc(100vw - 20px)',
            flexDirection: 'column',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            color: 'white',
            padding: '10px'
          }}
        >
          <Link href="/electronics" onClick={() => setIsDropdownOpen(false)} style={{padding: '12px 15px', color: '#2d3436', textDecoration: 'none', borderBottom: '1px solid #eee'}}>Electronics</Link>
          <Link href="/clothing" onClick={() => setIsDropdownOpen(false)} style={{padding: '12px 15px', color: '#2d3436', textDecoration: 'none', borderBottom: '1px solid #eee'}}>Clothing</Link>
          <Link href="/kitchen" onClick={() => setIsDropdownOpen(false)} style={{padding: '12px 15px', color: '#2d3436', textDecoration: 'none', borderBottom: '1px solid #eee'}}>Home & Kitchen</Link>
          <Link href="/beauty" onClick={() => setIsDropdownOpen(false)} style={{padding: '12px 15px', color: '#2d3436', textDecoration: 'none', borderBottom: '1px solid #eee'}}>Beauty</Link>
          <Link href="/sports" onClick={() => setIsDropdownOpen(false)} style={{padding: '12px 15px', color: '#2d3436', textDecoration: 'none'}}>Sports</Link>
        </div>
      )}



    <header>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div>Welcome to ShopEasy - Your Online Shopping Destination!</div>
          <div>
            <a href="#" className="contact-link">
              <i className="fas fa-phone"></i> +1 234 567 890
            </a>
            <a href="#" className="contact-link">
              <i className="fas fa-envelope"></i> support@shopeasy.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container main-header">
        <Link href="/" className="logo">
          <i className="fas fa-cube"></i>
          <span>Shop</span>Easy
        </Link>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="header-icons">
          <a href="#" className="icon-item">
            <i className="fas fa-user"></i>
          </a>
          <a href="#" className="icon-item">
            <i className="fas fa-heart"></i>
            <div className="badge" id="wishlist-count">3</div>
          </a>
          <a href="#" className="icon-item">
            <i className="fas fa-shopping-cart"></i>
            <div className="badge" id="cart-count">5</div>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <div className="container">
          <ul className="nav-links">
            <li>
              <Link 
                href="/" 
                className={isActive('/') ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li 
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="#" 
                className={isCategoryActive() ? 'active' : ''}
                onClick={toggleDropdown}
              >
                Categories <i className="fas fa-chevron-down"></i>
              </a>
              {/* Desktop Dropdown */}
              {!isMobile && (
                <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                  <Link href="/electronics" onClick={() => setIsDropdownOpen(false)}>Electronics</Link>
                  <Link href="/clothing" onClick={() => setIsDropdownOpen(false)}>Clothing</Link>
                  <Link href="/kitchen" onClick={() => setIsDropdownOpen(false)}>Home & Kitchen</Link>
                  <Link href="/beauty" onClick={() => setIsDropdownOpen(false)}>Beauty</Link>
                  <Link href="/sports" onClick={() => setIsDropdownOpen(false)}>Sports</Link>
                </div>
              )}
            </li>
            <li>
              <Link 
                href="/deals" 
                className={isActive('/deals') ? 'active' : ''}
              >
                Deals
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={isActive('/about') ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={isActive('/contact') ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    </>
  );
}