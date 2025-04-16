export default window.store.select<string, string | null>(
  state => id => state?.entity.board[id]?.title ?? null
);
