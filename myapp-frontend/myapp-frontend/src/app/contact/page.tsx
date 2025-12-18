'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <>
      {/* Contact Section */}
      <section className="contact-3d-section">
        <div className="container">
          <div className="section-title">
            <h2>Get In Touch</h2>
            <p>We'd love to hear from you. Send us a message!</p>
          </div>

          <div className="contact-container">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-card">
                <div className="icon-wrapper">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Address</h3>
                <p>123 Shopping Street, Retail City, RC 12345</p>
              </div>

              <div className="info-card">
                <div className="icon-wrapper">
                  <i className="fas fa-phone"></i>
                </div>
                <h3>Phone</h3>
                <p>+1 (234) 567-890</p>
              </div>

              <div className="info-card">
                <div className="icon-wrapper">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Email</h3>
                <p>support@shopeasy.com</p>
              </div>

              <div className="info-card">
                <div className="icon-wrapper">
                  <i className="fas fa-clock"></i>
                </div>
                <h3>Hours</h3>
                <p>Mon-Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-3d">
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Message subject"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message"
                    rows={5}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-container">
            <div className="map-placeholder">
              <i className="fas fa-map"></i>
              <p>Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}