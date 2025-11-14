import h from '@chronocide/hyper';
import { produce } from 'immer';

import store from '../../state/store.ts';
import * as create from '../../state/actions/create.ts';

import modal from '../../components/modal/modal.ts';
import { plus } from '../../components/icon/icon.ts';

import listBoard from './drawer-list-board.ts';

import './drawer.scss';

const drawer = modal({ title: 'Pebble' });

const addBoard = h('button')({ type: 'button' })(plus(), 'Add board');
addBoard.addEventListener('click', () => {
  store.set(produce(create.board));
}, { passive: true });

listBoard.addEventListener('click', event => {
  const target = event.target as HTMLElement | null;
  const id = (target?.closest('button') ?? target)?.dataset.board;

  if (typeof id !== 'string') return;
  store.set(produce(draft => {
    draft.active = id;
  }));

  drawer.close();
}, { passive: true });

drawer.classList.add('drawer');
drawer.append(
  h('section')()(
    h('h2')()('Boards'),
    listBoard,
    addBoard
  ),
  h('footer')()(
    h('p')()('Made by ', h('a')({ href: 'https://chronocide.neocities.org/' })('Chronocide'), '.'),
    h('p')()('Licensed under ', h('a')({ href: 'https://raw.githubusercontent.com/chronoDave/pebble/refs/heads/main/LICENSE' })('AGPL 3.0'), '.'),
    h('p')()('Source available on ', h('a')({ href: 'https://github.com/chronoDave/pebble' })('GitHub'), '.')
  )
);

export default drawer;
