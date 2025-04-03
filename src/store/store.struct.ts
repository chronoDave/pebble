import type { State } from './schema';

import Store from '../lib/store/store';

export default () => new Store<State>({
  entity: {
    board: {},
    lane: {},
    card: {},
    task: {},
    category: {}
  },
  active: {}
});
