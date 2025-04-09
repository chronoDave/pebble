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

test('[active.drawer] opens / closes / toggles drawer', t => {
  const store = createStore();

  store.set(produce(actions.drawer(true)));
  t.true(store.current.active.drawer, 'opens');
  store.set(produce(actions.drawer(false)));
  t.false(store.current.active.drawer, 'closes');
  store.set(produce(actions.drawer()));
  t.true(store.current.active.drawer, 'toggles');

  t.end();
});
