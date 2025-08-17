import h from '@chronocide/hyper';
import { produce } from 'immer';

import { plus } from '../../../components/icon/icon.ts';
import store from '../../../state/store.ts';
import { uid } from '../../../lib/string.ts';

const button = h('button')({ type: 'button' })(plus(), 'Add board');

button.addEventListener('click', () => {
  store.set(produce(draft => {
    const id = uid();

    draft.board[id] = { id, title: 'New board', lanes: [] };
  }))
}, { passive: true });

export default button;
