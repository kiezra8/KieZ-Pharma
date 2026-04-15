import React from 'react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header({ onCartClick, onSearchChange, searchQuery }) {
  const { totalItems } = useCart();

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-brand">
          <div className="brand-logo">
            <span className="brand-cross">✚</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">KieZ Pharma</span>
            <span className="brand-tagline">Medical Supplies</span>
          </div>
        </div>
        
        <div className="header-search">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={e => onSearchChange && onSearchChange(e.target.value)}
            id="header-search-input"
          />
        </div>

        <div className="header-actions">
          <button className="header-icon-btn" id="cart-header-btn" onClick={onCartClick}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
