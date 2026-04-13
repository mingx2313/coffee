import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const artisans = [
  {
    name: 'Amir Hakim',
    nameTw: 'Head Barista',
    title: 'Head Barista · Coffee Artisan',
    quote:
      '"A great cup of coffee is never just brewed — it is felt. The warmth of your hands, the rhythm of the water, the breath of the bean — when these three converge, that is art."',
    detail:
      'Champion of the Malaysia Barista Championship 2022, trained under renowned roasters in Melbourne and Tokyo. With over a decade in specialty coffee, Amir specialises in Nordic pour-over and precision espresso extraction.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    align: 'left',
    accent: '#D4A373',
  },
  {
    name: 'Siti Nuraini',
    nameTw: 'Head Chef',
    title: 'Head Chef · Culinary Director',
    quote:
      '"Food is the language of memory. I write each dish using Malaysian soul, Japanese precision, and Nordic minimalism — a love letter to this land."',
    detail:
      'Graduate of Le Cordon Bleu Paris, formerly at a Michelin-starred restaurant in Singapore and Copenhagen. Back in KL, she champions whole-food aesthetics rooted in local organic produce and bold Southeast Asian flavour.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    align: 'right',
    accent: '#C4A882',
  },
];

const ChefStory = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.artisan-reveal');
    elements.forEach(el => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section id="artisans" className="relative py-32 bg-brand-bg z-10 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-24 artisan-reveal">
          <span className="font-sans text-brand-accent text-sm tracking-widest block mb-4">
            05 / THE ARTISANS
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-dark leading-tight">
            Behind Every<br />Perfect Moment.
          </h2>
        </div>

        {/* Artisan profiles */}
        {artisans.map((a, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-32 last:mb-0 artisan-reveal`}
          >
            {/* Text — alternates sides */}
            <div
              className={`md:col-span-5 flex flex-col ${
                a.align === 'right' ? 'md:col-start-8 md:order-2' : ''
              }`}
            >
              <p
                className="font-sans text-sm tracking-widest uppercase mb-2"
                style={{ color: a.accent }}
              >
                {a.title}
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-brand-dark mb-1">{a.name}</h3>
              <p className="font-sans text-brand-dark/40 text-sm mb-6 tracking-widest">{a.nameTw}</p>
              <blockquote className="font-serif text-lg md:text-xl text-brand-dark/80 italic leading-relaxed mb-6 border-l-2 pl-4" style={{ borderColor: a.accent }}>
                {a.quote}
              </blockquote>
              <p className="font-sans text-brand-dark/60 text-sm leading-relaxed">{a.detail}</p>
            </div>

            {/* Image */}
            <div
              className={`md:col-span-6 relative ${
                a.align === 'right' ? 'md:col-start-1 md:order-1' : 'md:col-start-7'
              }`}
            >
              <div className="img-hover-wrap aspect-[3/4] w-full">
                <img
                  src={a.img}
                  alt={a.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.92)' }}
                />
              </div>
              {/* Accent block */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 -z-10"
                style={{ backgroundColor: a.accent, opacity: 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChefStory;
