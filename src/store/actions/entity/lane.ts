import type { Draft } from 'immer';
import type { State } from '../../schema';

import * as entity from '../entity';
import * as card from './card';

/** Removes board and associated lanes, cards and tasks */
export const remove = (id: string) =>
  (draft: Draft<State>) => {
    draft.entity.lane[id]?.cards.forEach(x => {
      card.remove(x)(draft);
    });
    entity.remove('lane')(id)(draft);
  };
