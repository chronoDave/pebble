import type { Board } from '../../schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';
import * as actions from './board';

test('[board.set] sets board', t => {
  const store = createStore();
  const board: Board = { id: 'a' };

  store.set(produce(actions.set(board)));
  t.deepEqual(store.current.entity.board[board.id], board, 'sets board');

  t.end();
});

test('[board.create] creates new board', t => {
  const store = createStore();

  store.set(produce(actions.create));
  t.equal(Object.keys(store.current.entity.board).length, 1, 'adds board');

  t.end();
});

test('[board.title] updates title', t => {
  const store = createStore();
  const board: Board = { id: 'a', title: 'title' };
  store.set(produce(actions.set(board)));

  store.set(produce(actions.title(board.id)('b')));
  t.equal(store.current.entity.board[board.id].title, 'b', 'sets title');

  store.set(produce(actions.title(board.id)()));
  t.false(store.current.entity.board[board.id].title, 'removes title');

  t.end();
});

test('[board.background] updates background', t => {
  const store = createStore();
  const board: Board = { id: 'a', background: 'background' };
  store.set(produce(actions.set(board)));

  store.set(produce(actions.background(board.id)('b')));
  t.equal(store.current.entity.board[board.id].background, 'b', 'sets background');

  store.set(produce(actions.background(board.id)()));
  t.false(store.current.entity.board[board.id].background, 'removes background');

  t.end();
});

test('[board.remove] removes board', t => {
  const store = createStore();
  const board: Board = { id: 'a' };
  store.set(produce(actions.set(board)));

  store.set(produce(actions.remove(board.id)));
  t.equal(Object.keys(store.current.entity.board).length, 0, 'removes board');

  t.end();
});
