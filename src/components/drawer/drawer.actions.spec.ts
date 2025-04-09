import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store/store.struct';

import * as actions from './drawer.actions';

test('[drawer-board.add] creates new board, sets board as active and closes drawer', t => {
  const store = createStore();

  store.set(produce(actions.add));
  const keys = Object.keys(store.current.entity.board);

  t.equal(keys.length, 1, 'creates new board');
  t.equal(keys[0], store.current.active.board, 'sets active');
  t.false(store.current.active.drawer, 'closes drawer');

  t.end();
});
