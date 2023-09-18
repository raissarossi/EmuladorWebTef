/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bosch:{
          grau0: '#E0E2E5',
          grau1: '#D0D4D8',
          grau2: '#B2B9C0',
          grau3: '#A4ABB3',
          grau4: '#71767C',
          grau5: '#383B3E',

          rot1: '#FF2124',
          rot2: '#D50005',
          rot3: '#A80003',
          
          blau1: '#0088D4',
          blau2: '#006EAD',
          blau3: '#005587',
          blau4: '#003E64',

          grun1: '#5EBD82',
          grun2: '#219557',
          grun3: '#007A42',
          grun4: '#006C3A',

          lila1: "#654498",
          lila2: "#3B3475",
        }
      },
      screens: {
        'ssm': '440px',
        'sm': '640px',
        'sm1': '700px',
        'md': '768px',
        'md1': '830px',
        'lg': '1024px',
        'lg1': '1100px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}