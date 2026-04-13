import React from 'react';
import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <footer id="reservation" className="relative py-40 px-6 bg-brand-bg text-center flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="absolute w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-3xl -z-10 mix-blend-multiply gs-parallax" data-speed="0.5"></div>
      
      <span className="font-sans text-brand-accent text-sm tracking-widest mb-6 block">03 / RESERVATION</span>
      <h2 className="font-serif text-5xl md:text-8xl text-brand-dark mb-10 leading-none">Reserve Your <br /> Morning Aura.</h2>
      
      <button className="hover-trigger relative overflow-hidden group bg-brand-dark text-brand-bg px-10 py-5 rounded-full font-sans tracking-widest uppercase text-sm transition-all duration-500 hover:scale-105 shadow-xl">
        <span className="relative z-10 flex items-center gap-3">Book Your Table <Icon icon="solar:calendar-date-linear" /></span>
        <div className="absolute inset-0 bg-brand-accent transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></div>
      </button>

      <div className="mt-32 w-full max-w-screen-xl flex flex-col md:flex-row justify-between items-center border-t border-brand-dark/10 pt-8 text-brand-dark/60 font-sans text-xs tracking-widest uppercase">
        <p>&copy; 2026 AETHER BREW. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-xl">
          <a href="#" className="hover-trigger hover:text-brand-accent transition-colors"><Icon icon="solar:camera-linear" /></a>
          <a href="#" className="hover-trigger hover:text-brand-accent transition-colors"><Icon icon="solar:map-point-linear" /></a>
          <a href="#" className="hover-trigger hover:text-brand-accent transition-colors"><Icon icon="solar:letter-linear" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
