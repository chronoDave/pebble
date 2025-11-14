import type { Board } from '../../state/schema.ts';

import h, { list } from '@chronocide/hyper';
import deepEqual from 'fast-deep-equal';

import store, { subscribe } from '../../state/store.ts';

const boards = Object.values(store.state.board);

const li = (board: Board) => h('li')()(
  h('button')({
    'type': 'button',
    'data-board': board.id
  })(board.title)
);

const ol = h('ol')({ hidden: boards.length === 0 })(...boards.map(li));

const update = list<Board>(li)(ol);

subscribe((cur, prev) => !deepEqual(cur.board, prev?.board))(cur => {
  const next = Object.values(cur.board);

  ol.toggleAttribute('hidden', next.length === 0);
  update(next);
});

export default ol;
