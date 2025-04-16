import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store/store.fixture';

import * as actions from './lane.actions';

test('[lane.title] sets / deletes lane title', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.lane.a = { id: 'a', cards: [] };
  }));

  store.set(produce(actions.title('a')('title')));
  t.equal(store.current.entity.lane.a?.title, 'title', 'sets title');

  store.set(produce(actions.title('a')()));
  t.false(store.current.entity.lane.a?.title, 'removes title');

  t.end();
});

test('[lane.card.unshift] creates new card and adds to start of lane', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.lane.a = { id: 'a', cards: ['0'] };
  }));

  store.set(produce(actions.card('a').unshift));
  t.equal(Object.keys(store.current.entity.card).length, 1, 'creates card');
  t.equal(store.current.entity.lane.a?.cards.length, 2, 'adds card to lane');
  t.equal(store.current.entity.lane.a?.cards[1], '0', 'unshifts card to lane');

  t.end();
});

test('[lane.card.push] creates new card and adds to end of lane', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.lane.a = { id: 'a', cards: ['0'] };
  }));

  store.set(produce(actions.card('a').push));
  t.equal(Object.keys(store.current.entity.card).length, 1, 'creates card');
  t.equal(store.current.entity.lane.a?.cards.length, 2, 'adds card to lane');
  t.equal(store.current.entity.lane.a?.cards[0], '0', 'pushes card to lane');

  t.end();
});

test('[lane.card.remove]', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.card['0'] = { id: '0', tasks: [], categories: [] };
    draft.entity.lane.a = { id: 'a', cards: ['0'] };
  }));

  store.set(produce(actions.card('a').remove('0')));
  t.equal(Object.keys(store.current.entity.card).length, 0, 'removes card');
  t.equal(store.current.entity.lane.a?.cards.length, 0, 'removes card from lane');

  t.end();
});
