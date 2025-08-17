import type { Lane } from '../../../state/schema.ts';

import h, { list } from '@chronocide/hyper';

import { subscribe } from '../../../state/store.ts';
import { maybe } from '../../../lib/fn.ts';
import * as selector from '../../../state/selector.ts';
import card from '../../card/card.ts';

export default (lane: Lane) => {
  const ol = h('ol')({ hidden: lane.cards.length === 0 })();
  const update = list(card)(ol);

  update(lane.cards); // Push cards into cache

  subscribe((current, previous) => (
    maybe(selector.lane)(previous)?.(lane.id)?.cards.length !==
    selector.lane(current)(lane.id)?.cards.length
  ))(current => {
    const cards = selector.lane(current)(lane.id)?.cards ?? [];

    update(cards);
    ol.toggleAttribute('hidden', cards.length === 0);
  })

  return ol;
};
