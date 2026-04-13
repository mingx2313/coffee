import React from 'react';
import { Icon } from '@iconify/react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 mix-blend-difference text-white">
      <div className="text-xl md:text-2xl font-serif tracking-widest font-semibold hover-trigger">
        AETHER <span className="font-sans text-xs tracking-widest ml-2 uppercase opacity-70">Brew & Brunch</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm font-sans tracking-widest uppercase items-center">
        <a href="#concept" className="hover-trigger relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full">Concept</a>
        <a href="#menu" className="hover-trigger relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full">Menu</a>
        <a href="#reservation" className="hover-trigger border border-white/30 px-5 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-500">Book Table</a>
      </nav>
      <button className="md:hidden hover-trigger text-2xl">
        <Icon icon="solar:hamburger-menu-outline" />
      </button>
    </header>
  );
};

export default Header;
