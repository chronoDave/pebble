import store from '../../store/store';

export default store.select(state => () => !!state?.active.drawer);
