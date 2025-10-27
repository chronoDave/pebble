import type { Lane } from '../../state/schema.ts';

import h, { list } from '@chronocide/hyper';

import { subscribe } from '../../state/store.ts';
import * as selector from '../../state/selector.ts';
import { maybe } from '../../lib/fn.ts';

import card from '../card/card.ts';

import './list-card.scss';

export default (lane: Lane) => {
  const item = (id: string) => h('li')()(card(id));

  const ol = h('ol')({
    'hidden': lane.cards.length === 0,
    'data-type': 'card'
  })(...lane.cards.map(item));

  const update = list(item)(ol);

  subscribe((cur, prev) => 
    maybe(selector.lane)(prev)?.(lane.id)?.cards.length !==
    selector.lane(cur)(lane.id)?.cards.length
  )(cur => {
    const cards = selector.lane(cur)(lane.id)?.cards ?? [];

    update(cards);
    ol.toggleAttribute('hidden', cards.length === 0);
  });

  return ol;
};
