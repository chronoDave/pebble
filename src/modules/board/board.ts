import h, { list } from '@chronocide/hyper';

import * as selector from '../../state/selector.ts';
import store, { subscribe } from '../../state/store.ts';
import lane from '../lane/lane.ts';
import laneButton from './components/board-lane-button.ts';
import { maybe } from '../../lib/fn.ts';

export default (id: string) => {
  const board = selector.board(store.state)(id);
  if (!board) throw new Error(`Invalid board id: ${id}`);

  const ol = h('ol')({ hidden: board.lanes.length === 0 })();
  const update = list(lane)(ol);

  subscribe((current, previous) => (
    maybe(selector.board)(previous)?.(id)?.lanes.length !==
    selector.board(current)(id)?.lanes.length
  ))(current => {
    const lanes = selector.board(current)(id)?.lanes ?? [];

    update(lanes);
    ol.toggleAttribute('hidden', lanes.length === 0);
  })

  update(board.lanes);

  return h('article')()(
    h('h2')()(board.title),
    ol,
    laneButton
  );
};
