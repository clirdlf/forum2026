module.exports = {
  content: [
    './src/**/*.{html,njk}',
    //"./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF',
      }
    }
  },
  //plugins: [ require("tw-elements/plugin.cjs") ],
  darkMode: 'class',
};
