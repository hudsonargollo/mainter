'use client';

import { motion } from 'framer-motion';

const BENTO_CARDS = [
  {
    icon: '👤',
    title: 'Biografía',
    desc: 'Nombre, edad, estado civil y familia.',
    color: 'from-indigo-500/20 to-purple-500/20',
    border: 'border-indigo-500/30',
  },
  {
    icon: '📷',
    title: 'Fotografía',
    desc: 'Foto de perfil para identificar al dueño.',
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
  },
  {
    icon: '💍',
    title: 'Matrimonio',
    desc: 'Aniversario, hijos, nietos y tradiciones.',
    color: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
  },
  {
    icon: '👃',
    title: 'Gustos',
    desc: 'Comida, fútbol, música, bebidas y seres queridos.',
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
  },
  {
    icon: '🚜',
    title: 'Campo',
    desc: 'Cultivos, rutina, logros y trabajo diario.',
    color: 'from-green-500/20 to-lime-500/20',
    border: 'border-green-500/30',
  },
  {
    icon: '🤝',
    title: 'ADN',
    desc: 'Horario, comunicación y anécdotas con el asesor.',
    color: 'from-blue-500/20 to-indigo-500/20',
    border: 'border-blue-500/30',
  },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto px-4 md:px-8">
      {BENTO_CARDS.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className={`rounded-2xl bg-gradient-to-br ${item.color} ${item.border} p-5 md:p-6 backdrop-blur-sm border shadow-lg`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl">{item.icon}</span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{item.title}</h3>
          </div>
          <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
