import type { Draft } from 'immer';
import type { State } from '../schema';

export const set = (key: keyof State['active']) =>
  (id?: string) =>
    (draft: Draft<State>) => {
      if (typeof id === 'string') {
        draft.active[key] = id;
      } else {
        delete draft.active[key];
      }
    };

export const board = set('board');
export const collapse = set('collapse');
export const drawer = set('drawer');
