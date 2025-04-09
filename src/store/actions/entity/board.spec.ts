import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';

import * as actions from './board';

test('[board.remove] removes board and associated categories, lanes, cards, tasks', t => {
  const store = createStore();
  store.set(produce(draft => {
    draft.entity.task.task = { id: 'task' };
    draft.entity.task.a = { id: 'a' };
    draft.entity.card.card = {
      id: 'card',
      tasks: ['task'],
      categories: []
    };
    draft.entity.card.a = {
      id: 'a',
      tasks: ['a'],
      categories: []
    };
    draft.entity.lane.lane = { id: 'lane', cards: ['card'] };
    draft.entity.lane.a = { id: 'a', cards: ['a'] };
    draft.entity.category.category = { id: 'category' };
    draft.entity.category.a = { id: 'a' };
    draft.entity.board.board = { id: 'board', lanes: ['lane'], categories: ['category'] };
    draft.entity.board.a = { id: 'a', lanes: ['a'], categories: ['a'] };
  }));

  store.set(produce(actions.remove('board')));
  t.false(store.current.entity.board.board, 'removes board');
  t.false(store.current.entity.category.category, 'removes category');
  t.false(store.current.entity.lane.lane, 'removes lane');
  t.false(store.current.entity.card.card, 'removes associated card');
  t.false(store.current.entity.task.task, 'removes associated task');
  t.equal(Object.keys(store.current.entity.board).length, 1, 'does not remove unrelated board');
  t.equal(Object.keys(store.current.entity.category).length, 1, 'does not remove unrelated category');
  t.equal(Object.keys(store.current.entity.lane).length, 1, 'does not remove unrelated lane');
  t.equal(Object.keys(store.current.entity.card).length, 1, 'does not remove unrelated card');
  t.equal(Object.keys(store.current.entity.task).length, 1, 'does not remove unrelated task');

  t.end();
});
