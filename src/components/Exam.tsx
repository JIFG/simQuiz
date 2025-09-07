// src/components/Exam.tsx
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchQuestionsByTema, QuestionDTO } from "../services/questionService";
import { useQuizContext, AnswerEntry } from "../context/QuizContext";

export default function Exam() {
  const { tema } = useLocalSearchParams<{ tema: string }>();
  const router = useRouter();
  const { answers, setAnswers, resetAnswers } = useQuizContext();

  const [questions, setQuestions] = useState<QuestionDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!tema) return;
    setLoading(true);
    fetchQuestionsByTema(tema)
      .then((qs) => {
        setQuestions(qs);
        resetAnswers();
        setCurrent(0);
        setSelected([]);
      })
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, [tema]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-light-background dark:bg-dark-background">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-6 bg-light-background dark:bg-dark-background">
        <Text className="text-light-text-medium dark:text-dark-text-medium">
          No hay preguntas para “{tema}”.
        </Text>
      </SafeAreaView>
    );
  }

  const q = questions[current];
  const isMultiple = q.respuestasCorrectas.length > 1;

  // Para radio: seleccionar una opción y bloquear cualquier cambio
  // Para checkbox: togglear
  const toggleOption = (opt: string) => {
    if (isMultiple) {
      setSelected((prev) =>
        prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
      );
    } else {
      if (selected[0] !== opt) {
        setSelected([opt]);
      }
    }
  };

  const goNext = () => {
    const entry: AnswerEntry = {
      pregunta: q.pregunta,
      selected,
      correct: q.respuestasCorrectas,
      explicacion: q.explicacion,
      imagen: q.imagen,
    };
    setAnswers([...answers, entry]);

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected([]);
    } else {
      router.push(`/results?tema=${encodeURIComponent(tema!)}`);
    }
  };

  const requiredCount = isMultiple ? q.respuestasCorrectas.length : 1;
  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background">
      <ScrollView contentContainerClassName="p-6 space-y-6">
        <View className="bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-md">
          <Text className="text-2xl font-work-black text-light-text-high dark:text-dark-text-high mb-4">
            {current + 1}. {q.pregunta}
          </Text>

          {q.imagen && (
            <Image
              source={{ uri: q.imagen }}
              className="w-full h-48 rounded-lg mb-4"
              resizeMode="cover"
            />
          )}

          <Text className="mb-4 text-light-text-medium dark:text-dark-text-medium">
            {isMultiple
              ? `Seleccione ${q.respuestasCorrectas.length} respuestas válidas`
              : "Seleccione 1 respuesta válida"}
          </Text>

          {q.opciones.map((opt) => {
            const isSel = selected.includes(opt);
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => toggleOption(opt)}
                activeOpacity={0.7}
                className={`flex-row items-center px-4 py-3 mb-3 rounded-lg ${
                  isSel ? "bg-light-primary/20 dark:bg-dark-primary/30" : ""
                }`}
              >
                <View
                  className={`
                    w-5 h-5 mr-4 border-2
                    ${
                      isSel
                        ? "bg-light-primary dark:bg-dark-primary border-light-primary dark:border-dark-primary"
                        : "border-light-primary dark:border-dark-primary"
                    }
                    ${isMultiple ? "rounded-sm" : "rounded-full"}
                  `}
                />
                <Text className="flex-1 text-lg text-light-text-high dark:text-dark-text-high">
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={goNext}
          disabled={selected.length < requiredCount}
          className={`
    rounded-2xl py-4 items-center
    ${
      selected.length < requiredCount
        ? "bg-light-primary/50 dark:bg-dark-primary/50"
        : "bg-light-primary dark:bg-dark-primary"
    }
  `}
        >
          <Text className="text-white text-lg font-work-medium">
            {current + 1 < (questions?.length ?? 0)
              ? "Siguiente"
              : "Ver resultados"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
