import type { Task } from '../../schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';
import * as actions from './task';

test('[task.set] sets task', t => {
  const store = createStore();
  const task: Task = { id: 'a' };

  store.set(produce(actions.set(task)));
  t.deepEqual(store.current.entity.task[task.id], task, 'sets task');

  t.end();
});

test('[task.create] creates new task', t => {
  const store = createStore();

  store.set(produce(actions.create));
  t.equal(Object.keys(store.current.entity.task).length, 1, 'adds task');

  t.end();
});

test('[task.title] updates title', t => {
  const store = createStore();
  const task: Task = { id: 'a', title: 'title' };
  store.set(produce(actions.set(task)));

  store.set(produce(actions.title(task.id)('b')));
  t.equal(store.current.entity.task[task.id].title, 'b', 'sets title');

  store.set(produce(actions.title(task.id)()));
  t.false(store.current.entity.task[task.id].title, 'removes title');

  t.end();
});

test('[task.done] set task done', t => {
  const store = createStore();
  const task: Task = { id: 'a', title: 'title' };
  store.set(produce(actions.set(task)));

  store.set(produce(actions.done(task.id)(true)));
  t.true(store.current.entity.task[task.id].done, 'true');

  store.set(produce(actions.done(task.id)(false)));
  t.false(store.current.entity.task[task.id].done, 'false');

  store.set(produce(actions.done(task.id)()));
  t.true(store.current.entity.task[task.id].done, 'invert');

  t.end();
});

test('[task.remove] removes task', t => {
  const store = createStore();
  const task: Task = { id: 'a' };
  store.set(produce(actions.set(task)));

  store.set(produce(actions.remove(task.id)));
  t.equal(Object.keys(store.current.entity.task).length, 0, 'removes task');

  t.end();
});
