import React, { useState } from 'react';
import { formatPrice } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './CategoriesPage.css';

export default function CategoriesPage({ onProductClick, initialCategory }) {
  const { products, categories } = useApp();
  const [activeSub, setActiveSub] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory || categories?.[0]?.name || '');

  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
      setActiveSub('');
    } else if (categories?.length > 0) {
      setActiveCategory(categories[0].name);
      setActiveSub('');
    }
  }, [initialCategory, categories]);

  const catData = categories.find(c => c.name === activeCategory);
  
  const filtered = products.filter(p => {
    const isCat = p.category === activeCategory;
    if (!isCat) return false;
    if (activeSub) return p.subCategory === activeSub;
    return true;
  });

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
            onClick={() => {
              setActiveCategory(cat.name);
              setActiveSub('');
            }}
          >
            <img src={cat.icon} alt={cat.name} className="cat-chip-img" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sub-Category Chips */}
      {catData?.subCategories && (
        <div className="sub-chips-scroll" style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '0 16px 16px', margin: '0 -16px' }}>
          <button 
            className={`sub-chip ${activeSub === '' ? 'active' : ''}`}
            onClick={() => setActiveSub('')}
            style={{ 
              padding: '6px 14px', 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: '600', 
              border: '1px solid #eee',
              background: activeSub === '' ? '#1a1a2e' : '#fff',
              color: activeSub === '' ? '#fff' : '#666'
            }}
          >
            All
          </button>
          {catData.subCategories.map(sub => (
            <button
              key={sub}
              className={`sub-chip ${activeSub === sub ? 'active' : ''}`}
              onClick={() => setActiveSub(sub)}
              style={{ 
                padding: '6px 14px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: '600', 
                border: '1px solid #eee',
                background: activeSub === sub ? '#1a1a2e' : '#fff',
                color: activeSub === sub ? '#fff' : '#666',
                whiteSpace: 'nowrap'
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="cat-products-header">
        <span className="cat-count">
          {filtered.length} products 
          {activeSub ? ` in ${activeSub}` : ` in ${activeCategory}`}
        </span>
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
