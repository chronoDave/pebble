import h from '@chronocide/hyper';

import { bars } from '../../components/icon/icon';
import { showDialog } from '../../lib/dom';

import './header.scss';

export default () => {
  const button = h('button')({
    'type': 'button',
    'aria-haspopup': 'dialog',
    'class': 'icon'
  })(
    bars(),
    h('span')({ class: 'sr-only' })('Navigation')
  );

  button.addEventListener('click', () => {
    showDialog('navigation');
  }, { passive: true });

  return h('header')()(
    h('h1')()('Pebble'),
    button
  );
};
