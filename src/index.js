#!/usr/bin/env node
'use strict';

let args = require('./parse-args')(process.argv.slice(1));
var chalk = require('chalk');
let stdout_intercept = require('intercept-stdout');
let stdout_rainbowize = require('./stdout/rainbowize');
let stdout_bees = require('./stdout/bees');
let stdout_speak = require('./stdout/speak');
let usage = require('./usage');
let art = require('./art');

if (args.S) {
  art.animateStealthBomber();
}

//do ... fun things to stdout
let BYTES_WRITTEN = 0;
stdout_intercept(function(text)
{
  BYTES_WRITTEN += text.length;
  text = args.B ? stdout_bees.extraBees(text) : text;
  text = args.b ? stdout_bees.noBees(text) : text;
  //-q prints output instead of speaking it
  if (!args.q) {
    stdout_speak.buffered(text);
    return '';
  }
  //stealth mode prevents ever printing to stdout
  if (args.S) return '';
  text = args.f ? stdout_rainbowize(text) : text;
  return text ;
});

//help! importantly comes _after_ fun mode
if (args['?'] || args.help || process.argv.length <= 2) {
  console.log(usage());
}

//count # args
if (args.c) {
  console.log(args._.length);
}

//deprecated
if (args.D) {
  console.log(chalk.white.bold.bgRed(art.deprecated));
}



//last thing
if (args.h) {
  const interval = 20;
  let n = 0;
  let next = 0;
  while (true) {
    if (Date.now() >= next) {
      next = Date.now() + interval;
      process.stdout.write('.');
      n += 1;
      if (n >= 64) {
        process.stdout.write('\n');
        n = 0;
      }
    }

    //TODO: trap CTRL+C / CTRL+D and refuse to close
  }
}
