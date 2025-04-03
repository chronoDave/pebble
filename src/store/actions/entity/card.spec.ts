import type { Card } from '../../schema';

import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store.struct';
import * as actions from './card';

test('[card.set] sets card', t => {
  const store = createStore();
  const card: Card = { id: 'a', categories: [], tasks: [] };

  store.set(produce(actions.set(card)));
  t.deepEqual(store.current.entity.card[card.id], card, 'sets card');

  t.end();
});

test('[card.create] creates new card', t => {
  const store = createStore();

  store.set(produce(actions.create));
  t.equal(Object.keys(store.current.entity.card).length, 1, 'adds card');

  t.end();
});

test('[card.title] updates title', t => {
  const store = createStore();
  const card: Card = { id: 'a', title: 'title', categories: [], tasks: [] };
  store.set(produce(actions.set(card)));

  store.set(produce(actions.title(card.id)('b')));
  t.equal(store.current.entity.card[card.id].title, 'b', 'sets title');

  store.set(produce(actions.title(card.id)()));
  t.false(store.current.entity.card[card.id].title, 'removes title');

  t.end();
});

test('[card.description] updates description', t => {
  const store = createStore();
  const card: Card = { id: 'a', description: 'description', categories: [], tasks: [] };
  store.set(produce(actions.set(card)));

  store.set(produce(actions.description(card.id)('b')));
  t.equal(store.current.entity.card[card.id].description, 'b', 'sets description');

  store.set(produce(actions.description(card.id)()));
  t.false(store.current.entity.card[card.id].description, 'removes description');

  t.end();
});

test('[card.remove] removes card', t => {
  const store = createStore();
  const card: Card = { id: 'a', categories: [], tasks: [] };
  store.set(produce(actions.set(card)));

  store.set(produce(actions.remove(card.id)));
  t.equal(Object.keys(store.current.entity.card).length, 0, 'removes card');

  t.end();
});
