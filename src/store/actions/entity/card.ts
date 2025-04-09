import type { Draft } from 'immer';
import type { State } from '../../schema';

import * as entity from '../entity';

/** Removes card and associated tasks */
export const remove = (id: string) =>
  (draft: Draft<State>) => {
    draft.entity.card[id]?.tasks.forEach(task => {
      entity.remove('task')(task)(draft);
    });
    entity.remove('card')(id)(draft);
  };
