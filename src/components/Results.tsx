// app/results/index.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuizContext, AnswerEntry } from "../../src/context/QuizContext";

export default function ResultsScreen() {
  const { tema } = useLocalSearchParams<{ tema: string }>();
  const router = useRouter();
  const { answers, resetAnswers } = useQuizContext();
  const [entries, setEntries] = useState<AnswerEntry[] | null>(null);

  useEffect(() => {
    setEntries(answers.length ? answers : []);
  }, [answers]);

  if (entries === null) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-light-background dark:bg-dark-background">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const totalCorrect = entries.filter((ans) => {
    const sel = [...ans.selected].sort();
    const crt = [...ans.correct].sort();
    return sel.length === crt.length && crt.every((c) => sel.includes(c));
  }).length;

  return (
    <SafeAreaView className="flex-1 bg-light-background dark:bg-dark-background p-4">
      <ScrollView contentContainerClassName="space-y-6">
        {/* Encabezado */}
        <Text className="text-3xl font-work-black text-center text-light-text-high dark:text-dark-text-high">
          Resultados
        </Text>

        {entries.map((ans, idx) => {
          const sel = [...ans.selected].sort();
          const crt = [...ans.correct].sort();
          const isCorrect =
            sel.length === crt.length && crt.every((c) => sel.includes(c));

          // Etiqueta singular/plural para “Mi(s) respuesta(s)”
          const respLabel = ans.correct.length === 1 ? "Mi respuesta:" : "Mis respuestas:";

          return (
            <View
              key={idx}
              className="bg-light-surface dark:bg-dark-surface p-4 rounded-xl shadow"
            >
              {/* Imagen si existe */}
              {ans.imagen && (
                <Image
                  source={{ uri: ans.imagen }}
                  className="w-full h-40 rounded-lg mb-4"
                  resizeMode="cover"
                />
              )}

              {/* Pregunta */}
              <Text className="text-lg font-work-medium text-light-text-high dark:text-dark-text-high mb-2">
                {idx + 1}. {ans.pregunta}
              </Text>

              {/* Tus respuestas */}
              <Text
                className={
                  isCorrect
                    ? "text-green-600 dark:text-green-400 mb-1"
                    : "text-red-600 dark:text-red-400 mb-1"
                }
              >
                <Text className="font-work-medium">{respLabel} </Text>
                {sel.join(", ")}
              </Text>

              {/* Respuestas correctas (si se equivocó) */}
              {!isCorrect && (
                <Text className="text-green-600 dark:text-green-400 mb-2">
                  <Text className="font-work-medium">Respuestas correctas: </Text>
                  {crt.join(", ")}
                </Text>
              )}

              {/* Explicación (siempre mostrada) */}
              <Text className="italic text-light-text-medium dark:text-dark-text-medium">
                <Text className="font-work-medium">Explicación: </Text>
                {ans.explicacion || "—"}
              </Text>

              {/* Indicador de “¡Correcto!” */}
              {isCorrect && (
                <Text className="text-green-700 dark:text-green-300 font-work-medium mt-2">
                  ¡Correcto! 🎉
                </Text>
              )}
            </View>
          );
        })}

        {/* Puntaje final */}
        <Text className="text-center text-xl font-work-medium mt-4 text-light-text-high dark:text-dark-text-high">
          Total correctas: {totalCorrect} de {entries.length}
        </Text>

        {/* Botones */}
        <TouchableOpacity
          onPress={() => {
            resetAnswers();
            router.replace(`/${encodeURIComponent(tema!)}`);
          }}
          className="mt-6 bg-light-primary dark:bg-dark-primary py-3 rounded-lg items-center"
        >
          <Text className="text-white text-base font-work-medium">
            Reintentar quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            resetAnswers();
            router.replace("/");
          }}
          className="mt-4 border border-light-primary dark:border-dark-primary py-3 rounded-lg items-center"
        >
          <Text className="text-light-primary dark:text-dark-primary text-base font-work-medium">
            Volver a temas
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
