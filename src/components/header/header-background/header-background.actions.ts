import type { Draft } from 'immer';

import * as entity from '../../../store/actions/entity';
import type { State } from '../../../store/schema';

export const set = (bg: string | null) =>
  (draft: Draft<State>) => {
    const id = draft.active.board;
    if (typeof id === 'string') {
      entity.string('board')('background')(id)(bg ?? undefined)(draft);
    }
  };

export const remove = (draft: Draft<State>) => {
  const id = draft.active.board;
  if (typeof id === 'string') entity.string('board')('background')(id)()(draft);
};
