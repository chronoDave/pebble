import store from '../../../store/store';

export default store.select(state => (id: string) =>
  state?.entity.board[id].background ?? null
);
