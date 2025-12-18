/**
 * Represents a main product category
 */
export interface Category {
  /** Unique identifier for the category */
  id: string;
  /** Display name of the category */
  name: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Brief description of the category */
  description: string;
  /** Font Awesome icon class (e.g., 'fa-laptop') */
  icon: string;
  /** Optional banner image URL */
  image?: string;
}

/**
 * Represents a subcategory within a main category
 */
export interface Subcategory {
  /** Unique identifier for the subcategory */
  id: string;
  /** Display name of the subcategory */
  name: string;
  /** Slug of the parent category */
  parentCategory: string;
  /** Image URL for the subcategory */
  image: string;
}

/**
 * Props for the CategoryCard component
 */
export interface CategoryCardProps {
  /** Category data to display */
  category: Category;
}