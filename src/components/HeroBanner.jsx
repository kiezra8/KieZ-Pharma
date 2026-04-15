import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './HeroBanner.css';

export default function HeroBanner() {
  const { banners } = useApp();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => banners.length > 0 ? (c + 1) % banners.length : 0);
        setAnimating(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!banners || banners.length === 0) return null;

  const slide = banners[current] || banners[0];

  return (
    <div className="hero-banner">
      <div className={`hero-slide ${animating ? 'hero-slide--exit' : 'hero-slide--enter'}`} key={current}>
        <img src={slide.image} alt={slide.title} className="hero-bg-img" />
        <div className="hero-overlay" style={{ background: slide.gradient || 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
        <div className="hero-content">
          {slide.badge && <span className="hero-badge">{slide.badge}</span>}
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-subtitle">{slide.subtitle}</p>
          <button className="hero-cta">{slide.cta || 'Shop Now'} →</button>
        </div>
      </div>
      <div className="hero-dots">
        {banners.map((_, i) => (
          <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}
