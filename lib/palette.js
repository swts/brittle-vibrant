'use strict';
const Vibrant = require('node-vibrant');

const nameMap = {
  vibrant: 'Vibrant',
  muted: 'Muted',
  darkVibrant: 'DarkVibrant',
  darkMuted: 'DarkMuted',
  lightVibrant: 'LightVibrant',
  lightMuted: 'LightMuted'
}

module.exports = function(o, cb) {
  let res = {
    id: o.id,
    name: o.options.name || 'palette'
  }

  let opts = o.options;
  let colors = opts.colors || [ 'vibrant', 'muted', 'darkVibrant', 'darkMuted', 'lightVibrant', 'lightMuted' ];

  try {
    Vibrant
      .from(o.file.path)
      .getPalette((err, palette) => {
        if (err) {
          return cb(err, res);
        }

        res.data = {};

        colors.forEach(name => {
          let swatch = palette[nameMap[name]];

          if (!swatch) {
            return;
          }

          let resSwatch = res.data[name] = {};

          if (opts.hsl) {
            resSwatch.hsl = swatch.getHsl();
          }

          if (opts.rgb) {
            resSwatch.rgb = swatch.getRgb();
          }

          if (opts.hex) {
            resSwatch.hex = swatch.getHex();
          }

          if (opts.population) {
            resSwatch.population = swatch.getPopulation();
          }

          if (opts.titleText) {
            resSwatch.titleText = swatch.getTitleTextColor();
          }

          if (opts.bodyText) {
            resSwatch.bodyText = swatch.getBodyTextColor();
          }
        });

        cb(null, res);
      });
  } catch (e) {
    cb(e);
  }
};
