import type { Lane } from '../../schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';
import * as actions from './lane';

test('[lane.set] sets lane', t => {
  const store = createStore();
  const lane: Lane = { id: 'a' };

  store.set(produce(actions.set(lane)));
  t.deepEqual(store.current.entity.lane[lane.id], lane, 'sets lane');

  t.end();
});

test('[lane.create] creates new lane', t => {
  const store = createStore();

  store.set(produce(actions.create));
  t.equal(Object.keys(store.current.entity.lane).length, 1, 'adds lane');

  t.end();
});

test('[lane.title] updates title', t => {
  const store = createStore();
  const lane: Lane = { id: 'a', title: 'title' };
  store.set(produce(actions.set(lane)));

  store.set(produce(actions.title(lane.id)('b')));
  t.equal(store.current.entity.lane[lane.id].title, 'b', 'sets title');

  store.set(produce(actions.title(lane.id)()));
  t.false(store.current.entity.lane[lane.id].title, 'removes title');

  t.end();
});

test('[lane.remove] removes lane', t => {
  const store = createStore();
  const lane: Lane = { id: 'a' };
  store.set(produce(actions.set(lane)));

  store.set(produce(actions.remove(lane.id)));
  t.equal(Object.keys(store.current.entity.lane).length, 0, 'removes lane');

  t.end();
});
