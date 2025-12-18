import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import FlashSaleTimer from '@/components/FlashSaleTimer';
import { categories } from '@/lib/data/categories';
import { featuredProducts } from '@/lib/data/products';

export default function HomePage(): JSX.Element {
  // Set flash sale end date to 7 days from now
  const flashSaleEndDate: Date = new Date();
  flashSaleEndDate.setDate(flashSaleEndDate.getDate() + 7);

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      <section className="container">
        <div className="section-title">
          <h2>Shop by Category</h2>
        </div>
        
        <div className="categories">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
        </div>
        
        <div className="products">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="deals">
        <div className="container deals-content">
          <h2>Flash Sale - Limited Time Offer!</h2>
          <p>Don't miss out on our biggest sale of the year. Huge discounts on all products!</p>
          
          <FlashSaleTimer targetDate={flashSaleEndDate} />
          
          <a href="/deals" className="btn">Shop Now</a>
        </div>
      </section>
    </>
  );
}
