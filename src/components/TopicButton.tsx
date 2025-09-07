// src/components/TopicButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface TopicButtonProps {
  title: string;
  onPress: () => void;
  /** Clases Tailwind para el contenedor */
  containerClassName?: string;
  /** Clases Tailwind para el texto */
  textClassName?: string;
}

export default function TopicButton({
  title,
  onPress,
  containerClassName = '',
  textClassName = '',
}: TopicButtonProps) {
  return (
    <TouchableOpacity
      className={`bg-primary py-3 rounded-lg items-center ${containerClassName}`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className={`text-surface text-base font-work-light ${textClassName}`}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
