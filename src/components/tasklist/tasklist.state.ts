import { produce } from 'immer';

import store, { selector } from '../../store/store';
import * as actions from '../../store/actions';
import uid from '../../lib/string/uid';

export default selector<string, string[]>(
  state => id => Object.values(state?.entity.task ?? {})
    .reduce<string[]>((acc, cur) => {
      if (cur.card === id) acc.push(cur.id);

      return acc;
    }, []),
  ({ previous, current }) =>
    Object.keys(previous?.entity.task ?? {}).length !==
    Object.keys(current.entity.task).length
);

export const create = (card: string) => {
  store.set(produce(actions.task.create({
    id: uid(),
    card,
    title: 'New task'
  })));
};

export const done = (task: string) => {
  store.set(produce(actions.task.done(task)()));
};

export const remove = (task: string) => {
  store.set(produce(actions.task.remove(task)));
};
