import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from './components/Navigation';
import { SearchModal } from './components/SearchModal';
import { ModuleDetail } from './components/ModuleDetail';
import { Hero } from './components/sections/Hero';
import { StartHere } from './components/sections/StartHere';
import { Modules } from './components/sections/Modules';
import { CoreConcepts } from './components/sections/CoreConcepts';
import { CommandCards } from './components/sections/CommandCards';
import { CommonPitfalls } from './components/sections/CommonPitfalls';
import { Practice } from './components/sections/Practice';
import { Assessment } from './components/sections/Assessment';
import { ReferenceHub } from './components/sections/ReferenceHub';
import { FilesystemTree } from './components/sections/FilesystemTree';
import { Footer } from './components/sections/Footer';

import type { Module } from './data/courseData';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

interface PinnedRange {
  start: number;
  end: number;
  center: number;
}

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges: PinnedRange[] = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Only snap if within a pinned section range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // Flowing sections: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest: number, r: PinnedRange) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.2, max: 0.4 },
          delay: 0.1, // Small delay to allow free scrolling
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
  };

  return (
    <div className="relative min-h-screen bg-sage-bg">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation onSearchClick={() => setIsSearchOpen(true)} />

      {/* Main content */}
      <main className="relative">
        <Hero />
        <StartHere />
        <FilesystemTree />
        <Modules onModuleClick={handleModuleClick} />
        <CoreConcepts />
        <CommandCards />
        <CommonPitfalls />
        <Practice onModuleClick={handleModuleClick} />
        <Assessment />
        <ReferenceHub />
        <Footer />
      </main>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ModuleDetail module={selectedModule} onClose={() => setSelectedModule(null)} />
    </div>
  );
}

export default App;
