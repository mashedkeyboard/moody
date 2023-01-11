const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss: {},
    //But others, like autoprefixer, need to run after,
    'postcss-extend-rule': { onUnusedExtend: 'warn' },
    autoprefixer: {}
  }
};

module.exports = config;