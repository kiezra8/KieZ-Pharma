import React from 'react';
import { useApp } from '../context/AppContext';
import './SplashScreen.css';

export default function SplashScreen() {
  const { loading } = useApp();

  if (!loading) return null;

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          <span className="splash-cross">✚</span>
        </div>
        <h1 className="splash-brand">KieZ Pharma</h1>
        <p className="splash-tagline">Medical Supplies</p>
        <div className="splash-loader"></div>
      </div>
    </div>
  );
}
