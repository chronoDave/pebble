import store from '../../store/store';

export default store.select(state =>
  () => typeof state?.active.board === 'string'
);
