import h from '@chronocide/hyper';
import { produce } from 'immer';

import { plus } from '../../../components/icon/icon.ts';
import store from '../../../state/store.ts';
import * as create from '../../../state/actions/create.ts';

export default (id: string) => {
  const button = h('button')({ type: 'button' })(plus(), 'Add card');

  button.addEventListener('click', () => {
    store.set(produce(create.card(id)));
  }, { passive: true });

  return button;
};
