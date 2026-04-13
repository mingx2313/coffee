import { useState } from 'react';
import { Icon } from '@iconify/react';

const menuItems = [
  // Coffee
  {
    category: 'Coffee',
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop',
    alt: 'Pour Over Coffee',
    name: 'Ethiopia Yirgacheffe',
    desc: 'Pour-over · floral, jasmine, bright citrus',
    price: 'RM 20',
  },
  {
    category: 'Coffee',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    alt: 'Iced Caramel Latte',
    name: 'Iced Caramel Latte',
    desc: 'Double espresso, oat milk, house caramel drizzle',
    price: 'RM 18',
  },
  {
    category: 'Coffee',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    alt: 'Cold Brew Tonic',
    name: 'Cold Brew Tonic',
    desc: '18-hour cold brew, premium tonic, dried orange',
    price: 'RM 22',
  },
  // Food
  {
    category: 'Food',
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
    alt: 'Avocado Toast',
    name: 'Sourdough Avocado',
    desc: 'Organic avocado, poached egg, chili flakes',
    price: 'RM 28',
  },
  {
    category: 'Food',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
    alt: 'Nasi Lemak Benedict',
    name: 'Nasi Lemak Benedict',
    desc: 'Pandan rice cake, rendang beef, sambal hollandaise',
    price: 'RM 32',
  },
  {
    category: 'Food',
    img: 'https://images.unsplash.com/photo-1512058556646-c4da40fba323?q=80&w=800&auto=format&fit=crop',
    alt: 'Chicken Satay Wrap',
    name: 'Chicken Satay Wrap',
    desc: 'Grilled satay chicken, peanut sauce, pickled cucumber',
    price: 'RM 26',
  },
  // Pastries
  {
    category: 'Pastries',
    img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
    alt: 'Ricotta Hotcakes',
    name: 'Ricotta Hotcakes',
    desc: 'Honeycomb butter, seasonal berries, maple',
    price: 'RM 24',
  },
  {
    category: 'Pastries',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    alt: 'Pandan Kouign-Amann',
    name: 'Pandan Kouign-Amann',
    desc: 'Flaky caramelised pastry, pandan cream, toasted coconut',
    price: 'RM 14',
  },
  {
    category: 'Pastries',
    img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop',
    alt: 'Matcha Basque Cheesecake',
    name: 'Matcha Basque Cheesecake',
    desc: 'Burnt edges, ceremonial matcha, fresh cream',
    price: 'RM 16',
  },
];

const tabs = ['All', 'Coffee', 'Food', 'Pastries'];

const FullMenu = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? menuItems : menuItems.filter(i => i.category === active);

  return (
    <section id="full-menu" className="relative py-32 px-6 md:px-12 bg-brand-bg z-10">
      <div className="max-w-screen-2xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="font-sans text-brand-accent text-sm tracking-widest mb-4 block">03 / FULL MENU</span>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight text-brand-dark">Every Detail, <br />Crafted.</h2>
          </div>
          <p className="font-sans text-brand-dark/40 text-sm tracking-widest mt-6 md:mt-0">Bangsar, Kuala Lumpur</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-14 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`font-sans text-sm tracking-widest uppercase px-6 py-2 rounded-full border transition-all duration-300 ${
                active === tab
                  ? 'bg-brand-dark text-brand-bg border-brand-dark'
                  : 'bg-transparent text-brand-dark/50 border-brand-dark/20 hover:border-brand-dark/60 hover:text-brand-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="group cursor-none hover-trigger"
            >
              <div className="img-hover-wrap h-[320px] w-full mb-6 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="flex justify-between items-start border-t border-brand-dark/10 pt-4">
                <div>
                  <span className="font-sans text-brand-accent text-xs tracking-widest uppercase mb-1 block">{item.category}</span>
                  <h3 className="font-serif text-xl text-brand-dark mb-1">{item.name}</h3>
                  <p className="font-sans text-sm text-brand-dark/50">{item.desc}</p>
                </div>
                <span className="font-sans text-brand-dark font-medium ml-4 whitespace-nowrap">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-20 border-t border-brand-dark/10 pt-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <p className="font-sans text-brand-dark/40 text-xs tracking-widest uppercase">
            All prices are inclusive of SST · Menu subject to seasonal change
          </p>
          <div className="flex items-center gap-2 font-sans text-brand-dark/40 text-xs tracking-widest uppercase">
            <Icon icon="solar:map-point-linear" className="text-brand-accent" />
            Jalan Telawi 3, Bangsar, KL
          </div>
        </div>

      </div>
    </section>
  );
};

export default FullMenu;
