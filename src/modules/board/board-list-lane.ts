import type { Board } from '../../state/schema.ts';

import h, { list } from '@chronocide/hyper';

import { subscribe } from '../../state/store.ts';
import * as selector from '../../state/selector.ts';
import { maybe } from '../../lib/fn.ts';

import lane from '../lane/lane.ts';

import './board-list-lane.scss';

export default (board: Board) => {
  const item = (id: string) => h('li')()(lane(id));

  const ol = h('ol')({
    'hidden': board.lanes.length === 0,
    'data-type': 'lane'
  })(...board.lanes.map(item));

  const update = list(item)(ol);

  subscribe((cur, prev) => 
    maybe(selector.board)(prev)?.(board.id)?.lanes.length !==
    selector.board(cur)(board.id)?.lanes.length
  )(cur => {
    const lanes = selector.board(cur)(board.id)?.lanes ?? [];

    update(lanes);
    ol.toggleAttribute('hidden', lanes.length === 0);
  });

  return ol;
};
