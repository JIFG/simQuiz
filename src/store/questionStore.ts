import { Question } from "../types/question";
import { Tema } from "../types/theme";

export const questions: Question[] = [
  {
    id: "q1",
    tema: "programacion",
    pregunta: "¿Qué es una red neuronal artificial?",
    opciones: [
      "Un modelo que simula el cerebro humano",
      "Un algoritmo para búsquedas",
      "Una base de datos distribuida",
      "Un framework para software",
    ],
    respuestasCorrectas: [
      "Un modelo que simula el cerebro humano",
      "Un algoritmo para búsquedas",
    ],
    explicacion:
      "Las redes neuronales artificiales son modelos inspirados en las neuronas del cerebro humano para resolver problemas complejos.",
    imagen: "https://drive.google.com/…",
  },
  {
    id: "q2",
    tema: "web",
    pregunta: "¿Qué es una página web?",
    opciones: [
      "Un modelo que simula el cerebro humano",
      "Un algoritmo para búsquedas",
      "Una base de datos distribuida",
      "Una pagina web",
    ],
    respuestasCorrectas: ["Una pagina web"],
    explicacion:
      "Una página web es un documento HTML accesible por un navegador.",
    imagen: "https://i.imgur.com/…",
  },
];

export function getAllThemes(): Tema[]{
    return Array.from(new Set(questions.map((q)=> q.tema)))
}

export function getQuestionsByTema(tema:string): Question[]{
    return questions.filter((q)=> q.tema===tema);
}
