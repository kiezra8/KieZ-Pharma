import React from 'react';
import { useApp } from '../context/AppContext';
import './CategoryGrid.css';

export default function CategoryGrid({ onCategoryClick }) {
  const { categories } = useApp();

  return (
    <section className="category-section">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            className="cat-card"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => onCategoryClick && onCategoryClick(cat)}
          >
            <div className="cat-img-wrap" style={{ background: cat.color + '22', borderColor: cat.color + '55' }}>
              <img src={cat.icon} alt={cat.name} className="cat-img" />
              <div className="cat-shine" />
            </div>
            <span className="cat-name">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
