import type { Draft } from 'immer';
import type { State } from '../../store/schema';

import uid from '../../lib/string/uid';
import join from '../../lib/fn/join';
import * as active from '../../store/actions/active';
import * as entity from '../../store/actions/entity';

/** Creates new active board with lane */
export const create = (draft: Draft<State>) => {
  const board = uid();
  const lane = uid();

  join(
    entity.set('board')({
      id: board,
      title: 'New board',
      categories: [],
      lanes: [lane]
    }),
    entity.set('lane')({ id: lane, title: 'New lane', cards: [] }),
    active.set('board')(board)
  )(draft);
};

/** Opens drawer */
export const open = active.set('drawer')('drawer');

/** Sets board background */
export const background = entity.string('board')('background');

/** Removes board */
export const remove = entity.remove('board');
