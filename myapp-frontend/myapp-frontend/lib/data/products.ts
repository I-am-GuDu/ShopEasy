import { Product } from '../../types/product';

/**
 * Mock data for featured products
 * 
 * This array contains sample product data used throughout the application.
 * In a production environment, this would be replaced with API calls.
 */
export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Smart Watch Series 5',
    description: 'Latest smartwatch with health monitoring and fitness tracking',
    price: 199.99,
    oldPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 129.99,
    oldPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Latest Smartphone',
    description: 'Flagship smartphone with advanced camera and performance',
    price: 699.99,
    oldPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'electronics',
    inStock: true,
  },
  {
    id: '4',
    name: 'Professional Camera',
    description: 'High-end DSLR camera for professional photography',
    price: 899.99,
    oldPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'electronics',
    inStock: true,
  },
  {
    id: '5',
    name: 'Stainless Steel Cookware Set',
    description: 'Professional 12-piece cookware set with non-stick coating',
    price: 149.99,
    oldPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'kitchen',
    inStock: true,
  },
  {
    id: '6',
    name: 'Digital Kitchen Scale',
    description: 'Precision digital scale with LCD display',
    price: 29.99,
    oldPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbbc50d737?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'kitchen',
    inStock: true,
  },
  {
    id: '7',
    name: 'Blender Pro 3000',
    description: 'High-power blender for smoothies and soups',
    price: 89.99,
    oldPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbbc50d737?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'kitchen',
    inStock: true,
  },
  {
    id: '8',
    name: 'Knife Block Set',
    description: 'Premium 6-piece knife set with wooden block',
    price: 79.99,
    oldPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'kitchen',
    inStock: true,
  },
  {
    id: '9',
    name: 'Hydrating Face Serum',
    description: 'Lightweight hydrating serum with hyaluronic acid',
    price: 34.99,
    oldPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'beauty',
    inStock: true,
  },
  {
    id: '10',
    name: 'Luxury Lipstick Collection',
    description: 'Set of 5 premium lipsticks in assorted shades',
    price: 44.99,
    oldPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'beauty',
    inStock: true,
  },
  {
    id: '11',
    name: 'Moisturizing Face Cream',
    description: 'Rich moisturizer for dry and sensitive skin',
    price: 39.99,
    oldPrice: 54.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'beauty',
    inStock: true,
  },
  {
    id: '12',
    name: 'Professional Makeup Brush Set',
    description: 'Complete 15-piece makeup brush set with case',
    price: 54.99,
    oldPrice: 74.99,
    image: 'https://images.unsplash.com/photo-1596462502278-af3c4e7db7b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    category: 'beauty',
    inStock: true,
  },
];

/**
 * Get products filtered by category
 * 
 * @param {string} category - The category slug to filter by (e.g., 'electronics', 'clothing')
 * @returns {Product[]} Array of products in the specified category
 * 
 * @example
 * ```typescript
 * const electronics = getProductsByCategory('electronics');
 * ```
 */
export const getProductsByCategory = (category: string): Product[] => {
  return featuredProducts.filter(product => product.category === category);
};

/**
 * Get all products
 * 
 * @returns {Product[]} Array of all available products
 * 
 * @example
 * ```typescript
 * const allProducts = getAllProducts();
 * ```
 */
export const getAllProducts = (): Product[] => {
  return featuredProducts;
};