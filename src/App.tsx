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
import { PermissionsGuide } from './components/sections/PermissionsGuide';
import { Footer } from './components/sections/Footer';

import type { Module } from './data/courseData';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

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
        <PermissionsGuide />
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
