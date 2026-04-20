import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const Concept = () => {
  useEffect(() => {
    // Reveal animations
    const revealElements = document.querySelectorAll(".gs-reveal");
    revealElements.forEach(el => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    });

    // Parallax
    const parallaxElements = document.querySelectorAll(".gs-parallax");
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute("data-speed")) || 1;
      gsap.to(el, {
        y: () => (ScrollTrigger.maxScroll(window) - ScrollTrigger.maxScroll(window)*speed)*0.1,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, []);

  return (
    <section id="concept" className="relative py-32 z-10 bg-brand-bg">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="font-sans text-brand-accent text-sm tracking-widest mb-6 block">01 / OUR PHILOSOPHY</span>
            <h2 className="font-serif text-4xl md:text-6xl text-brand-dark leading-tight mb-8 gs-reveal">
              Artisanal Flow & <br /> Aesthetic Living.
            </h2>
            <p className="font-sans text-brand-dark/70 leading-relaxed mb-8 gs-reveal">
              以太晨光将早午餐升华为一场感官仪式。我们严选在地有机食材与世界级精品庄园豆，每一杯职人手冲、每一份原型轻食，皆是我们对「静谧慢活美学」的极致演绎。在这里，时间将随咖啡香气缓慢流动。
            </p>
            <ul className="flex flex-col gap-4 font-serif text-xl gs-reveal">
              <li className="flex items-center gap-3"><Icon icon="solar:star-fall-minimalistic-linear" className="text-brand-accent" /> 职人手冲艺术 (Artisanal Coffee)</li>
              <li className="flex items-center gap-3"><Icon icon="solar:leaf-linear" className="text-brand-accent" /> 原型健康轻食 (Organic Ingredients)</li>
              <li className="flex items-center gap-3"><Icon icon="solar:cup-hot-linear" className="text-brand-accent" /> 静谧慢活美学 (Aesthetic Living)</li>
            </ul>
          </div>
          
          <div className="md:col-span-7 relative h-[80vh] w-full mt-12 md:mt-0">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 img-hover-wrap gs-parallax z-10" data-speed="0.9">
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop" alt="Pour over coffee" className="w-full h-full object-cover filter brightness-95" />
            </div>
            <div className="absolute bottom-0 left-0 w-2/3 h-1/2 img-hover-wrap gs-parallax z-20 shadow-2xl" data-speed="1.2">
              <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop" alt="Cafe Interior" className="w-full h-full object-cover filter brightness-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Concept;
