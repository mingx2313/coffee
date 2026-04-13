import React from 'react';
import NoiseOverlay from './components/NoiseOverlay';
import CustomCursor from './components/CustomCursor';
import WebGLBackground from './components/WebGLBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Concept from './components/Concept';
import FullscreenGallery from './components/FullscreenGallery';
import MenuHighlights from './components/MenuHighlights';
import FullMenu from './components/FullMenu';
import CoffeeOrigins from './components/CoffeeOrigins';
import SpaceGallery from './components/SpaceGallery';
import ChefStory from './components/ChefStory';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

function App() {
  return (
    <div className="relative">
      <NoiseOverlay />
      <CustomCursor />

      {/* Background Vertical Guides */}
      <div className="guide-lines">
        <div className="guide-line"></div>
        <div className="guide-line"></div>
        <div className="guide-line"></div>
        <div className="guide-line"></div>
      </div>

      <WebGLBackground />
      <Header />

      <main>
        {/* Existing sections — untouched */}
        <Hero />
        <Marquee />
        <Concept />
        <SectionDivider className="py-12 bg-brand-bg" />

        {/* New: 4-column clip reveal */}
        <FullscreenGallery />

        {/* Existing menu — images fixed */}
        <MenuHighlights />

        {/* Full menu section */}
        <FullMenu />

        {/* New: horizontal scroll bean origins */}
        <CoffeeOrigins />

        {/* New: liquid wipe space gallery */}
        <SpaceGallery />

        {/* New: artisan profiles */}
        <ChefStory />

        {/* New: rotating press quotes */}
        <Testimonials />

        {/* New: location & contact */}
        <Location />
      </main>

      <Footer />
    </div>
  );
}

export default App;
