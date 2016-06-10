'use strict';

let fs = require('fs');
let path = require('path');

module.exports = function() {
  let p = path.resolve(__dirname, '../doc/cli.md');
  return fs.readFileSync(p).toString();
};
