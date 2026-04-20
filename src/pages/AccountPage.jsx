import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './AccountPage.css';

const WHATSAPP_NUM = '256702370441';

// Detect if running as installed PWA
const isInStandaloneMode = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

// Detect iOS
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

export default function AccountPage({ onNavigate }) {
  const { user, isAdmin, signIn, signUp, signOut } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(isInStandaloneMode());
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Android/Chrome: catch the install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS()) {
      setShowIOSGuide(true);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <div className="account-hero">
        <div className="account-avatar">
          {user ? (
            <span style={{color: '#fff', fontSize: '24px', fontWeight: 'bold'}}>
              {user.email.charAt(0).toUpperCase()}
            </span>
          ) : (
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          )}
        </div>
        <h2 className="account-name">{user ? (isAdmin ? 'Admin' : 'User') : 'Guest User'}</h2>
        <p className="account-sub">{user ? user.email : 'Welcome to KieZ Pharma'}</p>
      </div>

      {!user ? (
        <div className="account-section">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h3>{isLogin ? 'Sign In' : 'Create Account'}</h3>
            {error && <div className="auth-error">{error}</div>}
            <input 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
            <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </p>
          </form>
        </div>
      ) : (
        <div className="account-section">
          <h3 className="accnt-section-title">Account Settings</h3>
          <div className="accnt-menu">
            {isAdmin && (
              <button className="accnt-item" onClick={() => onNavigate('admin')} style={{width: '100%', textAlign: 'left', background: 'none', borderBottom: '1px solid #f5f5f5'}}>
                <span className="accnt-icon" style={{background: '#ffe8e8'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4F5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </span>
                <span className="accnt-label" style={{color: '#FF4F5A'}}>Admin Dashboard</span>
                <span className="accnt-arrow">›</span>
              </button>
            )}
            <button className="accnt-item" onClick={signOut} style={{width: '100%', textAlign: 'left', background: 'none', borderBottom: 'none'}}>
              <span className="accnt-icon" style={{background: '#f0f0f0'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </span>
              <span className="accnt-label">Sign Out</span>
              <span className="accnt-arrow">›</span>
            </button>
          </div>
        </div>
      )}

      {/* Smart Install Section — works on Android, iOS and Desktop */}
      {!installed && (
        <div className="account-section" style={{marginTop: '20px'}}>
          <h3 className="accnt-section-title">📲 Install App</h3>
          {isIOS() ? (
            <div style={{background: '#fff0f1', borderRadius: '14px', padding: '14px 16px'}}>
              <p style={{fontSize: '13px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 10px'}}>Install on iPhone / iPad</p>
              <p style={{fontSize: '12px', color: '#555', margin: 0, lineHeight: 1.8}}>
                1️⃣ Tap the <strong>Share</strong> button at the bottom of Safari<br/>
                2️⃣ Scroll and tap <strong>"Add to Home Screen"</strong><br/>
                3️⃣ Tap <strong>"Add"</strong> — done!
              </p>
            </div>
          ) : (
            <>
              <button
                onClick={handleInstallClick}
                disabled={!deferredPrompt}
                style={{
                  width: '100%', padding: '16px',
                  background: deferredPrompt ? 'linear-gradient(135deg, #FF4F5A, #ff7b84)' : '#eee',
                  color: deferredPrompt ? '#fff' : '#aaa',
                  border: 'none', borderRadius: '14px',
                  fontSize: '14px', fontWeight: '700',
                  cursor: deferredPrompt ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'all 0.2s'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {deferredPrompt ? 'Tap to Install KieZ Pharma' : 'Open in Chrome to Install'}
              </button>
              {!deferredPrompt && (
                <p style={{fontSize: '11px', color: '#aaa', textAlign: 'center', marginTop: '8px'}}>
                  Use <strong>Chrome</strong> on Android or <strong>Safari</strong> on iPhone to install.
                </p>
              )}
            </>
          )}
        </div>
      )}

      {installed && (
        <div style={{textAlign:'center', padding:'12px', color:'#10c97e', fontSize:'13px', fontWeight:'700', background:'#e8faf3', borderRadius:'12px', margin:'16px'}}>
          ✅ KieZ Pharma is installed on your device!
        </div>
      )}

      <div className="account-section" style={{marginTop: '20px'}}>
        <h3 className="accnt-section-title">Support</h3>
        <div className="accnt-menu">
          <a className="accnt-item" href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noreferrer">
            <span className="accnt-icon wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
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

      <div className="account-version">KieZ Pharma v1.0.0</div>
    </div>
  );
}
