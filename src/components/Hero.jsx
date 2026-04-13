import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".reveal-up", {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.5
    });
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 pt-20 z-10">
      <div className="clip-text">
        <h1 className="reveal-up font-serif text-6xl md:text-8xl lg:text-[9rem] leading-none text-brand-dark mb-4 tracking-tight drop-shadow-sm">
          Liquid Poetry.
        </h1>
      </div>
      <div className="clip-text mt-4">
        <p className="reveal-up font-sans text-lg md:text-xl text-brand-dark/80 tracking-widest uppercase font-light">
          Coffee and Cuisine in Harmony
        </p>
      </div>
    </section>
  );
};

export default Hero;
