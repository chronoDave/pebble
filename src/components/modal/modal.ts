import h from '@chronocide/hyper';

import { xmark } from '../button-icon/button-icon.ts';

import './modal.scss';

export type ModalProps = {
  title: string;
}

export default (props: ModalProps) => {
  const button = xmark('Close');
  const modal = h('dialog')({ class: 'modal' })(
    h('header')()(
      h('h1')()(props.title),
      button
    )
  );

  button.addEventListener('click', () => {
    modal.close();
  }, { passive: true });
  
  return modal;
};
