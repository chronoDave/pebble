import type { Board } from '../../../state/schema.ts';

import fde from 'fast-deep-equal';
import h, { Component, list } from '@chronocide/hyper';

import store from '../../../state/store.ts';

const ul = h('ul')({ hidden: true })(); 
const li: Component<Board> = board => h('li')()(board.title ?? 'New board');

const update = list<Board>(board => board.id)(li)(ul);

store.on(({ previous, current }) => {
  if (!fde(previous?.board, current.board)) {
    const boards = Object.values(current.board);

    ul.toggleAttribute('hidden', boards.length === 0)
    update(boards);
  }
});

export default ul;
