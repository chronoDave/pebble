import type { Lane } from '../../store/schema';

import store from '../../store/store';

export default store.select<string, Lane | null>(
  state => id => state?.entity.lane[id] ?? null
);
