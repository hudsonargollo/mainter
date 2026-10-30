'use client';

import { motion } from 'framer-motion';

const BENTO_CARDS = [
  {
    icon: '👤',
    title: 'Biografía',
    desc: 'Nombre, edad, estado civil y familia.',
    gradient: 'from-royal to-primary-dark',
    border: 'border-royal',
  },
  {
    icon: '📷',
    title: 'Fotografía',
    desc: 'Foto de perfil para identificar al dueño.',
    gradient: 'from-accent to-accent-dark',
    border: 'border-accent',
  },
  {
    icon: '💍',
    title: 'Matrimonio',
    desc: 'Aniversario, hijos, nietos y tradiciones.',
    gradient: 'from-royal to-primary-dark',
    border: 'border-royal',
  },
  {
    icon: '👃',
    title: 'Gustos',
    desc: 'Comida, fútbol, música, bebidas y seres queridos.',
    gradient: 'from-royal to-primary-dark',
    border: 'border-royal',
  },
  {
    icon: '🚜',
    title: 'Campo',
    desc: 'Cultivos, rutina, logros y trabajo diario.',
    gradient: 'from-royal to-primary-dark',
    border: 'border-royal',
  },
  {
    icon: '🤝',
    title: 'ADN',
    desc: 'Horario, comunicación y anécdotas con el asesor.',
    gradient: 'from-royal to-primary-dark',
    border: 'border-royal',
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
          className={`rounded-2xl bg-gradient-to-br ${item.gradient} ${item.border} p-5 md:p-6 backdrop-blur-sm border shadow-lg`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl">{item.icon}</span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink">{item.title}</h3>
          </div>
          <p className="mt-2 text-xs md:text-sm text-ink-subdued leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
