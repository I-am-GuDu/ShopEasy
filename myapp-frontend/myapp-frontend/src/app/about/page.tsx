export default function AboutPage(): JSX.Element {
  return (
    <>
      {/* About Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About ShopEasy</h1>
          <p>Your trusted partner for online shopping since 2015</p>
        </div>
      </section>

      {/* About Content */}
      <section className="container">
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2015, ShopEasy began with a simple mission: to make online shopping accessible, 
            affordable, and enjoyable for everyone. What started as a small team with big dreams has grown 
            into one of the leading e-commerce platforms in the region.
          </p>
          
          <p>
            We believe that shopping should be more than just a transaction - it should be an experience. 
            That's why we've curated a selection of high-quality products from trusted brands, all at 
            competitive prices.
          </p>
          
          <h2>Our Mission</h2>
          <p>Our mission is to empower consumers with choice, convenience, and confidence. We're committed to providing:</p>
          <ul>
            <li>Exceptional customer service</li>
            <li>Fast and reliable delivery</li>
            <li>Competitive pricing</li>
            <li>Authentic products from trusted brands</li>
            <li>A seamless shopping experience</li>
          </ul>
          
          <h2>Why Choose ShopEasy?</h2>
          <div className="features">
            <div className="feature">
              <i className="fas fa-shipping-fast feature-icon"></i>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered within 2-3 business days</p>
            </div>
            
            <div className="feature">
              <i className="fas fa-undo feature-icon"></i>
              <h3>Easy Returns</h3>
              <p>30-day return policy with no questions asked</p>
            </div>
            
            <div className="feature">
              <i className="fas fa-shield-alt feature-icon"></i>
              <h3>Secure Payments</h3>
              <p>Multiple secure payment options available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-title">
            <h2>Our Leadership Team</h2>
          </div>
          
          <div className="team">
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="CEO" />
              </div>
              <div className="member-info">
                <h3>John Smith</h3>
                <div className="position">Chief Executive Officer</div>
                <p>15+ years of experience in e-commerce and retail</p>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="CTO" />
              </div>
              <div className="member-info">
                <h3>Sarah Johnson</h3>
                <div className="position">Chief Technology Officer</div>
                <p>Tech visionary with expertise in scalable platforms</p>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="CMO" />
              </div>
              <div className="member-info">
                <h3>Michael Chen</h3>
                <div className="position">Chief Marketing Officer</div>
                <p>Digital marketing expert with global brand experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}