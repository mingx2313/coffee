import React from 'react';
import { Icon } from '@iconify/react';

const menuItems = [
  {
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
    alt: 'Ethiopian Pour Over',
    name: 'Ethiopia Yirgacheffe',
    desc: 'Pour-over, floral, jasmine, bright citrus',
    price: 'RM 28',
    offset: '',
  },
  {
    img: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800&auto=format&fit=crop',
    alt: 'Flat White',
    name: 'Silky Flat White',
    desc: 'Velvety microfoam, espresso, creamy milk',
    price: 'RM 15',
    offset: 'md:mt-12',
  },
  {
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    alt: 'Cold Brew',
    name: 'Cold Brew Essence',
    desc: '16-hour cold brew, smooth, full-bodied',
    price: 'RM 17',
    offset: 'md:mt-24',
  },
  {
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
    alt: 'Sourdough Avocado',
    name: 'Sourdough Avocado',
    desc: 'Organic avocado, poached egg, chili flakes',
    price: 'RM 32',
    offset: '',
  },
  {
    img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
    alt: 'Ricotta Hotcakes',
    name: 'Ricotta Hotcakes',
    desc: 'Honeycomb butter, seasonal berries, maple',
    price: 'RM 28',
    offset: 'md:mt-12',
  },
  {
    img: 'https://images.unsplash.com/photo-1560072610-1cffb09faf0f?q=80&w=800&auto=format&fit=crop',
    alt: 'Croissant',
    name: 'Butter Croissant',
    desc: 'Flaky layers, French butter, golden-baked',
    price: 'RM 12',
    offset: 'md:mt-24',
  },
];

const MenuHighlights = () => {
  return (
    <section id="menu" className="relative py-32 px-6 md:px-12 bg-brand-dark text-brand-bg z-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gs-reveal">
          <div>
            <span className="font-sans text-brand-accent text-sm tracking-widest mb-4 block">02 / CURATED MENU</span>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">Taste the Details.</h2>
          </div>
          <a href="#" className="hover-trigger mt-6 md:mt-0 font-sans tracking-widest uppercase text-sm border-b border-brand-accent pb-1 hover:text-brand-accent transition-colors flex items-center gap-2">
            Full Menu <Icon icon="solar:arrow-right-linear" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, i) => (
            <div key={i} className={`group cursor-none hover-trigger gs-reveal ${item.offset}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="img-hover-wrap h-[400px] w-full mb-6">
                <img src={item.img} alt={item.alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex justify-between items-start border-t border-brand-bg/20 pt-4">
                <div>
                  <h3 className="font-serif text-2xl mb-1">{item.name}</h3>
                  <p className="font-sans text-sm text-brand-bg/60">{item.desc}</p>
                </div>
                <span className="font-sans text-brand-accent">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights;
