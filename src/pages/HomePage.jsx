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
