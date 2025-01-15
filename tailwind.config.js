/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {

        // Trip Sans
        TripSansBold: ['TripSansBold', 'sans-serif'], // Define your font family
        TripSansMedium: ['TripSansMedium', 'sans-serif'], // Define your font family
        TripSansMonoRegular: ['TripSansMonoRegular', 'sans-serif'], // Define your font family
        TripSansUltra: ['TripSansUltra', 'sans-serif'], // Define your font family
        TripSansVariable: ['TripSansVariable', 'sans-serif'], // Define your font family
        TripSans: ['TripSans', 'sans-serif'], // Define your font family
        
        // TT Hoves
        TTHovesRegular: ['TTHovesRegular', 'sans-serif'], // Define your font family
        TTHovesBold: ['TTHovesBold', 'sans-serif'], // Define your font family
        TTHovesBlack: ['TTHovesBlack', 'sans-serif'], // Define your font family
        TTHovesExtraBold: ['TTHovesExtraBold', 'sans-serif'], // Define your font family
        TTHovesLight: ['TTHovesLight', 'sans-serif'], // Define your font family
        TTHovesMedium: ['TTHovesMedium', 'sans-serif'], // Define your font family
        TTHovesThin: ['TTHovesThin', 'sans-serif'], // Define your font family

      },
    },
  },
  plugins: [],
}