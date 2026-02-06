import { useEffect, useRef, useState, useMemo } from 'react';
import { Search, Copy, Check, Terminal, Filter, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { commands, glossary } from '@/data/courseData';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Todas', 'Orientación', 'Ayuda', 'Navegación', 'Visualización', 'Edición', 'Redirección', 'Seguridad', 'Admin'];

export function ReferenceHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'commands' | 'glossary'>('commands');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: searchRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredCommands = useMemo(() => {
    return commands.filter((cmd) => {
      const matchesSearch =
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || cmd.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredGlossary = useMemo(() => {
    return glossary.filter(
      (term) =>
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="reference"
      className="relative w-full py-20 lg:py-28 bg-sage-bg"
    >
      <div className="section-padding">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="tag-sage mb-4 inline-block">Referencia</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
            Hub de comandos
          </h2>
          <p className="max-w-2xl mx-auto text-sage-muted text-base lg:text-lg">
            Busca comandos, opciones y definiciones rápidamente.
          </p>
        </div>

        {/* Search and Filter */}
        <div ref={searchRef} className="max-w-4xl mx-auto mb-10">
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setActiveTab('commands')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'commands'
                  ? 'bg-forest text-white'
                  : 'bg-white text-forest-dark hover:bg-forest/5'
              }`}
            >
              <Terminal className="w-4 h-4 inline mr-2" />
              Comandos
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'glossary'
                  ? 'bg-forest text-white'
                  : 'bg-white text-forest-dark hover:bg-forest/5'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Glosario
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-muted" />
            <input
              type="text"
              placeholder="Buscar comando, palabra clave o error..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-forest/10 focus:border-forest/30 focus:outline-none focus:ring-2 focus:ring-forest/10 text-forest-dark placeholder:text-sage-muted"
            />
          </div>

          {/* Category filters (only for commands) */}
          {activeTab === 'commands' && (
            <div className="flex flex-wrap justify-center gap-2">
              <Filter className="w-4 h-4 text-sage-muted mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-forest text-white'
                      : 'bg-white text-sage-muted hover:text-forest-dark border border-forest/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'commands' ? (
            <div className="grid gap-4">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-12">
                  <Terminal className="w-12 h-12 text-forest/20 mx-auto mb-4" />
                  <p className="text-sage-muted">No se encontraron comandos</p>
                </div>
              ) : (
                filteredCommands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="card-sage p-5 hover:border-forest/25 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <code className="text-lg font-mono font-bold text-forest">
                            {cmd.name}
                          </code>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-sage-panel text-sage-muted">
                            {cmd.category}
                          </span>
                        </div>
                        <p className="text-sm text-sage-muted mb-3">{cmd.description}</p>

                        {/* Syntax */}
                        <div className="mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                            Sintaxis
                          </span>
                          <code className="block mt-1 p-2 rounded-lg bg-slate-deep text-code-text text-sm font-mono">
                            {cmd.syntax}
                          </code>
                        </div>

                        {/* Options */}
                        {cmd.options.length > 0 && (
                          <div className="mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                              Opciones útiles
                            </span>
                            <div className="mt-1 space-y-1">
                              {cmd.options.map((opt) => (
                                <div key={opt.flag} className="flex gap-3 text-sm">
                                  <code className="text-forest font-mono">{opt.flag}</code>
                                  <span className="text-sage-muted">{opt.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Examples */}
                        {cmd.examples.length > 0 && (
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-sage-muted">
                              Ejemplos
                            </span>
                            <div className="mt-1 space-y-2">
                              {cmd.examples.map((ex, i) => (
                                <div key={i} className="p-2 rounded-lg bg-sage-panel">
                                  <code className="text-sm font-mono text-forest-dark">
                                    {ex.command}
                                  </code>
                                  <p className="text-xs text-sage-muted mt-1">
                                    {ex.explanation}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Safety note */}
                        {cmd.safetyNote && (
                          <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-100">
                            <p className="text-xs text-red-700 flex items-center gap-1.5">
                              <span className="font-semibold">⚠️ Precaución:</span>
                              {cmd.safetyNote}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Copy button */}
                      <button
                        onClick={() => copyToClipboard(cmd.name)}
                        className="flex-shrink-0 p-2 rounded-lg bg-sage-panel text-sage-muted hover:bg-forest hover:text-white transition-colors"
                        title="Copiar comando"
                      >
                        {copiedCommand === cmd.name ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredGlossary.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-forest/20 mx-auto mb-4" />
                  <p className="text-sage-muted">No se encontraron términos</p>
                </div>
              ) : (
                filteredGlossary.map((term) => (
                  <div
                    key={term.term}
                    className="card-sage p-5 hover:border-forest/25 transition-colors"
                  >
                    <h3 className="font-heading font-semibold text-forest-dark text-lg mb-2">
                      {term.term}
                    </h3>
                    <p className="text-sm text-sage-muted">{term.definition}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
