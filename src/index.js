#!/usr/bin/env node
'use strict';

let args = require('./parse-args')(process.argv.slice(1));
let chalk = require('chalk');
let interceptStdout = require('intercept-stdout');
let rainbowize = require('./rainbowize');
let usage = require('./usage');

//fun mode
if (args.f) {
  interceptStdout(rainbowize);
}

//help! importantly comes _after_ fun mode
if (args['?'] || args.help) {
  console.log(usage());
  process.exit(0);
}

//attack mode
if (args.a) {

}

//suppress bees
if (args.b) {

}

//count # args
if (args.c) {
  console.log(args._.length);
}


