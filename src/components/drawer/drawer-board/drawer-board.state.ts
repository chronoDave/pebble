import store from '../../../store/store';

export default store.select(
  state => () => state?.entity.board ? Object.keys(state.entity.board) : [],
  ({ previous, current }) => {
    if (!previous?.entity.board) return true;
    return Object.keys(previous.entity.board).length !== Object.keys(current.entity.board).length;
  }
);
