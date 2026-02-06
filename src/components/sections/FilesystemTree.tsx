import { useEffect, useRef, useState } from 'react';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, HardDrive, Settings, Users, Box, Archive } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DirectoryNode {
  name: string;
  description: string;
  icon: React.ElementType;
  children?: DirectoryNode[];
}

const filesystemData: DirectoryNode[] = [
  {
    name: '/',
    description: 'Raíz del sistema - punto de inicio de toda la jerarquía',
    icon: HardDrive,
    children: [
      {
        name: 'bin',
        description: 'Comandos esenciales del sistema (ls, cp, mv, etc.)',
        icon: Box,
      },
      {
        name: 'sbin',
        description: 'Comandos de administración del sistema (fdisk, reboot, etc.)',
        icon: Settings,
      },
      {
        name: 'etc',
        description: 'Archivos de configuración del sistema y servicios',
        icon: Settings,
        children: [
          { name: 'hosts', description: 'Mapeo de nombres a IPs', icon: FileText },
          { name: 'fstab', description: 'Configuración de montaje de discos', icon: FileText },
          { name: 'passwd', description: 'Información de usuarios', icon: FileText },
          { name: 'ssh/', description: 'Configuración del servidor SSH', icon: Folder },
        ],
      },
      {
        name: 'home',
        description: 'Directorios personales de los usuarios',
        icon: Users,
        children: [
          { name: 'usuario/', description: 'Directorio personal del usuario', icon: Folder },
        ],
      },
      {
        name: 'root',
        description: 'Directorio home del superusuario (root)',
        icon: Settings,
      },
      {
        name: 'var',
        description: 'Datos variables que cambian con el tiempo',
        icon: Archive,
        children: [
          { name: 'log/', description: 'Archivos de registro del sistema', icon: Folder },
          { name: 'lib/', description: 'Datos de aplicaciones', icon: Folder },
          { name: 'www/', description: 'Contenido web (servidores)', icon: Folder },
          { name: 'spool/', description: 'Colas de impresión y correo', icon: Folder },
        ],
      },
      {
        name: 'usr',
        description: 'Programas y librerías instalados por el sistema',
        icon: Box,
        children: [
          { name: 'bin/', description: 'Programas de usuario no esenciales', icon: Folder },
          { name: 'lib/', description: 'Librerías compartidas', icon: Folder },
          { name: 'share/', description: 'Datos compartidos entre programas', icon: Folder },
          { name: 'local/', description: 'Software instalado localmente', icon: Folder },
        ],
      },
      {
        name: 'opt',
        description: 'Software opcional o de terceros',
        icon: Box,
      },
      {
        name: 'tmp',
        description: 'Archivos temporales (se borran al reiniciar)',
        icon: Archive,
      },
      {
        name: 'dev',
        description: 'Dispositivos del sistema (discos, terminales, etc.)',
        icon: HardDrive,
        children: [
          { name: 'sda', description: 'Primer disco SCSI/SATA', icon: HardDrive },
          { name: 'tty', description: 'Terminales virtuales', icon: FileText },
          { name: 'null', description: 'Dispositivo nulo (descarta datos)', icon: FileText },
          { name: 'random', description: 'Generador de números aleatorios', icon: FileText },
        ],
      },
      {
        name: 'proc',
        description: 'Pseudoarchivos del kernel con información del sistema',
        icon: Settings,
        children: [
          { name: 'cpuinfo', description: 'Información de la CPU', icon: FileText },
          { name: 'meminfo', description: 'Información de memoria', icon: FileText },
          { name: 'version', description: 'Versión del kernel', icon: FileText },
          { name: '[PID]/', description: 'Directorios con info de cada proceso', icon: Folder },
        ],
      },
      {
        name: 'mnt',
        description: 'Punto de montaje temporal para administradores',
        icon: Folder,
      },
      {
        name: 'media',
        description: 'Punto de montaje para dispositivos removibles (USB, CD)',
        icon: Folder,
      },
      {
        name: 'boot',
        description: 'Archivos necesarios para el arranque del sistema',
        icon: Settings,
      },
      {
        name: 'lib',
        description: 'Librerías esenciales para los programas de /bin y /sbin',
        icon: Box,
      },
      {
        name: 'srv',
        description: 'Datos servidos por el sistema (FTP, web, etc.)',
        icon: Archive,
      },
      {
        name: 'sys',
        description: 'Interfaz con el kernel para información del sistema',
        icon: Settings,
      },
      {
        name: 'run',
        description: 'Datos de tiempo de ejecución (sockets, PIDs)',
        icon: Archive,
      },
    ],
  },
];

