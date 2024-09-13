import * as _board from './actions/board';
import * as _card from './actions/card';
import * as _lane from './actions/lane';
import * as _active from './actions/active';
import * as _move from './actions/move';

import store from './store';

export const board = {
  create: _board.create(store),
  update: _board.update(store),
  delete: _board.remove(store)
};

export const card = {
  create: _card.create(store),
  update: _card.update(store),
  delete: _card.remove(store)
};

export const lane = {
  create: _lane.create(store),
  update: _lane.update(store),
  delete: _lane.remove(store)
};

export const active = {
  board: _active.set(store)('board')
};

export const move = {
  card: _move.card(store)
};
