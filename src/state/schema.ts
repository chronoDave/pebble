import * as r from 'runtypes';

export const board = r.Record({
  id: r.String,
  title: r.String.optional()
});

export type Board = r.Static<typeof board>;

export const state = r.Record({
  board: r.Dictionary(board, r.String)
});

export type State = r.Static<typeof state>;
