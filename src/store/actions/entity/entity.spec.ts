import type {
  Board,
  Card,
  Task,
  Lane
} from '../../schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';

import * as actions from './entity';

test('[entity.set] sets entity', t => {
  const store = createStore();
  const board: Board = { id: 'a' };

  store.set(produce(actions.set('board')(board)));
  t.equal(Object.keys(store.current.entity.board).length, 1, 'sets entity');

  t.end();
});

test('[entity.string] sets string property', t => {
  const store = createStore();
  const card: Card = { id: 'b' };

  store.set(produce(actions.set('card')(card)));

  store.set(produce(actions.string('card')('title')(card.id)('title')));
  t.equal(store.current.entity.card[card.id].title, 'title', 'sets title');

  store.set(produce(actions.string('card')('title')(card.id)()));
  t.false(store.current.entity.card[card.id].title, 'removes title');

  t.end();
});

test('[entity.boolean] sets boolean property', t => {
  const store = createStore();
  const task: Task = { id: 'c' };

  store.set(produce(actions.set('task')(task)));

  store.set(produce(actions.boolean('task')('done')(task.id)(true)));
  t.true(store.current.entity.task[task.id].done, 'true');

  store.set(produce(actions.boolean('task')('done')(task.id)(false)));
  t.false(store.current.entity.task[task.id].done, 'false');

  store.set(produce(actions.boolean('task')('done')(task.id)()));
  t.true(store.current.entity.task[task.id].done, 'inverted');

  t.end();
});

test('[entity.remove] removes entity', t => {
  const store = createStore();
  const lane: Lane = { id: 'd' };

  store.set(produce(actions.set('lane')(lane)));

  store.set(produce(actions.remove('lane')(lane.id)));
  t.equal(Object.keys(store.current.entity.lane).length, 0, 'deletes entity');

  t.end();
});
