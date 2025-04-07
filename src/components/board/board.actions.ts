import type { Draft } from 'immer';
import type { State } from '../../store/schema';

import join from '../../lib/fn/join';
import uid from '../../lib/string/uid';
import * as entity from '../../store/actions/entity';

export const lane = (id: string) =>
  (draft: Draft<State>) => {
    const lane = uid();

    join(
      entity.set('lane')({ id: lane, cards: [], title: 'New lane' }),
      entity.push('board')('lanes')(id)(lane)
    )(draft);
  };

export const move = entity.move('board')('lanes');
