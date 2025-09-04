module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,html}",
      "./.storybook/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["var(--font-helvetica)", "Helvetica", "Arial", "sans-serif"]
        },
      }
    },
    plugins: [],
  }