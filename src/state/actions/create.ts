import type { Draft } from 'immer';
import type { State } from '../schema.ts';

import { uid } from '../../lib/string.ts';

export const card = (lane: string) =>
  (draft: Draft<State>): void => {
    const id = uid();

    draft.card[id] = { id, title: 'New card' };
    draft.lane[lane].cards.push(id);
  };

export const lane = (board: string) =>
  (draft: Draft<State>): void => {
    const id = uid();

    draft.lane[id] = { id, title: 'New lane', cards: [] };
    draft.board[board].lanes.push(id);
  };

export const board = (draft: Draft<State>): void => {
  const id = uid();

  draft.board[id] = { id, title: 'New board', lanes: [] };
}
