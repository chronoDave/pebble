import type { Draft } from 'immer';

import * as entity from '../../../store/actions/entity';
import type { State } from '../../../store/schema';

export const background = (background?: string) =>
  (draft: Draft<State>) => {
    const id = draft.active.board;
    if (typeof id === 'string') entity.string('board')('background')(id)(background)(draft);
  };
