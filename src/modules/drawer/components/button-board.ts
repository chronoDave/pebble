import h from '@chronocide/hyper';
import { produce } from 'immer';

import { plus } from '../../../components/icon/icon.ts';
import store from '../../../state/store.ts';
import { uid } from '../../../lib/string.ts';

const add = h('button')({ type: 'button' })(
  plus(),
  'Add board'
);

add.addEventListener('click', () => store.update(produce(draft => {
  const id = uid();

  draft.board[id] = { id };
})), { passive: true });

export default add;
