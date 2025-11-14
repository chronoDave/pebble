import type { State } from './schema.ts';

import Store from '../lib/store.ts';
import Storage from '../lib/storage.ts';

import { state } from './schema.ts';

const storage = new Storage('pebble', state);
const store = new Store<State>(storage.read() ?? {
  board: {},
  lane: {},
  card: {}
});

store.on(console.log);
store.on(cur => storage.write(cur))

export default store;

export const subscribe = Store.subscribe(store);
