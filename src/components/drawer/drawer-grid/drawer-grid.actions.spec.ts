import test from 'tape';
import { produce } from 'immer';

import dom from '../../../../test/dom';

import createStore from '../../../store/store.fixture';
import * as fixture from './drawer-grid.actions.fixture';

import * as actions from './drawer-grid.actions';

test('[drawer-grid.remove] removes board and sets next board as active', t => {
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

test('[drawer-grid.active] sets active board', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.active.board = 'board';
  }));

  store.set(produce(actions.active('board')));
  t.equal(store.current.active.board, 'board', 'sets board active');

  t.end();
});

test('[drawer-grid.focus] keeps focus on current row, moves focus if element is removed', t => {
  const { root, window } = dom(fixture);

  window.store.set(produce(draft => {
    draft.entity.board.board = { id: 'board', lanes: [], categories: [] };
    draft.entity.board.a = { id: 'a', lanes: [], categories: [] };
    draft.entity.board.b = { id: 'b', lanes: [], categories: [] };
    draft.entity.board.c = { id: 'c', lanes: [], categories: [] };
  }));
  window.store.set(produce(actions.remove('a')));

  t.true(root.querySelector('[aria-rowindex="1"] [aria-colindex="1"] [tabindex="0"]'), 'moves focus');

  t.end();
});
