import h from '@chronocide/hyper';

import store from '../../state/store.ts';
import * as selector from '../../state/selector.ts';

import cardAdd from './components/lane-card-add.ts';
import listCard from '../list/list-card.ts';

import './lane.scss';

export default (id: string) => {
  const lane = selector.lane(store.state)(id);
  if (!lane) throw new Error(`Invalid lane id: ${id}`);

  return h('article')({ id, class: 'lane' })(
    h('h3')()(lane.title),
    listCard(lane),
    cardAdd(lane.id)
  );
};
