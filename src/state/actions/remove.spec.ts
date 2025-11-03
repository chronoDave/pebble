import type { State } from '../schema.ts';

import test from 'node:test';
import assert from 'node:assert/strict';
import { produce } from 'immer';

import Store from '../../lib/store.ts';

import * as create from './create.ts';
import * as remove from './remove.ts';

const state: State = {
  board: {},
  lane: {},
  card: {}
};

test('[remove.board] removes board', () => {
  const store = new Store(state);
  

  store.set(produce(create.board));
  store.set(produce(create.board));
  const board = Object.keys(store.state.board)[0];
  store.set(produce(draft => { draft.active = board }));

  store.set(produce(remove.board(board)));

  assert.equal(Object.keys(store.state.board).length, 1, 'board');
  assert.ok(!store.state.active, 'active');
});

test('[remove.lane] removes lane', () => {
  const store = new Store(state);

  store.set(produce(create.board));
  const board = Object.keys(store.state.board)[0];
  store.set(produce(create.lane(board)));
  store.set(produce(create.lane(board)));
  const lane = Object.keys(store.state.lane)[0];

  store.set(produce(remove.lane(lane)));

  assert.equal(Object.keys(store.state.lane).length, 1, 'lane');
  assert.equal(store.state.board[board].lanes.length, 1, 'board lane');
});

test('[remove.card] removes card', () => {
  const store = new Store(state);

  store.set(produce(create.board));
  const board = Object.keys(store.state.board)[0];
  store.set(produce(create.lane(board)));
  const lane = Object.keys(store.state.lane)[0];
  store.set(produce(create.card(lane)));
  store.set(produce(create.card(lane)));
  const card = Object.keys(store.state.card)[0];

  store.set(produce(remove.card(card)));

  assert.equal(Object.keys(store.state.card).length, 1, 'card');
  assert.equal(store.state.lane[lane].cards.length, 1, 'lane card');
});
