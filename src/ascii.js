#!/usr/bin/env node
'use strict';

exports.isPrintable = function(c)
{
  const LUT = {
    '\\': true,
    '\0': true,
    '\b': true,
    '\f': true,
    '\n': true,
    '\r': true,
    '\t': true,
    '\v': true,
    '\uFFFD': true,
    '\uFEFF': true,
  };
  //first search the lookup table of "named" escapes
  if (LUT.hasOwnProperty(c))
  {
    return false;
  }
  //handle unnamed escapes
  var code = c.charCodeAt(0);
  if (code < 32 || (code >= 127 && code < 256))
  {
    return false;
  }
  //no escape needed
  return true;
};
