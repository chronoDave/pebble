import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.fixture';

import * as actions from './lane';

test('[lane.remove] removes lane and associated cards and tasks', t => {
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
  }));

  store.set(produce(actions.remove('lane')));
  t.false(store.current.entity.lane.lane, 'removes lane');
  t.false(store.current.entity.card.card, 'removes associated card');
  t.false(store.current.entity.task.task, 'removes associated task');
  t.equal(Object.keys(store.current.entity.lane).length, 1, 'does not remove unrelated lane');
  t.equal(Object.keys(store.current.entity.card).length, 1, 'does not remove unrelated card');
  t.equal(Object.keys(store.current.entity.task).length, 1, 'does not remove unrelated task');

  t.end();
});