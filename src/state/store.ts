import type { State } from './schema.ts';

import Store from '../lib/store.ts';

const store = new Store<State>({
  board: {},
  lane: {}
});

store.on(console.log);

export default store;
