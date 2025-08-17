import * as r from 'runtypes';

export const lane = r.Record({
  id: r.String,
  title: r.String
});

export type Lane = r.Static<typeof lane>;

export const board = r.Record({
  id: r.String,
  title: r.String,
  lanes: r.Array(r.String)
});

export type Board = r.Static<typeof board>;

export const state = r.Record({
  active: r.String.optional(), // Active board
  board: r.Dictionary(board, r.String),
  lane: r.Dictionary(lane, r.String),
});

export type State = r.Static<typeof state>;
