import React, { useState } from 'react';
import { formatPrice } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './CategoriesPage.css';

export default function CategoriesPage({ onProductClick }) {
  const { products, categories } = useApp();
  const [activeCategory, setActiveCategory] = useState(categories?.[0]?.name || '');

  const filtered = products.filter(p => p.category === activeCategory);

  return (
    <div className="categories-page">
      <h2 className="categories-title">Browse Categories</h2>

      {/* Category Chips */}
      <div className="cat-chips-scroll">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cat-chip ${activeCategory === cat.name ? 'active' : ''}`}
            style={activeCategory === cat.name ? { background: cat.color, borderColor: cat.color } : { borderColor: cat.color + '66' }}
            onClick={() => setActiveCategory(cat.name)}
          >
            <img src={cat.icon} alt={cat.name} className="cat-chip-img" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="cat-products-header">
        <span className="cat-count">{filtered.length} products in <strong>{activeCategory}</strong></span>
      </div>

      {filtered.length > 0 ? (
        <div className="cat-products-grid">
          {filtered.map((p, i) => (
            <div key={p.id} style={{ animationDelay: `${i * 60}ms` }}>
              <ProductCard product={p} onClick={onProductClick} />
            </div>
          ))}
        </div>
      ) : (
        <div className="cat-empty">
          <p>No products in this category yet.</p>
        </div>
      )}
    </div>
  );
}
