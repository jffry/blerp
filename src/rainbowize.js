'use strict';

let chalk = require('chalk');

const COLORS = [
  chalk.black.bgRed,
  chalk.black.bgYellow,
  chalk.black.bgGreen,
  chalk.black.bgCyan,
  chalk.black.bgBlue,
  chalk.black.bgMagenta
];
let index = 0;

module.exports = function(text) {
  return text.split('').map(t => {
    index = (index + 1) % COLORS.length;
    return COLORS[index](t);
  }).join('');
};
