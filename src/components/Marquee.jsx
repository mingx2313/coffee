import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';

const Marquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1
    });
  }, []);

  return (
    <section className="py-12 border-y border-brand-dark/10 bg-brand-bg relative z-10 overflow-hidden flex items-center">
      <div className="absolute left-6 text-xs font-sans tracking-widest text-brand-dark/40 uppercase">Featured In</div>
      <div className="flex whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-700" ref={marqueeRef}>
        <div className="flex gap-20 px-10 items-center text-4xl">
          <Icon icon="simple-icons:vogue" />
          <Icon icon="simple-icons:gq" />
          <Icon icon="simple-icons:monocle" />
          <Icon icon="simple-icons:kinfolk" />
          <Icon icon="simple-icons:elle" />
          {/* Duplicate for infinite effect */}
          <Icon icon="simple-icons:vogue" />
          <Icon icon="simple-icons:gq" />
          <Icon icon="simple-icons:monocle" />
          <Icon icon="simple-icons:kinfolk" />
          <Icon icon="simple-icons:elle" />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
