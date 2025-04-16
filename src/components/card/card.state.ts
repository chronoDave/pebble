import type { Card } from '../../store/schema';

export default window.store.select<string, Card | null>(
  state => id => state?.entity.card[id] ?? null
);
