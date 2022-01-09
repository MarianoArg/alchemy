const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        alchemyGreen: '#69f6b3'
      },
      fontFamily: {
        plex: ['"IBM Plex Sans"', 'sans-serif']
      },
      padding: {
        '1/2': '50%',
        full: '100%',
      },
      keyframes: {
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          'from': { height: 'var(--radix-accordion-content-height)' },
          'to': { height: '0' },
        }
      },
      animation: {
        slideUp: 'slideUp 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideDown: 'slideDown 200ms cubic-bezier(0.87, 0, 0.13, 1)'
      }
    }
  },
  variants: {},
  plugins: [plugin(function ({ addVariant }) {
    addVariant('dataOpen', '&[data-state="open"]'),
    addVariant('dataClosed', '&[data-state="closed"]')
    addVariant('parentOpen', '[data-state=open] &')
  })]
};