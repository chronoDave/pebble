import type { Board } from '../../../store/schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../../store/store.struct';

import * as actions from './header-title.actions';

test('[header-title.title] sets and removes board title', t => {
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

  store.set(produce(actions.title('title')));
  t.equal(store.current.entity.board.a.title, 'title', 'sets title');

  store.set(produce(actions.title()));
  t.false(store.current.entity.board.a.title, 'removes title');

  t.end();
});
