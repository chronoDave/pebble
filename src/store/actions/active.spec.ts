import test from 'tape';
import { produce } from 'immer';

import createStore from '../store.fixture';
import * as actions from './active';

test('[active.board] sets / removes board', t => {
  const store = createStore();

  store.set(produce(actions.board('board')));
  t.equal(store.current.active.board, 'board', 'sets board');
  store.set(produce(actions.board()));
  t.false(store.current.active.board, 'removes board');

  t.end();
});
