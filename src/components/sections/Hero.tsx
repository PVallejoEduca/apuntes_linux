import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial load animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image fade in
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 28, rotateX: 35 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.04 },
          '-=0.6'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Image parallax and fade
      scrollTl.fromTo(
        imageRef.current,
        { scale: 1, y: 0 },
        { scale: 1.08, y: '-2vh', ease: 'none' },
        0
      );

      // Content fade out
      scrollTl.fromTo(
        contentRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-10vh', ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToModules = () => {
    const element = document.querySelector('#modules');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCommands = () => {
    const element = document.querySelector('#commands');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlineWords = 'Linux en modo comando, rápido y con criterio.'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/hero-terminal.jpg"
          alt="Terminal Linux en entorno natural"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/40 via-forest-dark/20 to-forest-dark/60" />
      </div>

      {/* Leaf motif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-forest">
          <path d="M50 5 Q80 25 80 55 Q80 85 50 95 Q20 85 20 55 Q20 25 50 5" />
        </svg>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Tag */}
        <div className="mb-6 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
            Sistemas Informáticos · CFGS
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[0.95] tracking-tight mb-6"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-10"
        >
          Rutas, ficheros, editores, redirecciones, permisos y tareas básicas de administración
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <button onClick={scrollToModules} className="btn-primary group">
            <span>Empieza el módulo</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={scrollToCommands} className="btn-secondary bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
            Ver comandos esenciales
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  );
}
