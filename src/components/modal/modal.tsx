import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './modal.scss';

export type ModalProps = {
  title: string;
};

const Modal: Component<ModalProps> = () => {
  const component = new forgo.Component<ModalProps>({
    render(props) {
      return (
        <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <h2 id="dialog-title">{props.title}</h2>
          {props.children}
        </div>
      );
    }
  });

  return component;
};

export default Modal;
