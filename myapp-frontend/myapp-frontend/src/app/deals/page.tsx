import FlashSaleTimer from '@/components/FlashSaleTimer';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/lib/data/products';

export default function DealsPage(): JSX.Element {
  // Set flash sale end date to 7 days from now
  const flashSaleEndDate: Date = new Date();
  flashSaleEndDate.setDate(flashSaleEndDate.getDate() + 7);

  return (
    <>
      {/* Deal Banner */}
      <section className="deal-banner">
        <div className="deal-banner-content">
          <h1>
            Mega <span>Sale</span>
          </h1>
          <p>Don't miss out on our biggest sale of the year. Huge discounts on all products!</p>
          
          <FlashSaleTimer targetDate={flashSaleEndDate} />
        </div>
      </section>

      {/* Deal Products */}
      <section className="container">
        <div className="section-title">
          <h2>Flash Sale Products</h2>
        </div>
        
        <div className="deal-products">
          {featuredProducts.map(product => (
            <div key={product.id} className="deal-product">
              <div className="discount-badge">-20%</div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}