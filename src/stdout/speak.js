'use strict';

let say = require('say');
let stripAnsi = require('strip-ansi');

let buffer = '';
let speaking = false;

exports.cancel = function()
{
  say.stop();
};

exports.buffered = function(text)
{
  buffer += String(text || '');
  handle();
  return text;
};

function handle()
{
  //we already have a callback waiting to process more
  if (speaking)
  {
    return;
  }
  //need to process
  let pieces = partition(buffer);
  if (pieces && pieces.ready)
  {
    let toSay = stripAnsi(pieces.ready || '') || '';
    buffer = pieces.rest;
    speaking = true;
    say.speak(toSay, null, null, function()
    {
      speaking = false;
      handle();
    });
  }
}

function partition(buf)
{
  let p;
  if ((p = buf.lastIndexOf('\n')) >= 0)
  {
    return {
      ready: buf.substring(0, p),
      rest: buf.substring(p + 1)
    };
  }
  else if ((p = buf.lastIndexOf('. ')) >= 0)
  {
    return {
      ready: buf.substring(0, p),
      rest: buf.substring(p + 2)
    };
  }
  else
  {
    return null;
  }
}

//also write out help if we did nothing else before the utility ended
process.on('beforeExit', function()
{
  exports.buffered('\n');
  if (speaking) {
    exports.cancel(function()
    {
      //QUIET YOU
    });
  }
});
