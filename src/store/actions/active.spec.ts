import test from 'tape';
import { produce } from 'immer';

import createStore from '../store.struct';
import * as actions from './active';

test('[active.set] sets active', t => {
  const id = 'board';
  const store = createStore();

  store.set(produce(actions.set('board')(id)));
  t.equal(store.current.active.board, id, 'sets active');
  store.set(produce(actions.set('board')()));
  t.false(store.current.active.board, 'removes active');

  t.end();
});
