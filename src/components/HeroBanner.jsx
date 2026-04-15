import React, { useState, useEffect } from 'react';
import { heroSlides } from '../data/products';
import './HeroBanner.css';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % heroSlides.length);
        setAnimating(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="hero-banner">
      <div className={`hero-slide ${animating ? 'hero-slide--exit' : 'hero-slide--enter'}`} key={current}>
        <img src={slide.image} alt={slide.title} className="hero-bg-img" />
        <div className="hero-overlay" style={{ background: slide.gradient.replace('linear-gradient', 'linear-gradient').replace('100%)', '80%)') }} />
        <div className="hero-content">
          <span className="hero-badge">{slide.badge}</span>
          <h1 className="hero-title">{slide.title}</h1>
          <p className="hero-subtitle">{slide.subtitle}</p>
          <button className="hero-cta">{slide.cta} →</button>
        </div>
      </div>
      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}
