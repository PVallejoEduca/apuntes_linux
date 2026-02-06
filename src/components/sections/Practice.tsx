import { useEffect, useRef, useState } from 'react';
import { Clock, CheckCircle2, Circle, Terminal, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { modules } from '@/data/courseData';
import type { Module } from '@/data/courseData';

gsap.registerPlugin(ScrollTrigger);

interface PracticeProps {
  onModuleClick: (module: Module) => void;
}

export function Practice({ onModuleClick }: PracticeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem('linux-practice-steps');
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }

    const ctx = gsap.context(() => {
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

      const items = listRef.current?.querySelectorAll('.practice-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleStep = (stepId: string) => {
    const newCompleted = {
      ...completedSteps,
      [stepId]: !completedSteps[stepId],
    };
    setCompletedSteps(newCompleted);
    localStorage.setItem('linux-practice-steps', JSON.stringify(newCompleted));
  };

  // Get first practice from each module
  const practiceLabs = modules.map((m) => ({
    module: m,
    firstPractice: m.guidedPractice[0],
  }));

  return (
    <section
      ref={sectionRef}
      id="practice"
      className="relative w-full py-20 lg:py-28 bg-sage-bg"
    >
      <div className="section-padding">
        {/* Title */}
        <div ref={titleRef} className="mb-12 lg:mb-16">
          <span className="tag-sage mb-4 inline-block">Práctica guiada</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
            Laboratorios paso a paso
          </h2>
          <p className="max-w-2xl text-sage-muted text-base lg:text-lg">
            Practica con ejercicios guiados que cubren desde lo más básico hasta tareas de administración.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Practice List */}
          <div ref={listRef} className="space-y-4">
            {practiceLabs.map(({ module, firstPractice }) => (
              <div
                key={module.id}
                className="practice-item card-sage p-5 hover:-translate-y-0.5 hover:border-forest/25 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStep(module.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    {completedSteps[module.id] ? (
                      <CheckCircle2 className="w-6 h-6 text-forest" />
                    ) : (
                      <Circle className="w-6 h-6 text-forest/30 hover:text-forest/60 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                        Módulo {module.number}
                      </span>
                      <span className="text-sage-muted">·</span>
                      <span className="flex items-center gap-1 text-xs text-sage-muted">
                        <Clock className="w-3 h-3" />
                        {module.labTime}
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-forest-dark text-lg mb-2">
                      {module.title}
                    </h3>

                    <p className="text-sm text-sage-muted mb-3">
                      {firstPractice?.title}: {firstPractice?.instructions}
                    </p>

                    <button
                      onClick={() => onModuleClick(module)}
                      className="inline-flex items-center gap-1.5 text-sm text-forest font-medium hover:underline"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Ver práctica completa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="terminal-block">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-white/40">workspace_linux</span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="prompt">usuario@laptop:~$ </span>
                  <span className="command">pwd</span>
                </div>
                <div className="output">/home/usuario/workspace_linux</div>

                <div>
                  <span className="prompt">usuario@laptop:~$ </span>
                  <span className="command">whoami</span>
                </div>
                <div className="output">usuario</div>

                <div>
                  <span className="prompt">usuario@laptop:~$ </span>
                  <span className="command">ls -lah</span>
                </div>
                <div className="output">
                  drwxr-xr-x 5 usuario grupo 4.0K Jan 15 10:30 .<br />
                  drwxr-xr-x 3 usuario grupo 4.0K Jan 15 10:00 ..<br />
                  -rw-r--r-- 1 usuario grupo  220 Jan 15 10:30 .env<br />
                  drwxr-xr-x 2 usuario grupo 4.0K Jan 15 10:30 scripts
                </div>

                <div>
                  <span className="prompt">usuario@laptop:~$ </span>
                  <span className="command">echo &quot;Práctica en progreso...&quot;</span>
                </div>
                <div className="output text-green-400">Práctica en progreso...</div>

                <div className="flex items-center gap-2 mt-4">
                  <span className="prompt">usuario@laptop:~$ </span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-forest/5 border border-forest/10">
              <div className="flex items-start gap-3">
                <Terminal className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-forest-dark text-sm mb-1">
                    Consejo para prácticas
                  </h4>
                  <p className="text-sm text-sage-muted">
                    Guarda tus evidencias en ~/workspace/evidencias/ para poder revisarlas después.
                    Usa tee para ver y guardar la salida al mismo tiempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
