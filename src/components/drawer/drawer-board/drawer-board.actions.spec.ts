import test from 'tape';
import { produce } from 'immer';

import createStore from '../../../store/store.struct';

import * as actions from './drawer-board.actions';

test('[drawer-board.remove] removes board and sets next board as active', t => {
  const store = createStore();
  store.set(produce(draft => {
    draft.entity.board.board = { id: 'board', lanes: [], categories: [] };
    draft.entity.board.a = { id: 'a', lanes: [], categories: [] };
  }));

  store.set(produce(actions.remove('board')));
  t.false(store.current.entity.board.board, 'removes board');
  t.equal(Object.keys(store.current.entity.board).length, 1, 'does not remove unrelated board');
  t.equal(store.current.active.board, 'a', 'sets active to next board');

  t.end();
});

test('[drawer-board.active] sets active board', t => {
  const store = createStore();
  store.set(produce(draft => {
    draft.active.board = 'board';
  }));

  store.set(produce(actions.active('board')));
  t.equal(store.current.active.board, 'board', 'sets board active');

  t.end();
});
