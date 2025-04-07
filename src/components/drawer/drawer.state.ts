import store from '../../store/store';

export default store.select(
  state => id => state?.active.drawer === id
);
