import type { Draft } from 'immer';
import type { State } from '../../../store/schema';

import * as actions from '../../../store/actions/entity/board';
import { board, drawer } from '../../../store/actions/active';
import join from '../../../lib/fn/join';

export const remove = (id: string) =>
  (draft: Draft<State>) => {
    actions.remove(id)(draft);

    const next = Object.keys(draft.entity.board).pop();
    if (typeof next === 'string') board(next)(draft);
  };

export const active = (id: string) =>
  (draft: Draft<State>) => {
    join(
      board(id),
      drawer(false)
    )(draft);
  };
