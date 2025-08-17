import h from '@chronocide/hyper';

import drawerButton from './components/header-drawer-button.ts';

import './header.scss';

export default h('header')()(
  h('h1')()('Pebble'),
  drawerButton
);
