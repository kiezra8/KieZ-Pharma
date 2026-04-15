import React from 'react';
import { useApp } from '../context/AppContext';
import './SplashScreen.css';

export default function SplashScreen() {
  const { loading, error, fetchData } = useApp();

  if (!loading && !error) return null;

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          <span className="splash-cross">✚</span>
        </div>
        <h1 className="splash-brand">KieZ Pharma</h1>
        
        {error ? (
          <div className="splash-error">
            <p>Unable to connect to database.</p>
            <small>{error}</small>
            <button className="retry-btn" onClick={fetchData}>Retry Connection</button>
          </div>
        ) : (
          <>
            <p className="splash-tagline">Medical Supplies</p>
            <div className="splash-loader"></div>
          </>
        )}
      </div>
    </div>
  );
}
