import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/data/products';
import { Product } from '@/types/product';

export default function ClothingPage(): JSX.Element {
  const products: Product[] = getProductsByCategory('clothing');

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Clothing' }
      ]} />

      <section className="category-banner">
        <div className="container">
          <h1>Clothing</h1>
          <p>Fashion for men and women</p>
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>Featured Clothing</h2>
        </div>
        
        <div className="products">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p style={{ textAlign: 'center', color: 'white', gridColumn: '1 / -1' }}>
              Coming soon...
            </p>
          )}
        </div>
      </section>
    </>
  );
}