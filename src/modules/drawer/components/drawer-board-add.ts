import h from '@chronocide/hyper';
import { produce } from 'immer';

import { plus } from '../../../components/icon/icon.ts';
import store from '../../../state/store.ts';
import * as create from '../../../state/actions/create.ts';

const button = h('button')({ type: 'button' })(plus(), 'Add board');

button.addEventListener('click', () => {
  store.set(produce(create.board));
}, { passive: true });

export default button;
