import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';
import Modal from '../../../modal/modal';

export type ModalInfoProps = {};

const ModalInfo: Component<ModalInfoProps> = () => {
  const component = new forgo.Component<ModalInfoProps>({
    render() {
      return (
        <Modal title="About Pebble">
          <p>Pebble is <a href="https://github.com/chronoDave/pebble">free & open source</a>. It runs entirely within your browser and can be run offline.</p>
        </Modal>
      );
    }
  });

  return component;
};

export default ModalInfo;
