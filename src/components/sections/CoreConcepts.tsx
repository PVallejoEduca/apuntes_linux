import { useEffect, useRef } from 'react';
import { Folder, FileText, HardDrive, Home } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const keyPoints = [
  { icon: Folder, label: '/etc', description: 'Configuración' },
  { icon: FileText, label: '/var/log', description: 'Logs' },
  { icon: HardDrive, label: '/dev', description: 'Dispositivos' },
  { icon: Home, label: '/home', description: 'Tu espacio' },
];

export function CoreConcepts() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Image entrance from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Content panel from right
      scrollTl.fromTo(
        contentRef.current,
        { x: '60vw' },
        { x: 0, ease: 'none' },
        0
      );

      // Text content
      scrollTl.fromTo(
        textRef.current,
        { opacity: 0, y: '8vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0.05
      );

      // Exit animations
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-full lg:w-[52vw] h-full"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/hero-terminal.jpg"
          alt="Linux filesystem"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-sage-bg/90 lg:to-transparent" />
        <div className="absolute inset-0 bg-forest-dark/30" />
      </div>

      {/* Right Content Panel */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 w-full lg:w-[48vw] h-full bg-sage-bg flex items-center"
        style={{ willChange: 'transform' }}
      >
        {/* Divider line */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-forest/15" />

        <div
          ref={textRef}
          className="w-full px-8 lg:px-16 py-12"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Eyebrow */}
          <span className="tag-sage mb-6 inline-block">Concepto clave</span>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-6 leading-tight">
            Todo es un fichero
          </h2>

          {/* Description */}
          <p className="text-base lg:text-lg text-sage-muted leading-relaxed mb-8">
            En Linux, discos, dispositivos, configuración y procesos se exponen como archivos 
            y directorios. Entender esto te permite diagnosticar problemas leyendo logs y 
            ajustando configuración sin depender de interfaces gráficas.
          </p>

          {/* Key points grid */}
          <div className="grid grid-cols-2 gap-4">
            {keyPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.label}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-forest/10 hover:border-forest/25 hover:shadow-card transition-all duration-300"
                >
                  <div className="p-2.5 rounded-xl bg-forest/10 text-forest">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <code className="text-sm font-mono font-semibold text-forest-dark">
                      {point.label}
                    </code>
                    <p className="text-xs text-sage-muted">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
