import Link from 'next/link';

/**
 * Represents a single item in the breadcrumb trail
 */
interface BreadcrumbItem {
  /** Display text for the breadcrumb item */
  label: string;
  /** Optional link URL (omit for current page) */
  href?: string;
}

/**
 * Props for the Breadcrumb component
 */
interface BreadcrumbProps {
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb Component
 * 
 * Navigation breadcrumb trail showing the current page hierarchy.
 * Used on category and detail pages for easy navigation.
 * 
 * Features:
 * - Clickable links for parent pages
 * - Current page shown as plain text
 * - Separator between items
 * - Responsive layout
 * 
 * @param {BreadcrumbProps} props - Component props
 * @returns {JSX.Element} The rendered breadcrumb navigation
 * 
 * @example
 * ```tsx
 * <Breadcrumb items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Electronics', href: '/electronics' },
 *   { label: 'Smartphones' }
 * ]} />
 * ```
 */
export default function Breadcrumb({ items }: BreadcrumbProps): JSX.Element {
  return (
    <div className="container">
      <div className="breadcrumb">
        {items.map((item, index) => (
          <span key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && ' > '}
          </span>
        ))}
      </div>
    </div>
  );
}