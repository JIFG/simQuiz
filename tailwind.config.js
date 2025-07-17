/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};
