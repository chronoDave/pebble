export default window.store.select(state =>
  () => {
    const id = state?.active.board;
    if (typeof id !== 'string') return null;

    return state?.entity.board[id]?.background ?? null;
  }
);
