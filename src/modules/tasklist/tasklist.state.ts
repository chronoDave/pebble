import type { Card, Task } from '../../store/entities';

import { produce } from 'immer';

import store, { selector } from '../../store/store';
import * as actions from '../../store/actions';
import uid from '../../lib/uid/uid';

export default selector<string, Card | null>(
  state => id => state?.entity.card[id] ?? null
);

export const createTask = (card: string) => {
  const task: Task = { id: uid(), title: 'New task' };

  store.set(produce(draft => {
    actions.card.addTask(card)(task.id)(draft);
    actions.task.create(task)(draft);
  }));
};

export const toggleTaskDone = (task: string) => {
  store.set(produce(actions.task.toggleDone(task)));
};

export const removeTask = (card: string) =>
  (task: string) => {
    store.set(produce(actions.card.removeTask(card)(task)));
  };
