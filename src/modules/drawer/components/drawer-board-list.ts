import type { Board } from '../../../state/schema.ts';

import { produce } from 'immer';
import h, { list } from '@chronocide/hyper';
import fde from 'fast-deep-equal';

import store, { subscribe } from '../../../state/store.ts';

import modal from './drawer-modal.ts';

const ul = h('ul')({ hidden: true })();
ul.addEventListener('click', event => {
  const target = (event.target as HTMLElement | null);
  const id = (target?.closest('button') ?? target)?.dataset.board;

  if (typeof id === 'string') {
    store.set(produce(draft => {
      draft.active = id;
    }));

    modal.close();
  }
}, { passive: true });

const update = list<Board>(board => h('li')()(
  h('button')({
    type: 'button',
    'data-board': board.id
  })(board.title)
))(ul);

subscribe((current, previous) => !fde(current.board, previous?.board))(current => {
  ul.toggleAttribute('hidden', Object.values(current.board).length === 0)
  update(Object.values(current.board));
});

export default ul;
