import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';
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

test('[active.board] sets active board', t => {
  const id = 'board';
  const store = createStore();

  store.set(produce(actions.board(id)));
  t.equal(store.current.active.board, id, 'sets active board');
  store.set(produce(actions.board()));
  t.false(store.current.active.board, 'removes active board');

  t.end();
});

test('[active.drawer] sets active drawer', t => {
  const id = 'drawer';
  const store = createStore();

  store.set(produce(actions.drawer(id)));
  t.equal(store.current.active.drawer, id, 'sets active drawer');
  store.set(produce(actions.drawer()));
  t.false(store.current.active.drawer, 'removes active drawer');

  t.end();
});

test('[active.collapse] sets active collapse', t => {
  const id = 'collapse';
  const store = createStore();

  store.set(produce(actions.collapse(id)));
  t.equal(store.current.active.collapse, id, 'sets active collapse');
  store.set(produce(actions.collapse()));
  t.false(store.current.active.collapse, 'removes active collapse');

  t.end();
});
