import store from '../../../store/store';

export default store.select<string, string | null>(
  state => id => state?.entity.board[id]?.title ?? null
);
