/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#282a36',
        'purple': "#bd93f9",
        'background2': "#44475a",
        "cyan": "#8be9fd"
      },
    },
  },
  plugins: [],
}
