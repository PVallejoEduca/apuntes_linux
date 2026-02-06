import { useEffect, useRef } from 'react';
import { AlertTriangle, Terminal, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { modules } from '@/data/courseData';

gsap.registerPlugin(ScrollTrigger);

// Collect all common errors from modules
const allErrors = modules.flatMap((m) =>
  m.commonErrors.map((e) => ({ ...e, moduleTitle: m.title }))
);

// Select the most common ones
const showcaseErrors = allErrors.slice(0, 6);

export function CommonPitfalls() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards scattered reveal
      const cards = cardsRef.current?.querySelectorAll('.error-card');
      if (cards) {
        cards.forEach((card, index) => {
          const rotation = (index % 2 === 0 ? -1 : 1) * (2 + Math.random() * 3);
          gsap.set(card, { rotation });

          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              delay: index * 0.08,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-sage-panel overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#2D5A3D" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 section-padding">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="tag-sage mb-4 inline-block bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="w-3 h-3 mr-1 inline" />
            Prevención
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
            Errores típicos y cómo reaccionar
          </h2>
          <p className="max-w-2xl mx-auto text-sage-muted text-base lg:text-lg">
            Aprender a diagnosticar es más útil que memorizar.
          </p>
        </div>

        {/* Polaroid Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {showcaseErrors.map((error, index) => (
            <div
              key={index}
              className="error-card group bg-white rounded-[18px] p-6 shadow-card hover:shadow-card-hover border border-forest/10 hover:border-forest/30 transition-all duration-300 hover:-translate-y-2 hover:rotate-0"
              style={{
                transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (2 + (index % 3))}deg)`,
              }}
            >
              {/* Error title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-xl bg-red-50 text-red-600 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold text-red-700 text-sm leading-tight">
                    {error.error}
                  </h3>
                  <span className="text-xs text-sage-muted">{error.moduleTitle}</span>
                </div>
              </div>

              {/* Cause */}
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                  Causa
                </span>
                <p className="text-sm text-forest-dark mt-1">{error.cause}</p>
              </div>

              {/* Solution */}
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                  Solución
                </span>
                <p className="text-sm text-forest-dark mt-1">{error.solution}</p>
              </div>

              {/* Diagnostic command */}
              {error.diagnosticCommand && (
                <div className="pt-4 border-t border-forest/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted flex items-center gap-1 mb-2">
                    <Terminal className="w-3 h-3" />
                    Diagnóstico
                  </span>
                  <code className="block p-3 rounded-xl bg-slate-deep text-code-text text-xs font-mono">
                    <span className="prompt">$ </span>
                    {error.diagnosticCommand}
                  </code>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#practice"
            className="inline-flex items-center gap-2 text-forest font-medium hover:underline"
          >
            <span>Ver todas las soluciones en las prácticas guiadas</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
