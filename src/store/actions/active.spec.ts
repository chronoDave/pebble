import test from 'tape';
import { produce } from 'immer';

import createStore from '../store.struct';
import * as actions from './active';

test('[active.board] sets / removes board', t => {
  const id = 'board';
  const store = createStore();

  store.set(produce(actions.board(id)));
  t.equal(store.current.active.board, id, 'sets board');
  store.set(produce(actions.board()));
  t.false(store.current.active.board, 'removes board');

  t.end();
});
