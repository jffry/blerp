#!/usr/bin/env node
'use strict';

let chalk = require('chalk');
let minimist = require('minimist')(process.argv);
let interceptStdout = require('intercept-stdout');
let rainbowize = require('./rainbowize');


if (minimist.f) {
  interceptStdout(rainbowize);
}

console.log('test blerp, please ignore');
