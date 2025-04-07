import type { Card } from '../../store/schema';

import store from '../../store/store';

export default store.select<string, Card | null>(
  state => id => state?.entity.card[id] ?? null
);
