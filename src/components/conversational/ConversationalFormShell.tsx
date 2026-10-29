'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversationalForm, Step } from '~/hooks/useConversationalForm';

interface Props {
  steps: Step[];
}

export default function ConversationalFormShell({ steps }: Props) {
  const {
    currentStep,
    currentIndex,
    totalSteps,
    direction,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  } = useConversationalForm(steps);

  const [inputValue, setInputValue] = React.useState('');
  const [showTyping, setShowTyping] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      nextStep(inputValue.trim());
      setInputValue('');
      setShowTyping(false);
    }
  };

  const handleSelect = (value: string) => {
    nextStep(value);
    setInputValue('');
    setShowTyping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Left Column: Dynamic Illustration Panel */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10 bg-slate-900/40 border-r border-slate-800/60">
        <div className="relative w-full max-w-[260px] md:max-w-[380px] h-[220px] md:h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep?.illustrationKey}
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -24 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-cyan-500/20 border border-indigo-500/30 shadow-2xl flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,204,255,0.08)_0%,_transparent_70%)]" />
                <div className="relative text-center px-4">
                  <div className="w-14 h-14 md:w-20 md:h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/40 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg">
                    {currentStep?.illustrationKey?.charAt(0) || '?'}
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-indigo-300/80 font-medium">
                    {currentStep?.illustrationKey}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Paso {currentIndex + 1} de {totalSteps}
          </span>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/50 text-xs text-slate-500">
          <p className="font-semibold text-slate-400 mb-1">Movimiento animado</p>
          <p>transiciones suaves con Framer Motion</p>
        </div>
      </div>

      {/* Right Column: Conversational Question Engine */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-12 bg-slate-950">
        <div className="flex justify-end">
          {!isFirstStep && (
            <button
              onClick={prevStep}
              className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-900 border border-slate-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15 19 9 13 15 7" />
              </svg>
              Atrás
            </button>
          )}
        </div>

        <div className="my-auto max-w-lg w-full mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep?.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Question number & title */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600/20 text-xs font-bold text-indigo-400">
                    {currentIndex + 1}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {currentStep?.question}
                  </h2>
                </div>
                {currentStep?.subtitle && (
                  <p className="text-sm text-slate-400 mt-2 ml-11">{currentStep.subtitle}</p>
                )}
              </div>

              {/* Input Render Switch */}
              <div className="space-y-4">
                {currentStep?.type === 'text' || currentStep?.type === 'email' || currentStep?.type === 'password' ? (
                  <div className="relative">
                    <input
                      type={currentStep.type}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      placeholder="Escribe tu respuesta aquí..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                    />
                    <button
                      onClick={() => {
                        if (inputValue.trim()) {
                          nextStep(inputValue.trim());
                          setInputValue('');
                          setShowTyping(false);
                        }
                      }}
                      className="absolute right-2 top-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      OK
                    </button>
                  </div>
                ) : currentStep?.type === 'select' ? (
                  <div className="grid grid-cols-1 gap-3">
                    {currentStep.options?.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="w-full text-left px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-850 transition-all flex items-center justify-between group"
                      >
                        <span className="text-white text-sm">{opt.label}</span>
                        <span className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors">
                          OK
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
                {currentStep?.type === 'textarea' ? (
                  <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    placeholder="Escribe tu respuesta aquí..."
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none"
                  />
                ) : null}
                {currentStep?.type === 'multiselect' ? (
                  <div className="grid grid-cols-1 gap-2">
                    {currentStep.options?.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-indigo-500 transition-all"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="text-white text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer progress bar */}
        <div className="w-full bg-slate-900/60 h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
