import type { State } from '../schema';
import type { Draft } from 'immer';

const set = (key: keyof State['active']) =>
  (id: string | null) =>
    (draft: Draft<State>) => {
      if (typeof id === 'string') {
        draft.active[key] = id;
      } else {
        delete draft.active[key];
      }
    };

export const board = set('board');
export const collapse = set('collapse');
