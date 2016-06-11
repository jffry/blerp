'use strict';

let chalk = require('chalk');
let ascii = require('../ascii');

const COLORS = [
  chalk.black.bgRed,
  chalk.black.bgYellow,
  chalk.black.bgGreen,
  chalk.black.bgCyan,
  chalk.black.bgBlue,
  chalk.black.bgMagenta
];
let index = -1;

module.exports = function(text) {
  return text.split('').map(t => {
    if (ascii.isPrintable(t))
    {
      index = (index + 1) % COLORS.length;
      return COLORS[index](t);
    }
    else
    {
      return t;
    }
  }).join('');
};
