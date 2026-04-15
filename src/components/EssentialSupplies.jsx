import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';
import './EssentialSupplies.css';

export default function EssentialSupplies({ onProductClick }) {
  const { products } = useApp();
  // using first 8 items or those marked as BEST SELLER / HOT
  const essentialSupplies = products.filter(p => ['BEST SELLER', 'HOT'].includes(p.badge)).slice(0, 8);
  
  if (!essentialSupplies.length) return null;

  return (
    <section className="essential-section">
      <div className="essential-header">
        <h2 className="section-title">Essential Supplies</h2>
        <span className="essential-tag">🔥 Top Picks</span>
      </div>
      <div className="essential-grid">
        {essentialSupplies.map((p, i) => (
          <div key={p.id} style={{ animationDelay: `${i * 70}ms` }}>
            <ProductCard product={p} onClick={onProductClick} />
          </div>
        ))}
      </div>
    </section>
  );
}
