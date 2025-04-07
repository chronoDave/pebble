import store from '../../../store/store';

export default store.select(state =>
  () => {
    const id = state?.active.board;
    if (typeof id !== 'string') return null;

    return state?.entity.board[id].background ?? null;
  }
);
