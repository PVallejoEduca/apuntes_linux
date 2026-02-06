import { useState, useEffect } from 'react';
import { Terminal, Search, Menu, X, BookOpen } from 'lucide-react';

interface NavigationProps {
  onSearchClick?: () => void;
}

export function Navigation({ onSearchClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Módulos', href: '#modules' },
    { label: 'Comandos', href: '#commands' },
    { label: 'Prácticas', href: '#practice' },
    { label: 'Evaluación', href: '#assessment' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(26,46,34,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className={`p-2 rounded-xl transition-colors ${isScrolled ? 'bg-forest/10' : 'bg-white/20 backdrop-blur-sm'}`}>
                <Terminal className={`w-5 h-5 transition-colors ${isScrolled ? 'text-forest' : 'text-white'}`} />
              </div>
              <span className={`font-heading font-bold text-lg transition-colors ${isScrolled ? 'text-forest-dark' : 'text-white'}`}>
                LinuxCLI
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium transition-colors hover:opacity-80 ${
                    isScrolled ? 'text-forest-dark' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onSearchClick}
                className={`p-2.5 rounded-xl transition-all ${
                  isScrolled
                    ? 'hover:bg-forest/10 text-forest-dark'
                    : 'hover:bg-white/20 text-white'
                }`}
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isScrolled
                    ? 'bg-forest text-white hover:bg-forest-dark'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Guía</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl transition-all ${
                  isScrolled
                    ? 'hover:bg-forest/10 text-forest-dark'
                    : 'hover:bg-white/20 text-white'
                }`}
                aria-label="Menú"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-forest-dark/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-card p-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-forest-dark font-medium hover:bg-sage-panel transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
