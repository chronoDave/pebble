import h from '@chronocide/hyper';

import { bars } from '../../components/icon/icon.ts';
import buttonIcon from '../../components/button-icon/button-icon.ts';
import drawer from '../drawer/drawer.ts';

import './header.scss';

const button = buttonIcon({
  icon: bars(),
  label: 'Navigation'
});

button.setAttribute('aria-haspopup', 'dialog');
button.addEventListener('click', () => drawer.showModal(), { passive: true });

export default h('header')()(
  h('h1')()('Pebble'),
  button
);
