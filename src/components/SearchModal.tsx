import { useEffect, useState, useMemo } from 'react';
import { X, Search, Terminal, BookOpen, ArrowRight } from 'lucide-react';
import { modules, commands, glossary } from '@/data/courseData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();

    const moduleResults = modules
      .filter(
        (m) =>
          m.title.toLowerCase().includes(lowerQuery) ||
          m.description.toLowerCase().includes(lowerQuery)
      )
      .map((m) => ({ type: 'module' as const, item: m }));

    const commandResults = commands
      .filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.description.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map((c) => ({ type: 'command' as const, item: c }));

    const glossaryResults = glossary
      .filter(
        (g) =>
          g.term.toLowerCase().includes(lowerQuery) ||
          g.definition.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3)
      .map((g) => ({ type: 'glossary' as const, item: g }));

    return [...moduleResults, ...commandResults, ...glossaryResults];
  }, [query]);

  const scrollToModule = (moduleId: string) => {
    const element = document.querySelector(`#module-${moduleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-4 p-4 border-b border-forest/10">
          <Search className="w-5 h-5 text-sage-muted" />
          <input
            type="text"
            placeholder="Buscar módulos, comandos, términos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg text-forest-dark placeholder:text-sage-muted focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-forest/10 text-sage-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center">
              <Terminal className="w-12 h-12 text-forest/20 mx-auto mb-4" />
              <p className="text-sage-muted">
                Escribe para buscar módulos, comandos o términos del glosario
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sage-muted">No se encontraron resultados</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result) => {
                if (result.type === 'module') {
                  const m = result.item;
                  return (
                    <button
                      key={`module-${m.id}`}
                      onClick={() => scrollToModule(m.id)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-sage-bg transition-colors text-left"
                    >
                      <div className="p-2 rounded-xl bg-forest/10 text-forest">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                          Módulo {m.number}
                        </span>
                        <h4 className="font-semibold text-forest-dark">{m.title}</h4>
                        <p className="text-sm text-sage-muted line-clamp-1">
                          {m.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sage-muted" />
                    </button>
                  );
                }

                if (result.type === 'command') {
                  const c = result.item;
                  return (
                    <div
                      key={`command-${c.name}`}
                      className="flex items-center gap-4 p-4 hover:bg-sage-bg transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-slate-deep text-code-text">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                          Comando · {c.category}
                        </span>
                        <code className="block font-mono font-semibold text-forest-dark">
                          {c.name}
                        </code>
                        <p className="text-sm text-sage-muted">{c.description}</p>
                      </div>
                    </div>
                  );
                }

                if (result.type === 'glossary') {
                  const g = result.item;
                  return (
                    <div
                      key={`glossary-${g.term}`}
                      className="flex items-center gap-4 p-4 hover:bg-sage-bg transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-forest/10 text-forest">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                          Glosario
                        </span>
                        <h4 className="font-semibold text-forest-dark">{g.term}</h4>
                        <p className="text-sm text-sage-muted">{g.definition}</p>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-forest/10 bg-sage-bg text-center">
          <p className="text-xs text-sage-muted">
            {results.length} resultados encontrados
          </p>
        </div>
      </div>
    </div>
  );
}
