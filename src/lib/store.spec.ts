import test from 'node:test';
import assert from 'node:assert/strict';

import Store from './store.ts';

test('[store.state] returns current state', () => {
  const state = { a: 'a' };
  const store = new Store(state);

  assert.equal(store.state, state);
});

test('[store.undo] set previous state', () => {
  const state = { a: 'a' };
  const store = new Store(state);

  store.undo();
  assert.equal(store.state, state, 'does not revert to null');

  store.set(() => ({ a: 'b' }));
  store.undo();

  assert.equal(store.state, state);
});

test('[store.set] dispatches subscribers', () => {
  const store = new Store({ a: 1 });
  store.set(state => ({ a: state.a + 1 }));

  assert.equal(store.state.a, 2);
});

test('[store.on] adds subscriber', () => {
  let n = 0;

  const store = new Store({ a: 1 });
  store
    .on(() => { n += 1; })
    .set(state => ({ a: state.a + 1 }));

  assert.equal(store.state.a, 2);
  assert.equal(n, 1);
});

test('[store.off] adds subscriber', () => {
  let n = 0;

  const subscriber = () => { n += 1; };
  const store = new Store({ a: 1 });

  store
    .on(subscriber)
    .off(subscriber)
    .set(state => ({ a: state.a + 1 }));

  assert.equal(n, 0);
});
