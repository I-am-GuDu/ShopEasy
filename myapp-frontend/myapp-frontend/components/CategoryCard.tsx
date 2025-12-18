import Link from 'next/link';
import { CategoryCardProps } from '../types/category';

/**
 * CategoryCard Component
 * 
 * Displays a category tile with icon, name, and description.
 * Links to the category page when clicked.
 * 
 * Features:
 * - Font Awesome icon display
 * - Animated float effect
 * - Hover elevation effect
 * - Client-side navigation with Next.js Link
 * 
 * @param {CategoryCardProps} props - Component props containing category data
 * @returns {JSX.Element} The rendered category card
 * 
 * @example
 * ```tsx
 * <CategoryCard category={{
 *   id: '1',
 *   name: 'Electronics',
 *   slug: 'electronics',
 *   description: 'Latest gadgets',
 *   icon: 'fa-laptop'
 * }} />
 * ```
 */
export default function CategoryCard({ category }: CategoryCardProps): JSX.Element {
  return (
    <Link href={`/${category.slug}`} className="category-card">
      <div className="category-icon">
        <i className={`fas ${category.icon}`}></i>
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </Link>
  );
}