'use strict';

const DASH = '\u002d';
const EM_DASH = '\u2014'; //

module.exports = function(argv)
{
  let flagChar = DASH;
  let xform = RETAINCASE;
  let flags = {};
  let extras = [];

  for (let i = 0; i < argv.length; i++)
  {
    let arg = argv[i];
    if (isFlag(arg, flagChar))
    {
      let flagName = xform(getFlagName(arg, flagChar));
      //some flags switch how we parse arguments
      if (flagName === EM_DASH) {
        flagChar = EM_DASH;
      }
      else if (flagName === 'i') {
        xform = LOWERCASE;
      }
      else if (flagName === 'I') {
        xform = UPPERCASE;
      }
      //now we set the flag value
      let argNext = argv[i + 1];
      if (!argNext || isFlag(argNext, flagChar))
      {
        flags[flagName] = true;
      }
      else {
        flags[flagName] = argNext;
        i += 1;
      }
    }
    else
    {
      extras.push(arg);
    }
  }
  flags._ = extras;
  return flags;
};

function isFlag(arg, flagChar)
{
  return arg && arg.startsWith(flagChar);
}

function getFlagName(arg, flagChar)
{
  if (!isFlag(arg, flagChar))
  {
    throw new RangeError('input arg must be a flag');
  }
  while (arg.startsWith(flagChar)) {
    arg = arg.substring(flagChar.length);
  }
  return arg;
}

function RETAINCASE(s)
{
  return s;
}
function UPPERCASE(s)
{
  return s.toUpperCase();
}
function LOWERCASE(s)
{
  return s.toLowerCase();
}
