import React from 'react';
import './AccountPage.css';

const WHATSAPP_NUM = '256702370441';

export default function AccountPage() {
  return (
    <div className="account-page">
      <div className="account-hero">
        <div className="account-avatar">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h2 className="account-name">Guest User</h2>
        <p className="account-sub">Welcome to KieZ Pharma</p>
      </div>

      <div className="account-section">
        <h3 className="accnt-section-title">Quick Actions</h3>
        <div className="accnt-menu">
          <a className="accnt-item" href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer">
            <span className="accnt-icon wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.48l5.773-1.513A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.873 9.873 0 01-5.032-1.378l-.36-.214-3.735.979.999-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12c0 5.468-4.415 9.882-9.882 9.882z"/>
              </svg>
            </span>
            <span className="accnt-label">Chat on WhatsApp</span>
            <span className="accnt-arrow">›</span>
          </a>
          <a className="accnt-item" href={`tel:+${WHATSAPP_NUM}`}>
            <span className="accnt-icon call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.49-.49a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </span>
            <span className="accnt-label">Call Us Now</span>
            <span className="accnt-arrow">›</span>
          </a>
        </div>
      </div>

      <div className="account-section">
        <h3 className="accnt-section-title">About KieZ Pharma</h3>
        <div className="accnt-info-card">
          <p>KieZ Pharma is Uganda's trusted medical supplies distributor. We deliver quality surgical tools, diagnostics, PPE, and more — straight to clinics, hospitals, and individuals.</p>
          <div className="accnt-contact-row">
            <span>📍</span> Kampala, Uganda
          </div>
          <div className="accnt-contact-row">
            <span>📞</span> +256 702 370 441
          </div>
          <div className="accnt-contact-row">
            <span>⏰</span> Mon–Sat, 8AM – 6PM
          </div>
        </div>
      </div>

      <div className="account-version">KieZ Pharma v1.0.0</div>
    </div>
  );
}
