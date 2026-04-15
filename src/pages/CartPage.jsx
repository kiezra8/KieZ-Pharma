import React from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './CartPage.css';

const WHATSAPP_NUM = '256702370441';

export default function CartPage({ onProductClick }) {
  const { cartItems, removeFromCart, updateQty, totalPrice, clearCart } = useCart();

  const handleOrder = () => {
    if (!cartItems.length) return;
    const lines = cartItems.map(
      i => `• ${i.name} ×${i.qty} = ${formatPrice(i.price * i.qty)}`
    ).join('\n');
    const msg = encodeURIComponent(
      `Hello KieZ Pharma! 👋\n\nI'd like to place an order:\n\n${lines}\n\n*Total: ${formatPrice(totalPrice)}*\n\nPlease confirm availability and delivery.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank');
  };

  if (!cartItems.length) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Add medical supplies to get started</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2 className="cart-title">My Cart</h2>
        <button className="cart-clear" onClick={clearCart}>Clear All</button>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" onClick={() => onProductClick && onProductClick(item)} />
            <div className="cart-item-body">
              <p className="cart-item-name">{item.name}</p>
              <span className="cart-item-cat">{item.category}</span>
              <div className="cart-item-row">
                <span className="cart-item-price">{formatPrice(item.price)}</span>
                <div className="cart-qty-ctrl">
                  <button onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>
              <div className="cart-item-subtotal">{formatPrice(item.price * item.qty)}</div>
            </div>
            <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal ({cartItems.reduce((s,i) => s + i.qty, 0)} items)</span>
          <span className="summary-val">{formatPrice(totalPrice)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Delivery</span>
          <span className="summary-val green">To be confirmed</span>
        </div>
        <div className="cart-summary-divider"/>
        <div className="cart-summary-row total">
          <span>Total</span>
          <span className="summary-val">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Order Button */}
      <div className="cart-footer">
        <button className="cart-order-btn" onClick={handleOrder} id="cart-order-whatsapp-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.48l5.773-1.513A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.873 9.873 0 01-5.032-1.378l-.36-.214-3.735.979.999-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12c0 5.468-4.415 9.882-9.882 9.882z"/>
          </svg>
          Order on WhatsApp • {formatPrice(totalPrice)}
        </button>
      </div>
    </div>
  );
}
