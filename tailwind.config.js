module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'dashboard': 'calc(100% - 9rem)',
        'profile-content': 'calc(100% - 10.5rem)',
        'post-wrapper': 'calc(100% - 7rem)',
        'post-list': 'calc(100% - 5.5rem)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
