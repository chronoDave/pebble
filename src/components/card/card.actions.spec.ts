import test from 'tape';
import { produce } from 'immer';

import createStore from '../../store/store.fixture';

import * as actions from './card.actions';

test('[card.title] sets / removes card title', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.card.a = { id: 'a', tasks: [], categories: [] };
  }));

  store.set(produce(actions.title('a')('title')));
  t.equal(store.current.entity.card.a?.title, 'title', 'sets title');

  store.set(produce(actions.title('a')()));
  t.false(store.current.entity.card.a?.title, 'removes title');

  t.end();
});

test('[card.description] sets / removes card description', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.card.a = { id: 'a', tasks: [], categories: [] };
  }));

  store.set(produce(actions.description('a')('description')));
  t.equal(store.current.entity.card.a?.description, 'description', 'sets description');

  store.set(produce(actions.description('a')()));
  t.false(store.current.entity.card.a?.description, 'removes description');

  t.end();
});

test('[card.category.pull] pulls category from card', t => {
  const store = createStore();

  store.set(produce(draft => {
    draft.entity.card.a = { id: 'a', tasks: [], categories: ['a'] };
    draft.entity.category.a = { id: 'a' };
  }));

  store.set(produce(actions.category('a').pull('a')));
  t.equal(Object.keys(store.current.entity.category).length, 1, 'does not remove category');
  t.equal(store.current.entity.card.a?.categories.length, 0, 'removes category from card');

  t.end();
});
