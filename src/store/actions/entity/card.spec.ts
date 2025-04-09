import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';

import * as actions from './card';

test('[card.remove] removes card and associated tasks', t => {
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
  }));

  store.set(produce(actions.remove('card')));
  t.false(store.current.entity.card.card, 'removes card');
  t.false(store.current.entity.task.task, 'removes associated task');
  t.equal(Object.keys(store.current.entity.card).length, 1, 'does not remove unrelated card');
  t.equal(Object.keys(store.current.entity.task).length, 1, 'does not remove unrelated task');

  t.end();
});