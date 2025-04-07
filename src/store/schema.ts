import * as r from 'runtypes';

export const category = r.Record({
  id: r.String,
  title: r.String.optional(),
  colour: r.Record({
    background: r.String.optional(),
    text: r.String.optional()
  }).optional()
});

export type Category = r.Static<typeof category>;

export const task = r.Record({
  id: r.String,
  done: r.Boolean.optional(),
  title: r.String.optional()
});

export type Task = r.Static<typeof task>;

export const card = r.Record({
  id: r.String,
  title: r.String.optional(),
  description: r.String.optional(),
  tasks: r.Array(r.String),
  categories: r.Array(r.String)
});

export type Card = r.Static<typeof card>;

export const lane = r.Record({
  id: r.String,
  title: r.String.optional(),
  cards: r.Array(r.String)
});

export type Lane = r.Static<typeof lane>;

export const board = r.Record({
  id: r.String,
  title: r.String.optional(),
  background: r.String.optional(),
  lanes: r.Array(r.String),
  categories: r.Array(r.String)
});

export type Board = r.Static<typeof board>;

export const state = r.Record({
  entity: r.Record({
    board: r.Dictionary(board, r.String),
    lane: r.Dictionary(lane, r.String),
    card: r.Dictionary(card, r.String),
    task: r.Dictionary(task, r.String),
    category: r.Dictionary(category, r.String)
  }),
  active: r.Record({
    board: r.String.optional(),
    drawer: r.String.optional()
  })
});

export type State = r.Static<typeof state>;
