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
  } = useConversationalForm(steps);

  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      nextStep(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSelect = (value: string) => {
    nextStep(value);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mainter-split">
      {/* Left Column: Question-related illustration panel */}
      <div className="illustration-panel">
        <div className="illustration-frame">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep?.illustrationKey}
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -24 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="illustration-glow"
            >
              <div className="illustration-inner">
                <div className="illustration-spot" />
                <div className="illustration-body">
                  <div className="illustration-badge">
                    {currentStep?.illustrationKey?.charAt(0) || '?'}
                  </div>
                  <svg
                    key={currentStep?.illustrationKey}
                    className="w-20 h-20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    {currentStep?.illustrationKey === 'biografia' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    )}
                    {currentStep?.illustrationKey === 'nombre' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    )}
                    {currentStep?.illustrationKey === 'edad' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m0 0l-3-3m3 3l3-3M4 15a11 11 0 1122 0H4z" />
                    )}
                    {currentStep?.illustrationKey === 'estado-civil' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'hijos' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />
                        <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="15" cy="20" r="1.5" fill="currentColor" stroke="none" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'cantidad-hijos' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18 18 0 1110 5.5a18 18 0 019 8.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'edades-hijos' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M16 21l-2 2M16 21h-2M9 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    )}
                    {currentStep?.illustrationKey === 'fechas-hijos' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    )}
                    {currentStep?.illustrationKey === 'aniversario' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13a2 2 0 002 2h2a2 2 0 002-2zm0 0v-2m0 13v-2m0-13H6m4 0h8" />
                    )}
                    {currentStep?.illustrationKey === 'nietos' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />
                        <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="15" cy="20" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'cantidad-nietos' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18 18 0 1110 5.5a18 18 0 019 8.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'origen' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'trabajo-campo' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V8m0 13a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v13a2 2 0 01-2 2M8 7a2 2 0 100-4 2 2 0 000 4zM12 7a2 2 0 100-4 2 2 0 000 4zM16 7a2 2 0 100-4 2 2 0 000 4z" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'foto' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'familia' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />
                        <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="15" cy="20" r="1.5" fill="currentColor" stroke="none" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'madre' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a2 2 0 00-2 2v10a2 2 0 002 2 1 1 0 011-1v-2a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1 2 2 0 00-2 2M5 17a2 2 0 01-2-2v-2a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2M5 17h14" />
                    )}
                    {currentStep?.illustrationKey === 'padre' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h4a2 2 0 002-2V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v14a2 2 0 002 2zM8 11h8M8 14h6" />
                    )}
                    {currentStep?.illustrationKey === 'tradicion' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13a2 2 0 002 2h2a2 2 0 002-2zm0 0v-2m0 13v-2m0-13H6m4 0h8" />
                    )}
                    {currentStep?.illustrationKey === 'gustos' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m4 16l4-16M6 9h14M4 15h14" />
                    )}
                    {currentStep?.illustrationKey === 'comida' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'futbol' && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'deportes' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                    {currentStep?.illustrationKey === 'musica' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    )}
                    {currentStep?.illustrationKey === 'bebida' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14V6a2 2 0 012-2h4a2 2 0 012 2v8a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2m2 12h12a2 2 0 002-2v-8a2 2 0 00-2-2h-4a2 2 0 00-2 2v8a2 2 0 002 2m0 0H8" />
                    )}
                    {currentStep?.illustrationKey === 'cocina' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M9 7v4m3-4v4" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'restaurante' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.966 8.966 0 016 18.75c2.33 0 4.34.694 5.96 1.873M12 6.042A8.967 8.967 0 0018 3.75c1.052 0 2.062.18 3 .512v14.25A8.966 8.966 0 0118 18.75c-2.33 0-4.34.694-5.96 1.873M12 6.042V6m0 0v.042" />
                    )}
                    {currentStep?.illustrationKey === 'viaje' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V21M16 3.935V21M21 12H2.954M16 12h-2.954" />
                        <circle cx="12" cy="12" r="2.25" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'mascotas' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM19 11a2 2 0 11-4 0 2 2 0 014 0zM13 19H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v10z" />
                    )}
                    {currentStep?.illustrationKey === 'sociedad' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />
                        <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="15" cy="20" r="1.5" fill="currentColor" stroke="none" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'rutina' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                    {currentStep?.illustrationKey === 'madrugo' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    )}
                    {currentStep?.illustrationKey === 'disfruta' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M7 15h.01M17 15h.01M4 7h16M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    )}
                    {currentStep?.illustrationKey === 'comenzo' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13a2 2 0 002 2h2a2 2 0 002-2zm0 0v-2m0 13v-2m0-13H6m4 0h8" />
                    )}
                    {currentStep?.illustrationKey === 'cultivo' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21c3-1 5-4 5-8H3m0 0c3-1 5-4 5-8h10m-6 4a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                    )}
                    {currentStep?.illustrationKey === 'cultivos' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21c3-1 5-4 5-8H3m0 0c3-1 5-4 5-8h10m-6 4a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                    )}
                    {currentStep?.illustrationKey === 'relaja' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H8.25a2.25 2.25 0 00-2.25 2.25v6m4.5 0h4.5m-4.5 0l-4.5-4.5m4.5 4.5l-4.5-4.5m10.5-9l4.5-4.5m0 0l-4.5-4.5m4.5 4.5l-4.5 4.5" />
                    )}
                    {currentStep?.illustrationKey === 'logro' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 014-4h8a4 4 0 014 4v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2zM11 12h6M12 3v12" />
                    )}
                    {currentStep?.illustrationKey === 'adn' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-2M14 4h6v6m-6-6L9 7m0 0l4 4m-4-4l4 4" />
                    )}
                    {currentStep?.illustrationKey === 'horario' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM4.5 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM12 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
                    )}
                    {currentStep?.illustrationKey === 'comunicacion' && (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-6m0 6a3 3 0 110-6m0 6c0 .482.114.938.316 1.342m0 2.684a3 3 0 110-6m0 6a3 3 0 110-6m0 6c0 .482.114.938.316 1.342" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.858 8.684a3 3 0 112.828 2.828" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4h8v8" />
                      </>
                    )}
                    {currentStep?.illustrationKey === 'tema' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                    )}
                    {currentStep?.illustrationKey === 'anecdota' && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.966 8.966 0 016 18.75c2.33 0 4.34.694 5.96 1.873M12 6.042A8.967 8.967 0 0018 3.75c1.052 0 2.062.18 3 .512v14.25A8.966 8.966 0 0118 18.75c-2.33 0-4.34.694-5.96 1.873" />
                    )}
                  </svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="step-hint">
          <span className="step-hint-text">
            Paso {currentIndex + 1} de {totalSteps}
          </span>
        </div>
      </div>

      {/* Right Column: Conversational Question Engine */}
      <div className="question-panel">
        <div className="back-link-wrap">
          {!isFirstStep && (
            <button
              onClick={prevStep}
              className="back-link"
            >
              <svg className="back-link-icon" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15 19 9 13 15 7" />
              </svg>
              Atrás
            </button>
          )}
        </div>

        <div className="question-body">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep?.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="question-space"
            >
              {/* Question number & title */}
              <div className="step-header">
                <div className="step-number">
                  <span className="step-number-count">{currentIndex + 1}</span>
                  <span className="step-number-label">Paso</span>
                </div>
                <h2 className="step-title">{currentStep?.question}</h2>
                {currentStep?.subtitle && (
                  <p className="step-description">{currentStep.subtitle}</p>
                )}
              </div>

              {/* Input Render Switch */}
              <div className="question-items">
                {currentStep?.type === 'text' || currentStep?.type === 'email' || currentStep?.type === 'password' ? (
                  <div className="text-input-row">
                    <input
                      type={currentStep.type}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      placeholder={currentStep?.placeholder || 'Escribe tu respuesta aquí...'}
                      className="intake-input"
                    />
                    <button
                      onClick={() => {
                        if (inputValue.trim()) {
                          nextStep(inputValue.trim());
                          setInputValue('');
                        }
                      }}
                      className="button primary"
                    >
                      OK
                    </button>
                  </div>
                ) : currentStep?.type === 'select' ? (
                  <div className="grid gap-3">
                    {currentStep.options?.map((opt: { label: string; value: string }) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="choice-option"
                      >
                        <span className="choice-option-text">{opt.label}</span>
                        <span className="choice-option-action">OK</span>
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
                    placeholder={currentStep?.placeholder || 'Escribe tu respuesta aquí...'}
                    rows={4}
                    className="intake-input"
                  />
                ) : null}
                {currentStep?.type === 'multiselect' ? (
                  <div className="question-container">
                    {currentStep.options?.map((opt: { label: string; value: string }) => (
                      <label
                        key={opt.value}
                        className="choice-option"
                      >
                        <input
                          type="checkbox"
                          className="choice-option-check"
                        />
                        <span className="choice-option-text">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer progress bar */}
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
