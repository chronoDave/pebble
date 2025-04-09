import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store/store.struct';

import * as actions from './header.actions';

test('[header.open] opens board drawer', t => {
  const store = createStore();

  store.set(produce(actions.open));
  t.true(store.current.active.drawer, 'opens drawer');

  t.end();
});
