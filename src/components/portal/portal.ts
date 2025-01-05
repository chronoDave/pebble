import * as forgo from 'forgo';
import { deepFocus } from '../../lib/focus/focus';

import './portal.scss';

export type PortalOptions = {
  anchor?: Element | null;
};

export default (element: forgo.ForgoNode, options?: PortalOptions) => {
  const anchor = options?.anchor ?? document.body;
  const root = document.createElement('div');
  root.classList.add('portal');

  const unmount = () => {
    forgo.unmount(root);
    if (root.isConnected) anchor.removeChild(root);
  };

  root.addEventListener('click', event => {
    if ((event.target as HTMLElement | null)?.dataset.action === 'close') unmount();
  }, { passive: true, once: true });

  document.body.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      unmount();
    }
  }, { passive: true, once: true });

  anchor.appendChild(root);
  forgo.mount(element, root);

  deepFocus(root);

  return unmount;
};
