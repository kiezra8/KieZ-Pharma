import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './HeroBanner.css';

export default function HeroBanner() {
  const { banners } = useApp();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % banners.length);
        setAnimating(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners || banners.length === 0) return null;

  const slide = banners[current] || banners[0];

  return (
    <div className="hero-banner">
      <div className={`hero-slide ${animating ? 'hero-slide--exit' : 'hero-slide--enter'}`} key={current}>
        <img src={slide.image} alt={slide.title} className="hero-bg-img" />
        <div className="hero-overlay" style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.9) 0%, rgba(26,26,46,0.1) 100%)' }} />
        <div className="hero-content">
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-subtitle">{slide.subtitle}</p>
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
