import { useEffect, useRef, useState } from 'react';
import { Clock, AlertCircle, CheckCircle, ChevronRight, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { modules } from '@/data/courseData';
import type { Module } from '@/data/courseData';

gsap.registerPlugin(ScrollTrigger);

interface ModulesProps {
  onModuleClick: (module: Module) => void;
}

export function Modules({ onModuleClick }: ModulesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

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

      // Cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.module-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.06,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="modules"
      className="relative w-full py-20 lg:py-28 bg-sage-panel"
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D5A3D' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 section-padding">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="tag-sage mb-4 inline-block">Contenido del curso</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
            Módulos del curso
          </h2>
          <p className="max-w-2xl mx-auto text-sage-muted text-base lg:text-lg">
            9 temas, de lo básico a la administración esencial.
          </p>
        </div>

        {/* Module Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {modules.map((module, index) => (
            <button
              key={module.id}
              id={`module-${module.id}`}
              onClick={() => onModuleClick(module)}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
              className="module-card group text-left card-sage p-6 lg:p-8 hover:-translate-y-1.5 hover:border-forest/25 hover:shadow-card-hover transition-all duration-300"
              style={{ perspective: '1000px' }}
            >
              {/* Module number */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl font-heading font-bold text-forest/10 group-hover:text-forest/20 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`p-2 rounded-xl transition-all ${hoveredModule === module.id ? 'bg-forest text-white' : 'bg-forest/10 text-forest'}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-heading font-semibold text-forest-dark text-xl mb-3 group-hover:text-forest transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-sage-muted mb-6 line-clamp-2">
                {module.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {module.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sage-panel text-sage-muted"
                  >
                    {tag.includes('Práctica') && <Clock className="w-3 h-3" />}
                    {tag.includes('Errores') && <AlertCircle className="w-3 h-3" />}
                    {tag.includes('evaluación') && <CheckCircle className="w-3 h-3" />}
                    {tag.split(' ').slice(0, 2).join(' ')}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center text-forest text-sm font-medium">
                <span>Explorar módulo</span>
                <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${hoveredModule === module.id ? 'translate-x-1' : ''}`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
