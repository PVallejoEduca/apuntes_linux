import { useEffect, useState } from 'react';
import { X, Clock, CheckCircle, AlertCircle, Terminal, Copy, Check, BookOpen } from 'lucide-react';
import type { Module } from '@/data/courseData';

interface ModuleDetailProps {
  module: Module | null;
  onClose: () => void;
}

export function ModuleDetail({ module, onClose }: ModuleDetailProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'practice' | 'errors' | 'eval'>('content');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (module) {
      // Load completed steps from localStorage
      const saved = localStorage.getItem(`module-${module.id}-steps`);
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
      setActiveTab('content');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [module]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleStep = (step: number) => {
    const newCompleted = {
      ...completedSteps,
      [step]: !completedSteps[step],
    };
    setCompletedSteps(newCompleted);
    if (module) {
      localStorage.setItem(`module-${module.id}-steps`, JSON.stringify(newCompleted));
    }
  };

  if (!module) return null;

  const tabs = [
    { id: 'content', label: 'Contenido', icon: BookOpen },
    { id: 'practice', label: 'Práctica', icon: Terminal },
    { id: 'errors', label: 'Errores', icon: AlertCircle },
    { id: 'eval', label: 'Evaluación', icon: CheckCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-forest/10 bg-sage-bg">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="tag-sage">Módulo {module.number}</span>
              <span className="flex items-center gap-1 text-xs text-sage-muted">
                <Clock className="w-3 h-3" />
                {module.labTime}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-forest-dark">
              {module.title}
            </h2>
            <p className="text-sage-muted mt-1">{module.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-forest/10 text-forest-dark transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-forest/10 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-forest text-forest'
                    : 'border-transparent text-sage-muted hover:text-forest-dark'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'content' && (
            <div className="space-y-8">
              {/* Objective */}
              <div className="p-5 rounded-2xl bg-forest/5 border border-forest/10">
                <h3 className="font-heading font-semibold text-forest-dark mb-2">
                  Objetivo del tema
                </h3>
                <p className="text-sm text-sage-muted">{module.objective}</p>
              </div>

              {/* Key Commands */}
              <div>
                <h3 className="font-heading font-semibold text-forest-dark mb-3">
                  Comandos clave que usarás
                </h3>
                <div className="flex flex-wrap gap-2">
                  {module.keyCommands.slice(0, 8).map((cmd) => (
                    <code
                      key={cmd}
                      className="px-3 py-1.5 rounded-lg bg-slate-deep text-code-text text-sm font-mono"
                    >
                      {cmd}
                    </code>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {module.sections.map((section) => (
                  <div key={section.id} className="border-l-2 border-forest/20 pl-4">
                    <h4 className="font-semibold text-forest-dark mb-2">
                      {section.title}
                    </h4>
                    <p className="text-sm text-sage-muted mb-3">{section.content}</p>

                    {section.codeExamples && section.codeExamples.length > 0 && (
                      <div className="space-y-2">
                        {section.codeExamples.map((ex, i) => (
                          <div key={i} className="relative">
                            {ex.description && (
                              <p className="text-xs text-sage-muted mb-1">{ex.description}</p>
                            )}
                            <div className="terminal-block text-xs">
                              <div className="flex items-start justify-between gap-2">
                                <code>{ex.code}</code>
                                <button
                                  onClick={() => copyToClipboard(ex.code)}
                                  className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                                >
                                  {copiedCode === ex.code ? (
                                    <Check className="w-3 h-3" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                              {ex.output && (
                                <div className="mt-2 pt-2 border-t border-white/10 text-white/60">
                                  {ex.output}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.tips && section.tips.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {section.tips.map((tip, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-xl text-sm ${
                              tip.type === 'consejo'
                                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                : tip.type === 'ojo'
                                ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                : tip.type === 'error'
                                ? 'bg-red-50 text-red-700 border border-red-100'
                                : 'bg-sage-panel text-sage-muted'
                            }`}
                          >
                            <span className="font-semibold capitalize">{tip.type}:</span>{' '}
                            {tip.content}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-forest" />
                  <span className="font-semibold text-forest-dark">Duración: {module.labTime}</span>
                </div>
                <p className="text-sm text-sage-muted">
                  Sigue estos pasos en tu terminal. Marca cada paso como completado cuando lo termines.
                </p>
              </div>

              {module.guidedPractice.map((step) => (
                <div
                  key={step.step}
                  className={`p-5 rounded-2xl border transition-colors ${
                    completedSteps[step.step]
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-forest/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleStep(step.step)}
                      className="flex-shrink-0 mt-0.5"
                    >
                      {completedSteps[step.step] ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-forest/30 flex items-center justify-center text-xs font-semibold text-forest">
                          {step.step}
                        </div>
                      )}
                    </button>

                    <div className="flex-1">
                      <h4 className="font-semibold text-forest-dark mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-sage-muted mb-3">{step.instructions}</p>

                      {step.commands && step.commands.length > 0 && (
                        <div className="space-y-1">
                          {step.commands.map((cmd, i) => (
                            <div key={i} className="terminal-block text-xs">
                              <div className="flex items-start justify-between gap-2">
                                <code>
                                  <span className="prompt">$ </span>
                                  <span className="command">{cmd}</span>
                                </code>
                                <button
                                  onClick={() => copyToClipboard(cmd)}
                                  className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                                >
                                  {copiedCode === cmd ? (
                                    <Check className="w-3 h-3" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.verification && (
                        <div className="mt-3 p-3 rounded-lg bg-forest/5">
                          <span className="text-xs font-semibold text-forest">Verificación:</span>
                          <p className="text-sm text-sage-muted">{step.verification}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'errors' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 mb-6">
                <p className="text-sm text-red-700">
                  Estos errores son comunes al trabajar con este tema. Aprende a identificarlos y solucionarlos.
                </p>
              </div>

              {module.commonErrors.map((error, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-white border border-forest/10"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-red-50 text-red-600 flex-shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-mono font-semibold text-red-700 text-sm">
                        {error.error}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3 pl-11">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                        Causa
                      </span>
                      <p className="text-sm text-forest-dark">{error.cause}</p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                        Solución
                      </span>
                      <p className="text-sm text-forest-dark">{error.solution}</p>
                    </div>

                    {error.diagnosticCommand && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted flex items-center gap-1">
                          <Terminal className="w-3 h-3" />
                          Diagnóstico
                        </span>
                        <div className="mt-1 terminal-block text-xs">
                          <code>
                            <span className="prompt">$ </span>
                            <span className="command">{error.diagnosticCommand}</span>
                          </code>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'eval' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-forest" />
                  <span className="font-semibold text-forest-dark">Duración: {module.evalTime}</span>
                </div>
                <p className="text-sm text-sage-muted">
                  Responde estas preguntas para verificar tu comprensión del tema.
                </p>
              </div>

              {module.miniEvaluation.map((q, index) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white border border-forest/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-sm font-semibold text-forest">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-forest-dark mb-3">{q.question}</p>

                      {q.answer && (
                        <div className="p-4 rounded-xl bg-sage-panel">
                          <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                            Respuesta
                          </span>
                          <p className="text-sm font-mono text-forest-dark mt-1">
                            {q.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
