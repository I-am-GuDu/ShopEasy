import { Category, Subcategory } from '../../types/category';

/**
 * Mock data for main product categories
 * 
 * This array contains the main categories displayed on the homepage
 * and used for navigation throughout the application.
 */
export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and devices',
    icon: 'fa-laptop',
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion for men and women',
    icon: 'fa-tshirt',
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    slug: 'kitchen',
    description: 'Everything for your home',
    icon: 'fa-blender',
  },
  {
    id: '4',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Skincare and cosmetics',
    icon: 'fa-spa',
  },
  {
    id: '5',
    name: 'Sports',
    slug: 'sports',
    description: 'Equipment and accessories',
    icon: 'fa-football-ball',
  },
];

/**
 * Mock data for subcategories
 * 
 * This array contains subcategories that belong to main categories.
 * Used on category pages to show more specific product groupings.
 */
export const subcategories: Subcategory[] = [
  {
    id: 'sub1',
    name: 'Smartphones',
    parentCategory: 'electronics',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub2',
    name: 'Headphones',
    parentCategory: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub3',
    name: 'Laptops',
    parentCategory: 'electronics',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub4',
    name: 'Cameras',
    parentCategory: 'electronics',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub5',
    name: 'Cookware',
    parentCategory: 'kitchen',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub6',
    name: 'Appliances',
    parentCategory: 'kitchen',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbbc50d737?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub7',
    name: 'Cutlery',
    parentCategory: 'kitchen',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub8',
    name: 'Skincare',
    parentCategory: 'beauty',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub9',
    name: 'Makeup',
    parentCategory: 'beauty',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'sub10',
    name: 'Hair Care',
    parentCategory: 'beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-af3c4e7db7b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
];

/**
 * Get a category by its slug
 * 
 * @param {string} slug - The category slug to search for
 * @returns {Category | undefined} The matching category or undefined if not found
 * 
 * @example
 * ```typescript
 * const electronics = getCategoryBySlug('electronics');
 * ```
 */
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

/**
 * Get subcategories for a parent category
 * 
 * @param {string} parentCategory - The parent category slug
 * @returns {Subcategory[]} Array of subcategories belonging to the parent
 * 
 * @example
 * ```typescript
 * const electronicsSubcats = getSubcategoriesByParent('electronics');
 * ```
 */
export const getSubcategoriesByParent = (parentCategory: string): Subcategory[] => {
  return subcategories.filter(sub => sub.parentCategory === parentCategory);
};