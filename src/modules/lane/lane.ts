import h, { list } from '@chronocide/hyper';

import store, { subscribe } from '../../state/store.ts';
import * as selector from '../../state/selector.ts';

import card from '../card/card.ts';

import cardButton from './components/lane-card-button.ts';
import { maybe } from '../../lib/fn.ts';

export default (id: string) => {
  const lane = selector.lane(store.state)(id);
  if (!lane) throw new Error(`Invalid lane id: ${id}`);

  const ol = h('ol')({ hidden: lane.cards.length === 0 })();
  const update = list(card)(ol);

  subscribe((current, previous) => (
    maybe(selector.lane)(previous)?.(id)?.cards.length !==
    selector.lane(current)(id)?.cards.length
  ))(current => {
    const cards = selector.lane(current)(id)?.cards ?? [];

    update(cards);
    ol.toggleAttribute('hidden', cards.length === 0);
  })

  update(lane.cards);

  return h('article')()(
    h('h3')()(lane.title),
    ol,
    cardButton(lane.id)
  );
};
