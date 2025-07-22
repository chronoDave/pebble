import h from '@chronocide/hyper';

import { bars } from '../../components/icon/icon';
import { showDialog } from '../../lib/dom';
import buttonIcon from '../../components/button-icon/button-icon';

import './header.scss';

export default () => {
  const button = buttonIcon({
    icon: bars(),
    label: 'Navigation'
  });

  button.setAttribute('aria-haspopup', 'dialog');
  button.addEventListener('click', () => {
    showDialog('navigation');
  }, { passive: true });

  return h('header')()(
    h('h1')()('Pebble'),
    button
  );
};
