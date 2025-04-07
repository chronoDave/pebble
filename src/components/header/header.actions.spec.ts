import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store/store.struct';

import * as actions from './header.actions';

test('[header.create] creates new active board with lane', t => {
  const store = createStore();

  store.set(produce(actions.create));

  const boards = Object.keys(store.current.entity.board);
  t.equal(boards.length, 1, 'has board');
  t.equal(store.current.active.board, boards[0], 'is active');

  const lanes = Object.keys(store.current.entity.lane);
  t.equal(lanes.length, 1, 'has lane');

  const board = store.current.entity.board[boards[0]];
  t.true(board.lanes.includes(lanes[0]), 'board has lane');

  t.end();
});

test('[header.background] sets and removes board background', t => {
  const store = createStore();
  store.set(produce(actions.create));

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const id = store.current.active.board!;

  store.set(produce(actions.background('bg')));
  t.equal(store.current.entity.board[id].background, 'bg', 'sets background');

  store.set(produce(actions.background()));
  t.false(store.current.entity.board[id].background, 'removes background');

  t.end();
});

test('[header.remove] removes active board', t => {
  const store = createStore();
  store.set(produce(actions.create));

  store.set(produce(actions.remove));
  t.equal(Object.keys(store.current.entity.board).length, 0, 'deletes board');
  t.false(store.current.active.board, 'removes active');

  t.end();
});
