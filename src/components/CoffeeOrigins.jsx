import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const origins = [
  {
    region: 'Ethiopia',
    subtitle: 'Yirgacheffe · 耶加雪菲',
    altitude: '1,800 – 2,200m',
    process: 'Natural / 日曬處理',
    flavor: '藍莓 · 茉莉 · 深可可',
    description:
      '在衣索比亞高原，古老的咖啡樹沐浴在熱帶陽光與迷霧之中。每一批豆子都是大地的禮物，散發著令人窒息的花香。',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1600&auto=format&fit=crop',
    accent: '#C4A882',
  },
  {
    region: 'Colombia',
    subtitle: 'Huila · 慧蘭',
    altitude: '1,500 – 1,900m',
    process: 'Washed / 水洗處理',
    flavor: '紅糖 · 焦糖蘋果 · 杏仁',
    description:
      '哥倫比亞安地斯山脈的農莊以家族方式耕作數十年，每一粒咖啡豆都承載著三代人的驕傲與汗水。',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop',
    accent: '#D4A373',
  },
  {
    region: 'Taiwan',
    subtitle: 'Alishan · 阿里山',
    altitude: '1,200 – 1,600m',
    process: 'Honey / 蜜處理',
    flavor: '龍眼蜜 · 烏龍茶 · 柔順甜感',
    description:
      '在台灣阿里山的茶園旁，小批量精品咖啡悄然生長。東方美人的細膩與咖啡的醇厚，在這裡奇妙地融合。',
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?q=80&w=1600&auto=format&fit=crop',
    accent: '#B8936A',
  },
];

const CoffeeOrigins = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    const cards = track.querySelectorAll('.origin-card');
    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Pin the section and scroll horizontally
      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Inner card reveals
      cards.forEach(card => {
        const content = card.querySelector('.card-content');
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(track)[0],
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-bg z-10 overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Section label */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <span className="font-sans text-brand-accent text-sm tracking-widest">03 / BEAN ORIGINS</span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${origins.length * 100}vw` }}
      >
        {origins.map((o, i) => (
          <div
            key={i}
            className="origin-card relative flex-shrink-0 h-full overflow-hidden"
            style={{ width: '100vw' }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={o.img}
                alt={o.region}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.45)' }}
              />
            </div>

            {/* Noise overlay per card */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{ opacity: 0.05, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
            />

            {/* Card number */}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 z-10">
              <span
                className="font-serif text-[20vw] leading-none font-semibold"
                style={{ color: o.accent, opacity: 0.08 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content */}
            <div className="card-content relative z-20 flex flex-col justify-end h-full px-12 md:px-24 pb-20">
              <p className="font-sans text-sm tracking-[0.3em] uppercase mb-3" style={{ color: o.accent }}>
                {o.subtitle}
              </p>
              <h2 className="font-serif text-7xl md:text-[9rem] leading-none text-brand-bg mb-8">
                {o.region}
              </h2>

              <div className="grid grid-cols-3 gap-8 mb-8 max-w-2xl border-t border-brand-bg/20 pt-6">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-brand-bg/40 mb-1">Altitude</p>
                  <p className="font-sans text-brand-bg/90 text-sm">{o.altitude}</p>
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-brand-bg/40 mb-1">Process</p>
                  <p className="font-sans text-brand-bg/90 text-sm">{o.process}</p>
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-brand-bg/40 mb-1">Flavors</p>
                  <p className="font-sans text-brand-bg/90 text-sm">{o.flavor}</p>
                </div>
              </div>

              <p className="font-sans text-brand-bg/60 max-w-md leading-relaxed text-sm">
                {o.description}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-8 left-12 md:left-24 z-20 flex gap-2 items-center">
              {origins.map((_, j) => (
                <div
                  key={j}
                  className="rounded-full transition-all"
                  style={{
                    width: i === j ? '24px' : '6px',
                    height: '6px',
                    backgroundColor: i === j ? o.accent : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoffeeOrigins;
