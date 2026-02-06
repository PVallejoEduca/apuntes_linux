import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Circle, HelpCircle, Clock, Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { modules } from '@/data/courseData';

gsap.registerPlugin(ScrollTrigger);

export function Assessment() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('linux-assessment');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAnswer = (uniqueId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [uniqueId]: !prev[uniqueId] }));
  };

  const toggleComplete = (uniqueId: string) => {
    const newCompleted = {
      ...completedQuestions,
      [uniqueId]: !completedQuestions[uniqueId],
    };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('linux-assessment', JSON.stringify(newCompleted));
  };

  // Show one question per module with unique IDs
  const sampleQuestions = modules.map((m) => ({
    ...m.miniEvaluation[0],
    uniqueId: `mod-${m.number}-q-${m.miniEvaluation[0].id}`,
    moduleTitle: m.title,
    moduleNumber: m.number,
  }));

  return (
    <section
      ref={sectionRef}
      id="assessment"
      className="relative w-full py-20 lg:py-28 bg-sage-panel"
    >
      <div className="section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <span className="tag-sage mb-4 inline-block">Autoevaluación</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
              Mini evaluación rápida
            </h2>
            <p className="text-sage-muted text-base lg:text-lg">
              Comprueba tu comprensión con estas preguntas de cada módulo.
            </p>
          </div>

          {/* Assessment Card */}
          <div
            ref={cardRef}
            className="card-sage p-6 lg:p-10"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-forest/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-forest/10 text-forest">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-forest-dark">Duración estimada</span>
                  <p className="text-xs text-sage-muted">10-15 minutos</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-heading font-bold text-forest">
                  {Object.values(completedQuestions).filter(Boolean).length}
                </span>
                <span className="text-sage-muted"> / {sampleQuestions.length}</span>
                <p className="text-xs text-sage-muted">completadas</p>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {sampleQuestions.map((q, index) => (
                <div
                  key={q.uniqueId}
                  className="p-5 rounded-2xl bg-sage-bg border border-forest/5 hover:border-forest/15 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleComplete(q.uniqueId)}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {completedQuestions[q.uniqueId] ? (
                        <CheckCircle2 className="w-6 h-6 text-forest" />
                      ) : (
                        <Circle className="w-6 h-6 text-forest/30 hover:text-forest/60 transition-colors" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
                          Módulo {q.moduleNumber}
                        </span>
                      </div>

                      <h3 className="font-medium text-forest-dark mb-3">
                        {index + 1}. {q.question}
                      </h3>

                      {/* Answer reveal */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          revealedAnswers[q.uniqueId] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-4 rounded-xl bg-forest/5 border border-forest/10">
                          <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                            Respuesta
                          </span>
                          <p className="text-sm text-forest-dark mt-1 font-mono">
                            {q.answer}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleAnswer(q.uniqueId)}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm text-forest font-medium hover:underline"
                      >
                        {revealedAnswers[q.uniqueId] ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            <span>Ocultar respuesta</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>Ver respuesta</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-8 pt-6 border-t border-forest/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-sage-muted">Progreso</span>
                <span className="font-medium text-forest-dark">
                  {Math.round(
                    (Object.values(completedQuestions).filter(Boolean).length /
                      sampleQuestions.length) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-forest/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-forest transition-all duration-500"
                  style={{
                    width: `${
                      (Object.values(completedQuestions).filter(Boolean).length /
                        sampleQuestions.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Help note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-sage-muted flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>
                ¿Dudas? Revisa los módulos correspondientes o consulta la{' '}
                <a href="#reference" className="text-forest hover:underline">
                  referencia de comandos
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
