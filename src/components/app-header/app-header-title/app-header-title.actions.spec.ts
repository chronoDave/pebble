import type { Board } from '../../../store/schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../../store/store.struct';

import * as actions from './app-header-title.actions';

test('[app-header-title.title] sets and removes board title', t => {
  const store = createStore();
  store.set(produce(draft => {
    const board: Board = {
      id: 'a',
      lanes: [],
      categories: []
    };

    draft.entity.board.a = board;
  }));

  store.set(produce(actions.title('a')('title')));
  t.equal(store.current.entity.board.a.title, 'title', 'sets title');

  store.set(produce(actions.title('a')()));
  t.false(store.current.entity.board.a.title, 'removes title');

  t.end();
});
