import type { Task } from '../schema';

import { produce } from 'immer';
import test from 'tape';

import Store from '../../lib/store/store';
import uid from '../../lib/string/uid';
import state from '../state';

import {
  create,
  title,
  done,
  remove
} from './task';

test('[task.create] creates task', t => {
  const store = new Store(state);
  const task: Task = { id: uid(), card: uid() };

  store.set(produce(create(task)));

  t.deepEqual(store.current.entity.task[task.id], task, 'creates task');

  t.end();
});

test('[task.setTitle] set task title', t => {
  const store = new Store(state);
  const task: Task = { id: uid(), card: uid() };

  store.set(produce(create(task)));
  store.set(produce(title(task.id)('2')));

  t.equal(store.current.entity.task[task.id].title, '2', 'sets task title');

  t.end();
});

test('[task.setDone] set task done', t => {
  const store = new Store(state);
  const task: Task = { id: uid(), card: uid() };

  store.set(produce(create(task)));

  store.set(produce(done(task.id)(true)));
  t.true(store.current.entity.task[task.id].done, 'true');

  store.set(produce(done(task.id)(false)));
  t.false(store.current.entity.task[task.id].done, 'false');

  store.set(produce(done(task.id)()));
  t.true(store.current.entity.task[task.id].done, 'invert');

  t.end();
});

test('[task.remove] removes task', t => {
  const store = new Store(state);
  const task: Task = { id: uid(), card: uid() };

  store.set(produce(create(task)));
  t.true(store.current.entity.task[task.id], 'has task');
  store.set(produce(remove(task.id)));
  t.false(store.current.entity.task[task.id], 'does not have task');

  t.end();
});

