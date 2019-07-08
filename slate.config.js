// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
const path = require('path');
const purgecss = require('@fullhuman/postcss-purgecss');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  'webpack.postcss.plugins': (config) => {
    const plugins = [
      tailwindcss('tailwind.js'),
      require('autoprefixer')
    ];

    if (process.env.NODE_ENV === 'production') {
      plugins.push(purgecss({
        content: ['./src/**/*.liquid', './src/**/*.js'],
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ['liquid', 'js']
          }
        ]
      }));

      plugins.push(cssnano(config.get('webpack.cssnano.settings')));
    }

    return plugins;
  },
  'webpack.extend': {
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery')
      },
    },
  },
};