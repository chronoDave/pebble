import h from '@chronocide/hyper';

import buttonIcon from '../button/button-icon.ts';
import { xmark } from '../icon/icon.ts';

import './modal.scss';

export type Attributes = {
  title: string;
};

export default (attributes: Attributes) => {
  const button = buttonIcon(xmark())('Close');
  const modal = h('dialog')({ class: 'modal' })(
    h('header')()(
      h('h1')()(attributes.title),
      button
    )
  );

  button.addEventListener('click', () => {
    modal.close();
  }, { passive: true });
  
  return modal;
};
