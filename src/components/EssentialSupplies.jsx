import React from 'react';
import { essentialSupplies } from '../data/products';
import ProductCard from './ProductCard';
import './EssentialSupplies.css';

export default function EssentialSupplies({ onProductClick }) {
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
