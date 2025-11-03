import type { Draft } from 'immer';
import type { State } from '../schema.ts';

export const card = (id: string) =>
  (draft: Draft<State>): void => {
    const card = draft.card[id];

    delete draft.card[id];
    draft.lane[card.lane].cards = draft.lane[card.lane].cards
      .filter(card => card !== id);
  }

export const lane = (id: string) =>
  (draft: Draft<State>): void => {
    const lane = draft.lane[id];
    
    delete draft.lane[id];
    draft.board[lane.board].lanes = draft.board[lane.board].lanes
      .filter(lane => lane !== id);
  }

export const board = (id: string) =>
  (draft: Draft<State>): void => {
    delete draft.board[id];
    if (draft.active === id) delete draft.active;
  }
