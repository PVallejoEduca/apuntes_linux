import { Terminal, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative w-full py-16 lg:py-20 bg-slate-deep text-white">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-forest/20">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading font-bold text-xl">LinuxCLI</span>
          </div>

          {/* Tagline */}
          <p className="text-lg text-white/70 mb-8">
            Hecho para aprender sin prisa.
          </p>

          {/* Contact */}
          <div className="flex items-center justify-center gap-2 text-white/60 mb-10">
            <Mail className="w-4 h-4" />
            <span className="text-sm">Las dudas las resolveremos en clase</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Aviso legal
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Accesibilidad
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Créditos
            </a>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-white/20 mx-auto mb-6" />

          {/* Copyright */}
          <p className="text-sm text-white/40 flex items-center justify-center gap-1">
            <span>© 2026 Linux Command Line Essentials</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-3 h-3 text-red-400" /> para estudiantes
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
