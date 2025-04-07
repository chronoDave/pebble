import type { Draft } from 'immer';
import type { State } from '../../store/schema';

import * as entity from '../../store/actions/entity';
import join from '../../lib/fn/join';

export const title = entity.string('card')('title');
export const description = entity.string('card')('description');

export const category = (id: string) => ({
  remove: (category: string) =>
    (draft: Draft<State>) => {
      join(
        entity.remove('category')(category),
        entity.pull('card')('categories')(id)(category)
      )(draft);
    }
});
