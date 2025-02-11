/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('../assets/images/background.jpg')",
        playerSprite: "url('../assets/sprites/ship_0001.png')",
      },
    },
  },
  plugins: [],
};
