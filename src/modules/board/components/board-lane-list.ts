import type { Board } from '../../../state/schema.ts';

import h, { list } from '@chronocide/hyper';

import { subscribe } from '../../../state/store.ts';
import { maybe } from '../../../lib/fn.ts';
import * as selector from '../../../state/selector.ts';
import lane from '../../lane/lane.ts';

export default (board: Board) => {
  const ol = h('ol')({ hidden: board.lanes.length === 0 })();
  const update = list(lane)(ol);

  update(board.lanes); // Push lanes into cache

  subscribe((current, previous) => (
    maybe(selector.board)(previous)?.(board.id)?.lanes.length !==
    selector.board(current)(board.id)?.lanes.length
  ))(current => {
    const lanes = selector.board(current)(board.id)?.lanes ?? [];

    update(lanes);
    ol.toggleAttribute('hidden', lanes.length === 0);
  });

  return ol;
};
