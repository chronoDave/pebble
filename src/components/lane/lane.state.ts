import type { Lane } from '../../store/schema';

export default window.store.select<string, Lane | null>(
  state => id => state?.entity.lane[id] ?? null
);
