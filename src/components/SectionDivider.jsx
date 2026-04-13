import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionDivider = ({ className = '' }) => {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div className={className}>
      <div className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div 
          ref={lineRef} 
          className="w-full h-[1px] bg-brand-dark/10 origin-left"
        />
      </div>
    </div>
  );
};

export default SectionDivider;
