import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { getSubcategoriesByParent } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';
import { Subcategory } from '@/types/category';
import { Product } from '@/types/product';

export default function ElectronicsPage(): JSX.Element {
  const subcategories: Subcategory[] = getSubcategoriesByParent('electronics');
  const products: Product[] = getProductsByCategory('electronics');

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Electronics' }
      ]} />

      {/* Category Banner */}
      <section className="category-banner">
        <div className="container">
          <h1>Electronics</h1>
          <p>Discover the latest gadgets and tech innovations</p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="container">
        <div className="section-title">
          <h2>Subcategories</h2>
        </div>
        
        <div className="subcategory-grid">
          {subcategories.map(subcategory => (
            <a key={subcategory.id} href="#" className="subcategory-card">
              <div className="subcategory-image">
                <img src={subcategory.image} alt={subcategory.name} />
              </div>
              <div className="subcategory-info">
                <h3>{subcategory.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container">
        <div className="section-title">
          <h2>Featured Electronics</h2>
        </div>
        
        <div className="products">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}