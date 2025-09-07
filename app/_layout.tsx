import "../app/global.css";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { QuizProvider } from '../src/context/QuizContext';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <QuizProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </QuizProvider>
    </SafeAreaProvider>
  );
}


