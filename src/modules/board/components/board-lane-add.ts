import h from '@chronocide/hyper';
import { produce } from 'immer';

import { plus } from '../../../components/icon/icon.ts';
import * as create from '../../../state/actions/create.ts';
import store from '../../../state/store.ts';

export default (id: string) => {
  const button = h('button')({ type: 'button' })(plus(), 'Add lane');

  button.addEventListener('click', () => {
    store.set(produce(create.lane(id)));
  }, { passive: true });

  return button;
};
