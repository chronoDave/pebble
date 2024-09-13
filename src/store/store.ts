import type { State} from './state';

import Store from '../lib/store/store';
import createSelector from '../lib/selector/selector';
import { state } from './state';
import Storage from '../lib/storage/storage';

const storage = new Storage('state', state);
const store = new Store(storage.read() ?? storage.default)
  .on(state => storage.write(state.current as State));

export default store;
export const selector = createSelector(store);
