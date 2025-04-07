import type { Draft } from 'immer';
import type { State } from '../../store/schema';

import * as entity from '../../store/actions/entity';
import uid from '../../lib/string/uid';
import join from '../../lib/fn/join';

export const title = entity.string('lane')('title');

export const card = (id: string) => ({
  unshift: (draft: Draft<State>) => {
    const card = uid();

    join(
      entity.set('card')({
        id: card,
        title: 'New card',
        tasks: [],
        categories: []
      }),
      entity.unshift('lane')('cards')(id)(card)
    )(draft);
  },
  push: (draft: Draft<State>) => {
    const card = uid();

    join(
      entity.set('card')({
        id: card,
        title: 'New card',
        tasks: [],
        categories: []
      }),
      entity.push('lane')('cards')(id)(card)
    )(draft);
  },
  remove: (card: string) =>
    (draft: Draft<State>) => {
      join(
        entity.remove('card')(card),
        entity.pull('lane')('cards')(id)(card)
      )(draft);
    }
});
