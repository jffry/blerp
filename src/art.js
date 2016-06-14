'use strict';

/*
http://www.xcski.com/~ptomblin/planes.txt
B-2 Stealth Bomber
Jason Nyberg
nyberg@ctron.com
*/
exports.stealthBomber = `
___
   /\\
   \\ \\
 -=/--\\
 -=\\--/
   / /
___\\/
`;


exports.animateStealthBomber = function()
{
  const max = Math.min(process.stderr.columns || 30, 100) - 10;
  process.stderr.write('STEALTH MODE ACTIVATED\n');
  let bomber = exports.stealthBomber;
  for (let i = 0; i < max; i += 2)
  {
    process.stderr.write(bomber);
    process.stderr.write(`\x1B[8A\x1B[${i}D`);
    bomber = bomber.replace(/^/gm, '  ');
    syncWait(30);
  }
};

function syncWait(ms) {
  let end = Date.now() + ms;
  while (Date.now() < end) { /*nop*/ }
}
