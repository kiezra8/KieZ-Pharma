import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './HeroBanner.css';

export default function HeroBanner() {
  const { banners } = useApp();
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % banners.length);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 800);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length, current]);

  if (!banners || banners.length === 0) return null;

  const currentSlide = banners[current] || banners[0];
  const prevSlide = banners[prev] || banners[0];

  return (
    <div className="hero-banner">
      {/* Outgoing Slide (underneath) */}
      <div className="hero-slide hero-slide--background">
        <img src={prevSlide.image} alt="" className="hero-bg-img" />
        <div className="hero-overlay" style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.8) 0%, rgba(26,26,46,0) 100%)' }} />
        <div className="hero-content" style={{ opacity: 0 }}>
           <h1 className="hero-title">{prevSlide.title}</h1>
        </div>
      </div>

      {/* Incoming Slide (fades in) */}
      <div className={`hero-slide ${isTransitioning ? 'hero-slide--entering' : ''}`} key={current}>
        <img src={currentSlide.image} alt={currentSlide.title} className="hero-bg-img" />
        <div className="hero-overlay" style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.8) 0%, rgba(26,26,46,0) 100%)' }} />
        <div className="hero-content">
          <h1 className="hero-title">{currentSlide.title}</h1>
          <p className="hero-subtitle">{currentSlide.subtitle}</p>
        </div>
      </div>

      <div className="hero-dots">
        {banners.map((_, i) => (
          <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => {
            setPrev(current);
            setCurrent(i);
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 800);
          }} />
        ))}
      </div>
    </div>
  );
}
