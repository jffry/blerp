'use strict';

const BEES = ['B', 'b', '🅑', '🅱', '⒝', '🄱'];

exports.noBees = function(text) {
  return text.split('').filter(ch => {
    return BEES.indexOf(ch) < 0;
  }).join('');
};

exports.extraBees = function(text) {
  const CHANCE = 10 / 100;
  return text.split('').map(ch => {
    if (Math.random() < CHANCE) {
      ch = BEES[Math.floor(Math.random() * BEES.length)];
    }
    return ch;
  }).join('');
};
