import h from '@chronocide/hyper';

import buttonIcon from '../../components/button/button-icon.ts';
import { bars } from '../../components/icon/icon.ts';
import drawer from '../drawer/drawer.ts';

import './header.scss';

const openDrawer = buttonIcon(bars())('Navigation');
openDrawer.setAttribute('aria-haspopup', 'dialog');
openDrawer.addEventListener('click', () => {
  drawer.showModal();
}, { passive: true });

const header = h('header')()(
  h('h1')()('Pebble'),
  openDrawer
);

export default header;
