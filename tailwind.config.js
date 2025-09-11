module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,html}",
      "./.storybook/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    safelist: [
      'text-2xs',
    ],
    theme: {
    },
    plugins: [
      require('@tailwindcss/container-queries')
    ],
  }