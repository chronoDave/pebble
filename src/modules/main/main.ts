import h from '@chronocide/hyper';

import { subscribe } from '../../state/store.ts';
import board from '../board/board.ts';

const main = h('main')()('No board selected');

subscribe((current, previous) => previous?.active !== current.active)
  (current => {
    if (typeof current.active === 'string') main.replaceChildren(board(current.active))
  });

export default main;
