import React from 'react';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    const btn = e.currentTarget;
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 800);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      <div className="product-card__img-wrap">
        <img src={product.image} alt={product.name} className="product-card__img" loading="lazy" />
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        {discount && <span className="product-card__discount">-{discount}%</span>}
      </div>
      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-num">{product.rating}</span>
          <span className="sold">{product.sold.toLocaleString()} sold</span>
        </div>
        <div className="product-card__prices">
          <span className="price-main">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="price-old">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <button className="add-to-cart-btn" onClick={handleAdd} id={`add-cart-${product.id}`}>
          <span className="btn-text">Add to Cart</span>
          <span className="btn-check">✓</span>
        </button>
      </div>
    </div>
  );
}
