import type { State } from './schema.ts';

import Store from '../lib/store.ts';

const store = new Store<State>({
  board: {},
  lane: {},
  card: {}
});

export default store;

export const subscribe = Store.subscribe(store);
