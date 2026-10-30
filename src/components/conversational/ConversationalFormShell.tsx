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
      {/* Left Column: Dynamic Illustration Panel */}
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
                  <p className="illustration-caption">
                    {currentStep?.illustrationKey}
                  </p>
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

        <div className="hint-card">
          <p className="hint-card-title">Movimiento animado</p>
          <p>transiciones suaves con Framer Motion</p>
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
