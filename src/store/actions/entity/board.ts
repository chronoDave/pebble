import type { Draft } from 'immer';
import type { State } from '../../schema';

import * as entity from '../entity';
import * as lane from './lane';

/** Removes board and associated lanes, categories, cards and tasks */
export const remove = (id: string) =>
  (draft: Draft<State>) => {
    draft.entity.board[id]?.lanes.forEach(x => {
      lane.remove(x)(draft);
    });
    draft.entity.board[id]?.categories.forEach(x => {
      entity.remove('category')(x)(draft);
    });
    entity.remove('board')(id)(draft);
  };
