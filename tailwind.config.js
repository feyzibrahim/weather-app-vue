module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      padding: '2rem',
      center: true
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
