/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px'
      }
    },
    colors: {
      'color-rojo': '#dc2626',
      'fondo-verde': '#16b17e',
      'fondo-verde-claro': '#0eba81',
      'fondo-verde-old': '#008645',
      'fondo-gris': '#f9fafc',
      'fondo-blanco': '#fffffe',
      'letra-negra': '#282833',
      'letra-azul': '#0f1928',
      'letra-blanca': '#fdfdfd',
      'letra-gris-claro': '#efefee',
      'letra-gris-medio': '#d1d1d1',
      'letra-gris-oscuro': '#6c6f77'
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

