import { useEffect, useRef, useState } from 'react';
import { Shield, FileText, Folder, User, Users, Lock, Unlock, Eye, Edit, Play, AlertTriangle, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PermissionExample {
  name: string;
  permissions: string;
  numeric: string;
  description: string;
  icon: React.ElementType;
}

const fileExamples: PermissionExample[] = [
  {
    name: 'script.sh',
    permissions: '-rwxr-xr-x',
    numeric: '755',
    description: 'Script ejecutable por todos',
    icon: Play,
  },
  {
    name: 'config.txt',
    permissions: '-rw-r--r--',
    numeric: '644',
    description: 'Archivo de configuración legible por todos, editable solo por el propietario',
    icon: FileText,
  },
  {
    name: 'secreto.key',
    permissions: '-rw-------',
    numeric: '600',
    description: 'Archivo privado, solo accesible por el propietario',
    icon: Lock,
  },
  {
    name: 'compartido.txt',
    permissions: '-rw-rw-r--',
    numeric: '664',
    description: 'Archivo editable por propietario y grupo, legible por todos',
    icon: Users,
  },
];

const dirExamples: PermissionExample[] = [
  {
    name: 'proyecto/',
    permissions: 'drwxr-xr-x',
    numeric: '755',
    description: 'Directorio accesible por todos, modificable solo por el propietario',
    icon: Folder,
  },
  {
    name: 'privado/',
    permissions: 'drwx------',
    numeric: '700',
    description: 'Directorio privado, solo el propietario puede entrar',
    icon: Lock,
  },
  {
    name: 'compartido/',
    permissions: 'drwxrwxr-x',
    numeric: '775',
    description: 'Directorio compartido: propietario y grupo pueden crear/borrar',
    icon: Users,
  },
  {
    name: 'publico/',
    permissions: 'drwxrwxrwx',
    numeric: '777',
    description: 'Directorio público (¡evitar en producción!)',
    icon: Unlock,
  },
];

const permissionBits = [
  { bit: 'r', value: 4, name: 'Lectura', icon: Eye },
  { bit: 'w', value: 2, name: 'Escritura', icon: Edit },
  { bit: 'x', value: 1, name: 'Ejecución', icon: Play },
];

function PermissionCalculator() {
  const [owner, setOwner] = useState(7);
  const [group, setGroup] = useState(5);
  const [others, setOthers] = useState(5);

  const calculatePermissions = (value: number) => {
    const r = value >= 4 ? 'r' : '-';
    const w = value % 4 >= 2 ? 'w' : '-';
    const x = value % 2 === 1 ? 'x' : '-';
    return r + w + x;
  };

  const ownerPerms = calculatePermissions(owner);
  const groupPerms = calculatePermissions(group);
  const othersPerms = calculatePermissions(others);
  const fullPermissions = ownerPerms + groupPerms + othersPerms;
  const numericValue = `${owner}${group}${others}`;

  return (
    <div className="card-sage p-6">
      <h3 className="font-heading font-semibold text-forest-dark mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-forest" />
        Calculadora de permisos
      </h3>

      <div className="space-y-4">
        {/* Owner */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-forest-dark flex items-center gap-2">
              <User className="w-4 h-4" /> Propietario
            </span>
            <span className="text-sm font-mono text-forest">{owner}</span>
          </div>
          <input
            type="range"
            min="0"
            max="7"
            value={owner}
            onChange={(e) => setOwner(parseInt(e.target.value))}
            className="w-full h-2 bg-forest/10 rounded-lg appearance-none cursor-pointer accent-forest"
          />
          <div className="flex gap-1 mt-1">
            {permissionBits.map((p) => (
              <span
                key={p.bit}
                className={`text-xs px-2 py-0.5 rounded ${
                  owner >= (p.bit === 'r' ? 4 : p.bit === 'w' ? 2 : 1) &&
                  (p.bit !== 'w' || owner % 4 >= 2) &&
                  (p.bit !== 'x' || owner % 2 === 1)
                    ? 'bg-forest text-white'
                    : 'bg-forest/10 text-sage-muted'
                }`}
              >
                {p.bit}
              </span>
            ))}
          </div>
        </div>

        {/* Group */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-forest-dark flex items-center gap-2">
              <Users className="w-4 h-4" /> Grupo
            </span>
            <span className="text-sm font-mono text-forest">{group}</span>
          </div>
          <input
            type="range"
            min="0"
            max="7"
            value={group}
            onChange={(e) => setGroup(parseInt(e.target.value))}
            className="w-full h-2 bg-forest/10 rounded-lg appearance-none cursor-pointer accent-forest"
          />
          <div className="flex gap-1 mt-1">
            {permissionBits.map((p) => (
              <span
                key={p.bit}
                className={`text-xs px-2 py-0.5 rounded ${
                  group >= (p.bit === 'r' ? 4 : p.bit === 'w' ? 2 : 1) &&
                  (p.bit !== 'w' || group % 4 >= 2) &&
                  (p.bit !== 'x' || group % 2 === 1)
                    ? 'bg-forest text-white'
                    : 'bg-forest/10 text-sage-muted'
                }`}
              >
                {p.bit}
              </span>
            ))}
          </div>
        </div>

        {/* Others */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-forest-dark flex items-center gap-2">
              <Users className="w-4 h-4" /> Otros
            </span>
            <span className="text-sm font-mono text-forest">{others}</span>
          </div>
          <input
            type="range"
            min="0"
            max="7"
            value={others}
            onChange={(e) => setOthers(parseInt(e.target.value))}
            className="w-full h-2 bg-forest/10 rounded-lg appearance-none cursor-pointer accent-forest"
          />
          <div className="flex gap-1 mt-1">
            {permissionBits.map((p) => (
              <span
                key={p.bit}
                className={`text-xs px-2 py-0.5 rounded ${
                  others >= (p.bit === 'r' ? 4 : p.bit === 'w' ? 2 : 1) &&
                  (p.bit !== 'w' || others % 4 >= 2) &&
                  (p.bit !== 'x' || others % 2 === 1)
                    ? 'bg-forest text-white'
                    : 'bg-forest/10 text-sage-muted'
                }`}
              >
                {p.bit}
              </span>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="mt-6 p-4 rounded-xl bg-slate-deep">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-white/50 uppercase tracking-wider">Resultado</span>
              <div className="flex items-center gap-4 mt-1">
                <code className="text-xl font-mono text-code-text">{fullPermissions}</code>
                <code className="text-xl font-mono text-forest">{numericValue}</code>
              </div>
            </div>
            <div className="text-right">
              <code className="text-sm text-white/70">chmod {numericValue} archivo</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PermissionsGuide() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'files' | 'directories'>('files');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const examples = activeTab === 'files' ? fileExamples : dirExamples;

  return (
    <section
      ref={sectionRef}
      id="permissions"
      className="relative w-full py-20 lg:py-28 bg-sage-panel"
    >
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <span className="tag-sage mb-4 inline-block">Seguridad</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
              Permisos en Linux
            </h2>
            <p className="max-w-2xl mx-auto text-sage-muted text-base lg:text-lg">
              Entiende cómo funcionan los permisos rwx en archivos y directorios.
            </p>
          </div>

          <div ref={contentRef} className="grid lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              {/* Permission bits explanation */}
              <div className="card-sage p-6">
                <h3 className="font-heading font-semibold text-forest-dark mb-4">
                  Los tres tipos de permiso
                </h3>
                <div className="space-y-4">
                  {permissionBits.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.bit} className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-forest/10 text-forest">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <code className="text-lg font-mono font-bold text-forest-dark">{p.bit}</code>
                            <span className="text-sm text-sage-muted">= {p.value}</span>
                          </div>
                          <p className="text-sm text-forest-dark font-medium">{p.name}</p>
                          <p className="text-xs text-sage-muted mt-1">
                            {p.bit === 'r' && 'Permite leer el contenido del archivo o listar el directorio'}
                            {p.bit === 'w' && 'Permite modificar el archivo o crear/borrar en el directorio'}
                            {p.bit === 'x' && 'Permite ejecutar el archivo o entrar en el directorio'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Numeric notation */}
              <div className="card-sage p-6">
                <h3 className="font-heading font-semibold text-forest-dark mb-4">
                  Notación numérica (octal)
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { val: 0, perms: '---' },
                    { val: 1, perms: '--x' },
                    { val: 2, perms: '-w-' },
                    { val: 3, perms: '-wx' },
                    { val: 4, perms: 'r--' },
                    { val: 5, perms: 'r-x' },
                    { val: 6, perms: 'rw-' },
                    { val: 7, perms: 'rwx' },
                  ].map((item) => (
                    <div
                      key={item.val}
                      className="p-2 rounded-lg bg-sage-bg text-center"
                    >
                      <code className="text-lg font-mono font-bold text-forest">{item.val}</code>
                      <p className="text-xs font-mono text-sage-muted">{item.perms}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-sage-muted">
                  <strong className="text-forest-dark">Cómo calcular:</strong> Suma los valores. 
                  r(4) + w(2) + x(1) = 7 (todos los permisos)
                </p>
              </div>

              {/* Special permissions */}
              <div className="card-sage p-6">
                <h3 className="font-heading font-semibold text-forest-dark mb-4">
                  Permisos especiales
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <code className="text-sm font-mono text-amber-700">setuid (4000)</code>
                    <p className="text-xs text-amber-600 mt-1">
                      El archivo se ejecuta con los permisos del propietario
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <code className="text-sm font-mono text-blue-700">setgid (2000)</code>
                    <p className="text-xs text-blue-600 mt-1">
                      En directorios: los archivos nuevos heredan el grupo del directorio
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                    <code className="text-sm font-mono text-green-700">sticky bit (1000)</code>
                    <p className="text-xs text-green-600 mt-1">
                      Solo el propietario puede borrar sus archivos (útil en /tmp)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Calculator */}
              <PermissionCalculator />

              {/* Examples tabs */}
              <div className="card-sage p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-forest-dark">
                    Ejemplos comunes
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('files')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'files'
                          ? 'bg-forest text-white'
                          : 'bg-sage-bg text-sage-muted hover:text-forest-dark'
                      }`}
                    >
                      Archivos
                    </button>
                    <button
                      onClick={() => setActiveTab('directories')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'directories'
                          ? 'bg-forest text-white'
                          : 'bg-sage-bg text-sage-muted hover:text-forest-dark'
                      }`}
                    >
                      Directorios
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {examples.map((ex) => {
                    const Icon = ex.icon;
                    return (
                      <div
                        key={ex.name}
                        className="p-4 rounded-xl bg-sage-bg border border-forest/5 hover:border-forest/15 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <code className="text-sm font-mono font-semibold text-forest-dark">
                                {ex.name}
                              </code>
                              <code className="text-xs font-mono text-forest bg-forest/10 px-2 py-0.5 rounded">
                                {ex.numeric}
                              </code>
                            </div>
                            <code className="text-xs font-mono text-sage-muted block mb-1">
                              {ex.permissions}
                            </code>
                            <p className="text-xs text-sage-muted">{ex.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Commands */}
              <div className="card-sage p-6">
                <h3 className="font-heading font-semibold text-forest-dark mb-4">
                  Comandos útiles
                </h3>
                <div className="space-y-3">
                  <div>
                    <code className="text-sm font-mono text-forest">chmod 755 script.sh</code>
                    <p className="text-xs text-sage-muted mt-1">
                      Cambia permisos a rwxr-xr-x (ejecutable por todos)
                    </p>
                  </div>
                  <div>
                    <code className="text-sm font-mono text-forest">chmod u+x archivo</code>
                    <p className="text-xs text-sage-muted mt-1">
                      Añade permiso de ejecución al propietario
                    </p>
                  </div>
                  <div>
                    <code className="text-sm font-mono text-forest">chown usuario:grupo archivo</code>
                    <p className="text-xs text-sage-muted mt-1">
                      Cambia propietario y grupo
                    </p>
                  </div>
                  <div>
                    <code className="text-sm font-mono text-forest">umask 022</code>
                    <p className="text-xs text-sage-muted mt-1">
                      Establece máscara de permisos por defecto
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700 font-medium">Evita 777 en producción</p>
                  <p className="text-xs text-red-600 mt-1">
                    chmod 777 da permisos totales a todos. Es un riesgo de seguridad. 
                    Usa el principio de mínimo privilegio: solo los permisos necesarios.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-12 p-6 rounded-2xl bg-forest/5 border border-forest/10">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-forest flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-semibold text-forest-dark mb-2">
                  Resumen rápido
                </h4>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-sage-muted">
                  <div>
                    <p className="mb-1"><strong className="text-forest-dark">Archivos:</strong></p>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li>r = leer contenido</li>
                      <li>w = modificar contenido</li>
                      <li>x = ejecutar (scripts/programas)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1"><strong className="text-forest-dark">Directorios:</strong></p>
                    <ul className="space-y-1 ml-4 list-disc">
                      <li>r = listar contenido (ls)</li>
                      <li>w = crear/borrar archivos</li>
                      <li>x = entrar al directorio (cd)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
