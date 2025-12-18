/**
 * Represents a product in the e-commerce system
 */
export interface Product {
  /** Unique identifier for the product */
  id: string;
  /** Product name/title */
  name: string;
  /** Optional detailed description */
  description?: string;
  /** Current selling price */
  price: number;
  /** Optional original price (for showing discounts) */
  oldPrice?: number;
  /** URL to product image */
  image: string;
  /** Category slug (e.g., 'electronics', 'clothing') */
  category: string;
  /** Whether the product is currently in stock */
  inStock: boolean;
}

/**
 * Props for the ProductCard component
 */
export interface ProductCardProps {
  /** Product data to display */
  product: Product;
}