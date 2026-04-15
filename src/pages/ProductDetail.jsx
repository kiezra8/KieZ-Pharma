import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './ProductDetail.css';

export default function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('desc');

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const orderOnWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello KieZ Pharma! 👋\n\nI'd like to order:\n*${product.name}*\nQty: ${qty}\nPrice: ${formatPrice(product.price * qty)}\n\nPlease confirm availability and delivery.`
    );
    window.open(`https://wa.me/256702370441?text=${msg}`, '_blank');
  };

  return (
    <div className="product-detail">
      {/* Back Button */}
      <button className="detail-back" onClick={onBack} id="product-detail-back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Image Gallery */}
      <div className="detail-gallery">
        <div className="detail-main-img-wrap">
          <img
            src={product.images?.[selectedImg] || product.image}
            alt={product.name}
            className="detail-main-img"
          />
          {product.badge && <span className="detail-badge">{product.badge}</span>}
          {discount && <span className="detail-discount">-{discount}%</span>}
        </div>
        {product.images && product.images.length > 1 && (
          <div className="detail-thumbs">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`detail-thumb ${selectedImg === i ? 'active' : ''}`}
                onClick={() => setSelectedImg(i)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="detail-body">
        {/* Category & Name */}
        <span className="detail-cat">{product.category}</span>
        <h1 className="detail-name">{product.name}</h1>

        {/* Rating Row */}
        <div className="detail-meta">
          <div className="detail-stars">
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="detail-rating-num">{product.rating}</span>
          <span className="detail-reviews">({product.reviews} reviews)</span>
          <span className="detail-sold">{product.sold.toLocaleString()} sold</span>
        </div>

        {/* Prices */}
        <div className="detail-prices">
          <span className="detail-price-main">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="detail-price-old">{formatPrice(product.originalPrice)}</span>
          )}
          {discount && <span className="detail-save-tag">Save {discount}%</span>}
        </div>

        {/* Stock Status */}
        <div className={`detail-stock ${product.inStock ? 'in' : 'out'}`}>
          <span className="stock-dot" />
          {product.inStock ? 'In Stock – Ready to ship' : 'Out of Stock'}
        </div>

        {/* Quantity */}
        <div className="detail-qty-row">
          <span className="qty-label">Quantity</span>
          <div className="qty-control">
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
          </div>
          <span className="qty-total">{formatPrice(product.price * qty)}</span>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          {['desc', 'features', 'delivery'].map(tab => (
            <button
              key={tab}
              className={`detail-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'desc' ? 'Description' : tab === 'features' ? 'Features' : 'Delivery'}
            </button>
          ))}
        </div>

        <div className="detail-tab-content">
          {activeTab === 'desc' && (
            <p className="detail-desc">{product.description}</p>
          )}
          {activeTab === 'features' && (
            <ul className="detail-features">
              {product.features?.map((f, i) => (
                <li key={i}>
                  <span className="feat-check">✓</span> {f}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'delivery' && (
            <div className="delivery-info">
              <div className="delivery-row">
                <span className="delivery-icon">🚚</span>
                <div>
                  <strong>Kampala Delivery</strong>
                  <p>2–4 hours | UGX 5,000</p>
                </div>
              </div>
              <div className="delivery-row">
                <span className="delivery-icon">📦</span>
                <div>
                  <strong>Upcountry</strong>
                  <p>1–3 days | UGX 15,000+</p>
                </div>
              </div>
              <div className="delivery-row">
                <span className="delivery-icon">🔄</span>
                <div>
                  <strong>Returns</strong>
                  <p>7-day return policy</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="detail-actions">
          <button
            className={`detail-add-cart ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            id="detail-add-cart-btn"
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
          <button className="detail-order-wa" onClick={orderOnWhatsApp} id="detail-order-whatsapp-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{flexShrink:0}}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.48l5.773-1.513A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.873 9.873 0 01-5.032-1.378l-.36-.214-3.735.979.999-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12c0 5.468-4.415 9.882-9.882 9.882z"/>
            </svg>
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
