// src/services/questionService.ts
import { API_URL } from '../config/config';

// Devuelve ["programacion", "historia", …]
export async function fetchAllThemes(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/quiz/temas`);
  if (!res.ok) throw new Error(`Error ${res.status} cargando temas`);
  return res.json();
}

export interface QuestionDTO {
  _id: string;
  tema: string;
  pregunta: string;
  opciones: string[];
  respuestasCorrectas: string[];
  explicacion?: string;
  imagen?: string;
}

export async function fetchQuestionsByTema(tema: string): Promise<QuestionDTO[]> {
  const res = await fetch(
    `${API_URL}/api/quiz/preguntas?tema=${encodeURIComponent(tema)}`
  );
  if (!res.ok) throw new Error(`Error ${res.status} cargando preguntas`);
  return res.json();
}

export async function createQuestion(data: Omit<QuestionDTO, '_id'>) {
  const res = await fetch(`${API_URL}/api/quiz/preguntas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error ${res.status} creando pregunta`);
  return res.json();
}
