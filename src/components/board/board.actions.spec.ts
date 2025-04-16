import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store/store.fixture';

import * as actions from './board.actions';

test('[board.lane] creates new lane', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.board.a = { id: 'a', lanes: [], categories: [] };
  }));

  store.set(produce(actions.lane('a')));

  const lanes = Object.keys(store.current.entity.lane);

  t.equal(lanes.length, 1, 'creates lane');
  t.true(store.current.entity.board.a?.lanes.includes(lanes[0]), 'board has lane');

  t.end();
});

test('[board.move] moves lanes', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.board.a = { id: 'a', lanes: ['a', 'b'], categories: [] };
    draft.entity.lane.a = { id: 'a', cards: [] };
    draft.entity.lane.b = { id: 'b', cards: [] };
  }));

  store.set(produce(actions.move('a')('b')(0)));

  t.deepEqual(store.current.entity.board.a?.lanes, ['b', 'a'], 'moves lanes');

  t.end();
});
