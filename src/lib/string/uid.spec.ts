import test from 'tape';

import uid from './uid';

test('[uid] returns unique id', t => {
  const ids = [];
  for (let i = 0; i < 1000000; i += 1) ids.push(uid());

  t.equal(ids.length, new Set(ids).size, 'no collisions');

  t.end();
});
