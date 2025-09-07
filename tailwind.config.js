// tailwind.config.js
const { Colors } = require("./src/constants/colors");

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // fondos
        "light-background": Colors.light.background,
        "dark-background":  Colors.dark.background,
        // superficies (cards, modales…)
        "light-surface":    Colors.light.surface,
        "dark-surface":     Colors.dark.surface,
        // primario
        "light-primary":    Colors.light.primary,
        "dark-primary":     Colors.dark.primary,
        // texto
        "light-text-high":   Colors.light.text.highContrast,
        "dark-text-high":    Colors.dark.text.highContrast,
        "light-text-medium": Colors.light.text.mediumContrast,
        "dark-text-medium":  Colors.dark.text.mediumContrast,
        // etc…
      },
    },
  },
  plugins: [],
};
