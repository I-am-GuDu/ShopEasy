import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { getSubcategoriesByParent } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';
import { Subcategory } from '@/types/category';
import { Product } from '@/types/product';

export default function BeautyPage(): JSX.Element {
  const subcategories: Subcategory[] = getSubcategoriesByParent('beauty');
  const products: Product[] = getProductsByCategory('beauty');

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Beauty' }
      ]} />

      {/* Category Banner */}
      <section className="category-banner">
        <div className="container">
          <h1>Beauty</h1>
          <p>Discover premium skincare and cosmetics for your beauty routine</p>
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
          <h2>Featured Beauty Products</h2>
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
