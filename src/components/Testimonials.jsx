import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const quotes = [
  {
    text: '「以太晨光重新定義了台北的早午餐文化。那杯耶加雪菲手沖，是我今年喝過最接近詩的一杯咖啡。」',
    author: 'Sophie Chen',
    source: 'VOGUE Taiwan',
  },
  {
    text: '「空間、光線、食物與音樂——四者在此完美交融。這不只是一間咖啡廳，這是一個情緒的避難所。」',
    author: 'Marcus Wei',
    source: 'GQ Taiwan',
  },
  {
    text: '"AETHER BREW stands as one of Asia\'s most thoughtfully designed cafe experiences. Each detail whispers of intention."',
    author: 'James Holbrook',
    source: 'Monocle Magazine',
  },
  {
    text: '「每次走進以太晨光，我都感覺時間慢了下來。這種感覺，是任何藥方都無法複製的。」',
    author: '陳小姐',
    source: 'Google Reviews · ★★★★★',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const quoteRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [current, animating]);

  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(prev => (prev + 1) % quotes.length);
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => setAnimating(false),
          }
        );
      },
    });
  };

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(idx);
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => setAnimating(false),
          }
        );
      },
    });
  };

  const q = quotes[current];

  return (
    <section className="relative py-40 bg-brand-dark z-10 overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 50%, rgba(212,163,115,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <span className="font-sans text-brand-accent text-sm tracking-widest block mb-16">
          06 / VOICES
        </span>

        {/* Quote */}
        <div ref={quoteRef} className="mb-12">
          <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl text-brand-bg/90 italic leading-relaxed mb-10 max-w-4xl mx-auto">
            {q.text}
          </blockquote>
          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-brand-accent text-sm tracking-widest">{q.author}</span>
            <span className="font-sans text-brand-bg/40 text-xs tracking-widest uppercase">{q.source}</span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="hover-trigger transition-all duration-300 rounded-full"
              style={{
                width: i === current ? '24px' : '6px',
                height: '6px',
                backgroundColor: i === current ? '#D4A373' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
