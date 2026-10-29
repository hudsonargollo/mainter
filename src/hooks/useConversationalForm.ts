'use client';

import { useState, useCallback } from 'react';

export type InputType = 'text' | 'email' | 'password' | 'select' | 'multiselect' | 'textarea';

export interface Step {
  id: string;
  question: string;
  subtitle?: string;
  type: InputType;
  options?: { label: string; value: string }[];
  illustrationKey: string;
  validation?: (value: any) => boolean;
  placeholder?: string;
}

export interface WizardState {
  currentIndex: number;
  answers: Record<string, any>;
  direction: 1 | -1;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function useConversationalForm(steps: Step[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const currentStep = steps[currentIndex];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const nextStep = useCallback(
    (value: any) => {
      if (currentStep.validation) {
        const valid = currentStep.validation(value);
        if (!valid) return; // don't advance on invalid
      }
      setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
      if (!isLastStep) {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentStep, isLastStep]
  );

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isFirstStep]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setDirection(1);
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < steps.length) {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
      }
    },
    [steps.length, currentIndex]
  );

  return {
    currentStep,
    currentIndex,
    totalSteps: steps.length,
    answers,
    direction,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    goToStep,
    reset,
  } as WizardState & {
    currentStep: Step | undefined;
    goToStep: (index: number) => void;
    reset: () => void;
  };
}
