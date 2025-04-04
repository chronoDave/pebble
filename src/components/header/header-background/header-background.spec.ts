import type { Board } from '../../../store/schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../../store/store.struct';

import * as actions from './header-background.actions';

test('[header-background.background] sets and removes board background', t => {
  const store = createStore();
  store.set(produce(draft => {
    const board: Board = {
      id: 'a',
      lanes: [],
      categories: []
    };

    draft.entity.board.a = board;
  }));

  store.set(produce(actions.background('a')('background')));
  t.equal(store.current.entity.board.a.background, 'background', 'sets background');

  store.set(produce(actions.background('a')()));
  t.false(store.current.entity.board.a.background, 'removes background');

  t.end();
});
