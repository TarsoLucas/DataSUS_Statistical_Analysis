/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin" : {
          scrollbarWidth : "thin",
          scrollbarColor: "rgb(86 214 120) white"
        },
        ".scrollbar-webkit" :{
          "&::-webkit-scrollbar" : {
            width: "5px"
          },
          "&::-webkit-scrollbar-track" : {
            background: "white"
          },
          "&::-webkit-scrollbar-thumb" : {
            background: "rgb(152 230 173)",
            borderRadius: "50px",
            border: "1px solid white"
          }
        }
      }

      addUtilities(newUtilities, ["responive", "hover"])
    }
  ],
}