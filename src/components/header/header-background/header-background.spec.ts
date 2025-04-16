import type { Board } from '../../../store/schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../../store/store.fixture';

import * as actions from './header-background.actions';

test('[header-background.set] sets active board background', t => {
  const store = createStore();

  store.set(produce(draft => {
    const board: Board = {
      id: 'a',
      lanes: [],
      categories: []
    };

    draft.entity.board.a = board;
    draft.active.board = 'a';
  }));

  store.set(produce(actions.set('background')));
  t.equal(store.current.entity.board.a?.background, 'background', 'sets background');

  t.end();
});

test('[header-background.remove]', t => {
  const store = createStore();

  store.set(produce(draft => {
    const board: Board = {
      id: 'a',
      lanes: [],
      categories: []
    };

    draft.entity.board.a = board;
    draft.active.board = 'a';
  }));

  store.set(produce(actions.remove));
  t.false(store.current.entity.board.a?.background, 'removes background');

  t.end();
});
