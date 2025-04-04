import type { Draft } from 'immer';
import type { State } from '../schema';

/** Set or remove active id */
export const set = (key: keyof State['active']) =>
  (id?: string) =>
    (draft: Draft<State>) => {
      if (typeof id === 'string') {
        draft.active[key] = id;
      } else {
        delete draft.active[key];
      }
    };
