import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import EssentialSupplies from '../components/EssentialSupplies';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/products';
import './HomePage.css';

export default function HomePage({ onProductClick, onCategoryClick, searchQuery }) {
  const { products, loading } = useApp();

  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="home-page">
      {/* Promotional Banners Strip */}
      <div className="promo-strip">
        <span>🚚 Free delivery on orders above UGX 300,000</span>
      </div>

      <HeroBanner />

      {searchQuery ? (
        <div className="search-results">
          <p className="search-label">Results for "<strong>{searchQuery}</strong>" ({filteredProducts.length})</p>
          <div className="search-grid">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found. Try a different search.</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <CategoryGrid onCategoryClick={onCategoryClick} />

          <div className="trending-banner">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=200&fit=crop"
              alt="Hospital supplies"
              className="trending-img"
            />
            <div className="trending-overlay" style={{background: 'linear-gradient(90deg, rgba(26,26,46,0.85) 0%, transparent 100%)'}}>
              <span className="trending-tag">TRENDING NOW</span>
              <h3>Shop Surgical Kits</h3>
              <p>Certified for Ugandan healthcare facilities</p>
            </div>
          </div>

          <EssentialSupplies onProductClick={onProductClick} />

          {/* All Products */}
          <section className="all-products-section">
            <div className="section-header-row">
              <h2 className="section-title">All Products</h2>
              <span className="section-count">{products.length} items</span>
            </div>
            <div className="all-products-grid">
              {products.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <ProductCard product={p} onClick={onProductClick} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
