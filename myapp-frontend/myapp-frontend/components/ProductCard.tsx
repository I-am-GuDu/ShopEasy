import { ProductCardProps } from '../types/product';

/**
 * ProductCard Component
 * 
 * Displays a product with image, name, price, and action buttons.
 * Used throughout the application to show products in grids.
 * 
 * Features:
 * - Product image with hover zoom effect
 * - Current and old price display (with strikethrough)
 * - Add to Cart button with gradient styling
 * - Wishlist button with heart icon
 * - Responsive card layout
 * 
 * @param {ProductCardProps} props - Component props containing product data
 * @returns {JSX.Element} The rendered product card
 * 
 * @example
 * ```tsx
 * <ProductCard product={{
 *   id: '1',
 *   name: 'Smart Watch',
 *   price: 199.99,
 *   oldPrice: 249.99,
 *   image: 'https://...',
 *   category: 'electronics',
 *   inStock: true
 * }} />
 * ```
 */
export default function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-price">
          ${product.price.toFixed(2)}
          {product.oldPrice && (
            <span className="old-price">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="wishlist">
            <i className="far fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}