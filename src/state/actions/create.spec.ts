import type { State } from '../schema.ts';

import test from 'node:test';
import { produce } from 'immer';

import Store from '../../lib/store.ts';
import * as selector from '../selector.ts';

import * as create from './create.ts';

const state: State = {
  board: {},
  lane: {},
  card: {}
};

test('[create.board] creates card', t => {
  const store = new Store(state);

  store.set(produce(create.board));

  t.assert.equal(Object.keys(store.state.board).length, 1);
});

test('[create.lane] creates lane', t => {
  const store = new Store(state);

  store.set(produce(create.board));
  const board = Object.keys(store.state.board)[0];
  store.set(produce(create.lane(board)))

  t.assert.equal(Object.keys(store.state.lane).length, 1);
  t.assert.equal(selector.board(store.state)(board)?.lanes.length, 1, 'adds lane to board');
});

test('[create.lane] creates lane', t => {
  const store = new Store(state);

  store.set(produce(create.board));
  const board = Object.keys(store.state.board)[0];
  store.set(produce(create.lane(board)))

  t.assert.equal(Object.keys(store.state.lane).length, 1);
  t.assert.equal(selector.board(store.state)(board)?.lanes.length, 1, 'adds lane to board');
});

test('[create.card] creates card', t => {
  const store = new Store(state);

  store.set(produce(create.board));
  const board = Object.keys(store.state.board)[0];
  store.set(produce(create.lane(board)));
  const lane = Object.keys(store.state.lane)[0];
  store.set(produce(create.card(lane)));

  t.assert.equal(Object.keys(store.state.card).length, 1);
  t.assert.equal(selector.lane(store.state)(lane)?.cards.length, 1, 'adds card to lane');
});
