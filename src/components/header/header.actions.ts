import type { Draft } from 'immer';
import type { State } from '../../store/schema';

import uid from '../../lib/string/uid';
import join from '../../lib/fn/join';
import * as active from '../../store/actions/active';
import * as entity from '../../store/actions/entity';

export const create = (draft: Draft<State>) => {
  const board = uid();
  const lane = uid();

  join(
    entity.set('board')({
      id: board,
      title: 'New board',
      categories: [],
      lanes: [lane]
    }),
    entity.set('lane')({ id: lane, title: 'New lane', cards: [] }),
    active.set('board')(board)
  )(draft);
};

export const remove = (draft: Draft<State>) => {
  const id = draft.active.board;
  if (typeof id === 'string') entity.remove('board')(id)(draft);

  const keys = Object.values(draft.entity.board);
  if (keys.length === 0) {
    create(draft);
  } else {
    active.set('board')(keys[keys.length - 1].id)(draft);
  }
};

export const open = active.set('drawer');
