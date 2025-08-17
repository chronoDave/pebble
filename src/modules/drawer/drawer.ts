import h from '@chronocide/hyper';

import boardList from './components/drawer-board-list.ts';
import boardButton from './components/drawer-board-button.ts';
import modal from './components/drawer-modal.ts';

import './drawer.scss';

modal.classList.add('drawer');
modal.append(
  h('section')()(
    h('h2')()('Boards'),
    boardList,
    boardButton
  ),
  h('footer')()(
    h('p')()('Made by ', h('a')({ href: 'https://chronocide.neocities.org/' })('Chronocide'), '.'),
    h('p')()('Licensed under ', h('a')({ href: 'https://raw.githubusercontent.com/chronoDave/pebble/refs/heads/main/LICENSE' })('AGPL 3.0'), '.'),
    h('p')()('Source available on ', h('a')({ href: 'https://github.com/chronoDave/pebble' })('GitHub'), '.')
  )
);

export default modal;
