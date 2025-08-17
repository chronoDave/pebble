import h from '@chronocide/hyper';
import { produce } from 'immer';

import { plus } from '../../../components/icon/icon.ts';
import store from '../../../state/store.ts';
import { uid } from '../../../lib/string.ts';

const button = h('button')({ type: 'button' })(
  plus(),
  'Add lane'
);

const add = () => store.set(produce(draft => {
  const id = uid();

  draft.lane[id] = { id, title: 'New lane' };
  if (typeof draft.active === 'string') draft.board[draft.active].lanes.push(id);
}));

button.addEventListener('click', add, { passive: true });

export default button;
