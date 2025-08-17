import type { Lane } from '../../../state/schema.ts';

import h, { list } from '@chronocide/hyper';

import store from '../../../state/store.ts';
import * as selector from '../../../state/selector.ts';

const ol = h('ol')({ hidden: true })();

const update = list<Lane>(lane => h('li')()(lane.title))(ol);
store.on(({ current }) => {
  const board = selector.board(current);

  update(board?.lanes.reduce<Lane[]>((acc, cur) => {
    const lane = current.lane[cur] as Lane | undefined;
    if (lane) acc.push(lane);

    return acc;
  }, []) ?? []);
  ol.toggleAttribute('hidden', board?.lanes.length === 0)
});

export default ol;