function TreeNode({ node, depth = 0 }: { node: DirectoryNode; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const Icon = node.icon;

  return (
    <div className="select-none">
      <button
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full text-left py-1.5 px-2 rounded-lg transition-colors ${
          hasChildren ? 'hover:bg-forest/5' : ''
        }`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="w-4 h-4 text-sage-muted" />
          ) : (
            <ChevronRight className="w-4 h-4 text-sage-muted" />
          )
        ) : (
          <span className="w-4" />
        )}
        <Icon className={`w-4 h-4 ${hasChildren ? 'text-forest' : 'text-sage-muted'}`} />
        <code className="text-sm font-mono text-forest-dark">{node.name}</code>
      </button>

      {hasChildren && isOpen && (
        <div className="mt-1">
          {node.children!.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FilesystemTree() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="filesystem"
      className="relative w-full py-20 lg:py-28 bg-sage-bg"
    >
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <span className="tag-sage mb-4 inline-block">Estructura del sistema</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-forest-dark mb-4">
              Árbol de directorios Linux
            </h2>
            <p className="max-w-2xl mx-auto text-sage-muted text-base lg:text-lg">
              Jerarquía estándar de directorios (FHS). Haz clic en las carpetas para expandir.
            </p>
          </div>

          <div ref={contentRef} className="grid lg:grid-cols-2 gap-8">
            {/* Tree View */}
            <div className="card-sage p-6">
              <h3 className="font-heading font-semibold text-forest-dark mb-4 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-forest" />
                Estructura de directorios
              </h3>
              <div className="overflow-x-auto">
                {filesystemData.map((node, index) => (
                  <TreeNode key={index} node={node} />
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div className="card-sage p-6">
                <h3 className="font-heading font-semibold text-forest-dark mb-4">
                  Directorios principales
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/</code>
                    <p className="text-sm text-sage-muted">Raíz del sistema. Todo parte de aquí.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/home</code>
                    <p className="text-sm text-sage-muted">Directorios personales de los usuarios. Tu trabajo va aquí.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/etc</code>
                    <p className="text-sm text-sage-muted">Configuración del sistema. Archivos de texto editables.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/var</code>
                    <p className="text-sm text-sage-muted">Datos variables: logs, bases de datos, colas.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/usr</code>
                    <p className="text-sm text-sage-muted">Programas y librerías instalados por el sistema.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/tmp</code>
                    <p className="text-sm text-sage-muted">Archivos temporales. Se borran al reiniciar.</p>
                  </div>
                </div>
              </div>

              <div className="card-sage p-6">
                <h3 className="font-heading font-semibold text-forest-dark mb-4">
                  Directorios especiales
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/dev</code>
                    <p className="text-sm text-sage-muted">Dispositivos: discos, terminales, puertos. Todo es un archivo.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/proc</code>
                    <p className="text-sm text-sage-muted">Pseudoarchivos del kernel. Información del sistema en tiempo real.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <code className="px-2 py-1 rounded bg-slate-deep text-code-text text-xs font-mono flex-shrink-0">/root</code>
                    <p className="text-sm text-sage-muted">Home del superusuario. Separado de /home por seguridad.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10">
                <p className="text-sm text-sage-muted">
                  <strong className="text-forest-dark">Consejo:</strong> Como usuario normal, 
                  tu espacio de trabajo es <code className="text-forest">/home/tu_usuario</code>. 
                  Los directorios de sistema como <code className="text-forest">/etc</code> o{' '}
                  <code className="text-forest">/usr</code> requieren permisos de administrador para modificarlos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
