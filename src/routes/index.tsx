import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import BentoGrid from '~/components/landing/BentoGrid';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(79,70,229,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(34,211,238,0.10)_0%,_transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Registro conversacional
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Conoce a tu{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              cliente
            </span>
            <br />
            en profundo
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto">
            Un registro conversacional que captura la biografía, familia,
            gustos, rutina del campo y vínculo con su asesor — todo en
            una sola experiencia fluida.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://mainter.clubemkt.digital/v2"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold hover:from-indigo-500 hover:to-cyan-400 transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M13 7l5 5-5 5M6 12h12" />
              </svg>
              Ver formulario
            </a>
            <a
              href="https://mainter.clubemkt.digital"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Ver sitio principal
            </a>
          </div>
        </div>
      </div>

      {/* Bento grid */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Lo que captura el registro
            </h2>
            <p className="mt-2 text-slate-400">
              Cada sección es una conversación enfocada en un aspecto
              clave de la operación.
            </p>
          </div>
          <BentoGrid />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 text-center text-xs text-slate-600">
          Mainter · Registro conversacional para operaciones agrícolas
        </div>
      </div>
    </div>
  );
}
