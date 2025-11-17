/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0052CC',
        secondary: '#0065FF',
        accent: '#00B8D9',
        atlassianBlue: '#0052CC',
        atlassianPurple: '#5243AA',
        atlassianTeal: '#00B8D9',
        atlassianGreen: '#36B37E',
        atlassianYellow: '#FFAB00',
        atlassianRed: '#FF5630',
      },
    },
  },
  plugins: [],
}
