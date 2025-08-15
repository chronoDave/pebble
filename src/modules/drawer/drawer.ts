import h from '@chronocide/hyper';

import modal from '../../components/modal/modal.ts';

import listBoard from './components/list-board.ts';
import buttonBoard from './components/button-board.ts';

import './drawer.scss';

const drawer = modal({ title: 'Pebble' });

drawer.classList.add('drawer');
drawer.append(
  h('section')()(
    h('h2')()('Boards'),
    listBoard,
    buttonBoard
  ),
  h('footer')()(
    h('p')()('Made by ', h('a')({ href: 'https://chronocide.neocities.org/' })('Chronocide'), '.'),
    h('p')()('Licensed under ', h('a')({ href: 'https://raw.githubusercontent.com/chronoDave/pebble/refs/heads/main/LICENSE' })('AGPL 3.0'), '.'),
    h('p')()('Source available on ', h('a')({ href: 'https://github.com/chronoDave/pebble' })('GitHub'), '.')
  )
);

export default drawer;
