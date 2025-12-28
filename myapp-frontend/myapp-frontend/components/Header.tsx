'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
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

  const handleLinkClick = (href: string, e?: React.MouseEvent): void => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsDropdownOpen(false);
    router.push(href);
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
      const target = event.target as Node;
      
      // Don't close if clicking on dropdown content
      if (target && (target as Element).closest('.mobile-dropdown-menu')) {
        return;
      }
      
      // Don't close if clicking on desktop dropdown
      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        return;
      }
      
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      // Only use mousedown for desktop, avoid touchstart conflicts on mobile
      if (!isMobile) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        // For mobile, use a delayed touchstart to avoid conflicts
        const timeoutId = setTimeout(() => {
          document.addEventListener('touchstart', handleClickOutside);
        }, 100);
        
        return () => {
          clearTimeout(timeoutId);
          document.removeEventListener('touchstart', handleClickOutside);
        };
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen, isMobile]);



  return (
    <>
      {/* Mobile Dropdown - Rendered outside header for proper z-index */}
      {isMobile && isDropdownOpen && (
        <div 
          className="mobile-dropdown-overlay"
          style={{
            display: 'flex',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: 999999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDropdownOpen(false);
            }
          }}
        >
          <div 
            className="mobile-dropdown-menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              minWidth: '280px',
              maxWidth: '90vw',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              animation: 'slideDown 0.3s ease-out'
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button 
              type="button"
              onClick={(e) => {
                handleLinkClick('/electronics', e);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleLinkClick('/electronics', );
              }}
              style={{
                padding: '16px 20px', 
                color: '#2d3436', 
                borderBottom: '1px solid #eee', 
                fontSize: '16px', 
                fontWeight: '500',
                display: 'block',
                width: '100%',
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left'
              }}
            >
              📱 Electronics
            </button>
            <button 
              type="button"
              onClick={(e) => handleLinkClick('/clothing', e)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleLinkClick('/clothing', );
              }}
              style={{
                padding: '16px 20px', 
                color: '#2d3436', 
                borderBottom: '1px solid #eee', 
                fontSize: '16px', 
                fontWeight: '500',
                display: 'block',
                width: '100%',
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left'
              }}
            >
              👕 Clothing
            </button>
            <button 
              type="button"
              onClick={(e) => handleLinkClick('/kitchen', e)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleLinkClick('/kitchen', );
              }}
              style={{
                padding: '16px 20px', 
                color: '#2d3436', 
                borderBottom: '1px solid #eee', 
                fontSize: '16px', 
                fontWeight: '500',
                display: 'block',
                width: '100%',
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left'
              }}
            >
              🏠 Home & Kitchen
            </button>
            <button 
              type="button"
              onClick={(e) => handleLinkClick('/beauty', e)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleLinkClick('/beauty', );
              }}
              style={{
                padding: '16px 20px', 
                color: '#2d3436', 
                borderBottom: '1px solid #eee', 
                fontSize: '16px', 
                fontWeight: '500',
                display: 'block',
                width: '100%',
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left'
              }}
            >
              💄 Beauty
            </button>
            <button 
              type="button"
              onClick={(e) => handleLinkClick('/sports', e)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleLinkClick('/sports', );
              }}
              style={{
                padding: '16px 20px', 
                color: '#2d3436', 
                fontSize: '16px', 
                fontWeight: '500',
                display: 'block',
                width: '100%',
                cursor: 'pointer',
                touchAction: 'manipulation',
                userSelect: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left'
              }}
            >
              ⚽ Sports
            </button>
          </div>
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