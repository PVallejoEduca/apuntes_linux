import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Commands data available for future use
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Select key commands for the showcase
const showcaseCommands = [
  { name: 'pwd', description: 'Muestra dónde estás', example: '/home/usuario/proyecto' },
  { name: 'ls -lah', description: 'Lista con permisos y tamaños legibles', example: 'drwxr-xr-x 5 user group 4.0K Jan 15 10:30 proyectos' },
  { name: 'cd /ruta', description: 'Cambia de directorio', example: 'cd ~/workspace/proyecto' },
  { name: 'cat / less', description: 'Muestra contenido de archivos', example: 'cat config.txt | less' },
  { name: 'grep', description: 'Filtra líneas por patrón', example: 'grep ERROR app.log' },
  { name: 'chmod / chown', description: 'Permisos y propietario', example: 'chmod +x script.sh' },
];

export function CommandCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        },
      });

      // Title entrance
      scrollTl.fromTo(
        titleRef.current,
        { opacity: 0, y: '-4vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0
      );

      // Cards strip entrance from right
      scrollTl.fromTo(
        stripRef.current,
        { x: '60vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Exit animations
      scrollTl.fromTo(
        titleRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-3vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        stripRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0.25, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const scrollStrip = (direction: 'left' | 'right') => {
    if (stripRef.current) {
      const scrollAmount = 300;
      stripRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="commands"
      className="relative w-full h-screen overflow-hidden bg-sage-bg"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-forest">
          <path d="M50 5 Q80 25 80 55 Q80 85 50 95 Q20 85 20 55 Q20 25 50 5" />
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Title */}
        <div
          ref={titleRef}
          className="pt-24 lg:pt-32 px-6 sm:px-8 lg:px-12 xl:px-20"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="tag-sage mb-4 inline-block">Referencia rápida</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
            Comandos que usarás cada día
          </h2>
          <p className="max-w-xl text-sage-muted text-base lg:text-lg">
            No los memorices de golpe. Aprende a leer su salida y a combinarlos.
          </p>
        </div>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 left-4 lg:left-8 z-20">
          <button
            onClick={() => scrollStrip('left')}
            className="p-3 rounded-full bg-white shadow-card hover:shadow-card-hover text-forest hover:-translate-y-0.5 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 lg:right-8 z-20">
          <button
            onClick={() => scrollStrip('right')}
            className="p-3 rounded-full bg-white shadow-card hover:shadow-card-hover text-forest hover:-translate-y-0.5 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Cards Strip */}
        <div
          ref={stripRef}
          className="flex-1 flex items-center gap-6 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-x-auto scrollbar-hide pb-8"
          style={{ willChange: 'transform' }}
        >
          {showcaseCommands.map((cmd, index) => (
            <div
              key={cmd.name}
              className="flex-shrink-0 w-[280px] lg:w-[320px] card-sage p-6 lg:p-8 hover:-translate-y-1.5 hover:border-forest/25 hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Command name */}
              <div className="flex items-start justify-between mb-4">
                <code className="text-2xl lg:text-3xl font-mono font-bold text-forest">
                  {cmd.name}
                </code>
                <button
                  onClick={() => copyToClipboard(cmd.name.split(' ')[0], index)}
                  className="p-2 rounded-lg bg-sage-panel text-sage-muted hover:bg-forest hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Copiar"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-sage-muted mb-6">{cmd.description}</p>

              {/* Example */}
              <div className="terminal-block">
                <span className="prompt">$ </span>
                <span className="command">{cmd.example}</span>
              </div>

              {/* Link to full reference */}
              <div className="mt-4 pt-4 border-t border-forest/10">
                <a
                  href="#reference"
                  className="text-sm text-forest font-medium hover:underline"
                >
                  Ver opciones completas →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
