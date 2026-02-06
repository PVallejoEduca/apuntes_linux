import { useEffect, useRef } from 'react';
import { Compass, Route, TerminalSquare, FileEdit, ArrowRightLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { learningPath } from '@/data/courseData';

gsap.registerPlugin(ScrollTrigger);

const icons = [Compass, Route, TerminalSquare, FileEdit, ArrowRightLeft];

export function StartHere() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.step-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToModule = (moduleId: string) => {
    const element = document.querySelector(`#module-${moduleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-sage-bg"
    >
      {/* Background leaf motif */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-forest">
          <path d="M50 5 Q80 25 80 55 Q80 85 50 95 Q20 85 20 55 Q20 25 50 5" />
        </svg>
      </div>

      <div className="relative z-10 section-padding">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="tag-sage mb-4 inline-block">Inicio rápido</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
            Empieza aquí: 5 pasos en 10 minutos
          </h2>
          <p className="max-w-2xl mx-auto text-sage-muted text-base lg:text-lg">
            No necesitas instalar nada. Abre la terminal y verifica que estás en el lugar correcto.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {learningPath.map((step, index) => {
            const Icon = icons[index];
            return (
              <button
                key={step.step}
                onClick={() => scrollToModule(step.moduleId)}
                className="step-card group text-left card-sage p-6 hover:-translate-y-1.5 hover:border-forest/25 transition-all duration-300"
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-forest text-white text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                  <Icon className="w-5 h-5 text-forest/60 group-hover:text-forest transition-colors" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-forest-dark text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-sage-muted">
                  {step.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center text-forest text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Ver módulo</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
