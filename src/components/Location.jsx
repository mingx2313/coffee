import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: 'Monday — Friday', time: '07:30 — 18:00' },
  { day: 'Saturday — Sunday', time: '08:00 — 19:00' },
  { day: 'Public Holiday', time: '09:00 — 17:00' },
];

const Location = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.location-reveal');
    els.forEach(el => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section id="location" className="relative bg-brand-bg z-10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* Left: Image */}
        <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
            alt="Cafe Exterior"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.75)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-bg/30" />
          {/* Floating label */}
          <div className="absolute bottom-8 left-8">
            <p className="font-sans text-brand-bg/60 text-xs tracking-widest uppercase mb-1">Kuala Lumpur</p>
            <p className="font-serif text-brand-bg text-2xl">AETHER BREW</p>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center px-10 md:px-16 py-20">
          <span className="font-sans text-brand-accent text-sm tracking-widest mb-8 block location-reveal">
            07 / FIND US
          </span>

          {/* Address */}
          <div className="mb-10 location-reveal">
            <p className="font-sans text-brand-dark/40 text-xs tracking-widest uppercase mb-3">Address</p>
            <p className="font-serif text-2xl md:text-3xl text-brand-dark leading-relaxed">
              Pavilion KL<br />Bukit Bintang, Kuala Lumpur
            </p>
            <p className="font-sans text-brand-dark/50 text-sm mt-2">
              Level 3, 168 Jln Bukit Bintang, 50088 KL
            </p>
          </div>

          {/* Hours */}
          <div className="mb-10 location-reveal">
            <p className="font-sans text-brand-dark/40 text-xs tracking-widest uppercase mb-3">Opening Hours</p>
            <div className="flex flex-col gap-3">
              {hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center border-b border-brand-dark/10 pb-3">
                  <span className="font-sans text-brand-dark/60 text-sm">{h.day}</span>
                  <span className="font-serif text-brand-dark text-base">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 location-reveal">
            <p className="font-sans text-brand-dark/40 text-xs tracking-widest uppercase mb-1">Contact</p>
            <a
              href="tel:+60-3-2148-2888"
              className="hover-trigger flex items-center gap-3 text-brand-dark/70 hover:text-brand-accent transition-colors group"
            >
              <Icon icon="solar:phone-linear" className="text-brand-accent" />
              <span className="font-sans text-sm">(+60 3) 2148-2888</span>
            </a>
            <a
              href="mailto:hello@aetherbrew.my"
              className="hover-trigger flex items-center gap-3 text-brand-dark/70 hover:text-brand-accent transition-colors group"
            >
              <Icon icon="solar:letter-linear" className="text-brand-accent" />
              <span className="font-sans text-sm">hello@aetherbrew.my</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover-trigger flex items-center gap-3 text-brand-dark/70 hover:text-brand-accent transition-colors group"
            >
              <Icon icon="solar:camera-linear" className="text-brand-accent" />
              <span className="font-sans text-sm">@aether.brew</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
