import type { Board, State } from './schema.ts';

export const board = (state: State): Board | null => {
  if (typeof state.active !== 'string') return null;
  return state.board[state.active];
};
