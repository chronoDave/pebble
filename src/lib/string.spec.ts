import test from 'node:test';
import assert from 'node:assert/strict';

import { uid } from './string.ts';

test('[string.uid] returns unique id', () => {
  const ids = [];
  for (let i = 0; i < 1000000; i += 1) ids.push(uid());

  assert.equal(ids.length, new Set(ids).size, 'no collisions');
});