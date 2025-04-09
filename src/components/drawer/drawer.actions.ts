import type { Draft } from 'immer';
import type { State } from '../../store/schema';

import uid from '../../lib/string/uid';
import join from '../../lib/fn/join';
import * as entity from '../../store/actions/entity';
import * as active from '../../store/actions/active';

export const add = (draft: Draft<State>) => {
  const id = uid();

  join(
    entity.set('board')({
      id,
      title: 'New board',
      lanes: [],
      categories: []
    }),
    active.board(id)
  )(draft);
};
