import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './AccountPage.css';

const WHATSAPP_NUM = '256702370441';

export default function AccountPage({ onNavigate }) {
  const { user, isAdmin, signIn, signUp, signOut } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);

  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
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

      {deferredPrompt && (
        <div className="account-section" style={{marginTop: '20px'}}>
           <h3 className="accnt-section-title">App Installation</h3>
           <button className="accnt-item install-item" onClick={handleInstallClick} style={{width: '100%', textAlign: 'left', background: '#ffe8e8', borderRadius: '14px', border: 'none'}}>
              <span className="accnt-icon" style={{background: '#FF4F5A'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </span>
              <span className="accnt-label" style={{color: '#FF4F5A', fontWeight: '700'}}>Install KieZ Pharma App</span>
              <span className="accnt-arrow" style={{color: '#FF4F5A'}}>Install</span>
            </button>
            <p style={{fontSize: '11px', color: '#888', marginTop: '8px', padding: '0 4px'}}>Get a faster experience by installing our app on your home screen.</p>
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
