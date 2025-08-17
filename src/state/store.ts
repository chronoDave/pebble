import type { State } from './schema.ts';

import Store from '../lib/store.ts';

const store = new Store<State>({
  board: {},
  lane: {},
  card: {}
})
  .on(console.log);

export default store;

export const subscribe = Store.subscribe(store);
