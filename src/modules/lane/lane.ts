import h from '@chronocide/hyper';
import { produce } from 'immer';

import store from '../../state/store.ts';
import * as create from '../../state/actions/create.ts';
import * as selector from '../../state/selector.ts';

import { plus } from '../../components/icon/icon.ts';

import listCard from './lane-list-card.ts';

import './lane.scss';

export default (id: string) => {
  const lane = selector.lane(store.state)(id);
  if (!lane) throw new Error(`Invalid lane id: ${id}`);

  const addCard = h('button')({ type: 'button' })(plus(), 'Add card');
  addCard.addEventListener('click', () => {
    store.set(produce(create.card(id)));
  }, { passive: true });

  return h('article')({ id, class: 'lane' })(
    h('h3')()(lane.title),
    listCard(lane),
    addCard
  );
};
