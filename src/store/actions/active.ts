import type { Draft } from 'immer';
import type { State } from '../schema';

export const board = (id?: string) =>
  (draft: Draft<State>) => {
    if (typeof id === 'string') {
      draft.active.board = id;
    } else {
      delete draft.active.board;
    }
  };
