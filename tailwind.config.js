/** @type {import('tailwindcss').Config} */
const {Colors}= require('./src/constants/colors.ts')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./componentes/**/*.{js,ts,jsx,tsx}",
    "./.presentation/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("nativewind/preset")], // ESTA LÍNEA ES LA CLAVE
  theme: {
    extend: {
      // si quieres personalizar colores, fuentes, etc., lo haces aquí
      colors: {
        'bg-default': Colors.background,
        'surface': Colors.surface,
        'primary': Colors.primary,
        'secondary': Colors.secondary,
        'text-high': Colors.text.highContrast,
        'text-medium': Colors.text.mediumContrast,
        'text-low': Colors.text.lowContrast,
        'border-default': Colors.border,
        'error': Colors.error,
      },
      fontFamily: {
        'work-black': ['WorkSans-Black', 'sans-serif'],
        'work-ligth': ['WorkSans-Light', 'sans-serif'],
        'work-medium': ['WorkSans-Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
