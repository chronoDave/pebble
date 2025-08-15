import type { State } from './schema.ts';

import Store from '../lib/store.ts';

export default new Store<State>({
  board: {}
});
