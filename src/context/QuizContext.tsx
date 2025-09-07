// src/context/QuizContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AnswerEntry = {
  pregunta: string;
  selected: string[];
  correct: string[];
  explicacion?: string;
  imagen?: string;
};

type QuizContextType = {
  answers: AnswerEntry[];
  setAnswers: (a: AnswerEntry[]) => void;
  resetAnswers: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswersState] = useState<AnswerEntry[]>([]);

  const setAnswers = (a: AnswerEntry[]) => setAnswersState(a);
  const resetAnswers = () => setAnswersState([]);

  return (
    <QuizContext.Provider value={{ answers, setAnswers, resetAnswers }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizContext must be inside a QuizProvider');
  return ctx;
}
