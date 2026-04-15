import React, { useState } from 'react';
import './BottomNav.css';

const WHATSAPP_NUM = '256702370441';

export default function BottomNav({ activePage, onNavigate }) {
  const [showContact, setShowContact] = useState(false);

  const handleChat = () => setShowContact(v => !v);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=Hello%20KieZ%20Pharma%2C%20I%20need%20assistance.`, '_blank');
    setShowContact(false);
  };

  const callPhone = () => {
    window.open(`tel:+${WHATSAPP_NUM}`, '_self');
    setShowContact(false);
  };

  return (
    <>
      {showContact && (
        <div className="contact-sheet" onClick={() => setShowContact(false)}>
          <div className="contact-card" onClick={e => e.stopPropagation()}>
            <p className="contact-title">Contact Us</p>
            <button className="contact-btn whatsapp-btn" onClick={openWhatsApp} id="whatsapp-contact-btn">
              <span className="contact-btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.48l5.773-1.513A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.873 9.873 0 01-5.032-1.378l-.36-.214-3.735.979.999-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12c0 5.468-4.415 9.882-9.882 9.882z"/>
                </svg>
              </span>
              Chat on WhatsApp
            </button>
            <button className="contact-btn call-btn" onClick={callPhone} id="call-contact-btn">
              <span className="contact-btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.49-.49a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              Call Us
            </button>
            <button className="contact-cancel" onClick={() => setShowContact(false)}>Cancel</button>
          </div>
        </div>
      )}

      <nav className="bottom-nav">
        <button className={`nav-btn ${activePage === 'home' ? 'active' : ''}`} onClick={() => onNavigate('home')} id="nav-home">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Home</span>
        </button>

        <button className={`nav-btn ${activePage === 'categories' ? 'active' : ''}`} onClick={() => onNavigate('categories')} id="nav-categories">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Categories</span>
        </button>

        <button className="nav-btn nav-chat-btn" onClick={handleChat} id="nav-chat">
          <div className="nav-chat-circle">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <span>Chat</span>
        </button>

        <button className={`nav-btn ${activePage === 'cart' ? 'active' : ''}`} onClick={() => onNavigate('cart')} id="nav-cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          <span>Cart</span>
        </button>

        <button className={`nav-btn ${activePage === 'account' ? 'active' : ''}`} onClick={() => onNavigate('account')} id="nav-account">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Account</span>
        </button>
      </nav>
    </>
  );
}
