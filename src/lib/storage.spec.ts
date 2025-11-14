import test from 'node:test';
import assert from 'node:assert/strict';
import * as r from 'runtypes';

import Storage from './storage.ts';
import localStorage from '../../test/localStorage.ts';

test('[storage] read and writes from localStorage', async () => {
  global.localStorage = localStorage();

  const schema = r.Record({ id: r.String });
  const storage = new Storage('debug', schema);

  assert.ok(!storage.read(), 'null');

  storage.write({ id: '3' });
  assert.deepEqual(storage.read(), { id: '3' })

  delete global.localStorage;
});

test('[storage] throws on invalid localStorage', async () => {
  global.localStorage = localStorage();

  const schema = r.Record({ id: r.String });
  const storage = new Storage('debug', schema);

  global.localStorage.setItem('', '{}');
  assert.throws(() => storage.read());

  delete global.localStorage;
});
