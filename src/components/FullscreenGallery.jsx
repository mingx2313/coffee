import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2400&auto=format&fit=crop';

const COLUMNS = [0, 1, 2, 3];

const FullscreenGallery = () => {
  const sectionRef = useRef(null);
  const colRefs = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const cols = colRefs.current;
    const section = sectionRef.current;
    const text = textRef.current;

    // Stagger delays per column (ms)
    const delays = [0, 0.12, 0.06, 0.18];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        once: true,
      },
    });

    cols.forEach((col, i) => {
      tl.fromTo(
        col,
        { clipPath: 'inset(0 0 100% 0)', y: -30 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
        },
        delays[i]
      );
    });

    tl.fromTo(
      text,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      0.6
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden z-10 bg-brand-dark"
    >
      {/* 4-column clip reveal */}
      <div className="absolute inset-0 grid grid-cols-4">
        {COLUMNS.map((_, i) => (
          <div
            key={i}
            ref={el => (colRefs.current[i] = el)}
            className="relative h-full overflow-hidden"
            style={{ clipPath: 'inset(0 0 100% 0)' }}
          >
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${IMAGE})`,
                backgroundPositionX: `${i * 33.33}%`,
                filter: i % 2 === 1 ? 'brightness(0.85)' : 'brightness(0.95)',
              }}
            />
            {/* thin separator line */}
            {i < 3 && (
              <div className="absolute right-0 top-0 h-full w-px bg-brand-bg/10 z-10" />
            )}
          </div>
        ))}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/60 z-10 pointer-events-none" />

      {/* Centered text overlay */}
      <div
        ref={textRef}
        className="relative z-20 flex flex-col items-center justify-end h-full min-h-[100dvh] pb-24 text-center px-6"
        style={{ opacity: 0 }}
      >
        <span className="font-sans text-brand-accent text-sm tracking-widest mb-4 block">
          EVERY CUP TELLS A STORY
        </span>
        <h2 className="font-serif text-5xl md:text-8xl text-brand-bg leading-none mb-6">
          Crafted with<br />Intention.
        </h2>
        <p className="font-sans text-brand-bg/70 max-w-xl text-lg tracking-wide">
          從晨曦到午後，以太晨光的每一刻都是一首無聲的詩。
        </p>
      </div>
    </section>
  );
};

export default FullscreenGallery;
