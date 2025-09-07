// src/screens/Home.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import TopicButton from "../components/TopicButton";
import { fetchAllThemes } from "../services/questionService";
import { API_URL } from "../config/config";

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 3 : 1;

  // Modo claro/oscuro
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Estado de temas y carga
  const [themes, setThemes] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('API_URL =', API_URL)
    fetchAllThemes()
      .then((t) => setThemes(t))
      .catch((e) => {
        console.warn(e);
        setError("No se pudieron cargar los temas.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-light-bg dark:bg-dark-bg">
        <ActivityIndicator size="large" color={isDark ? "#FFFFFF" : "#457b9d"} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-light-bg dark:bg-dark-bg p-4">
        <Text className="text-center text-light-text-high dark:text-dark-text-high">
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "dark" : ""}`}>
      <View className="flex-1 bg-light-bg dark:bg-dark-bg">
        {/* Header con toggle */}
        <View className="flex-row items-center justify-between px-5 pt-6 pb-4">
          <Text className="text-5xl font-work-black text-light-text-high dark:text-dark-text-high">
            Temas
          </Text>
          <View className="flex-row items-center">
            <Text className="mr-2 text-light-text-medium dark:text-dark-text-medium">
              {isDark ? "🌙" : "☀️"}
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleColorScheme}
              thumbColor={isDark ? "#FFFFFF" : "#457b9d"}
              trackColor={{ true: "#7390AC", false: "#A3CEF1" }}
            />
          </View>
        </View>

        {/* Lista de temas */}
        <FlatList
          data={themes!}
          keyExtractor={(t) => t}
          numColumns={numColumns}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          columnWrapperStyle={
            numColumns > 1
              ? { justifyContent: "space-between", marginBottom: 12 }
              : undefined
          }
          renderItem={({ item: tema }) => {
            const baseClass = numColumns > 1 ? "flex-1 mx-2" : "w-full my-2";
            return (
              <TopicButton
                title={tema}
                onPress={() => router.push(`/${tema}`)}
                containerClassName={`${baseClass} bg-light-primary dark:bg-dark-primary`}
                textClassName="text-light-surface dark:text-dark-surface"
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
