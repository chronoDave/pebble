import test from 'node:test';
import assert from 'node:assert/strict';

import * as math from './math.ts';

test('[math.wrap]', () => {
  const wrap = math.wrap(-5)(5);

  assert.equal(wrap(-10), 5, 'min');
  assert.equal(wrap(10), -5, 'max');
  assert.equal(wrap(0), 0, 'between');
});
