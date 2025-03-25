import type { Draft } from 'immer';
import type { State, Task } from '../schema';

export const create = (task: Task) =>
  (draft: Draft<State>) => {
    draft.entity.task[task.id] = task;
  };

export const title = (id: string) =>
  (title: string | null) =>
    (draft: Draft<State>) => {
      draft.entity.task[id].title = title;
    };

export const done = (id: string) =>
  (done?: boolean) =>
    (draft: Draft<State>) => {
      draft.entity.task[id].done = typeof done === 'boolean' ?
        done :
        !draft.entity.task[id].done;
    };

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    delete draft.entity.task[id];
  };
