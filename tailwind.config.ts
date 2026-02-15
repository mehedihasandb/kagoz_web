import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './foodcomponents/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--color-primary)",
        'tprimary': "var(--color-text-primary)",
        'label-primary': "var(--color-label-primary)",
        'tlabel-primary': "var(--color-text-label-primary)",
        secondary: "var(--color-secondary)",
        'tsecondary': "var(--color-text-secondary)",
        'label-secondary': "var(--color-label-secondary)",
        'tlabel-secondary': "var(--color-text-label-secondary)",
      },
      animation: {
        spinCustom: 'spinCustom 1s linear infinite',
        run: 'run 10s linear infinite',
      },
      keyframes: {
        spinCustom: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        run: { // Added keyframes for running image animation
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      container: {
        center: true
      },
      
      maxWidth: {
        custom: '1235px',  // Custom max-width
        'lg-custom': '1670px', // Custom max-width for larger screens
      },

      fontFamily: {
        aclonica: ['Aclonica', 'sans-serif'],
        graduate: ['"Graduate"', 'serif'],
        monda: ['"Monda"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
