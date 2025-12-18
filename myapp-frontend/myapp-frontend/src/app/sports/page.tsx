import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/data/products';
import { Product } from '@/types/product';

export default function SportsPage(): JSX.Element {
  const products: Product[] = getProductsByCategory('sports');

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Sports' }
      ]} />

      <section className="category-banner">
        <div className="container">
          <h1>Sports</h1>
          <p>Equipment and accessories</p>
        </div>
      </section>

      <section className="container">
        <div className="section-title">
          <h2>Featured Sports</h2>
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